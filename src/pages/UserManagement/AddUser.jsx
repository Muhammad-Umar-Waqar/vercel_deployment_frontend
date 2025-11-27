// src/pages/UserManagement/AddUser.jsx
import { Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "../../components/Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
import { fetchAllManagers } from "../../slices/ManagerSlice";
import { fetchVenuesByOrganization } from "../../slices/VenueSlice";
import "../../styles/pages/management-pages.css";
import Swal from "sweetalert2";
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { useStore } from "../../contexts/storecontexts";

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";

const AddUser = () => {
  const dispatch = useDispatch();
  const { user: creator } = useStore(); // use the store context
  const token = localStorage.getItem("token");

  const { Organizations = [] } = useSelector((state) => state.Organization || { Organizations: [] });
  const venueState = useSelector((state) => state.Venue || {});
  const venuesByOrg = venueState.venuesByOrg || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    venues: [], // array of venue ids
  });

  // derived org venues for currently selected org
  const orgVenues = venuesByOrg[formData.organization] || [];

  const SELECT_HEIGHT = 48;
  const ITEM_HEIGHT = 48;
  const VISIBLE_ITEMS = 4;

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
        mt: 1,
      },
    },
    MenuListProps: {
      disablePadding: true,
    },
  };

  // load orgs on mount
  useEffect(() => {
    dispatch(fetchAllOrganizations());
  }, [dispatch]);

  // if creator is present and has an organization, preselect it and fetch its venues
  useEffect(() => {
    if (!creator) return;

    // if creator belongs to an organization, preselect it
    if (creator.organization) {
      setFormData((p) => ({ ...p, organization: creator.organization }));
      // fetch venues for creator's org (only once; VenueSlice caches by org)
      dispatch(fetchVenuesByOrganization(creator.organization));
    }
  }, [creator, dispatch]);

  // whenever organization changes (either due to creator or manual selection), fetch/cached venues
  useEffect(() => {
    if (!formData.organization) return;
    dispatch(fetchVenuesByOrganization(formData.organization));
  }, [dispatch, formData.organization]);

  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  const onsubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.organization) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and organization are required",
      });
    }

    // If creator is user, ensure at least one venue selected
    if (creator?.role === "user") {
      if (!Array.isArray(formData.venues) || formData.venues.length === 0) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must assign at least one venue",
        });
      }
    }

    setLoading(true);

    try {
      const bodyToSend = {
        email: formData.email,
        role: "user",
        organizationId: formData.organization,
        name: formData.name || formData.email.split("@")[0],
      };

      // only include venues if creator is user (server enforces this rule)
      if (creator?.role === "user") {
        bodyToSend.venues = formData.venues;
      }

      const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message || "User created successfully",
        });

        // Clear form; keep organization preselected for convenience if creator is user
        setFormData({
          name: "",
          email: "",
          organization: creator?.organization || "",
          venues: [],
        });

        dispatch(fetchAllManagers());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || `Error creating user (status ${res.status})`,
        });
        console.error("Create user failed:", res.status, data);
      }
    } catch (err) {
      console.error("Network / unexpected error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while creating the user",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderVenueName = (venue) => venue?.name ?? venue?._id ?? venue;

  return (
    <div className=" md:p-none p-[1rem] AddingPage user-add-container rounded-xl shadow-sm w-full flex flex-col justify-center bg-[#EEF3F9] border border-[#E5E7EB]">
      <h2 className="user-add-title font-semibold mb-1 text-center">Add User</h2>
      <p className="user-add-subtitle text-gray-500 mb-6 text-center">Welcome back! Select method to add user</p>
      <form onSubmit={onsubmit}>
        <div className="user-add-form space-y-4 max-w-sm mx-auto w-full">
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            onchange={onchange}
            value={formData.name}
            label={"Name"}
            icon={<User />}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onchange={onchange}
            value={formData.email}
            label={"Email"}
            icon={<Mail />}
          />

          <div className="relative">
            <img
              src="/OrganizationChecklist.svg"
              alt="org icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-[25px] w-[25px] pointer-events-none"
            />

              
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={formData.organization}
                onChange={onchange}
                inputProps={{ name: "organization" }}
                MenuProps={menuProps}
                renderValue={(selected) => {
                  if (!selected) return <span className="text-gray-500">Select Organization</span>;
                  const org = Organizations.find((o) => (o._id ?? o.id) === selected);
                  return org?.name ?? selected;
                }}
                sx={{
                  pl: "1.5rem",
                  height: SELECT_HEIGHT,
                  backgroundColor: "white",
                  borderRadius: "0.375rem",
                }}
                // if creator belongs to an org and is 'user', lock org selection
                disabled={!!creator?.organization && creator?.role === "user"}
              >
                {(Organizations || []).length === 0 ? (
                  <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
                    No organizations found
                  </MenuItem>
                ) : (
                  Organizations.map((org) => {
                    const id = org._id ?? org.id;
                    return (
                      <MenuItem
                        key={id}
                        value={id}
                        sx={{
                          height: ITEM_HEIGHT,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {org.name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
          </div>

          {/* Venues multi-select only visible when creator is user */}
          {creator?.role === "user" && (
            <>
              <div>
                <FormControl fullWidth>
                  <Select
                    multiple
                    displayEmpty
                    value={formData.venues}
                    onChange={onchange}
                    inputProps={{ name: "venues" }}
                    renderValue={(selected) => {
                      if (!selected || selected.length === 0) return <span className="text-gray-500">Select venues</span>;
                      return selected
                        .map((id) => {
                          const v = orgVenues.find((x) => (x._id ?? x.id) === id) || {};
                          return renderVenueName(v);
                        })
                        .join(", ");
                    }}
                    MenuProps={menuProps}
                    sx={{
                      pl: "1.5rem",
                      height: SELECT_HEIGHT,
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                    }}
                  >
                    {(!orgVenues || orgVenues.length === 0) ? (
                      <MenuItem disabled sx={{ height: ITEM_HEIGHT }}>
                        No venues found
                      </MenuItem>
                    ) : (
                      orgVenues.map((v) => {
                        const id = v._id ?? v.id;
                        return (
                          <MenuItem key={id} value={id} sx={{ height: ITEM_HEIGHT }}>
                            <Checkbox checked={formData.venues.indexOf(id) > -1} />
                            <ListItemText primary={v.name} />
                          </MenuItem>
                        );
                      })
                    )}
                  </Select>
                </FormControl>
              </div>
            </>
          )}
        </div>

        <div className="max-w-sm mx-auto w-full">
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded-md w-full cursor-pointer ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

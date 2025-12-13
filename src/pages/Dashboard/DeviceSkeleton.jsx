export default function DeviceSkeleton() {
  return (
     <div className="freezer-cards-grid freezer-cards-container">
    <div className="freezer-card-container">
      <div className="freezer-card-content animate-pulse">
        {/* Top section */}
        <div>
          <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Middle */}
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gray-300 rounded mr-3"></div>
          <div>
            <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-end">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    </div>
  );
}

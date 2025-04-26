import { Building2, Clock } from 'lucide-react';

const ShowroomCard = ({ showroom }) => {
  return (
    <div className="flex flex-col w-full p-5 transition-shadow duration-300 bg-white shadow-lg sm:p-6 rounded-2xl hover:shadow-2xl">
      
      {/* Heading */}
      <h2 className="mb-3 text-xl font-bold leading-tight text-red-600 break-words sm:text-2xl">
        {showroom.name}
      </h2>

      {/* Address */}
      <p className="mb-5 text-sm leading-relaxed text-gray-700 break-words sm:text-base">
        {showroom.address}
      </p>

      {/* Outlet Type and Working Hours */}
      <div className="flex flex-wrap items-center gap-6 mb-5">

        {/* Outlet Type */}
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
          <div className="leading-tight">
            <p className="text-xs text-gray-500">Outlet Type</p>
            <p className="text-sm font-bold">{showroom.outletType}</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500 shrink-0" />
          <div className="leading-tight">
            <p className="text-xs text-gray-500">Working Hours</p>
            <p className="text-sm font-bold">{showroom.workingHours}</p>
          </div>
        </div>

      </div>

      {/* Google Maps Link */}
      {showroom.navigateLink && (
        <a
          href={showroom.navigateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          View on Google Maps
        </a>
      )}
    </div>
  );
};

export default ShowroomCard;

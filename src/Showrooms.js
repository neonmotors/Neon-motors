import { Building2, Clock } from 'lucide-react';

const ShowroomCard = ({ showroom }) => {
  return (
    <div className="flex flex-col p-6 transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl">
      
      {/* Heading */}
      <h2 className="mb-2 text-2xl font-bold text-red-600">{showroom.name}</h2>
      
      {/* Address */}
      <p className="mb-4 text-gray-700">{showroom.address}</p>

      {/* Outlet Type and Working Hours */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:gap-10">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Outlet Type</p>
            <p className="font-semibold">{showroom.outletType}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Working Hours</p>
            <p className="font-semibold">{showroom.workingHours}</p>
          </div>
        </div>
      </div>

      {/* Google Maps Link */}
      {showroom.navigateLink && (
        <a
          href={showroom.navigateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          View on Google Maps
        </a>
      )}
      
    </div>
  );
};

export default ShowroomCard;

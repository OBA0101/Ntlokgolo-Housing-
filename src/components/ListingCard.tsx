import React from 'react';
import { PropertyListing } from '../types';
import { useRentals } from '../context/RentalsContext';
import { 
  Bed, 
  Bath, 
  Car, 
  ShieldAlert, 
  Zap, 
  MapPin, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface ListingCardProps {
  property: PropertyListing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const { openPropertyDetail, setSelectedProperty, setIsBookingOpen } = useRentals();

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  return (
    <article
      onClick={() => openPropertyDetail(property)}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Property Imagery Container (65-70% visual prominence) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Quiet text kicker overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-3 text-white flex items-end justify-between">
          <div className="text-xs font-medium flex items-center gap-1.5 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>{property.neighborhood}, {property.district}</span>
          </div>

          <div className="text-[11px] font-mono text-slate-300">
            {property.plotNumber}
          </div>
        </div>

        {/* Featured Tag (clean text tag, no candy pill) */}
        {property.isFeatured && (
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-[#00A3E0] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
            Verified Home
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata string with typographic dots - ZERO PILL */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1.5 flex-wrap">
            <span className="capitalize">{property.propertyType.replace('_', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span>Avail: {property.availableFrom}</span>
            {property.security.electricFence && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600">Electric Fence</span>
              </>
            )}
            {property.bpcMeterType === 'prepaid_token' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600">Prepaid BPC</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#0077B6] transition-colors">
            {property.title}
          </h3>

          {/* Key Specs */}
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <strong className="text-slate-800">{property.bedrooms}</strong> Beds
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <strong className="text-slate-800">{property.bathrooms}</strong> Baths
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              <strong className="text-slate-800">{property.parkingSpaces}</strong> Parking
            </span>
          </div>
        </div>

        {/* Pricing & Contiguous Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-slate-600 uppercase font-semibold">
              Monthly Rent
            </div>
            <div className="font-heading text-lg font-bold text-slate-900 font-mono tabular-nums">
              P {property.monthlyRentBWP.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 font-sans"> / mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookClick}
              className="px-3 py-1.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title="Book automated viewing slot"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing</span>
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};

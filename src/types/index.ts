export type PropertyType = 
  | 'house' 
  | 'apartment' 
  | 'townhouse' 
  | 'bachelor_cottage' 
  | 'villa'
  | 'compound';

export type BotswanaDistrict = 
  | 'Gaborone' 
  | 'Francistown' 
  | 'Maun' 
  | 'Tlokweng' 
  | 'Mogoditshane' 
  | 'Palapye' 
  | 'Kasane' 
  | 'Jwaneng' 
  | 'Lobatse'
  | 'Selebi-Phikwe';

export interface LandlordProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  verifiedOmang: boolean;
  memberSince: string;
  rating: number;
  responseRatePct: number;
}

export interface PropertyListing {
  id: string;
  title: string;
  propertyType: PropertyType;
  district: BotswanaDistrict;
  neighborhood: string; // e.g. Phakalane, Block 6, Village, Donga
  plotNumber: string; // e.g. Plot 48291
  monthlyRentBWP: number;
  securityDepositBWP: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  erfSizeSqm?: number;
  
  // Botswana-specific utilities & infrastructure
  bpcMeterType: 'prepaid_token' | 'postpaid';
  bpcMeterNumber?: string;
  wucWaterStatus: 'metered' | 'borehole_backup' | 'included_in_rent';
  hasSolarGeyser: boolean;
  hasHighSpeedFibre: boolean;
  hasAirConditioning: boolean;
  
  // Security features standard in Botswana
  security: {
    electricFence: boolean;
    motorizedGate: boolean;
    alarmSystem: boolean;
    perimeterWall: boolean;
    securityGuard: boolean;
  };

  // Amenities
  amenities: {
    swimmingPool: boolean;
    fittedKitchen: boolean;
    fittedWardrobes: boolean;
    pavedYard: boolean;
    petFriendly: boolean;
    servantsQuarters: boolean;
    borehole: boolean;
  };

  images: string[];
  description: string;
  nearbyLandmarks: string[]; // e.g. "5 mins to Airport Junction", "Walking distance to Thornhill Primary"
  availableFrom: string; // e.g. "Immediate" or date
  viewingSchedule: string[]; // Automated slots e.g. ["Mon & Wed: 16:30 - 18:00", "Sat: 10:00 - 13:00"]
  landlord: LandlordProfile;
  isFeatured?: boolean;
  status: 'available' | 'under_application' | 'leased';
  createdAt: string;
}

export interface ViewingBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  date: string;
  timeSlot: string;
  gatePassCode: string; // e.g. "NTL-7492" for security guard at gated complex or homeowner
  status: 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface TenantApplication {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  monthlyRentBWP: number;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  tenantOmangOrPassport: string;
  employmentStatus: 'employed_permanent' | 'employed_contract' | 'self_employed' | 'corporate_lease';
  employerName: string;
  monthlyIncomeBWP: number;
  affordabilityRatio: number; // calculated rent / income
  status: 'pending' | 'approved' | 'declined';
  landlordNotes?: string;
  digitalLeaseId?: string;
  createdAt: string;
}

export interface DigitalLease {
  id: string;
  applicationId: string;
  propertyId: string;
  propertyTitle: string;
  plotNumber: string;
  district: BotswanaDistrict;
  neighborhood: string;
  landlordName: string;
  landlordPhone: string;
  tenantName: string;
  tenantPhone: string;
  tenantOmang: string;
  monthlyRentBWP: number;
  securityDepositBWP: number;
  bpcMeterNumber: string;
  leaseStartDate: string;
  leaseDurationMonths: number;
  isSignedByTenant: boolean;
  isSignedByLandlord: boolean;
  signedAt?: string;
  signatureTenant?: string;
  createdAt: string;
}

export interface AutomatedNotification {
  id: string;
  channel: 'sms' | 'whatsapp' | 'email';
  recipientPhoneOrEmail: string;
  recipientName: string;
  subject: string;
  message: string;
  timestamp: string;
  relatedEntity: 'viewing' | 'application' | 'lease' | 'listing';
}

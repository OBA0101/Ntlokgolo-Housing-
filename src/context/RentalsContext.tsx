import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PropertyListing, 
  ViewingBooking, 
  TenantApplication, 
  DigitalLease, 
  AutomatedNotification, 
  BotswanaDistrict, 
  PropertyType 
} from '../types';
import { INITIAL_LISTINGS } from '../data/mockListings';

export interface FilterState {
  searchQuery: string;
  district: BotswanaDistrict | 'all';
  propertyType: PropertyType | 'all';
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  petFriendly: boolean;
  electricFence: boolean;
  bpcPrepaid: boolean;
  borehole: boolean;
  sortBy: 'recommended' | 'price_low_high' | 'price_high_low' | 'newest';
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  district: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 25000,
  bedrooms: 'all',
  petFriendly: false,
  electricFence: false,
  bpcPrepaid: false,
  borehole: false,
  sortBy: 'recommended',
};

interface RentalsContextType {
  listings: PropertyListing[];
  filteredListings: PropertyListing[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Selected property & detail modal
  selectedProperty: PropertyListing | null;
  setSelectedProperty: (p: PropertyListing | null) => void;
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  openPropertyDetail: (p: PropertyListing) => void;

  // Viewings
  viewings: ViewingBooking[];
  bookViewing: (booking: Omit<ViewingBooking, 'id' | 'createdAt' | 'gatePassCode' | 'status'>) => ViewingBooking;
  cancelViewing: (id: string) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;

  // Tenant Applications
  applications: TenantApplication[];
  submitApplication: (appData: Omit<TenantApplication, 'id' | 'createdAt' | 'affordabilityRatio' | 'status'>) => TenantApplication;
  updateApplicationStatus: (id: string, status: 'approved' | 'declined', notes?: string) => void;
  isApplyOpen: boolean;
  setIsApplyOpen: (open: boolean) => void;

  // Digital Leases
  leases: DigitalLease[];
  createLeaseFromApplication: (applicationId: string) => DigitalLease | null;
  signLease: (leaseId: string, signature: string) => void;
  selectedLease: DigitalLease | null;
  setSelectedLease: (lease: DigitalLease | null) => void;
  isLeasePreviewOpen: boolean;
  setIsLeasePreviewOpen: (open: boolean) => void;

  // Landlord listing submission
  addListing: (listingData: Omit<PropertyListing, 'id' | 'createdAt' | 'status'>) => PropertyListing;
  isListPropertyOpen: boolean;
  setIsListPropertyOpen: (open: boolean) => void;

  // Portal & navigation
  activeUserRole: 'tenant' | 'landlord';
  setActiveUserRole: (role: 'tenant' | 'landlord') => void;
  isLandlordDashOpen: boolean;
  setIsLandlordDashOpen: (open: boolean) => void;
  isTenantPortalOpen: boolean;
  setIsTenantPortalOpen: (open: boolean) => void;
  activeNavTab: 'browse' | 'how_it_works' | 'leases' | 'calculator';
  setActiveNavTab: (tab: 'browse' | 'how_it_works' | 'leases' | 'calculator') => void;

  // Automated notifications
  notifications: AutomatedNotification[];
  addNotification: (notification: Omit<AutomatedNotification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
}

const RentalsContext = createContext<RentalsContextType | undefined>(undefined);

export const RentalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load listings from localStorage or fallback
  const [listings, setListings] = useState<PropertyListing[]>(() => {
    try {
      const saved = localStorage.getItem('ntlokgolo_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  // Load viewings from localStorage
  const [viewings, setViewings] = useState<ViewingBooking[]>(() => {
    try {
      const saved = localStorage.getItem('ntlokgolo_viewings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'view-initial-01',
          propertyId: 'prop-phak-01',
          propertyTitle: '4-Bedroom Executive Villa with Pool & Borehole',
          propertyLocation: 'Phakalane, Gaborone (Plot 43918)',
          tenantName: 'Kagiso Tlhabi',
          tenantPhone: '+267 72 381 902',
          tenantEmail: 'kagiso.t@bwtelecom.co.bw',
          date: '2026-09-26',
          timeSlot: 'Saturdays: 10:00 - 13:00',
          gatePassCode: 'NTL-8419',
          status: 'confirmed',
          notes: 'Moving from Francistown on transfer.',
          createdAt: '2026-09-21T10:00:00Z',
        }
      ];
    } catch {
      return [];
    }
  });

  // Load applications from localStorage
  const [applications, setApplications] = useState<TenantApplication[]>(() => {
    try {
      const saved = localStorage.getItem('ntlokgolo_applications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'app-initial-01',
          propertyId: 'prop-cbd-02',
          propertyTitle: 'Modern 2-Bedroom City Apartment with Balcony',
          propertyLocation: 'CBD / Extension 9, Gaborone',
          monthlyRentBWP: 7800,
          tenantName: 'Lorato Motsepe',
          tenantPhone: '+267 71 550 491',
          tenantEmail: 'lorato.motsepe@debeers.com',
          tenantOmangOrPassport: '849201948',
          employmentStatus: 'employed_permanent',
          employerName: 'De Beers Global Sightholder Sales',
          monthlyIncomeBWP: 28500,
          affordabilityRatio: 0.27, // 27% (Healthy < 33%)
          status: 'pending',
          createdAt: '2026-09-22T08:30:00Z',
        }
      ];
    } catch {
      return [];
    }
  });

  // Load digital leases
  const [leases, setLeases] = useState<DigitalLease[]>(() => {
    try {
      const saved = localStorage.getItem('ntlokgolo_leases');
      return saved ? JSON.parse(saved) : [
        {
          id: 'lease-sample-01',
          applicationId: 'app-seed-demo',
          propertyId: 'prop-blk6-03',
          propertyTitle: 'Contemporary 3-Bedroom Family Home with Paved Yard',
          plotNumber: 'Plot 28711',
          district: 'Gaborone',
          neighborhood: 'Block 6',
          landlordName: 'Dr. Thabo Seretse',
          landlordPhone: '+267 74 118 733',
          tenantName: 'Neo Sebego',
          tenantPhone: '+267 76 892 110',
          tenantOmang: '912048102',
          monthlyRentBWP: 6500,
          securityDepositBWP: 6500,
          bpcMeterNumber: '01-4492-3810-7',
          leaseStartDate: '2026-10-01',
          leaseDurationMonths: 12,
          isSignedByTenant: true,
          isSignedByLandlord: true,
          signedAt: '2026-09-18T14:22:00Z',
          signatureTenant: 'Neo Sebego (Verified via Omang 912048102)',
          createdAt: '2026-09-18T12:00:00Z',
        }
      ];
    } catch {
      return [];
    }
  });

  // Load notifications
  const [notifications, setNotifications] = useState<AutomatedNotification[]>(() => {
    try {
      const saved = localStorage.getItem('ntlokgolo_notifications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'notif-1',
          channel: 'whatsapp',
          recipientPhoneOrEmail: '+267 72 381 902',
          recipientName: 'Kagiso Tlhabi',
          subject: 'Automated Viewing Confirmed · Gate Pass Issued',
          message: 'Hello Kagiso, your automated viewing for Phakalane Villa (Plot 43918) is confirmed for Sat 10:00-13:00. Your Security Gate Access Code is NTL-8419. Landlord Rre Kgosietsile notified.',
          timestamp: '2 hours ago',
          relatedEntity: 'viewing',
        },
        {
          id: 'notif-2',
          channel: 'sms',
          recipientPhoneOrEmail: '+267 71 839 201',
          recipientName: 'Rre Kgosietsile Molosiwa (Landlord)',
          subject: 'New Automated Viewing Scheduled',
          message: 'Ntlokgolo Alert: Tenant Kagiso Tlhabi has booked a viewing for Plot 43918. Gate pass generated. No action needed.',
          timestamp: '2 hours ago',
          relatedEntity: 'viewing',
        },
        {
          id: 'notif-3',
          channel: 'whatsapp',
          recipientPhoneOrEmail: '+267 72 450 192',
          recipientName: 'Mma Masego Kenosi (Landlord)',
          subject: 'New Tenant Application Screened',
          message: 'Application received for CBD Unit 3B: Lorato Motsepe (De Beers). Automated Affordability Score: 27% (Approved benchmark). Review & generate lease in your portal.',
          timestamp: 'Yesterday',
          relatedEntity: 'application',
        }
      ];
    } catch {
      return [];
    }
  });

  // Active filters & UI state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isLandlordDashOpen, setIsLandlordDashOpen] = useState(false);
  const [isTenantPortalOpen, setIsTenantPortalOpen] = useState(false);
  const [isLeasePreviewOpen, setIsLeasePreviewOpen] = useState(false);
  const [selectedLease, setSelectedLease] = useState<DigitalLease | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeUserRole, setActiveUserRole] = useState<'tenant' | 'landlord'>('tenant');
  const [activeNavTab, setActiveNavTab] = useState<'browse' | 'how_it_works' | 'leases' | 'calculator'>('browse');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ntlokgolo_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('ntlokgolo_viewings', JSON.stringify(viewings));
  }, [viewings]);

  useEffect(() => {
    localStorage.setItem('ntlokgolo_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ntlokgolo_leases', JSON.stringify(leases));
  }, [leases]);

  useEffect(() => {
    localStorage.setItem('ntlokgolo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Open property detail modal safely
  const openPropertyDetail = (property: PropertyListing) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Add automated notification helper
  const addNotification = (item: Omit<AutomatedNotification, 'id' | 'timestamp'>) => {
    const newNotif: AutomatedNotification = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Just now',
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Filter listings based on current filters
  const filteredListings = listings.filter(item => {
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchNeighborhood = item.neighborhood.toLowerCase().includes(q);
      const matchDistrict = item.district.toLowerCase().includes(q);
      const matchPlot = item.plotNumber.toLowerCase().includes(q);
      if (!matchTitle && !matchNeighborhood && !matchDistrict && !matchPlot) return false;
    }

    if (filters.district !== 'all' && item.district !== filters.district) {
      return false;
    }

    if (filters.propertyType !== 'all' && item.propertyType !== filters.propertyType) {
      return false;
    }

    if (item.monthlyRentBWP < filters.minPrice || item.monthlyRentBWP > filters.maxPrice) {
      return false;
    }

    if (filters.bedrooms !== 'all') {
      if (filters.bedrooms === 4 && item.bedrooms < 4) return false;
      if (filters.bedrooms !== 4 && item.bedrooms !== filters.bedrooms) return false;
    }

    if (filters.electricFence && !item.security.electricFence) return false;
    if (filters.bpcPrepaid && item.bpcMeterType !== 'prepaid_token') return false;
    if (filters.petFriendly && !item.amenities.petFriendly) return false;
    if (filters.borehole && !item.amenities.borehole && item.wucWaterStatus !== 'borehole_backup') return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_low_high') {
      return a.monthlyRentBWP - b.monthlyRentBWP;
    }
    if (filters.sortBy === 'price_high_low') {
      return b.monthlyRentBWP - a.monthlyRentBWP;
    }
    if (filters.sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // recommended: featured first, then price
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return b.monthlyRentBWP - a.monthlyRentBWP;
  });

  // Book a viewing with automated pass generation
  const bookViewing = (
    bookingData: Omit<ViewingBooking, 'id' | 'createdAt' | 'gatePassCode' | 'status'>
  ): ViewingBooking => {
    // Generate a unique Botswana gate pass code: NTL-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const gatePassCode = `NTL-${randomDigits}`;

    const newBooking: ViewingBooking = {
      ...bookingData,
      id: `view-${Date.now()}`,
      gatePassCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setViewings(prev => [newBooking, ...prev]);

    // Send automated tenant notification (WhatsApp / SMS)
    addNotification({
      channel: 'whatsapp',
      recipientPhoneOrEmail: newBooking.tenantPhone,
      recipientName: newBooking.tenantName,
      subject: `Viewing Pass Confirmed: ${newBooking.propertyTitle}`,
      message: `Dumela ${newBooking.tenantName}! Your viewing for ${newBooking.propertyLocation} is confirmed for ${newBooking.date} (${newBooking.timeSlot}). Your security pass code is ${gatePassCode}. Present this at the entrance or gate intercom.`,
      relatedEntity: 'viewing',
    });

    // Send automated notification to landlord
    const prop = listings.find(l => l.id === newBooking.propertyId);
    if (prop) {
      addNotification({
        channel: 'sms',
        recipientPhoneOrEmail: prop.landlord.phone,
        recipientName: prop.landlord.name,
        subject: `New Viewing Booked for ${prop.plotNumber}`,
        message: `Ntlokgolo Automation: ${newBooking.tenantName} (${newBooking.tenantPhone}) has booked a viewing for ${newBooking.date} ${newBooking.timeSlot}. Gate code ${gatePassCode} issued.`,
        relatedEntity: 'viewing',
      });
    }

    return newBooking;
  };

  const cancelViewing = (id: string) => {
    setViewings(prev => prev.map(v => v.id === id ? { ...v, status: 'cancelled' } : v));
    addNotification({
      channel: 'sms',
      recipientPhoneOrEmail: 'Tenant',
      recipientName: 'Tenant',
      subject: 'Viewing Cancelled',
      message: `Your viewing reservation has been cancelled. The gate code has been deactivated.`,
      relatedEntity: 'viewing',
    });
  };

  // Submit tenant application with automated affordability analysis
  const submitApplication = (
    appData: Omit<TenantApplication, 'id' | 'createdAt' | 'affordabilityRatio' | 'status'>
  ): TenantApplication => {
    const ratio = Math.round((appData.monthlyRentBWP / Math.max(appData.monthlyIncomeBWP, 1)) * 100) / 100;

    const newApp: TenantApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      affordabilityRatio: ratio,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setApplications(prev => [newApp, ...prev]);

    // Notify tenant
    addNotification({
      channel: 'whatsapp',
      recipientPhoneOrEmail: newApp.tenantPhone,
      recipientName: newApp.tenantName,
      subject: 'Rental Application Received & Screened',
      message: `Dumela ${newApp.tenantName}, your application for ${newApp.propertyTitle} has been received. Automated Affordability Score: ${(ratio * 100).toFixed(0)}% (Standard limit: 35%). The landlord will review and approve.`,
      relatedEntity: 'application',
    });

    // Notify landlord
    const prop = listings.find(l => l.id === newApp.propertyId);
    if (prop) {
      addNotification({
        channel: 'whatsapp',
        recipientPhoneOrEmail: prop.landlord.phone,
        recipientName: prop.landlord.name,
        subject: `New Screened Tenant Application for ${prop.plotNumber}`,
        message: `Tenant ${newApp.tenantName} (Omang: ${newApp.tenantOmangOrPassport}, Employer: ${newApp.employerName}) applied for your rental. Affordability: ${(ratio * 100).toFixed(0)}%. Click to approve and generate Botswana digital lease.`,
        relatedEntity: 'application',
      });
    }

    return newApp;
  };

  // Update application status & auto-generate digital lease if approved
  const updateApplicationStatus = (id: string, status: 'approved' | 'declined', notes?: string) => {
    let targetApp: TenantApplication | undefined;

    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        targetApp = { ...app, status, landlordNotes: notes };
        return targetApp;
      }
      return app;
    }));

    if (targetApp) {
      if (status === 'approved') {
        // Automatically generate digital lease
        createLeaseFromApplication(id);

        addNotification({
          channel: 'whatsapp',
          recipientPhoneOrEmail: targetApp.tenantPhone,
          recipientName: targetApp.tenantName,
          subject: 'Pula! Your Rental Application is Approved',
          message: `Congratulations ${targetApp.tenantName}! Your application for ${targetApp.propertyTitle} has been approved by the landlord. An official Botswana Residential Tenancy Agreement has been generated for your digital signature.`,
          relatedEntity: 'lease',
        });
      } else {
        addNotification({
          channel: 'sms',
          recipientPhoneOrEmail: targetApp.tenantPhone,
          recipientName: targetApp.tenantName,
          subject: 'Rental Application Status Update',
          message: `Notice from Ntlokgolo: The landlord for ${targetApp.propertyTitle} was unable to proceed with your application at this time. Feedback: ${notes || 'Position filled or criteria not met.'}`,
          relatedEntity: 'application',
        });
      }
    }
  };

  // Generate Botswana Standard Residential Lease from approved application
  const createLeaseFromApplication = (applicationId: string): DigitalLease | null => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return null;

    const prop = listings.find(p => p.id === app.propertyId);
    if (!prop) return null;

    const newLease: DigitalLease = {
      id: `lease-${Date.now()}`,
      applicationId: app.id,
      propertyId: prop.id,
      propertyTitle: prop.title,
      plotNumber: prop.plotNumber,
      district: prop.district,
      neighborhood: prop.neighborhood,
      landlordName: prop.landlord.name,
      landlordPhone: prop.landlord.phone,
      tenantName: app.tenantName,
      tenantPhone: app.tenantPhone,
      tenantOmang: app.tenantOmangOrPassport,
      monthlyRentBWP: prop.monthlyRentBWP,
      securityDepositBWP: prop.securityDepositBWP,
      bpcMeterNumber: prop.bpcMeterNumber || 'Pending installation',
      leaseStartDate: '2026-10-01',
      leaseDurationMonths: 12,
      isSignedByTenant: false,
      isSignedByLandlord: true, // Landlord auto-approves by triggering lease
      createdAt: new Date().toISOString(),
    };

    setLeases(prev => [newLease, ...prev]);

    // Attach lease ID to application
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, digitalLeaseId: newLease.id } : a));

    return newLease;
  };

  // Sign lease electronically
  const signLease = (leaseId: string, signature: string) => {
    setLeases(prev => prev.map(l => {
      if (l.id === leaseId) {
        return {
          ...l,
          isSignedByTenant: true,
          signedAt: new Date().toISOString(),
          signatureTenant: signature,
        };
      }
      return l;
    }));

    const lease = leases.find(l => l.id === leaseId);
    if (lease) {
      // Mark property as leased/under contract
      setListings(prev => prev.map(p => p.id === lease.propertyId ? { ...p, status: 'leased' } : p));

      addNotification({
        channel: 'whatsapp',
        recipientPhoneOrEmail: lease.tenantPhone,
        recipientName: lease.tenantName,
        subject: 'Botswana Tenancy Agreement Executed',
        message: `Your tenancy agreement for ${lease.plotNumber}, ${lease.neighborhood} is legally signed and activated under Botswana laws. First month rent (P${lease.monthlyRentBWP.toLocaleString()}) and deposit (P${lease.securityDepositBWP.toLocaleString()}) escrow instructions sent to your email.`,
        relatedEntity: 'lease',
      });

      addNotification({
        channel: 'sms',
        recipientPhoneOrEmail: lease.landlordPhone,
        recipientName: lease.landlordName,
        subject: `Lease Signed by Tenant ${lease.tenantName}`,
        message: `Ntlokgolo Automation: Tenant ${lease.tenantName} has signed the lease agreement for ${lease.plotNumber}. Move-in protocol & keys handover scheduled.`,
        relatedEntity: 'lease',
      });
    }
  };

  // Add new property listing by landlord
  const addListing = (
    listingData: Omit<PropertyListing, 'id' | 'createdAt' | 'status'>
  ): PropertyListing => {
    const newListing: PropertyListing = {
      ...listingData,
      id: `prop-${Date.now()}`,
      status: 'available',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setListings(prev => [newListing, ...prev]);

    addNotification({
      channel: 'sms',
      recipientPhoneOrEmail: newListing.landlord.phone,
      recipientName: newListing.landlord.name,
      subject: `Listing Published: ${newListing.plotNumber}`,
      message: `Ntlokgolo Alert: Your property at ${newListing.plotNumber} in ${newListing.neighborhood} is now live with automated viewing booking enabled.`,
      relatedEntity: 'listing',
    });

    return newListing;
  };

  return (
    <RentalsContext.Provider
      value={{
        listings,
        filteredListings,
        filters,
        setFilters,
        resetFilters,
        selectedProperty,
        setSelectedProperty,
        isDetailOpen,
        setIsDetailOpen,
        openPropertyDetail,
        viewings,
        bookViewing,
        cancelViewing,
        isBookingOpen,
        setIsBookingOpen,
        applications,
        submitApplication,
        updateApplicationStatus,
        isApplyOpen,
        setIsApplyOpen,
        leases,
        createLeaseFromApplication,
        signLease,
        selectedLease,
        setSelectedLease,
        isLeasePreviewOpen,
        setIsLeasePreviewOpen,
        addListing,
        isListPropertyOpen,
        setIsListPropertyOpen,
        activeUserRole,
        setActiveUserRole,
        isLandlordDashOpen,
        setIsLandlordDashOpen,
        isTenantPortalOpen,
        setIsTenantPortalOpen,
        activeNavTab,
        setActiveNavTab,
        notifications,
        addNotification,
        dismissNotification,
        clearNotifications,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
      }}
    >
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentals = () => {
  const context = useContext(RentalsContext);
  if (!context) {
    throw new Error('useRentals must be used within a RentalsProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Sun, 
  Wifi, 
  Flame, 
  Check, 
  Calendar, 
  Clock, 
  KeyRound, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  Calculator,
  UserCheck,
  ChevronRight,
  Share2
} from 'lucide-react';

export const PropertyDetailModal: React.FC = () => {
  const { 
    selectedProperty, 
    isDetailOpen, 
    setIsDetailOpen, 
    bookViewing, 
    submitApplication,
    setIsNotificationDrawerOpen
  } = useRentals();

  if (!isDetailOpen || !selectedProperty) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeActionTab, setActiveActionTab] = useState<'viewing' | 'apply' | 'calculator'>('viewing');

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('2026-09-26');
  const [bookingSlot, setBookingSlot] = useState(selectedProperty.viewingSchedule[0] || 'Saturday 10:00 - 13:00');
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('+267 ');
  const [tenantEmail, setTenantEmail] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccessPass, setBookingSuccessPass] = useState<string | null>(null);

  // Application Form State
  const [appOmang, setAppOmang] = useState('');
  const [appEmployer, setAppEmployer] = useState('');
  const [appEmploymentStatus, setAppEmploymentStatus] = useState<'employed_permanent' | 'employed_contract' | 'self_employed' | 'corporate_lease'>('employed_permanent');
  const [appIncome, setAppIncome] = useState<number>(Math.round(selectedProperty.monthlyRentBWP * 3.5));
  const [appSuccess, setAppSuccess] = useState(false);

  // Copy share link feedback
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Viewing
  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName.trim() || !tenantPhone.trim()) return;

    const res = bookViewing({
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      propertyLocation: `${selectedProperty.neighborhood}, ${selectedProperty.district} (${selectedProperty.plotNumber})`,
      tenantName,
      tenantPhone,
      tenantEmail: tenantEmail || `${tenantName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      date: bookingDate,
      timeSlot: bookingSlot,
      notes: bookingNotes,
    });

    setBookingSuccessPass(res.gatePassCode);
  };

  // Submit Application
  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName.trim() || !tenantPhone.trim() || !appOmang.trim()) return;

    submitApplication({
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      propertyLocation: `${selectedProperty.neighborhood}, ${selectedProperty.district}`,
      monthlyRentBWP: selectedProperty.monthlyRentBWP,
      tenantName,
      tenantPhone,
      tenantEmail: tenantEmail || `${tenantName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      tenantOmangOrPassport: appOmang,
      employmentStatus: appEmploymentStatus,
      employerName: appEmployer || 'Debswana / Government / Private',
      monthlyIncomeBWP: Number(appIncome) || selectedProperty.monthlyRentBWP * 3,
    });

    setAppSuccess(true);
  };

  const calculatedRatio = appIncome > 0 ? (selectedProperty.monthlyRentBWP / appIncome) : 0;
  const isAffordable = calculatedRatio <= 0.35;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{selectedProperty.district}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProperty.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-900 bg-slate-200/70 px-1.5 py-0.5 rounded">
              {selectedProperty.plotNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Share listing link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => setIsDetailOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label="Close property detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Gallery & Dossier (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Image Viewport */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedProperty.images[activeImageIndex] || selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded font-mono">
                {activeImageIndex + 1} / {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-[#0077B6] ring-2 ring-[#0077B6]/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Core Location */}
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#0077B6] mb-1">
                {selectedProperty.propertyType.replace('_', ' ')} · Available {selectedProperty.availableFrom}
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 leading-snug">
                {selectedProperty.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{selectedProperty.neighborhood}, {selectedProperty.district} · Plot Ref: {selectedProperty.plotNumber}</span>
              </p>
            </div>

            {/* Key Architectural & Spatial Specs */}
            <div className="grid grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <div>
                <div className="text-xs text-slate-500">Bedrooms</div>
                <div className="font-heading text-lg font-bold text-slate-900">{selectedProperty.bedrooms}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Bathrooms</div>
                <div className="font-heading text-lg font-bold text-slate-900">{selectedProperty.bathrooms}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Parking</div>
                <div className="font-heading text-lg font-bold text-slate-900">{selectedProperty.parkingSpaces}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Erf Size</div>
                <div className="font-heading text-lg font-bold text-slate-900">{selectedProperty.erfSizeSqm || 600}m²</div>
              </div>
            </div>

            {/* Botswana Utilities & Essential Infrastructure */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Utilities & Infrastructure (Botswana Standards)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#00A3E0] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">BPC Electricity:</span>
                    <span>
                      {selectedProperty.bpcMeterType === 'prepaid_token' ? 'Prepaid Token Meter' : 'Postpaid Account'}
                      {selectedProperty.bpcMeterNumber && ` (${selectedProperty.bpcMeterNumber})`}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex items-start gap-2.5">
                  <Droplet className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Water Utilities Corp (WUC):</span>
                    <span>
                      {selectedProperty.wucWaterStatus === 'borehole_backup' ? 'Metered + Private Borehole Backup' : 'Standard Metered Connection'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Security Perimeter:</span>
                    <span>
                      {selectedProperty.security.electricFence ? '8-Strand Electric Fence' : 'Perimeter Wall'}
                      {selectedProperty.security.motorizedGate && ', Motorized Remote Gate'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 flex items-start gap-2.5">
                  <Wifi className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Connectivity:</span>
                    <span>
                      {selectedProperty.hasHighSpeedFibre ? 'BoFiNet / Mascom Fibre Ready' : '4G LTE Coverage'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Property Narrative
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedProperty.description}
              </p>
            </div>

            {/* Nearby Highlights */}
            {selectedProperty.nearbyLandmarks.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Neighborhood Proximity
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {selectedProperty.nearbyLandmarks.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Landlord Trust Badge */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  {selectedProperty.landlord.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedProperty.landlord.name}
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded font-semibold">
                      Omang Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Member since {selectedProperty.landlord.memberSince} · {selectedProperty.landlord.responseRatePct}% response rate
                  </div>
                </div>
              </div>

              <div className="text-right text-xs">
                <div className="font-bold text-slate-900 font-mono">
                  {selectedProperty.landlord.phone}
                </div>
                <div className="text-[10px] text-slate-500">Direct Landlord Contact</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contiguous Automated Action Module (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-0 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              
              {/* Price Banner */}
              <div className="p-5 bg-slate-900 text-white">
                <div className="text-xs text-slate-400 font-medium">Monthly Rental Rate</div>
                <div className="font-heading text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
                  P {selectedProperty.monthlyRentBWP.toLocaleString()}
                  <span className="text-sm font-normal text-slate-400 font-sans"> / month</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Security Deposit: <strong className="text-slate-200 font-mono">P {selectedProperty.securityDepositBWP.toLocaleString()}</strong> (1 Month, Escrow Protection)
                </div>
              </div>

              {/* Segmented Controls for Actions */}
              <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setActiveActionTab('viewing')}
                  className={`py-3 text-center border-b-2 transition-colors ${
                    activeActionTab === 'viewing'
                      ? 'border-[#0077B6] text-slate-900 bg-white font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  Book Viewing
                </button>
                <button
                  onClick={() => setActiveActionTab('apply')}
                  className={`py-3 text-center border-b-2 transition-colors ${
                    activeActionTab === 'apply'
                      ? 'border-[#0077B6] text-slate-900 bg-white font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  Apply Online
                </button>
                <button
                  onClick={() => setActiveActionTab('calculator')}
                  className={`py-3 text-center border-b-2 transition-colors ${
                    activeActionTab === 'calculator'
                      ? 'border-[#0077B6] text-slate-900 bg-white font-bold'
                      : 'border-transparent hover:text-slate-900'
                  }`}
                >
                  Move-In Costs
                </button>
              </div>

              {/* TAB 1: Instant Automated Viewing Form */}
              {activeActionTab === 'viewing' && (
                <div className="p-5 space-y-4">
                  {bookingSuccessPass ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <KeyRound className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-lg font-bold text-emerald-950">
                        Viewing Pass Confirmed!
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Present this gate access code to the security guard or intercom at {selectedProperty.plotNumber}.
                      </p>
                      <div className="p-3 bg-white border border-emerald-300 rounded-lg">
                        <span className="text-[11px] text-slate-500 uppercase font-bold block mb-1">
                          Security Gate Code
                        </span>
                        <span className="font-mono text-2xl font-extrabold text-slate-950 tracking-wider">
                          {bookingSuccessPass}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1">
                          Valid for {bookingDate} · {bookingSlot}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700">
                        An automated SMS and WhatsApp confirmation have been triggered. Landlord {selectedProperty.landlord.name} has been notified.
                      </p>
                      <button
                        onClick={() => {
                          setBookingSuccessPass(null);
                          setIsNotificationDrawerOpen(true);
                        }}
                        className="w-full py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
                      >
                        View Automated Notification Feed
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleViewingSubmit} className="space-y-3.5">
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#00A3E0] shrink-0" />
                        <span>Landlord scheduled viewing windows are active. Immediate pass issued upon booking.</span>
                      </div>

                      {/* Select Viewing Slot */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Available Viewing Slot
                        </label>
                        <select
                          value={bookingSlot}
                          onChange={(e) => setBookingSlot(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                        >
                          {selectedProperty.viewingSchedule.map((slot, i) => (
                            <option key={i} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>

                      {/* Viewing Date */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          min="2026-09-24"
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name (as per Omang/ID)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kagiso Moloi"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      {/* Phone (+267) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Botswana Phone (SMS & WhatsApp Pass)
                        </label>
                        <input
                          type="tel"
                          placeholder="+267 71 234 567"
                          value={tenantPhone}
                          onChange={(e) => setTenantPhone(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Generate Instant Gate Pass</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: Quick Automated Tenant Screening */}
              {activeActionTab === 'apply' && (
                <div className="p-5 space-y-4">
                  {appSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-lg font-bold text-emerald-950">
                        Application Screened & Sent!
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Your application for {selectedProperty.plotNumber} has been delivered to Landlord {selectedProperty.landlord.name}.
                      </p>
                      <div className="p-2.5 bg-white border border-emerald-300 rounded text-xs text-left space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Omang/ID:</span>
                          <span className="font-mono font-bold text-slate-800">{appOmang}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Rent-to-Income:</span>
                          <span className="font-mono font-bold text-emerald-700">
                            {(calculatedRatio * 100).toFixed(0)}% (Passed)
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Once the landlord clicks approve, a digital Botswana Tenancy Agreement will be generated for your digital signature.
                      </p>
                      <button
                        onClick={() => setAppSuccess(false)}
                        className="text-xs text-slate-600 underline font-semibold"
                      >
                        Submit another application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleAppSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Applicant Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lorato Motsepe"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Omang or Passport #
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 849201948"
                            value={appOmang}
                            onChange={(e) => setAppOmang(e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+267 71..."
                            value={tenantPhone}
                            onChange={(e) => setTenantPhone(e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Employment Type
                        </label>
                        <select
                          value={appEmploymentStatus}
                          onChange={(e) => setAppEmploymentStatus(e.target.value as any)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                        >
                          <option value="employed_permanent">Permanently Employed</option>
                          <option value="employed_contract">Contract Employment</option>
                          <option value="self_employed">Self-Employed / Business Owner</option>
                          <option value="corporate_lease">Corporate / Diplomatic Lease</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Employer / Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Debswana / First National Bank BW / Min. of Health"
                          value={appEmployer}
                          onChange={(e) => setAppEmployer(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-slate-700">
                            Monthly Net Income (BWP)
                          </label>
                          <span className="text-xs font-mono font-bold text-slate-900">
                            P {appIncome.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="number"
                          min={selectedProperty.monthlyRentBWP}
                          max={150000}
                          step={500}
                          value={appIncome}
                          onChange={(e) => setAppIncome(Number(e.target.value))}
                          className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>

                      {/* Automated Affordability Indicator */}
                      <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                        isAffordable 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}>
                        <div>
                          <span className="font-bold block">
                            Rent-to-Income: {(calculatedRatio * 100).toFixed(0)}%
                          </span>
                          <span className="text-[11px]">
                            {isAffordable ? 'Within healthy Botswana tenancy ratio (≤ 35%)' : 'Exceeds standard 35% guideline'}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-xs">
                          {isAffordable ? 'PASSED' : 'CAUTION'}
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Submit Application for Approval</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: Move-In Cost Breakdown in Pula */}
              {activeActionTab === 'calculator' && (
                <div className="p-5 space-y-4">
                  <div className="text-xs text-slate-500">
                    Transparent initial move-in costs under standard Botswana tenancy agreements:
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100">
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-600">First Month's Rent:</span>
                      <span className="font-mono font-bold text-slate-900">
                        P {selectedProperty.monthlyRentBWP.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span className="text-slate-600">Refundable Security Deposit:</span>
                      <span className="font-mono font-bold text-slate-900">
                        P {selectedProperty.securityDepositBWP.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span className="text-slate-600">Prepaid BPC Electricity Initial Token:</span>
                      <span className="font-mono text-slate-600">~ P 350.00</span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span className="text-slate-600">WUC Water Deposit / Meter Setup:</span>
                      <span className="font-mono text-slate-600">~ P 250.00</span>
                    </div>

                    <div className="flex justify-between pt-3 text-sm font-bold text-slate-900 border-t-2 border-slate-200">
                      <span>Total Estimated Move-In:</span>
                      <span className="font-mono text-[#0077B6]">
                        P {(selectedProperty.monthlyRentBWP + selectedProperty.securityDepositBWP + 600).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 leading-normal">
                    <strong>Deposit Protection:</strong> Under Botswana law, the security deposit is held in escrow and returned within 14 days of lease termination, minus verified repairs or outstanding utility arrears.
                  </div>

                  <button
                    onClick={() => setActiveActionTab('apply')}
                    className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Proceed to Application
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

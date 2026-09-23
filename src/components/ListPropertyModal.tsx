import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  Building2, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Camera
} from 'lucide-react';
import { BotswanaDistrict, PropertyType } from '../types';

import heroHome from '../assets/images/hero_botswana_home_1790161561812.jpg';
import phakalaneVilla from '../assets/images/phakalane_luxury_villa_1790161573896.jpg';
import cbdApartment from '../assets/images/gaborone_modern_apartment_1790161585384.jpg';
import block6Townhouse from '../assets/images/cozy_townhouse_botswana_1790161596472.jpg';

export const ListPropertyModal: React.FC = () => {
  const { isListPropertyOpen, setIsListPropertyOpen, addListing, setIsLandlordDashOpen } = useRentals();

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState<BotswanaDistrict>('Gaborone');
  const [neighborhood, setNeighborhood] = useState('Phakalane');
  const [plotNumber, setPlotNumber] = useState('Plot ');
  const [propertyType, setPropertyType] = useState<PropertyType>('house');

  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [parkingSpaces, setParkingSpaces] = useState(2);
  const [erfSize, setErfSize] = useState(650);

  const [electricFence, setElectricFence] = useState(true);
  const [motorizedGate, setMotorizedGate] = useState(true);
  const [alarmSystem, setAlarmSystem] = useState(true);
  const [perimeterWall, setPerimeterWall] = useState(true);

  const [bpcMeterType, setBpcMeterType] = useState<'prepaid_token' | 'postpaid'>('prepaid_token');
  const [bpcMeterNumber, setBpcMeterNumber] = useState('04-8192-3810-5');
  const [wucWaterStatus, setWucWaterStatus] = useState<'metered' | 'borehole_backup' | 'included_in_rent'>('metered');
  const [hasSolarGeyser, setHasSolarGeyser] = useState(true);
  const [hasHighSpeedFibre, setHasHighSpeedFibre] = useState(true);
  const [petFriendly, setPetFriendly] = useState(true);

  const [monthlyRentBWP, setMonthlyRentBWP] = useState(6500);
  const [securityDepositBWP, setSecurityDepositBWP] = useState(6500);
  const [availableFrom, setAvailableFrom] = useState('Immediate');
  const [viewingSlots, setViewingSlots] = useState('Wednesdays: 16:30 - 18:00, Saturdays: 10:00 - 13:00');

  const [landlordName, setLandlordName] = useState('');
  const [landlordPhone, setLandlordPhone] = useState('+267 ');
  const [landlordOmang, setLandlordOmang] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPhotoTemplate, setSelectedPhotoTemplate] = useState(0);

  if (!isListPropertyOpen) return null;

  const photoOptions = [
    { label: 'Suburban Sandstone House', img: heroHome },
    { label: 'Executive Modern Villa', img: phakalaneVilla },
    { label: 'Contemporary City Apartment', img: cbdApartment },
    { label: 'Townhouse with Gated Yard', img: block6Townhouse },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !plotNumber.trim() || !landlordName.trim()) return;

    addListing({
      title,
      propertyType,
      district,
      neighborhood,
      plotNumber,
      monthlyRentBWP: Number(monthlyRentBWP) || 5000,
      securityDepositBWP: Number(securityDepositBWP) || Number(monthlyRentBWP) || 5000,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      parkingSpaces: Number(parkingSpaces),
      erfSizeSqm: Number(erfSize),
      bpcMeterType,
      bpcMeterNumber,
      wucWaterStatus,
      hasSolarGeyser,
      hasHighSpeedFibre,
      hasAirConditioning: true,
      security: {
        electricFence,
        motorizedGate,
        alarmSystem,
        perimeterWall,
        securityGuard: false,
      },
      amenities: {
        swimmingPool: false,
        fittedKitchen: true,
        fittedWardrobes: true,
        pavedYard: true,
        petFriendly,
        servantsQuarters: false,
        borehole: wucWaterStatus === 'borehole_backup',
      },
      images: [photoOptions[selectedPhotoTemplate].img, heroHome],
      description: description || `Well-maintained ${bedrooms}-bedroom ${propertyType} located in ${neighborhood}, ${district}. Secure perimeter with automated gate. Prepaid BPC token meter and direct WUC water supply.`,
      nearbyLandmarks: [
        'Close to primary schools and shopping centers',
        'Quick access to public transport / combi route',
      ],
      availableFrom,
      viewingSchedule: viewingSlots.split(',').map(s => s.trim()).filter(Boolean),
      landlord: {
        id: `landlord-${Date.now()}`,
        name: landlordName,
        phone: landlordPhone,
        email: `${landlordName.toLowerCase().replace(/\s+/g, '')}@gmail.bw`,
        verifiedOmang: true,
        memberSince: 'September 2026',
        rating: 5.0,
        responseRatePct: 100,
      },
      isFeatured: true,
    });

    setSuccess(true);
  };

  const handleClose = () => {
    setIsListPropertyOpen(false);
    setSuccess(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0077B6]">
              Homeowner & Landlord Portal
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              List Your Botswana Rental Property
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {!success && (
          <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-600">
            <span className={step === 1 ? 'font-bold text-slate-900' : ''}>1. Location & Plot</span>
            <span>·</span>
            <span className={step === 2 ? 'font-bold text-slate-900' : ''}>2. Specs & Security</span>
            <span>·</span>
            <span className={step === 3 ? 'font-bold text-slate-900' : ''}>3. Utilities & Viewings</span>
            <span>·</span>
            <span className={step === 4 ? 'font-bold text-slate-900' : ''}>4. Pricing & Landlord</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-xl font-bold text-slate-900">
                Property Successfully Published!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your rental at <strong className="text-slate-900">{plotNumber}, {neighborhood}</strong> is now live. Automated viewing appointments with gate pass codes are actively enabled for verified tenants.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left max-w-md mx-auto space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Rent:</span>
                  <span className="font-mono font-bold text-slate-900">P {monthlyRentBWP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Security Pass System:</span>
                  <span className="text-emerald-700 font-semibold">Active (SMS & WhatsApp alerts)</span>
                </div>
              </div>
              <div className="pt-2 flex gap-3 justify-center">
                <button
                  onClick={() => {
                    handleClose();
                    setIsLandlordDashOpen(true);
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Go to Landlord Dashboard
                </button>
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  View on Marketplace
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* STEP 1: Location & Plot */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Property Headline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spacious 3-Bedroom Home with Electric Fence in Phakalane"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Botswana District / Town
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                      >
                        <option value="Gaborone">Gaborone</option>
                        <option value="Tlokweng">Tlokweng</option>
                        <option value="Mogoditshane">Mogoditshane</option>
                        <option value="Francistown">Francistown</option>
                        <option value="Maun">Maun</option>
                        <option value="Palapye">Palapye</option>
                        <option value="Kasane">Kasane</option>
                        <option value="Jwaneng">Jwaneng</option>
                        <option value="Lobatse">Lobatse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Neighborhood / Ward
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Phakalane, Block 6, Village"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Plot Number (Council / Title)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Plot 48291"
                        value={plotNumber}
                        onChange={(e) => setPlotNumber(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                      >
                        <option value="house">Standalone Family House</option>
                        <option value="apartment">Modern City Apartment</option>
                        <option value="townhouse">Townhouse / Gated Complex</option>
                        <option value="villa">Executive Villa with Pool</option>
                        <option value="bachelor_cottage">Bachelor Pad / Cottage</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Next: Specs & Security</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Specs & Security */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        step={0.5}
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Carport</label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={parkingSpaces}
                        onChange={(e) => setParkingSpaces(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Erf (m²)</label>
                      <input
                        type="number"
                        min={50}
                        max={5000}
                        step={50}
                        value={erfSize}
                        onChange={(e) => setErfSize(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Security Features (Botswana Requirements)
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={electricFence}
                          onChange={(e) => setElectricFence(e.target.checked)}
                          className="rounded text-[#00A3E0]"
                        />
                        <span className="font-semibold text-slate-800">Electric Fence</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={motorizedGate}
                          onChange={(e) => setMotorizedGate(e.target.checked)}
                          className="rounded text-[#00A3E0]"
                        />
                        <span className="font-semibold text-slate-800">Motorized Gate</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alarmSystem}
                          onChange={(e) => setAlarmSystem(e.target.checked)}
                          className="rounded text-[#00A3E0]"
                        />
                        <span className="font-semibold text-slate-800">Alarm System</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={perimeterWall}
                          onChange={(e) => setPerimeterWall(e.target.checked)}
                          className="rounded text-[#00A3E0]"
                        />
                        <span className="font-semibold text-slate-800">Perimeter Wall</span>
                      </label>
                    </div>
                  </div>

                  {/* Photo Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Select Architectural Style Photo
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {photoOptions.map((opt, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedPhotoTemplate(i)}
                          className={`cursor-pointer rounded-lg border-2 overflow-hidden relative transition-all ${
                            selectedPhotoTemplate === i ? 'border-[#0077B6] ring-2 ring-[#0077B6]/30' : 'border-slate-200 opacity-70'
                          }`}
                        >
                          <img src={opt.img} alt={opt.label} className="w-full h-16 object-cover" />
                          <div className="p-1 text-[10px] font-bold text-slate-800 bg-white truncate">
                            {opt.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Next: Utilities & Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Utilities & Automated Viewing Schedule */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        BPC Electricity Meter
                      </label>
                      <select
                        value={bpcMeterType}
                        onChange={(e) => setBpcMeterType(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                      >
                        <option value="prepaid_token">Prepaid Token Meter</option>
                        <option value="postpaid">Postpaid Meter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        BPC Meter # (For Handover)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 04-9281-7462-1"
                        value={bpcMeterNumber}
                        onChange={(e) => setBpcMeterNumber(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WUC Water Status
                      </label>
                      <select
                        value={wucWaterStatus}
                        onChange={(e) => setWucWaterStatus(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                      >
                        <option value="metered">WUC Metered (Tenant Pays)</option>
                        <option value="borehole_backup">Borehole Water Backup</option>
                        <option value="included_in_rent">Included in Monthly Rent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Available From
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Immediate or 1st Nov"
                        value={availableFrom}
                        onChange={(e) => setAvailableFrom(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Automated Viewing Windows */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Automated Viewing Hours (Tenants self-book slots)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Wednesdays: 16:30 - 18:00, Saturdays: 10:00 - 13:00"
                      value={viewingSlots}
                      onChange={(e) => setViewingSlots(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      required
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Separate time windows with commas. Gate passes will only be valid during these windows.
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-4 py-2 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Next: Pricing & Contact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Financials & Landlord Details */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Monthly Rent (BWP)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">P</span>
                        <input
                          type="number"
                          min={500}
                          max={80000}
                          step={100}
                          value={monthlyRentBWP}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMonthlyRentBWP(val);
                            setSecurityDepositBWP(val);
                          }}
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Security Deposit (BWP)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">P</span>
                        <input
                          type="number"
                          min={500}
                          max={80000}
                          step={100}
                          value={securityDepositBWP}
                          onChange={(e) => setSecurityDepositBWP(Number(e.target.value))}
                          className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Landlord Full Name (Owner)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rre Mpho Phirinyane"
                      value={landlordName}
                      onChange={(e) => setLandlordName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Botswana Phone (+267)
                      </label>
                      <input
                        type="tel"
                        placeholder="+267 71..."
                        value={landlordPhone}
                        onChange={(e) => setLandlordPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Omang ID Number (Verification)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 581920412"
                        value={landlordOmang}
                        onChange={(e) => setLandlordOmang(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description & Features
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Highlight special features: newly painted, air-conditioned rooms, quiet cul-de-sac, close to school transport..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                      <span>Publish & Enable Automation</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

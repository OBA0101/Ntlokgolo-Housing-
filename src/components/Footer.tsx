import React from 'react';
import { Building2, ShieldCheck, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { useRentals } from '../context/RentalsContext';

export const Footer: React.FC = () => {
  const { setActiveNavTab, setIsListPropertyOpen, setIsLandlordDashOpen } = useRentals();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Ntlokgolo
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              <em className="text-slate-200">"Gae ke gae"</em> — Automated Botswana house rentals & property management platform. Connecting verified landlords and tenants with self-service viewing gate passes, digital screening, and legally binding leases.
            </p>

            <div className="pt-2 text-slate-500 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>CBD, Gaborone, Botswana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+267 390 1200 / +267 71 800 900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@ntlokgolo.co.bw</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
              Tenants & Renters
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveNavTab('browse')} 
                  className="hover:text-white transition-colors"
                >
                  Browse Available Homes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveNavTab('how_it_works')} 
                  className="hover:text-white transition-colors"
                >
                  Instant Gate Pass Viewing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveNavTab('calculator')} 
                  className="hover:text-white transition-colors"
                >
                  Rent-to-Income Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveNavTab('leases')} 
                  className="hover:text-white transition-colors"
                >
                  Botswana Tenancy Agreement
                </button>
              </li>
            </ul>
          </div>

          {/* Landlords */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
              Homeowners & Landlords
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsListPropertyOpen(true)} 
                  className="hover:text-white transition-colors text-[#00A3E0] font-semibold"
                >
                  + List Your Rental House
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsLandlordDashOpen(true)} 
                  className="hover:text-white transition-colors"
                >
                  Landlord Manager Dashboard
                </button>
              </li>
              <li>
                <span className="text-slate-500">Automated Omang Screening</span>
              </li>
              <li>
                <span className="text-slate-500">Deposit Escrow Protection</span>
              </li>
              <li>
                <span className="text-slate-500">BPC Prepaid Meter Handover</span>
              </li>
            </ul>
          </div>

          {/* Botswana Locations */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
              Botswana Locations
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Gaborone (Phakalane, Block 6, CBD)</li>
              <li>Tlokweng & Mogoditshane</li>
              <li>Francistown (Donga, Molapo)</li>
              <li>Maun (Matlapana, Disaneng)</li>
              <li>Palapye, Kasane & Jwaneng</li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Ntlokgolo Rentals (Pty) Ltd. Republic of Botswana. All residential agreements conform to Botswana common law.
          </p>

          <div className="flex items-center gap-4">
            <span>Republic of Botswana Tenancy Standards</span>
            <span aria-hidden="true">·</span>
            <span>Prepaid BPC & WUC Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  Building2, 
  Plus, 
  Bell, 
  Key, 
  UserCheck, 
  Home, 
  Calculator, 
  FileText, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeNavTab, 
    setActiveNavTab, 
    setIsListPropertyOpen, 
    setIsLandlordDashOpen, 
    setIsTenantPortalOpen,
    viewings,
    applications,
    leases,
    notifications,
    setIsNotificationDrawerOpen,
  } = useRentals();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Unsigned leases or pending items
  const pendingLeasesCount = leases.filter(l => !l.isSignedByTenant).length;
  const activeBookingsCount = viewings.filter(v => v.status === 'confirmed').length;
  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Botswana national subtle accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00A3E0] via-white to-[#00A3E0]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* ZONE 1: Brand Wordmark (Single element) */}
          <button 
            onClick={() => { setActiveNavTab('browse'); }} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-[#0077B6] transition-colors">
              <Building2 className="w-5 h-5 text-[#00A3E0]" />
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                Ntlokgolo
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
              </span>
              <span className="text-[11px] text-slate-600 block -mt-1 font-medium tracking-normal">
                Botswana Rentals Automation
              </span>
            </div>
          </button>

          {/* ZONE 2: 4 Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveNavTab('browse')}
              className={`transition-colors hover:text-slate-900 ${
                activeNavTab === 'browse' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              Browse Homes
            </button>
            <button
              onClick={() => setActiveNavTab('how_it_works')}
              className={`transition-colors hover:text-slate-900 ${
                activeNavTab === 'how_it_works' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              How Automation Works
            </button>
            <button
              onClick={() => setActiveNavTab('leases')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                activeNavTab === 'leases' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Digital Lease</span>
              {pendingLeasesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
            <button
              onClick={() => setActiveNavTab('calculator')}
              className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 ${
                activeNavTab === 'calculator' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <Calculator className="w-4 h-4 text-slate-600" />
              <span>Affordability Calculator</span>
            </button>
          </nav>

          {/* ZONE 3: 1-2 Primary Actions & Portals */}
          <div className="flex items-center gap-2.5">
            {/* Automated SMS/WhatsApp Alerts Feed */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label="Automated SMS and WhatsApp notification logs"
              title="Automated notifications log"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00A3E0] ring-2 ring-white" />
              )}
            </button>

            {/* Tenant Portal Button */}
            <button
              onClick={() => setIsTenantPortalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
              title="My Booked Viewings & Applications"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Tenant Pass</span>
              {activeBookingsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-slate-900 text-white rounded text-[10px] font-mono tabular-nums">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Landlord Portal Button */}
            <button
              onClick={() => setIsLandlordDashOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
              title="Landlord Manager & Applications"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Landlords</span>
              {pendingAppsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-white rounded text-[10px] font-mono tabular-nums">
                  {pendingAppsCount}
                </span>
              )}
            </button>

            {/* Primary Action: List Property */}
            <button
              onClick={() => setIsListPropertyOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-[#0077B6] rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Property</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => { setActiveNavTab('browse'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeNavTab === 'browse' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
              }`}
            >
              Browse Rentals
            </button>
            <button
              onClick={() => { setActiveNavTab('how_it_works'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeNavTab === 'how_it_works' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
              }`}
            >
              How Automation Works
            </button>
            <button
              onClick={() => { setActiveNavTab('leases'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeNavTab === 'leases' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
              }`}
            >
              Digital Lease Agreement Generator
            </button>
            <button
              onClick={() => { setActiveNavTab('calculator'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activeNavTab === 'calculator' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600'
              }`}
            >
              Rent Affordability Calculator
            </button>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => { setIsTenantPortalOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg text-center"
              >
                Tenant Pass ({activeBookingsCount})
              </button>
              <button
                onClick={() => { setIsLandlordDashOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg text-center"
              >
                Landlords ({pendingAppsCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

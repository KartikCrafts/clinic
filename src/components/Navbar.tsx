import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, Menu, X, Shield, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (prefillService?: string, prefillDoctor?: string) => void;
  onOpenEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenEmergency }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/95 backdrop-blur-md transition-all duration-200 border-b border-[#E8E6DF]">
      {/* Top Clinical Announcement Bar */}
      <div className="bg-[#173829] text-[#FAF9F5] px-4 py-1.5 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{CLINIC_INFO.status}</span>
            <span className="text-emerald-200/50 hidden sm:inline">•</span>
            <span className="text-emerald-200 hidden sm:inline">{CLINIC_INFO.slotsAvailableToday} open slots left for today</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEmergency}
              className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Emergency 24/7 Triage</span>
            </button>
            <span className="text-emerald-200/50 hidden md:inline">|</span>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden md:flex items-center gap-1.5 text-emerald-100 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#173829] text-[#FAF9F5] flex items-center justify-center font-editorial text-xl font-bold tracking-tight shadow-xs group-hover:bg-[#265B43] transition-colors">
              A
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#173829] block leading-none">
                Aura Dental Studio
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#636C65] font-medium block mt-1">
                Bandra West • Implant & Smile Atelier
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#37443C]">
            <button
              onClick={() => scrollTo('symptom-checker')}
              className="hover:text-[#173829] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Where Does It Hurt?</span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold bg-emerald-100 text-[#173829] rounded">Interactive</span>
            </button>
            <button
              onClick={() => scrollTo('treatments')}
              className="hover:text-[#173829] transition-colors cursor-pointer"
            >
              Treatments & Pricing
            </button>
            <button
              onClick={() => scrollTo('transformations')}
              className="hover:text-[#173829] transition-colors cursor-pointer"
            >
              Smile Results
            </button>
            <button
              onClick={() => scrollTo('specialists')}
              className="hover:text-[#173829] transition-colors cursor-pointer"
            >
              Our Doctors
            </button>
            <button
              onClick={() => scrollTo('comfort-tech')}
              className="hover:text-[#173829] transition-colors cursor-pointer"
            >
              Anxiety-Free Care
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-book-btn"
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-full bg-[#173829] hover:bg-[#265B43] text-[#FAF9F5] text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-2 rounded-full bg-[#173829] text-[#FAF9F5] text-xs font-semibold sm:hidden cursor-pointer"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#173829] hover:bg-[#EAE8DF] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E6DF] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-[#2C3830]">
            <button
              onClick={() => scrollTo('symptom-checker')}
              className="flex items-center justify-between py-2 text-left hover:text-[#173829]"
            >
              <span>Where Does It Hurt? (Symptom Guide)</span>
              <span className="text-xs bg-emerald-100 text-[#173829] px-2 py-0.5 rounded font-semibold">Try</span>
            </button>
            <button
              onClick={() => scrollTo('treatments')}
              className="py-2 text-left hover:text-[#173829]"
            >
              Treatments & Transparent Pricing
            </button>
            <button
              onClick={() => scrollTo('transformations')}
              className="py-2 text-left hover:text-[#173829]"
            >
              Before & After Smile Results
            </button>
            <button
              onClick={() => scrollTo('specialists')}
              className="py-2 text-left hover:text-[#173829]"
            >
              Meet Our Specialists
            </button>
            <button
              onClick={() => scrollTo('comfort-tech')}
              className="py-2 text-left hover:text-[#173829]"
            >
              Anxiety-Free Protocol & Sterilization
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="py-2 text-left text-amber-800 font-semibold"
            >
              24/7 Dental Emergency Protocol
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8E6DF] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-[#173829] text-[#FAF9F5] font-semibold text-center text-sm shadow-sm"
            >
              Book an Appointment (Live Slots)
            </button>
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 rounded-xl border border-[#D5D2C8] text-[#173829] font-medium text-center text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

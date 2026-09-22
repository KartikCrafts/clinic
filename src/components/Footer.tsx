import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenEmergency }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#10241B] text-[#FAF9F5] border-t border-[#1C3D2E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#23503B] text-white flex items-center justify-center font-editorial text-xl font-bold">
                A
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight block">
                  Aura Dental Studio
                </span>
                <span className="text-[11px] text-emerald-300 tracking-wider uppercase block">
                  Implant & Facial Aesthetics Atelier
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Dentistry practiced with unhurried care, computerized painless anesthesia, and complete pricing transparency. Located in the heart of Bandra West, Mumbai.
            </p>

            <div className="pt-2 text-xs text-emerald-200/90 space-y-1">
              <p>Dental Council of India Registration: <span className="text-white font-medium">MH-DCI-9042</span></p>
              <p>Biomedical Waste Certification: <span className="text-white font-medium">MPCB/2024/091</span></p>
            </div>
          </div>

          {/* Timings & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-editorial text-base font-bold text-white tracking-wide">
              Studio Timings & Location
            </h4>

            <div className="space-y-2 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Mon – Sat: 9:00 AM – 8:00 PM</span>
                  <span>Sun: 10:00 AM – 2:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {CLINIC_INFO.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Direct Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-editorial text-base font-bold text-white tracking-wide">
              Patient Care
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Book Instant Slot
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-amber-300 hover:text-amber-200 font-semibold cursor-pointer text-left"
                >
                  Emergency Triage Line
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  0% Interest EMI Plans
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Sterilization Reports
                </span>
              </li>
            </ul>
          </div>

          {/* Direct Contact & CTA (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-editorial text-base font-bold text-white tracking-wide">
              Direct Inquiries
            </h4>

            <div className="space-y-2 text-xs text-emerald-100/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  Reception: {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0F261C] font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© {new Date().getFullYear()} Aura Dental Studio. All rights reserved. Made for thoughtful clinical practice.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Calendar, Stethoscope, ShieldCheck, CheckCircle2, Star, ArrowRight, Clock, Award, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: (prefillService?: string, prefillDoctor?: string) => void;
  onExploreSymptoms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreSymptoms }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E7EFEA]/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#F1EDE2]/80 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Clinical Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E7EFEA] border border-[#CCDCD2] text-[#173829] text-xs sm:text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bandra West Dental Atelier • Booking Today & This Week</span>
              <span className="text-[#173829]/30">|</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                4.9 Google ({CLINIC_INFO.reviewsCount})
              </span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#173829] leading-[1.12]">
                Dentistry practiced with unhurried care, gentle hands, and zero guilt.
              </h1>
              <p className="text-base sm:text-lg text-[#47544C] max-w-2xl leading-relaxed">
                We replaced cold metal clinical rooms with sensory-calm suites, computerized painless anesthesia, and digital 3D scans. Whether it’s an urgent toothache, an invisible aligner journey, or routine biological cleaning—we promise to never rush you.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                id="hero-book-consult-btn"
                onClick={() => onOpenBooking()}
                className="px-7 py-4 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span>Book Instant Consultation</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-symptoms-btn"
                onClick={onExploreSymptoms}
                className="px-6 py-4 rounded-xl bg-[#F0EEE6] hover:bg-[#E6E3D8] text-[#173829] font-medium text-base border border-[#DCD9CE] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-5 h-5 text-[#2A5E43]" />
                <span>Where does it hurt? (Symptom Guide)</span>
              </button>
            </div>

            {/* Key Quality Pillars (No AI slop metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E8E6DF]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#265B43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#173829]">Computer-Guided Numbing</h4>
                  <p className="text-xs text-[#5C6760]">The Wand eliminates traditional sharp needle sting.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#265B43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#173829]">Zero-Gag 3D Scans</h4>
                  <p className="text-xs text-[#5C6760]">No messy putty impressions; full iTero digital render.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#265B43] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#173829]">Transparent Quotations</h4>
                  <p className="text-xs text-[#5C6760]">All costs agreed upfront with 0% interest EMI options.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Studio Vignette & Quick Appointment Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCD8CC] bg-white shadow-md">
              {/* Studio photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                  alt="Aura Dental Studio calm clinical lounge"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Aura Suite No. 1</span>
                  <p className="text-sm font-medium text-white/95">Ceiling screens, noise-canceling audio & natural sunlight</p>
                </div>
              </div>

              {/* Instant Slot Ticker & Next Availability Card */}
              <div className="p-5 space-y-4 bg-[#FAF9F5]">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
                  <div>
                    <span className="text-xs font-semibold text-[#68736B] uppercase tracking-wide">Next Available Slot</span>
                    <p className="text-base font-bold text-[#173829] flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-[#265B43]" />
                      Today at 4:30 PM & 6:15 PM
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    Same-day Open
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-[#4C5750] flex items-center justify-between">
                    <span>Attending Dental Specialist:</span>
                    <span className="font-semibold text-[#173829]">Dr. Rohan Varma (MDS)</span>
                  </div>
                  <div className="text-xs text-[#4C5750] flex items-center justify-between">
                    <span>Clinical Consultation Fee:</span>
                    <span className="font-semibold text-[#173829]">₹500 (Free with treatment)</span>
                  </div>
                  <div className="text-xs text-[#4C5750] flex items-center justify-between">
                    <span>Sterilization Standard:</span>
                    <span className="font-semibold text-[#173829]">Class-B Vacuum Autoclave</span>
                  </div>
                </div>

                <button
                  id="hero-reserve-slot-btn"
                  onClick={() => onOpenBooking('Comprehensive Exam & Ultrasonic Scaling', 'Dr. Rohan Varma')}
                  className="w-full py-3 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Claim Next Open Slot (4:30 PM)</span>
                </button>
              </div>
            </div>

            {/* Floating Reassurance Pill */}
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-white p-3 rounded-xl border border-[#D5D2C8] shadow-lg max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#E7EFEA] text-[#173829] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#173829]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#173829]">Zero Dental Shame</p>
                <p className="text-[11px] text-[#5C6760] leading-tight">Haven’t seen a dentist in 5 years? We welcome you warmly.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

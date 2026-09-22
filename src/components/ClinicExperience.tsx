import React from 'react';
import { ShieldCheck, Tv, Sparkles, HeartHandshake, Eye, CheckCircle } from 'lucide-react';
import { STERILIZATION_STANDARDS } from '../data/clinicData';

export const ClinicExperience: React.FC = () => {
  const comfortFeatures = [
    {
      icon: Tv,
      title: 'Ceiling Entertainment Screens',
      desc: 'Watch your favorite series on Netflix or listen to calming soundscapes with active noise-canceling headphones while you lean back.',
    },
    {
      icon: HeartHandshake,
      title: 'Computerized Wand Numbing',
      desc: 'Our microprocessor-controlled anesthesia flows at the exact tissue absorption rate, eliminating the painful burning pinch of traditional syringes.',
    },
    {
      icon: Eye,
      title: '100% Photographic Transparency',
      desc: 'High-definition intraoral cameras project your teeth onto an iPad screen so you understand exactly what requires treatment and why.',
    },
    {
      icon: Sparkles,
      title: 'Sensory-Calm Clinic Atmosphere',
      desc: 'No pungent medicinal odors. We diffuse organic lavender and eucalyptus, paired with warm moist towels to reset after your procedure.',
    },
  ];

  return (
    <section id="comfort-tech" className="py-16 sm:py-24 bg-[#F5F2EB]/50 border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-[#265B43]" />
            <span>Patient Well-being First</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
            Designed to Dissolve Dental Anxiety
          </h2>
          <p className="text-base sm:text-lg text-[#525E56]">
            Over 60% of people delay dental visits because of past traumatic experiences. We engineered every single touchpoint to feel calm, gentle, and dignified.
          </p>
        </div>

        {/* Sensory Comfort Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {comfortFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D5CFBF] p-6 space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#173829] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#265B43]" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-[#173829]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#525E56] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sterilization & Infection Control Panel */}
        <div className="bg-[#173829] text-[#FAF9F5] rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Hospital-Grade Infection Control
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Our 5-Stage Zero-Cross-Contamination Protocol
              </h3>
              <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl">
                Every single instrument pouch bears a chemical indicator strip that changes color inside our Class-B European Autoclave at 134°C. We break the sterile seal in front of your eyes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {STERILIZATION_STANDARDS.map((std, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#234837]/60 border border-emerald-500/20 space-y-2"
                >
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-200">
                    {std.tag}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-white">
                    {std.title}
                  </h4>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

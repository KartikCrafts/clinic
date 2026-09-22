import React, { useState } from 'react';
import { Check, ShieldCheck, Clock, Calendar, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';
import { Treatment } from '../types';

interface ServicesPricingProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({ onSelectTreatment }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDetailTreatment, setSelectedDetailTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: 'All Procedures' },
    { id: 'preventive', label: 'Preventive & Root Canal' },
    { id: 'ortho', label: 'Clear Aligners' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'cosmetic', label: 'Veneers & Whitening' },
    { id: 'pediatric', label: 'Kids Dentistry' },
  ];

  const filteredTreatments = activeCategory === 'all'
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category === activeCategory);

  return (
    <section id="treatments" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-[#265B43]" />
            <span>Honest Clinical Pricing</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
            Transparent Treatments & Costs
          </h2>
          <p className="text-base sm:text-lg text-[#525E56]">
            No surprise add-ons in the billing room. We provide itemized treatment plans before picking up any instrument.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#173829] text-[#FAF9F5] border-[#173829] shadow-xs'
                  : 'bg-white hover:bg-[#F2EFE8] text-[#3D4B41] border-[#DDD8CB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-[#D5CFBF] hover:border-[#173829]/60 transition-all p-6 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Header tag */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#E8EFEA] text-[#173829]">
                    {treatment.category}
                  </span>
                  {treatment.warranty && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {treatment.warranty.split(' ')[0]} Warranty
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#173829] leading-snug">
                    {treatment.name}
                  </h3>
                  <p className="text-xs text-[#59665E] mt-1.5 line-clamp-2">
                    {treatment.shortDesc}
                  </p>
                </div>

                {/* Practical Clinical Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E9E5DB]">
                    <span className="text-[10px] uppercase font-bold text-[#707D75] block">Duration</span>
                    <span className="font-semibold text-[#173829]">{treatment.duration}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF9F5] border border-[#E9E5DB]">
                    <span className="text-[10px] uppercase font-bold text-[#707D75] block">Sittings</span>
                    <span className="font-semibold text-[#173829]">{treatment.sittings}</span>
                  </div>
                </div>

                {/* Pain Management Tag */}
                <div className="text-xs flex items-center gap-1.5 text-[#37453C] bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-medium">Comfort: {treatment.painLevel}</span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-1.5 pt-1">
                  {treatment.benefits.map((b, idx) => (
                    <li key={idx} className="text-xs text-[#435147] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#265B43] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Price & Booking Button */}
              <div className="pt-6 mt-6 border-t border-[#EAE6DD] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D7A72] block">Starting At</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-editorial text-xl font-bold text-[#173829]">
                      {treatment.priceStartingAt}
                    </span>
                  </div>
                  {treatment.priceNote && (
                    <span className="text-[10px] text-[#6E7B73] block leading-tight">
                      {treatment.priceNote}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectTreatment(treatment.name)}
                  className="px-4 py-2.5 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance & EMI Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E8EFEA]/70 border border-[#CCD9D0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-editorial text-lg font-bold text-[#173829]">
              0% Interest Flexible Monthly EMI & Dental Insurance Support
            </h4>
            <p className="text-xs sm:text-sm text-[#48564D]">
              We accept all corporate dental insurance reimbursements and provide cashless 3 to 12-month zero-interest EMIs via Bajaj Finserv and major credit cards.
            </p>
          </div>
          <button
            onClick={() => onSelectTreatment('Comprehensive Exam & Ultrasonic Scaling')}
            className="px-5 py-2.5 rounded-xl bg-[#173829] text-white text-xs font-semibold shrink-0 cursor-pointer hover:bg-[#265B43]"
          >
            Check EMI Eligibility
          </button>
        </div>

      </div>
    </section>
  );
};

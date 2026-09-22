import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { REVIEWS, CLINIC_INFO } from '../data/clinicData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Verified Patient Stories</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
              Words From Our Patients
            </h2>
            <p className="text-base sm:text-lg text-[#525E56]">
              Real feedback from individuals who used to dread the dentist's chair.
            </p>
          </div>

          {/* Rating aggregate badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#DDD8CB] shadow-xs flex items-center gap-4">
            <div className="text-center border-r border-[#E8E4D9] pr-4">
              <span className="font-editorial text-3xl font-bold text-[#173829] block">
                {CLINIC_INFO.googleRating}
              </span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs text-[#55635B]">
              <span className="font-bold text-[#173829] block">Google Verified Rating</span>
              <span>Based on {CLINIC_INFO.reviewsCount} independent patient reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#D5CFBF] p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#78857C]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#46544B] leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between">
                <div>
                  <h4 className="font-editorial text-sm font-bold text-[#173829]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[#717E76]">{rev.location}</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {rev.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

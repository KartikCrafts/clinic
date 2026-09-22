import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info, Stethoscope, ArrowRight, HelpCircle, HeartPulse, ChevronRight } from 'lucide-react';
import { DENTAL_ZONES } from '../data/clinicData';

interface SymptomCheckerProps {
  onBookWithSymptom: (symptomName: string, recommendedService: string) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBookWithSymptom }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(DENTAL_ZONES[1].id); // default to Back Molars (most common)
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number>(0);

  const activeZone = DENTAL_ZONES.find((z) => z.id === selectedZoneId) || DENTAL_ZONES[0];
  const activeIssue = activeZone.commonIssues[selectedIssueIndex] || activeZone.commonIssues[0];

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setSelectedIssueIndex(0);
  };

  const getUrgencyBadge = (urgency: 'Low' | 'Moderate' | 'Urgent') => {
    switch (urgency) {
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Urgent • Needs Same-Day Clinical Care
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Moderate • Schedule within 24-48 hours
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-medium border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Non-Emergency • Routine Clinic Review
          </span>
        );
    }
  };

  return (
    <section id="symptom-checker" className="py-16 sm:py-20 bg-[#F5F2EB]/60 border-y border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
            <Stethoscope className="w-3.5 h-3.5 text-[#265B43]" />
            <span>Interactive Dental Triage</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
            Where does it hurt?
          </h2>
          <p className="text-base sm:text-lg text-[#525E56]">
            Select where you are experiencing pain, sensitivity, or discomfort. Get immediate home-relief steps and find out if it requires emergency intervention.
          </p>
        </div>

        {/* Interactive Zone Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {DENTAL_ZONES.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => handleZoneSelect(zone.id)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#173829] text-[#FAF9F5] border-[#173829] shadow-sm'
                    : 'bg-white hover:bg-[#FAF9F5] text-[#27322B] border-[#DCD7CA]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-300' : 'text-[#637067]'}`}>
                    Zone
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                </div>
                <h3 className="font-editorial text-base sm:text-lg font-bold leading-snug">
                  {zone.name.split(' (')[0]}
                </h3>
                <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-emerald-100/80' : 'text-[#65736A]'}`}>
                  {zone.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Zone Detail Interface */}
        <div className="bg-white rounded-2xl border border-[#D5CFBF] shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Specific Symptoms in this zone */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667269] block">
                1. Select the exact symptom you feel:
              </span>
              <div className="space-y-2">
                {activeZone.commonIssues.map((issue, idx) => {
                  const isActive = idx === selectedIssueIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedIssueIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isActive
                          ? 'border-[#173829] bg-[#F1F6F3] text-[#173829] shadow-xs'
                          : 'border-[#E6E1D4] hover:border-[#C4BEAF] text-[#334037] bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className={`text-sm font-semibold leading-snug ${isActive ? 'text-[#173829]' : 'text-[#2D3A32]'}`}>
                          {issue.symptom}
                        </p>
                        <span className={`text-xs block ${isActive ? 'text-[#265B43] font-medium' : 'text-[#6A786F]'}`}>
                          Likely cause: {issue.likelyCause}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${isActive ? 'text-[#173829] translate-x-1' : 'text-[#9AA69F]'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 text-xs text-[#6F7D74] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#265B43] shrink-0" />
                <span>Need immediate guidance right away? Call our emergency triage team anytime.</span>
              </div>
            </div>

            {/* Right Column: Clinical Assessment & Immediate Action */}
            <div className="lg:col-span-7 bg-[#FAF9F5] rounded-xl border border-[#E3DDCF] p-6 sm:p-7 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[#667269] uppercase tracking-wide">
                      Clinical Assessment
                    </span>
                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#173829] mt-0.5">
                      {activeIssue.likelyCause}
                    </h4>
                  </div>
                  <div>
                    {getUrgencyBadge(activeIssue.urgency)}
                  </div>
                </div>

                {/* Immediate Home Tip */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <HeartPulse className="w-4 h-4 text-amber-700" />
                    <span>What you should do right now at home:</span>
                  </div>
                  <p className="text-sm text-amber-950 leading-relaxed font-medium">
                    {activeIssue.immediateHomeTip}
                  </p>
                </div>

                {/* Recommended Clinic Treatment */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#667269] block">
                    Definitive Dental Solution:
                  </span>
                  <div className="p-4 rounded-xl bg-white border border-[#DDD7C9] flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#265B43] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#173829]">
                        {activeIssue.recommendedTreatment}
                      </p>
                      <p className="text-xs text-[#5E6B62] mt-0.5">
                        Performed under gentle local numbing. Most patients resume regular work immediately after.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action: Book with this symptom pre-selected */}
              <div className="pt-4 border-t border-[#E3DDCF] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-[#5C6760]">
                  <span>Slots open today at Bandra Studio</span>
                </div>
                <button
                  onClick={() => onBookWithSymptom(activeIssue.symptom, activeIssue.recommendedTreatment)}
                  className="px-6 py-3 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Visit for this Issue</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

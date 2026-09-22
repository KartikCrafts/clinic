import React from 'react';
import { Phone, AlertTriangle, Clock, MapPin, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface EmergencyBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookUrgent: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  isOpen,
  onClose,
  onBookUrgent,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#D5CFBF] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E7B73] hover:text-[#173829] hover:bg-[#EBE7DC] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>24/7 Acute Dental Emergency Triage</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173829]">
            Urgent Dental Relief & Protocol
          </h3>
          <p className="text-xs sm:text-sm text-[#525E56]">
            Dental pain cannot wait. We maintain priority emergency slots every single day.
          </p>
        </div>

        {/* Call Now Action Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
              Emergency Direct Line
            </span>
            <span className="font-editorial text-xl sm:text-2xl font-bold text-rose-950">
              {CLINIC_INFO.emergencyPhone}
            </span>
            <p className="text-xs text-rose-700 mt-0.5">
              Doctor on call responds immediately for severe pain, trauma, or swelling.
            </p>
          </div>
          <a
            href={`tel:${CLINIC_INFO.emergencyPhone.replace(/\s+/g, '')}`}
            className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call Doctor On-Call</span>
          </a>
        </div>

        {/* Immediate First-Aid Steps */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#637067]">
            What to do in the next 15 minutes:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#DDD7C9] space-y-1">
              <span className="text-[11px] font-bold text-rose-800 block">1. Knocked-Out Tooth</span>
              <p className="text-xs text-[#445147] leading-relaxed">
                Hold only by the white crown. Do NOT scrub the root. Keep submerged in cold milk or saliva and reach us within 60 mins.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDD7C9] space-y-1">
              <span className="text-[11px] font-bold text-amber-800 block">2. Throbbing Night Pain</span>
              <p className="text-xs text-[#445147] leading-relaxed">
                Keep your head propped high on 2-3 pillows to reduce blood pressure to the pulp. Take Ibuprofen with food. Never put aspirin directly on gums.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDD7C9] space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 block">3. Facial Swelling</span>
              <p className="text-xs text-[#445147] leading-relaxed">
                Apply a cold ice pack to the cheek outside for 15 mins on/off. Rinse with warm salt water gently. Do not heat the cheek.
              </p>
            </div>
          </div>
        </div>

        {/* Clinic Location & Action */}
        <div className="pt-4 border-t border-[#EAE6DD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5C6961]">
            <MapPin className="w-4 h-4 text-[#265B43] shrink-0" />
            <span>{CLINIC_INFO.address}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookUrgent();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#173829] hover:bg-[#23503B] text-white text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Emergency Walk-In Slot</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

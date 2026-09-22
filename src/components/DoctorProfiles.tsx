import React, { useState } from 'react';
import { Award, GraduationCap, Calendar, CheckCircle2, UserCheck, Clock } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';

interface DoctorProfilesProps {
  onBookWithDoctor: (doctorName: string) => void;
}

const DoctorCard: React.FC<{
  doctor: (typeof DOCTORS)[0];
  onBookWithDoctor: (doctorName: string) => void;
}> = ({ doctor, onBookWithDoctor }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      key={doctor.id}
      className="bg-white rounded-2xl border border-[#D5CFBF] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Doctor Portrait */}
        <div className="relative h-64 w-full overflow-hidden bg-[#ECE8DF]">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-[#E8E4DA] animate-pulse flex items-center justify-center z-0">
              <span className="text-xs text-[#7E8B83] font-medium tracking-wide">Loading portrait...</span>
            </div>
          )}

          <img
            src={doctor.image}
            alt={doctor.name}
            loading="eager"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            className={`w-full h-full object-cover object-top hover:scale-102 transition-all duration-500 relative z-1 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-[#173829]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs z-10">
            {doctor.experience}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#265B43]">
              {doctor.role}
            </span>
            <h3 className="font-editorial text-xl font-bold text-[#173829] mt-0.5">
              {doctor.name}
            </h3>
            
            {/* Qualification */}
            <div className="flex items-start gap-1.5 mt-2 text-xs text-[#525E56]">
              <GraduationCap className="w-4 h-4 text-[#265B43] shrink-0 mt-0.5" />
              <span className="font-medium">{doctor.qualification}</span>
            </div>
          </div>

          <p className="text-xs text-[#525F56] leading-relaxed">
            {doctor.bio}
          </p>

          {/* Specialties */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#738077] block">
              Core Expertise:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.specialties.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] bg-[#FAF9F5] border border-[#E4E0D5] text-[#364239]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Available Days */}
          <div className="pt-2 text-xs text-[#5A685F] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#265B43]" />
            <span>In-Clinic: {doctor.availableDays.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0">
        <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between">
          <span className="text-[10px] text-[#7E8B83]">Reg: {doctor.registrationNo}</span>
          <button
            onClick={() => onBookWithDoctor(doctor.name)}
            className="px-4 py-2 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
            <span>Book with {doctor.name.split(' ')[1]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const DoctorProfiles: React.FC<DoctorProfilesProps> = ({ onBookWithDoctor }) => {
  return (
    <section id="specialists" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
            <UserCheck className="w-3.5 h-3.5 text-[#265B43]" />
            <span>Dedicated Resident Faculty</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
            Consult With Our Specialist Dentists
          </h2>
          <p className="text-base sm:text-lg text-[#525E56]">
            Every treatment is personally led by board-certified post-graduate specialists (MDS)—not rotating, inexperienced interns.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOCTORS.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookWithDoctor={onBookWithDoctor}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

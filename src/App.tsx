import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SymptomChecker } from './components/SymptomChecker';
import { SmileTransformationSlider } from './components/SmileTransformationSlider';
import { ServicesPricing } from './components/ServicesPricing';
import { DoctorProfiles } from './components/DoctorProfiles';
import { ClinicExperience } from './components/ClinicExperience';
import { ReviewsSection } from './components/ReviewsSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import { Calendar, PhoneCall, AlertTriangle } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [bookingServicePrefill, setBookingServicePrefill] = useState<string | undefined>(undefined);
  const [bookingDoctorPrefill, setBookingDoctorPrefill] = useState<string | undefined>(undefined);

  const handleOpenBooking = (service?: string, doctor?: string) => {
    setBookingServicePrefill(service);
    setBookingDoctorPrefill(doctor);
    setBookingModalOpen(true);
  };

  const handleSymptomBook = (symptom: string, recommendedService: string) => {
    setBookingServicePrefill(recommendedService);
    setBookingModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E2621] flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onExploreSymptoms={() => scrollToSection('symptom-checker')}
        />

        {/* Interactive Symptom Checker & Arch Diagnostic */}
        <SymptomChecker onBookWithSymptom={handleSymptomBook} />

        {/* Interactive Before & After Smile Transformations Slider */}
        <SmileTransformationSlider onConsultTransformation={(t) => handleOpenBooking(t)} />

        {/* Transparent Treatments & Pricing Guide */}
        <ServicesPricing onSelectTreatment={(t) => handleOpenBooking(t)} />

        {/* Specialists & Resident Doctors */}
        <DoctorProfiles onBookWithDoctor={(doc) => handleOpenBooking(undefined, doc)} />

        {/* Anxiety-Free Philosophy & Class-B Sterilization */}
        <ClinicExperience />

        {/* Real Patient Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

      {/* Modals */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefillService={bookingServicePrefill}
        prefillDoctor={bookingDoctorPrefill}
      />

      <EmergencyBanner
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onBookUrgent={() => {
          setEmergencyModalOpen(false);
          handleOpenBooking('Tooth Pain / Emergency Root Canal');
        }}
      />

      {/* Floating Action Button for Mobile / Quick Booking */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="p-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg cursor-pointer transition-all hover:scale-105"
          title="Emergency Dental Care"
          aria-label="Emergency Dental Helpline"
        >
          <PhoneCall className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleOpenBooking()}
          className="px-5 py-3.5 rounded-full bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] font-semibold text-xs sm:text-sm shadow-xl transition-all hover:scale-102 flex items-center gap-2 cursor-pointer border border-emerald-700/40"
        >
          <Calendar className="w-4 h-4 text-emerald-300" />
          <span>Book Consultation</span>
        </button>
      </div>
    </div>
  );
}

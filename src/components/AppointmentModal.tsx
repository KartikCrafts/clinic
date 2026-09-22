import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck, Heart, MapPin, ExternalLink } from 'lucide-react';
import { DOCTORS, TREATMENTS, CLINIC_INFO } from '../data/clinicData';
import { AppointmentData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillDoctor?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefillService,
  prefillDoctor,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(prefillService || TREATMENTS[0].name);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(prefillDoctor || 'Any Specialist (Earliest Slot)');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedSlot, setSelectedSlot] = useState<string>('04:30 PM');
  
  // Patient details state
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [anxietyLevel, setAnxietyLevel] = useState<'None' | 'A bit nervous' | 'Severe dental anxiety (gentle pace needed)'>('A bit nervous');
  const [notes, setNotes] = useState<string>('');

  // Confirmed appointment state
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentData | null>(null);

  // Sync prefills
  useEffect(() => {
    if (prefillService) setSelectedService(prefillService);
    if (prefillDoctor) setSelectedDoctor(prefillDoctor);
  }, [prefillService, prefillDoctor]);

  if (!isOpen) return null;

  const quickDates = [
    { label: 'Today', dateStr: 'Today, 22 Sep', day: 'Today' },
    { label: 'Tomorrow', dateStr: 'Tomorrow, 23 Sep', day: 'Tomorrow' },
    { label: 'Thursday', dateStr: 'Thu, 24 Sep', day: 'Thursday' },
    { label: 'Friday', dateStr: 'Fri, 25 Sep', day: 'Friday' },
    { label: 'Saturday', dateStr: 'Sat, 26 Sep', day: 'Saturday' },
  ];

  const slots = [
    { time: '10:00 AM', period: 'Morning', available: true },
    { time: '11:30 AM', period: 'Morning', available: true },
    { time: '02:30 PM', period: 'Afternoon', available: true },
    { time: '04:30 PM', period: 'Afternoon', available: true },
    { time: '06:00 PM', period: 'Evening', available: true },
    { time: '07:15 PM', period: 'Evening', available: true },
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      alert('Please enter your name and phone number so we can confirm your slot.');
      return;
    }

    const bookingId = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentData = {
      id: bookingId,
      patientName,
      phone,
      email,
      serviceId: selectedService,
      serviceName: selectedService,
      doctorId: selectedDoctor,
      doctorName: selectedDoctor,
      date: selectedDate,
      timeSlot: selectedSlot,
      anxietyLevel,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for user session recall
    try {
      const existing = JSON.parse(localStorage.getItem('aura_appointments') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('aura_appointments', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local storage write skipped', err);
    }

    setConfirmedBooking(newBooking);
    setStep(4); // Confirmation step
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Dental Appointment: ${confirmedBooking.serviceName} at Aura Dental Studio`);
    const details = encodeURIComponent(`Appointment with ${confirmedBooking.doctorName}.\nBooking ID: ${confirmedBooking.id}\nPhone: ${CLINIC_INFO.phone}\nAddress: ${CLINIC_INFO.address}`);
    const location = encodeURIComponent(CLINIC_INFO.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF9F5] rounded-3xl border border-[#D5CFBF] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E7B73] hover:text-[#173829] hover:bg-[#EBE7DC] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator (when not completed) */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#66746B] mb-2">
              <span>Step {step} of 3: {step === 1 ? 'Service & Specialist' : step === 2 ? 'Date & Time Slot' : 'Your Contact Details'}</span>
              <span>{step === 1 ? '33%' : step === 2 ? '66%' : '90%'} Complete</span>
            </div>
            <div className="w-full h-1.5 bg-[#E6E1D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#173829] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: Select Service & Doctor */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173829]">
                Choose Treatment or Concern
              </h3>
              <p className="text-xs sm:text-sm text-[#525E56] mt-1">
                Select your primary reason for visiting. Don't worry if you are unsure; our dentists examine thoroughly first.
              </p>
            </div>

            {/* Service selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block">
                Primary Treatment / Procedure:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {TREATMENTS.map((t) => {
                  const isSelected = selectedService === t.name;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedService(t.name)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'border-[#173829] bg-[#E8EFEA] text-[#173829] font-bold shadow-xs'
                          : 'border-[#DDD7C9] bg-white text-[#35433A] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold block">{t.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#173829] shrink-0 ml-1" />}
                      </div>
                      <span className="text-[11px] text-[#69766E] font-normal block mt-0.5">
                        Starts {t.priceStartingAt} • {t.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doctor selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block">
                Preferred Dental Specialist:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor('Any Specialist (Earliest Slot)')}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                    selectedDoctor === 'Any Specialist (Earliest Slot)'
                      ? 'border-[#173829] bg-[#E8EFEA] text-[#173829] font-bold shadow-xs'
                      : 'border-[#DDD7C9] bg-white text-[#35433A] hover:bg-[#FAF9F5]'
                  }`}
                >
                  <span className="font-semibold block">Earliest Available Specialist</span>
                  <span className="text-[11px] text-[#69766E] block mt-0.5">Fastest booking match</span>
                </button>
                {DOCTORS.map((d) => {
                  const isSelected = selectedDoctor === d.name;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDoctor(d.name)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'border-[#173829] bg-[#E8EFEA] text-[#173829] font-bold shadow-xs'
                          : 'border-[#DDD7C9] bg-white text-[#35433A] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <span className="font-semibold block">{d.name}</span>
                      <span className="text-[11px] text-[#69766E] block mt-0.5">{d.role.split('&')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE6DD] flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-[#173829] hover:bg-[#23503B] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Select Date & Slot</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Date & Time Slot */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173829]">
                Choose Appointment Slot
              </h3>
              <p className="text-xs sm:text-sm text-[#525E56] mt-1">
                We never double-book appointments. Your reserved time slot is 100% dedicated to you.
              </p>
            </div>

            {/* Quick Date Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block">
                Select Date:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {quickDates.map((d) => {
                  const isSelected = selectedDate === d.day;
                  return (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => setSelectedDate(d.day)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'border-[#173829] bg-[#173829] text-[#FAF9F5] font-bold shadow-sm'
                          : 'border-[#DDD7C9] bg-white text-[#35433A] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <span className="block font-bold">{d.label}</span>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-[#728076]'}`}>
                        {d.dateStr.split(', ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block">
                Available Time Slots for {selectedDate}:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {slots.map((s) => {
                  const isSelected = selectedSlot === s.time;
                  return (
                    <button
                      key={s.time}
                      type="button"
                      onClick={() => setSelectedSlot(s.time)}
                      className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#173829] bg-[#E8EFEA] text-[#173829] font-bold shadow-xs'
                          : 'border-[#DDD7C9] bg-white text-[#35433A] hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <span className="font-editorial text-base font-bold block">{s.time}</span>
                      <span className="text-[10px] uppercase font-semibold text-[#66746B] block">
                        {s.period} Slot • Available
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Dedicated 45-minute consultation & digital scan reserved exclusively for you.</span>
            </div>

            <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-[#DDD7C9] text-xs font-semibold text-[#445248] hover:bg-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-[#173829] hover:bg-[#23503B] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Details & Anxiety Profile */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className="space-y-5">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173829]">
                Patient Details & Comfort Notes
              </h3>
              <p className="text-xs sm:text-sm text-[#525E56] mt-1">
                We use your phone number exclusively to send WhatsApp appointment confirmation and clinic directions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A867E] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Kartik Pandya"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDD7C9] bg-white text-sm text-[#173829] focus:outline-hidden focus:border-[#173829]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7A867E] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDD7C9] bg-white text-sm text-[#173829] focus:outline-hidden focus:border-[#173829]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7A867E] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DDD7C9] bg-white text-sm text-[#173829] focus:outline-hidden focus:border-[#173829]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block mb-1">
                  Patient Status:
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFirstVisit(true)}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border cursor-pointer ${
                      isFirstVisit
                        ? 'bg-[#173829] text-white border-[#173829]'
                        : 'bg-white text-[#4A574E] border-[#DDD7C9]'
                    }`}
                  >
                    First-Time Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFirstVisit(false)}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border cursor-pointer ${
                      !isFirstVisit
                        ? 'bg-[#173829] text-white border-[#173829]'
                        : 'bg-white text-[#4A574E] border-[#DDD7C9]'
                    }`}
                  >
                    Existing Patient
                  </button>
                </div>
              </div>
            </div>

            {/* Dental Anxiety Compassion Selection */}
            <div className="p-4 rounded-xl bg-[#FAF6ED] border border-[#E4DEC9] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#173829] uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Dental Anxiety & Comfort Level:</span>
              </div>
              <p className="text-xs text-[#5D6B61]">
                Let our clinical team know so we can adjust our pace and explanation style:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {(['None', 'A bit nervous', 'Severe dental anxiety (gentle pace needed)'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setAnxietyLevel(level)}
                    className={`p-2.5 rounded-lg text-xs font-medium text-left border cursor-pointer ${
                      anxietyLevel === level
                        ? 'border-[#173829] bg-[#E8EFEA] text-[#173829] font-bold'
                        : 'border-[#DDD7C9] bg-white text-[#526056]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#637067] block mb-1">
                Any specific notes or questions for the doctor? (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sensitivity on upper left tooth, preference for ceiling headphones, etc."
                className="w-full p-3 rounded-xl border border-[#DDD7C9] bg-white text-xs text-[#173829] focus:outline-hidden focus:border-[#173829]"
              />
            </div>

            <div className="pt-4 border-t border-[#EAE6DD] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-[#DDD7C9] text-xs font-semibold text-[#445248] hover:bg-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl bg-[#173829] hover:bg-[#23503B] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Confirm & Reserve My Slot</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Booking Confirmation Slip */}
        {step === 4 && confirmedBooking && (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 text-emerald-700" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
                Appointment Confirmed
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173829] pt-2">
                We'll see you, {confirmedBooking.patientName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#525E56]">
                Your booking slip has been generated and a confirmation text sent to {confirmedBooking.phone}.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-white rounded-2xl border border-[#D5CFBF] p-5 sm:p-6 text-left space-y-3.5 shadow-xs max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DD]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#738077]">Booking Ref ID</span>
                  <p className="font-editorial text-lg font-bold text-[#173829]">{confirmedBooking.id}</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Confirmed Slot
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#738077] block">Service</span>
                  <span className="font-semibold text-[#173829]">{confirmedBooking.serviceName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#738077] block">Specialist</span>
                  <span className="font-semibold text-[#173829]">{confirmedBooking.doctorName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#738077] block">Date</span>
                  <span className="font-semibold text-[#173829]">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#738077] block">Reserved Time</span>
                  <span className="font-semibold text-[#173829]">{confirmedBooking.timeSlot}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE6DD] text-xs text-[#526056] space-y-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#265B43] shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Simulated Action Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DDD7C9] bg-white hover:bg-[#FAF9F5] text-xs font-semibold text-[#173829] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#265B43]" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3 h-3 text-[#7B8880]" />
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DDD7C9] bg-white hover:bg-[#FAF9F5] text-xs font-semibold text-[#173829] flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#265B43]" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 text-[#7B8880]" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#173829] text-white text-xs font-bold hover:bg-[#23503B] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

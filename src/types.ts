export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  specialties: string[];
  bio: string;
  image: string;
  availableDays: string[];
  registrationNo: string;
}

export interface Treatment {
  id: string;
  category: 'preventive' | 'cosmetic' | 'implants' | 'ortho' | 'pediatric';
  name: string;
  shortDesc: string;
  fullDesc: string;
  priceStartingAt: string;
  priceNote?: string;
  duration: string;
  sittings: string;
  painLevel: 'Zero (Routine)' | 'Virtually Painless (Numbing)' | 'Mild Post-Op Soreness';
  warranty?: string;
  benefits: string[];
}

export interface DentalZone {
  id: string;
  name: string;
  subtitle: string;
  commonIssues: {
    symptom: string;
    likelyCause: string;
    urgency: 'Low' | 'Moderate' | 'Urgent';
    immediateHomeTip: string;
    recommendedTreatment: string;
  }[];
}

export interface SmileTransformation {
  id: string;
  title: string;
  treatmentType: string;
  duration: string;
  patientAge: string;
  caseDescription: string;
  beforeDescription: string;
  afterDescription: string;
  beforeBg: string;
  afterBg: string;
}

export interface AppointmentData {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  anxietyLevel?: 'None' | 'A bit nervous' | 'Severe dental anxiety (gentle pace needed)';
  notes?: string;
  createdAt: string;
}

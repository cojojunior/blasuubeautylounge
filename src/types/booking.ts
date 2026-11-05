export interface Service {
  id: string;
  category: string;
  name: string;
  price: number;
  durationMinutes: number;
  depositAmount: number;
}

export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  agreeTerms: boolean;
}

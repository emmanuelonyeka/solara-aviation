export interface QuoteRequest {
  reference: string;
  createdAt: string;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  aircraft?: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

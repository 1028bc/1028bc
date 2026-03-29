// src/types/FieldOps.ts

// 1. Define the authorized enterprise vendors
export type AuthorizedVendor = 'DELL' | 'LENOVO' | 'HP' | 'NEC';

// 2. Define the strict ticket structure
export interface ServiceTicket {
  id: string;             // UUID from Supabase
  ticketNumber: string;   // Vendor specific (e.g., HP-99812)
  vendor: AuthorizedVendor;
  slaDeadline: string;    // ISO Timestamp
  status: 'PENDING' | 'IN_ROUTE' | 'ON_SITE' | 'RESOLVED';
  coordinates: {
    lat: number;
    lng: number;
  };
}

// 3. Vendor-specific routing logic
export const getVendorConfig = (vendor: AuthorizedVendor) => {
  switch (vendor) {
    case 'HP':
      return { color: 'text-blue-400', bg: 'bg-blue-400/10', comms: 'slack://channel?id=HP_DISPATCH' };
    case 'DELL':
      return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', comms: 'msteams://channel?id=DELL_OPS' };
    case 'LENOVO':
      return { color: 'text-red-400', bg: 'bg-red-400/10', comms: 'msteams://channel?id=LENOVO_OPS' };
    case 'NEC':
      return { color: 'text-purple-400', bg: 'bg-purple-400/10', comms: 'slack://channel?id=NEC_B2B' };
    default:
      return { color: 'text-slate-400', bg: 'bg-slate-400/10', comms: '#' };
  }
};
export interface Vendor {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  bank_reference?: string;
  category?: string;
  registration_number?: string;
  vat_number?: string;
  kyc_status?: 'pending' | 'in_progress' | 'verified' | 'rejected';
  risk_score?: number;
  fica_compliant?: boolean;
  aml_checked?: boolean;
  sanctions_screened?: boolean;
  bank_verified?: boolean;
  beneficial_ownership_declared?: boolean;
  contract_start_date?: string;
  contract_end_date?: string;
  sla_details?: string;
  rate_card_details?: string;
  penalty_clauses?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VendorStats {
  total: number;
  active: number;
  pending: number;
  avg_performance: number;
  active_contracts: number;
}

export const VENDOR_CATEGORIES = [
  'Shipping lines',
  'Airlines',
  'Road transporters',
  'Warehouse operators',
  'Customs brokers',
  'Insurance providers',
  'Inspection agencies'
] as const;

export const VENDOR_KYC_STATUSES = ['pending', 'in_progress', 'verified', 'rejected'] as const;

export const VENDOR_STATUSES = ['active', 'inactive', 'pending', 'suspended'] as const;
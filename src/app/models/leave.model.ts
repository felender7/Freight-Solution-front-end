export interface LeaveRequest {
  id?: number;
  employee_id: number;
  leave_type: 'sick' | 'annual' | 'maternity' | 'paternity' | 'unpaid' | 'study';
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  number_of_days?: number;
  medical_certificate_attached?: boolean;
  study_timetable_attached?: boolean;
  medical_certificate_url?: string;
  study_timetable_url?: string;
  document_urls?: string[];
  created_at?: string;
  employee?: {
    first_name: string;
    last_name: string;
  };
}

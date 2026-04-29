export interface Timesheet {
  id?: number;
  employee_id: number;
  date: string;
  hours_worked: number;
  description: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  task_id?: number;
  created_at?: string;
  employee?: {
    first_name: string;
    last_name: string;
  };
  task?: {
    title: string;
  };
  approved_by?: {
    first_name: string;
    last_name: string;
  };
}

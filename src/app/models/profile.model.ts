export interface profile {
id: number;

first_name: string;
last_name: string;
full_name?: string;

email: string;
phone?: string;

position?: string;
department?: string;
employment_status?: string;

employee_code?: string;
manager_id?: number | null;
user_id?: number;

salary?: string; 
hire_date?: string;

address?: string;
city?: string;
state?: string;
country?: string;
zip_code?: string;

education_background?: string;

profile_photo_url?: string;
contract_url?: string;
appointment_letter_url?: string | null;

created_at?: string;
updated_at?: string;
}
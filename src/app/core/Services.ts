export enum Services {


// 1. Authentication and Authorization
    LOGIN = 'login',
    LOGOUT = 'logout',
    REGISTER = 'register',


//profile management    GET_PROFILE = 'get-profile',
    UPDATE_PROFILE = 'update-profile',
    CHANGE_PASSWORD = 'change-password',
    PROFILE = '/hrm/me',

// 2. HR Management
    HR_DASHBOARD = 'hr/dashboard',
    HR_PROFILE = 'hr/profile',
    HR_ATTENDANCE = '/hrm/attendance_records',
    HR_ATTENDANCE_STATUS = '/hrm/attendance_records/current_status',
    HR_ATTENDANCE_CLOCK_IN = '/hrm/attendance_records/clock_in',
    HR_ATTENDANCE_CLOCK_OUT = '/hrm/attendance_records/clock_out',
    HR_LEAVE = '/hrm/leave_requests',
    HR_LEAVE_APPROVE = '/hrm/leave_requests/:id/approve',
    HR_LEAVE_REJECT = '/hrm/leave_requests/:id/reject',
    HR_LEAVE_UPLOAD_MEDICAL = '/hrm/leave_requests/:id/upload_medical_certificate',
    HR_TIMESHEETS = '/hrm/timesheets',
    HR_TIMESHEETS_APPROVE = '/hrm/timesheets/:id/approve',
    HR_TIMESHEETS_REJECT = '/hrm/timesheets/:id/reject',

// 3. Employee Management
    EMPLOYEE_DETAILS = '/hrm/employees/',

// 3. Logistics
    VENDORS = '/vendors',
    VENDOR_STATS = '/vendors/stats',
}
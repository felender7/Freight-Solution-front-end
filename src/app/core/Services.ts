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

// 3. Logistics
    VENDORS = '/vendors',
    VENDOR_STATS = '/vendors/stats',
}
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Services } from '../../core/Services';
import { profileResponse } from '../../api/response/profileResponse';


@Component({
  selector: 'app-hr-profile',
  template: `
  <div *ngIf="loading" class="flex justify-center items-center p-8">
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
</div>

<div *ngIf="error" class="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
  {{ error }}
</div>

<div *ngIf="!loading && profile" class="bg-slate-800 rounded-xl border border-slate-700 p-8">
  <div class="flex flex-col md:flex-row gap-8 items-start">

    <!-- Avatar -->
    <div class="flex-shrink-0">
      <div class="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-600 overflow-hidden">
        <img *ngIf="profile.profile_photo_url" [src]="profile.profile_photo_url" alt="Profile" class="w-full h-full object-cover">
        <span *ngIf="!profile.profile_photo_url" class="text-4xl text-slate-400 font-bold">
          {{ profile.first_name.charAt(0) }}{{ profile.last_name.charAt(0) }}
        </span>
      </div>
      <button class="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg">
        Update Photo
      </button>
    </div>

    <!-- Content -->
    <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- LEFT -->
      <section class="space-y-6">

        <!-- Personal -->
        <div>
          <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Personal Details</h3>
          <div class="grid gap-4 mt-4">
            <div><label class="text-xs text-slate-500">Full Name</label><p class="text-slate-200">{{ profile.first_name }} {{ profile.last_name }}</p></div>
            <div><label class="text-xs text-slate-500">Email</label><p class="text-slate-200">{{ profile.email }}</p></div>
            <div><label class="text-xs text-slate-500">Phone</label><p class="text-slate-200">{{ profile.phone || 'N/A' }}</p></div>
          </div>
        </div>

        <!-- Address -->
        <div>
          <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Address</h3>
          <div class="grid gap-4 mt-4">
            <div><label class="text-xs text-slate-500">Street</label><p class="text-slate-200">{{ profile.address || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">City</label><p class="text-slate-200">{{ profile.city || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">State</label><p class="text-slate-200">{{ profile.state || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Zip Code</label><p class="text-slate-200">{{ profile.zip_code || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Country</label><p class="text-slate-200">{{ profile.country || 'N/A' }}</p></div>
          </div>
        </div>

      </section>

      <!-- RIGHT -->
      <section class="space-y-6">

        <!-- Employment -->
        <div>
          <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Employment</h3>
          <div class="grid gap-4 mt-4">
            <div><label class="text-xs text-slate-500">Employee Code</label><p class="text-slate-200">{{ profile.employee_code || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Position</label><p class="text-slate-200">{{ profile.position || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Department</label><p class="text-slate-200">{{ profile.department || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Employment Status</label><p class="text-slate-200">{{ profile.employment_status || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Hire Date</label><p class="text-slate-200">{{ profile.hire_date || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Salary</label><p class="text-slate-200">{{ profile.salary ? (profile.salary | currency) : 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Manager ID</label><p class="text-slate-200">{{ profile.manager_id || 'N/A' }}</p></div>
          </div>
        </div>

        <!-- Education -->
        <div>
          <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Education</h3>
          <div class="mt-4">
            <label class="text-xs text-slate-500">Background</label>
            <p class="text-slate-200 whitespace-pre-line">
              {{ profile.education_background || 'N/A' }}
            </p>
          </div>
        </div>

        <!-- System -->
        <div>
          <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">System Info</h3>
          <div class="grid gap-4 mt-4">
            <div><label class="text-xs text-slate-500">User ID</label><p class="text-slate-200">{{ profile.user_id || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Created At</label><p class="text-slate-200">{{ profile.created_at || 'N/A' }}</p></div>
            <div><label class="text-xs text-slate-500">Updated At</label><p class="text-slate-200">{{ profile.updated_at || 'N/A' }}</p></div>
          </div>
        </div>

      </section>
      

    </div>
    
  </div>
</div>
<div *ngIf="!loading && profile" class="bg-slate-800 rounded-xl border border-slate-700 p-8 mt-6">

  <div class="bg-slate-800 rounded-xl border border-slate-700 p-8 mt-6">
    <h3 class="text-slate-100 font-semibold mb-6">Employment Documents</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Contract -->
      <a
        *ngIf="profile.contract_url; else noContract"
        [href]="profile.contract_url"
        target="_blank"
        class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors group"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-slate-200 font-medium">Employment Contract</p>
            <p class="text-xs text-slate-500">Click to view</p>
            
          </div>
        </div>
      </a>

      <ng-template #noContract>
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg opacity-50 cursor-not-allowed">
          <p class="text-slate-400">No Employment Contract</p>
        </div>
      </ng-template>

      <!-- Appointment Letter -->
      <a *ngIf="profile.appointment_letter_url; else noLetter"
        [href]="profile.appointment_letter_url"
        target="_blank"
        class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors group"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <p class="text-slate-200 font-medium">Appointment Letter</p>
            <p class="text-xs text-slate-500">Click to view</p>
         
          </div>
        </div>
      </a>

      <ng-template #noLetter>
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg opacity-50 cursor-not-allowed">
          <p class="text-slate-400">No Appointment Letter</p>
        </div>
      </ng-template>

    </div>
  </div>

</div>
  `
})
export class HrProfileComponent implements OnInit {
  profile: profileResponse | null = null;
  loading = true;
  error = '';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = '';
    
    this.httpService.sendRequest<profileResponse>(Services.PROFILE).subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
        console.log('Profile loaded:', data);
      },
      error: (err) => {
        this.error = err.message || 'Failed to load profile';
        this.loading = false;
      }
    });
  }
}
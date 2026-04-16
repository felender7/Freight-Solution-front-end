import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-profile',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-shrink-0">
          <div class="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-600">
            <span class="text-4xl text-slate-400 font-bold">JD</span>
          </div>
          <button class="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg transition-colors">Update Photo</button>
        </div>
        
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
          <section class="space-y-6">
            <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Personal Details</h3>
            <div class="grid grid-cols-1 gap-4">
              <div><label class="text-xs text-slate-500 block mb-1">Full Name</label><p class="text-slate-200">John Doe</p></div>
              <div><label class="text-xs text-slate-500 block mb-1">Email</label><p class="text-slate-200">john.doe@tswalanang.co.za</p></div>
              <div><label class="text-xs text-slate-500 block mb-1">Phone</label><p class="text-slate-200">+27 12 345 6789</p></div>
            </div>
            
            <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2 pt-4">Address Details</h3>
            <div class="grid grid-cols-1 gap-4">
              <div><label class="text-xs text-slate-500 block mb-1">Address</label><p class="text-slate-200">123 Logistics Way, Pretoria North, Gauteng, 0182, South Africa</p></div>
            </div>
          </section>

          <section class="space-y-6">
            <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2">Professional Details</h3>
            <div class="grid grid-cols-1 gap-4">
              <div><label class="text-xs text-slate-500 block mb-1">Employee ID</label><p class="text-slate-200">EMP-2026-001</p></div>
              <div><label class="text-xs text-slate-500 block mb-1">Position</label><p class="text-slate-200">Senior Operations Specialist</p></div>
              <div><label class="text-xs text-slate-500 block mb-1">Department</label><p class="text-slate-200">Logistics & Distribution</p></div>
              <div><label class="text-xs text-slate-500 block mb-1">Manager</label><p class="text-slate-200">Sarah Smith</p></div>
            </div>

            <h3 class="text-slate-100 font-semibold border-b border-slate-700 pb-2 pt-4">Education</h3>
            <div class="grid grid-cols-1 gap-4">
              <div><label class="text-xs text-slate-500 block mb-1">Educational Background</label><p class="text-slate-200 whitespace-pre-line">B.Com Supply Chain Management, University of Pretoria, 2018</p></div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8 mt-6">
      <h3 class="text-slate-100 font-semibold mb-6">Employment Documents</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#" class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p class="text-slate-200 font-medium">Employment Contract</p>
              <p class="text-xs text-slate-500">PDF Document • 2.4 MB</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        </a>
        <a href="#" class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p class="text-slate-200 font-medium">Appointment Letter</p>
              <p class="text-xs text-slate-500">PDF Document • 1.1 MB</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        </a>
      </div>
    </div>
  `
})
export class HrProfileComponent implements OnInit {
  ngOnInit(): void {}
}

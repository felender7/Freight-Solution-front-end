import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard',
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-lg shadow-blue-500/20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold text-white">HRM Command Center</h1>
            <p class="text-blue-100 mt-2 text-lg">Manage your workforce, track performance, and empower your team.</p>
          </div>
          <div class="flex -space-x-3 overflow-hidden">
            <div class="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-slate-700 flex items-center justify-center text-white font-bold">JD</div>
            <div class="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-blue-500 flex items-center justify-center text-white font-bold">SS</div>
            <div class="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-indigo-500 flex items-center justify-center text-white font-bold">MK</div>
            <div class="flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-slate-800 text-xs font-medium text-white">+12</div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-all cursor-default">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <span class="text-green-400 text-xs font-bold">+4.5%</span>
          </div>
          <h3 class="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Workforce</h3>
          <p class="text-3xl font-bold text-white mt-1">128</p>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-all cursor-default">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <span class="text-indigo-400 text-xs font-bold">Today</span>
          </div>
          <h3 class="text-slate-400 text-sm font-semibold uppercase tracking-wider">On Leave</h3>
          <p class="text-3xl font-bold text-white mt-1">12</p>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-all cursor-default">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="text-emerald-400 text-xs font-bold">92%</span>
          </div>
          <h3 class="text-slate-400 text-sm font-semibold uppercase tracking-wider">Present Ratio</h3>
          <p class="text-3xl font-bold text-white mt-1">116</p>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-all cursor-default">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span class="text-amber-400 text-xs font-bold">8 Pending</span>
          </div>
          <h3 class="text-slate-400 text-sm font-semibold uppercase tracking-wider">Active Reviews</h3>
          <p class="text-3xl font-bold text-white mt-1">15</p>
        </div>
      </div>

      <!-- Module Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Employees Card -->
        <a routerLink="../profile" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
          <div class="h-2 bg-blue-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Employee Profile</h3>
            <p class="text-slate-400 text-sm mt-2">Manage personal information, professional details, and educational background.</p>
            <div class="mt-6 flex items-center text-blue-400 text-sm font-bold">
              View Profile <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- Attendance Card -->
        <a routerLink="../attendance" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10">
          <div class="h-2 bg-emerald-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Attendance Tracking</h3>
            <p class="text-slate-400 text-sm mt-2">Real-time clock-in/out system with automated work hours calculation.</p>
            <div class="mt-6 flex items-center text-emerald-400 text-sm font-bold">
              Track Attendance <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- Performance Card -->
        <a routerLink="../performance" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10">
          <div class="h-2 bg-amber-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Performance Management</h3>
            <p class="text-slate-400 text-sm mt-2">Structured review cycles, feedback tracking, and employee growth analytics.</p>
            <div class="mt-6 flex items-center text-amber-400 text-sm font-bold">
              Manage Reviews <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- Leave Management Card -->
        <a routerLink="../leave" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10">
          <div class="h-2 bg-indigo-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Leave & Time Off</h3>
            <p class="text-slate-400 text-sm mt-2">Request leave, track balances, and manage team availability seamlessly.</p>
            <div class="mt-6 flex items-center text-indigo-400 text-sm font-bold">
              Request Leave <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- Timesheets Card -->
        <a routerLink="../timesheets" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
          <div class="h-2 bg-purple-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Timesheets</h3>
            <p class="text-slate-400 text-sm mt-2">Accurate time tracking for projects and tasks with approval workflows.</p>
            <div class="mt-6 flex items-center text-purple-400 text-sm font-bold">
              Submit Hours <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- Tasks Card -->
        <a routerLink="../tasks" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all hover:shadow-2xl hover:shadow-rose-500/10">
          <div class="h-2 bg-rose-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Task Management</h3>
            <p class="text-slate-400 text-sm mt-2">Assign, monitor, and complete operational tasks with clear deadlines.</p>
            <div class="mt-6 flex items-center text-rose-400 text-sm font-bold">
              Manage Tasks <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>

        <!-- LMS Card -->
        <a routerLink="../lms" class="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/10">
          <div class="h-2 bg-cyan-500"></div>
          <div class="p-6">
            <div class="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h3 class="text-xl font-bold text-white">Learning Management</h3>
            <p class="text-slate-400 text-sm mt-2">Enroll in training courses, track progress, and earn certifications.</p>
            <div class="mt-6 flex items-center text-cyan-400 text-sm font-bold">
              Start Learning <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  `
})
export class HrDashboardComponent implements OnInit {
  ngOnInit(): void {}
}

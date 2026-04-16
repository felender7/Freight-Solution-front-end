import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-attendance',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Attendance Tracking</h3>
          <p class="text-slate-400 text-sm">Clock in and out to track your daily working hours</p>
        </div>
        <div class="flex gap-4">
          <button class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">Clock In</button>
          <button class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">Clock Out</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700">
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3">Clock In</th>
              <th class="px-4 py-3">Clock Out</th>
              <th class="px-4 py-3">Total Hours</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="text-slate-300 text-sm">
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">April 15, 2026</td>
              <td class="px-4 py-4">09:00 AM</td>
              <td class="px-4 py-4">--:--</td>
              <td class="px-4 py-4">--</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">Active</span></td>
            </tr>
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">April 14, 2026</td>
              <td class="px-4 py-4">08:55 AM</td>
              <td class="px-4 py-4">05:10 PM</td>
              <td class="px-4 py-4">8h 15m</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-slate-500/10 text-slate-400">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HrAttendanceComponent implements OnInit {
  ngOnInit(): void {}
}

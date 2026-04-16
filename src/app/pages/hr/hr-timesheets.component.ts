import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-timesheets',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Timesheets</h3>
          <p class="text-slate-400 text-sm">Submit and track your weekly working hours</p>
        </div>
        <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Submit Timesheet</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700">
              <th class="px-4 py-3">Week</th>
              <th class="px-4 py-3">Task / Project</th>
              <th class="px-4 py-3">Hours</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Approved By</th>
            </tr>
          </thead>
          <tbody class="text-slate-300 text-sm">
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">Apr 06 - Apr 12, 2026</td>
              <td class="px-4 py-4">Logistics Optimization</td>
              <td class="px-4 py-4">40.5h</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">Approved</span></td>
              <td class="px-4 py-4">Sarah Smith</td>
            </tr>
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">Apr 13 - Apr 19, 2026</td>
              <td class="px-4 py-4">Multiple Tasks</td>
              <td class="px-4 py-4">24.0h</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400">Pending</span></td>
              <td class="px-4 py-4">--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HrTimesheetsComponent implements OnInit {
  ngOnInit(): void {}
}

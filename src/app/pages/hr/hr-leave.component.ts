import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-leave',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Leave Management</h3>
          <p class="text-slate-400 text-sm">Request leave and track your leave balance</p>
        </div>
        <button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Request Leave</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
          <p class="text-xs text-slate-500 uppercase font-semibold">Annual Leave</p>
          <p class="text-2xl font-bold text-slate-100 mt-1">12 / 21 Days</p>
          <div class="w-full bg-slate-700 h-1.5 rounded-full mt-2"><div class="bg-blue-500 h-1.5 rounded-full" style="width: 57%"></div></div>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
          <p class="text-xs text-slate-500 uppercase font-semibold">Sick Leave</p>
          <p class="text-2xl font-bold text-slate-100 mt-1">8 / 10 Days</p>
          <div class="w-full bg-slate-700 h-1.5 rounded-full mt-2"><div class="bg-green-500 h-1.5 rounded-full" style="width: 80%"></div></div>
        </div>
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg">
          <p class="text-xs text-slate-500 uppercase font-semibold">Study Leave</p>
          <p class="text-2xl font-bold text-slate-100 mt-1">3 / 5 Days</p>
          <div class="w-full bg-slate-700 h-1.5 rounded-full mt-2"><div class="bg-purple-500 h-1.5 rounded-full" style="width: 60%"></div></div>
        </div>
      </div>

      <h4 class="text-slate-100 font-semibold mb-4">Leave History</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700">
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Period</th>
              <th class="px-4 py-3">Days</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="text-slate-300 text-sm">
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">Annual Leave</td>
              <td class="px-4 py-4">Dec 20 - Dec 31, 2025</td>
              <td class="px-4 py-4">8 Days</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">Approved</span></td>
            </tr>
            <tr class="border-b border-slate-700/50">
              <td class="px-4 py-4">Sick Leave</td>
              <td class="px-4 py-4">Mar 10, 2026</td>
              <td class="px-4 py-4">1 Day</td>
              <td class="px-4 py-4"><span class="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">Approved</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HrLeaveComponent implements OnInit {
  ngOnInit(): void {}
}

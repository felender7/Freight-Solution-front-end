import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-tasks',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Tasks</h3>
          <p class="text-slate-400 text-sm">Manage and track your assigned tasks and responsibilities</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between group">
          <div class="flex items-center gap-4">
            <input type="checkbox" class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800">
            <div>
              <p class="text-slate-200 font-medium">Complete safety training module</p>
              <p class="text-xs text-slate-500">Due: Apr 18, 2026 • HR Department</p>
            </div>
          </div>
          <span class="px-2 py-1 rounded text-xs bg-red-500/10 text-red-400 font-medium">High Priority</span>
        </div>

        <div class="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between group">
          <div class="flex items-center gap-4">
            <input type="checkbox" class="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/20 focus:ring-offset-slate-800">
            <div>
              <p class="text-slate-200 font-medium">Update profile address and photo</p>
              <p class="text-xs text-slate-500">Due: Apr 20, 2026 • Onboarding</p>
            </div>
          </div>
          <span class="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-400 font-medium">Medium Priority</span>
        </div>
      </div>
    </div>
  `
})
export class HrTasksComponent implements OnInit {
  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-lms',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Learning Management System</h3>
          <p class="text-slate-400 text-sm">Enhance your skills with our training courses</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden group">
          <div class="h-32 bg-blue-600/20 flex items-center justify-center border-b border-slate-700">
            <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-slate-100 font-semibold group-hover:text-blue-400 transition-colors">Warehouse Safety & Operations</h4>
              <span class="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300 uppercase font-bold tracking-wider">Required</span>
            </div>
            <p class="text-slate-400 text-sm mb-6 line-clamp-2">Comprehensive guide to safe warehouse operations, equipment handling, and emergency protocols.</p>
            <div class="flex items-center justify-between">
              <div class="flex-grow mr-4">
                <div class="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div class="w-full bg-slate-700 h-1.5 rounded-full"><div class="bg-blue-500 h-1.5 rounded-full" style="width: 75%"></div></div>
              </div>
              <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap">Continue</button>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden group">
          <div class="h-32 bg-purple-600/20 flex items-center justify-center border-b border-slate-700">
            <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-slate-100 font-semibold group-hover:text-purple-400 transition-colors">Data Privacy & Protection</h4>
              <span class="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300 uppercase font-bold tracking-wider">Annual</span>
            </div>
            <p class="text-slate-400 text-sm mb-6 line-clamp-2">Understanding POPIA and international data protection standards in the logistics industry.</p>
            <div class="flex items-center justify-between">
              <div class="flex-grow mr-4">
                <div class="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <div class="w-full bg-slate-700 h-1.5 rounded-full"><div class="bg-green-500 h-1.5 rounded-full" style="width: 100%"></div></div>
              </div>
              <button class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-lg transition-colors whitespace-nowrap">View Certificate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HrLmsComponent implements OnInit {
  ngOnInit(): void {}
}

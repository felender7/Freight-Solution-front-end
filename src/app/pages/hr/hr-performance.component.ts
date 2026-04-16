import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-performance',
  template: `
    <div class="bg-slate-800 rounded-xl border border-slate-700 p-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h3 class="text-xl font-bold text-slate-100">Performance Reviews</h3>
          <p class="text-slate-400 text-sm">View and participate in your performance evaluation cycles</p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="p-6 bg-slate-900 border border-slate-700 rounded-xl">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-slate-100 font-semibold">Annual Performance Review 2026</h4>
              <p class="text-xs text-slate-500 mt-1">Due by June 30, 2026</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">In Progress</span>
          </div>
          <p class="text-slate-300 text-sm">Quarterly performance assessment covering operations and team collaboration goals.</p>
          <div class="mt-6 flex gap-4">
            <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">Complete Self-Assessment</button>
            <button class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">View Details</button>
          </div>
        </div>

        <div class="p-6 bg-slate-900 border border-slate-700 rounded-xl opacity-80">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-slate-100 font-semibold">Annual Performance Review 2025</h4>
              <p class="text-xs text-slate-500 mt-1">Completed on Jan 15, 2026</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">Completed</span>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <div class="flex text-yellow-400">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <svg class="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <span class="text-slate-400 text-xs">Rating: 4/5</span>
          </div>
          <div class="mt-4">
            <button class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors">View Final Feedback</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HrPerformanceComponent implements OnInit {
  ngOnInit(): void {}
}

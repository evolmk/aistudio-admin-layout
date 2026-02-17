
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../components/dashboard/stats-card.component';
import { ChartComponent } from '../components/dashboard/chart.component';
import { CardComponent, BadgeComponent, BtnComponent, IconComponent, ProgressBarComponent } from '../components/ui/primitives';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    StatsCardComponent, 
    ChartComponent, 
    CardComponent, 
    BadgeComponent, 
    BtnComponent, 
    IconComponent, 
    ProgressBarComponent
  ],
  template: `
    <div class="space-y-6 animate-fade-in-up">
      
      <!-- KPI Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <app-stats-card 
          title="Total Revenue" 
          value="$1,250.00" 
          badgeText="+12.5%" 
          [isPositive]="true" 
          subtext="Trending up this month">
        </app-stats-card>
        <app-stats-card 
          title="New Customers" 
          value="1,234" 
          badgeText="-20%" 
          [isPositive]="false" 
          subtext="Down 20% this period">
        </app-stats-card>
        <app-stats-card 
          title="Active Accounts" 
          value="45,678" 
          badgeText="+12.5%" 
          [isPositive]="true" 
          subtext="Strong user retention">
        </app-stats-card>
        <app-stats-card 
          title="Growth Rate" 
          value="4.5%" 
          badgeText="+4.5%" 
          [isPositive]="true" 
          subtext="Meets growth projections">
        </app-stats-card>
      </div>

      <!-- Visitor Chart Row -->
      <app-card>
        <div class="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
          <!-- Title area -->
          <div>
            <h3 class="text-xl font-bold text-slate-900">Total Visitors</h3>
            <p class="text-slate-500 text-sm mt-1">Total for the last 3 months</p>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-4">
            <!-- Legend (Mock) -->
            <div class="bg-white border border-slate-200 rounded-lg p-2 shadow-sm text-xs space-y-1 hidden md:block">
              <div class="font-semibold text-slate-700 mb-1">Mar 31</div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <span class="text-slate-500">Mobile</span>
                <span class="font-medium">150</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-200"></span>
                <span class="text-slate-500">Desktop</span>
                <span class="font-medium">222</span>
              </div>
            </div>

            <!-- Time Switcher -->
            <div class="flex bg-slate-100 p-1 rounded-lg">
              <button class="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-slate-900">3 months</button>
              <button class="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900">30 days</button>
              <button class="px-3 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900">7 days</button>
            </div>
          </div>
        </div>
        
        <app-chart></app-chart>
      </app-card>

      <!-- Outline / Table Section -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <!-- Table Toolbar -->
        <div class="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-6">
            <button class="text-sm font-semibold text-slate-900 border-b-2 border-blue-600 pb-4 -mb-4.5 z-10">Outline</button>
            <button class="text-sm font-medium text-slate-500 hover:text-slate-700 pb-4 -mb-4 flex items-center gap-1">
              Past Performance <span class="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">3</span>
            </button>
            <button class="text-sm font-medium text-slate-500 hover:text-slate-700 pb-4 -mb-4 flex items-center gap-1">
              Key Personnel <span class="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">2</span>
            </button>
            <button class="text-sm font-medium text-slate-500 hover:text-slate-700 pb-4 -mb-4">Focus Documents</button>
          </div>
          
          <div class="flex items-center gap-2">
            <app-btn variant="outline" icon="eye">View</app-btn>
            <app-btn variant="outline" icon="plus">Add Section</app-btn>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th class="p-4 w-4">
                  <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                </th>
                <th class="px-6 py-3 font-semibold">HEADER</th>
                <th class="px-6 py-3 font-semibold">SECTION TYPE</th>
                <th class="px-6 py-3 font-semibold">STATUS</th>
                <th class="px-6 py-3 font-semibold text-center">TARGET</th>
                <th class="px-6 py-3 font-semibold text-center">LIMIT</th>
                <th class="px-6 py-3 font-semibold">REVIEWER</th>
                <th class="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              @for (row of tableData; track row.header) {
                <tr class="hover:bg-slate-50 transition-colors group">
                  <td class="p-4">
                    <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  </td>
                  <td class="px-6 py-4 font-medium text-slate-900">
                    {{ row.header }}
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                      {{ row.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    @if (row.status === 'In Process') {
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                         <app-icon name="refreshCw" [size]="3" class="animate-spin-slow"></app-icon>
                         In Process
                      </span>
                    } @else if (row.status === 'Done') {
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                         <app-icon name="checkCircle" [size]="3"></app-icon>
                         Done
                      </span>
                    }
                  </td>
                  <td class="px-6 py-4 text-center text-slate-600">{{ row.target }}</td>
                  <td class="px-6 py-4 text-center text-slate-600">{{ row.limit }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                       <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                         {{ row.reviewerInitials }}
                       </div>
                       <span class="text-slate-600 text-xs">{{ row.reviewerName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <button class="text-slate-400 hover:text-slate-600">
                      <app-icon name="more" [size]="4"></app-icon>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.5s ease-out forwards;
    }
    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class DashboardViewComponent {
  tableData = [
    { header: 'Cover page', type: 'Cover page', status: 'In Process', target: 18, limit: 5, reviewerInitials: 'EL', reviewerName: 'Eddie Lake' },
    { header: 'Table of contents', type: 'Table of contents', status: 'Done', target: 29, limit: 24, reviewerInitials: 'EL', reviewerName: 'Eddie Lake' },
    { header: 'Executive summary', type: 'Narrative', status: 'Done', target: 10, limit: 13, reviewerInitials: 'EL', reviewerName: 'Eddie Lake' },
    { header: 'Technical Approach', type: 'Narrative', status: 'Done', target: 27, limit: 32, reviewerInitials: 'JK', reviewerName: 'Jamik' },
  ];
}

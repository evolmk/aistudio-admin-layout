
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, BadgeComponent, BtnComponent, IconComponent } from '../components/ui/primitives';

type OrderStatus = 'ACTIVE' | 'PENDING' | 'SHIPPED' | 'WON' | 'CANCELLED';

interface Order {
  id: string;
  name: string;
  company: string;
  status: OrderStatus;
  source: string;
  lastActivity: string;
}

@Component({
  selector: 'app-orders-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, BadgeComponent, BtnComponent, IconComponent],
  template: `
    <div class="space-y-6 animate-fade-in-up">
      
      <!-- Top Actions / Tabs -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Tabs -->
        <div class="flex items-center gap-1 bg-white/50 p-1 rounded-lg">
          @for (tab of tabs; track tab) {
             <button 
               (click)="activeTab.set(tab)"
               class="px-4 py-2 rounded-md text-sm font-medium transition-all"
               [class.bg-white]="activeTab() === tab"
               [class.shadow-sm]="activeTab() === tab"
               [class.text-blue-600]="activeTab() === tab"
               [class.text-slate-500]="activeTab() !== tab"
               [class.hover:text-slate-700]="activeTab() !== tab">
               {{ tab }}
             </button>
          }
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
           <app-btn variant="outline">
             <div class="flex items-center gap-2">
               <app-icon name="filter" [size]="4"></app-icon>
               Filter
             </div>
           </app-btn>
           <app-btn variant="primary" icon="plus">Create</app-btn>
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th class="p-4 w-4">
                  <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                </th>
                <th class="px-6 py-3 font-medium tracking-wide">Name</th>
                <th class="px-6 py-3 font-medium tracking-wide">Company</th>
                <th class="px-6 py-3 font-medium tracking-wide">Status</th>
                <th class="px-6 py-3 font-medium tracking-wide">Source</th>
                <th class="px-6 py-3 font-medium tracking-wide text-right">Last Activity</th>
                <th class="px-6 py-3 font-medium tracking-wide w-10"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (order of filteredOrders(); track order.id) {
                <tr class="hover:bg-slate-50 transition-colors group">
                  <td class="p-4">
                    <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                  </td>
                  <td class="px-6 py-4 font-medium text-slate-900">
                    {{ order.name }}
                  </td>
                  <td class="px-6 py-4 text-slate-600">
                    {{ order.company }}
                  </td>
                  <td class="px-6 py-4">
                    <app-badge 
                      [label]="order.status" 
                      [color]="getStatusColor(order.status)">
                    </app-badge>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {{ order.source }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right text-slate-500 font-mono text-xs">
                    {{ order.lastActivity }}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded">
                       <app-icon name="more" [size]="5"></app-icon>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
         <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
           <p class="text-xs text-slate-500">0 of {{ orders().length }} row(s) selected.</p>
           
           <div class="flex items-center gap-2">
              <button class="text-sm text-slate-500 hover:text-slate-900 disabled:opacity-50 flex items-center gap-1 px-2 py-1" disabled>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                 <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">1</button>
                 <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium bg-white border border-slate-200 shadow-sm text-slate-900">2</button>
                 <button class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">3</button>
                 <span class="text-slate-400">...</span>
              </div>

              <button class="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 px-2 py-1">
                Next
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
           </div>
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
  `]
})
export class OrdersViewComponent {
  activeTab = signal<'Active' | 'New' | 'Deleted'>('Active');
  tabs = ['Active', 'New', 'Deleted'];

  orders = signal<Order[]>([
    { id: '1', name: 'Guillermo Rauch', company: 'Vercel', status: 'ACTIVE', source: 'Website', lastActivity: '30m ago' },
    { id: '2', name: 'Lee Robinson', company: 'Vercel', status: 'ACTIVE', source: 'Referral', lastActivity: '2h ago' },
    { id: '3', name: 'Sam Altman', company: 'OpenAI', status: 'PENDING', source: 'Social Media', lastActivity: '4h ago' },
    { id: '4', name: 'Michael Andreuzza', company: 'Lexington', status: 'SHIPPED', source: 'Conference', lastActivity: '5h ago' },
    { id: '5', name: 'Skyleen', company: 'Animate UI', status: 'SHIPPED', source: 'Referral', lastActivity: '7h ago' },
    { id: '6', name: 'Sahaj', company: 'Tweakcn', status: 'PENDING', source: 'Website', lastActivity: '8h ago' },
    { id: '7', name: 'Arham Khan', company: 'Weblabs Studio', status: 'WON', source: 'Website', lastActivity: '1d ago' },
    { id: '8', name: 'Sarah Drasner', company: 'Netlify', status: 'ACTIVE', source: 'Referral', lastActivity: '1d ago' },
    { id: '9', name: 'Brian Lovin', company: 'GitHub', status: 'PENDING', source: 'Social Media', lastActivity: '2d ago' },
    { id: '10', name: 'Adam Wathan', company: 'Tailwind Labs', status: 'WON', source: 'Website', lastActivity: '2d ago' },
    { id: '11', name: 'Dan Abramov', company: 'Meta', status: 'SHIPPED', source: 'Conference', lastActivity: '3d ago' },
    { id: '12', name: 'Evan You', company: 'Vue.js', status: 'ACTIVE', source: 'Website', lastActivity: '4d ago' },
  ]);

  filteredOrders = computed(() => {
    // In a real app, filtering logic would go here based on tabs
    return this.orders();
  });

  getStatusColor(status: OrderStatus): 'green' | 'blue' | 'yellow' | 'red' | 'gray' {
    switch(status) {
      case 'ACTIVE': return 'green';
      case 'SHIPPED': return 'blue';
      case 'PENDING': return 'yellow';
      case 'WON': return 'green'; // Or purple if we add it
      case 'CANCELLED': return 'red';
      default: return 'gray';
    }
  }
}

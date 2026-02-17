
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, InputComponent, BadgeComponent, BtnComponent, IconComponent } from '../components/ui/primitives';

@Component({
  selector: 'app-product-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, InputComponent, BadgeComponent, BtnComponent, IconComponent],
  template: `
    <div class="max-w-6xl mx-auto space-y-6 animate-fade-in-up">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Precision Sensor - V4X</h1>
          <p class="text-slate-500 text-sm mt-1">Manage product details, media, and technical specs.</p>
        </div>
        <div class="flex items-center gap-3">
           <app-btn variant="ghost">Discard</app-btn>
           <app-btn variant="primary">Save Changes</app-btn>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (Main Info) -->
        <div class="lg:col-span-2 space-y-6">
          <app-card>
            <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <app-icon name="box" [size]="5" class="text-blue-500"></app-icon>
              General Information
            </h3>
            
            <app-input label="Product Name" placeholder="e.g. Precision Sensor - V4X" [required]="true" value="Precision Sensor - V4X"></app-input>
            
            <div class="mb-4">
               <label class="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
               <textarea class="block w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32" placeholder="Product description..."></textarea>
            </div>
          </app-card>

          <app-card>
             <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <app-icon name="file" [size]="5" class="text-blue-500"></app-icon>
                  Media Assets
                </h3>
             </div>
             
             <div class="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <app-icon name="upload" [size]="6" class="text-blue-600"></app-icon>
                </div>
                <p class="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                <p class="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
             </div>
          </app-card>
          
          <app-card>
             <h3 class="text-lg font-semibold text-slate-800 mb-4">Pricing</h3>
             <app-input label="Base Price" placeholder="0.00" type="number" value="1250.00"></app-input>
             
             <div class="flex items-center gap-6 mt-4">
                <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                   <input type="radio" name="discount" class="text-blue-600 focus:ring-blue-500" checked>
                   No Discount
                </label>
                <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                   <input type="radio" name="discount" class="text-blue-600 focus:ring-blue-500">
                   Percentage
                </label>
                <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                   <input type="radio" name="discount" class="text-blue-600 focus:ring-blue-500">
                   Fixed Price
                </label>
             </div>
          </app-card>
        </div>

        <!-- Right Column (Meta) -->
        <div class="space-y-6">
           <app-card>
              <div class="flex items-center justify-between mb-4">
                 <h3 class="text-base font-semibold text-slate-800">Status</h3>
                 <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <select class="block w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                 <option>Published</option>
                 <option>Draft</option>
                 <option>Archived</option>
              </select>
              <p class="text-xs text-slate-500 mt-2">Visible to all procurement departments.</p>
           </app-card>

           <app-card>
              <h3 class="text-base font-semibold text-slate-800 mb-4">Categorization</h3>
              
              <div class="mb-4">
                <label class="block text-xs font-medium text-slate-500 uppercase mb-2">Department Category</label>
                <div class="flex flex-wrap gap-2 mb-3">
                   <app-badge label="Industrial Automation" color="blue" class="cursor-pointer hover:bg-blue-100"></app-badge>
                </div>
                <app-input placeholder="Add new category..."></app-input>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-500 uppercase mb-2">Search Tags</label>
                <div class="flex flex-wrap gap-2 mb-3">
                   <app-badge label="V4X-Series" color="gray"></app-badge>
                   <app-badge label="Optical" color="gray"></app-badge>
                   <app-badge label="Sensor" color="gray"></app-badge>
                </div>
              </div>
           </app-card>
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
export class ProductViewComponent {}

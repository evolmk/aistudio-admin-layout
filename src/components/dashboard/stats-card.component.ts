
import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../ui/primitives';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
      <div class="flex items-start justify-between mb-2">
        <h3 class="text-sm font-medium text-slate-500 tracking-wide">{{ title() }}</h3>
        <span [class]="badgeClass()">
          <app-icon [name]="trendIcon()" [size]="3" class="mr-1"></app-icon>
          {{ badgeText() }}
        </span>
      </div>
      
      <div class="my-1">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">{{ value() }}</h2>
      </div>
      
      <div class="flex items-center text-xs mt-2">
        <span class="text-slate-500 font-medium flex items-center gap-1">
           @if (trendIcon() === 'trendingUp') {
             <app-icon name="trendingUp" size="3" class="text-emerald-500"></app-icon>
           } @else {
             <app-icon name="trendingDown" size="3" class="text-red-500"></app-icon>
           }
           {{ subtext() }}
        </span>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  title = input.required<string>();
  value = input.required<string>();
  badgeText = input.required<string>(); // e.g., "+12.5%"
  isPositive = input.required<boolean>();
  subtext = input<string>('');

  badgeClass = computed(() => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold";
    return this.isPositive() 
      ? `${base} bg-emerald-50 text-emerald-600` 
      : `${base} bg-red-50 text-red-600`;
  });

  trendIcon = computed(() => this.isPositive() ? 'trendingUp' : 'trendingDown');
}

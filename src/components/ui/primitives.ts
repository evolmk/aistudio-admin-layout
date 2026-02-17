
import { Component, input, output, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from '../../services/icon.service';

// --- ICON COMPONENT ---
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="'0 0 24 24'" [class]="classes()" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path [attr.d]="path()" />
    </svg>
  `
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(5);
  class = input<string>('');

  private iconService = inject(IconService);

  path = computed(() => this.iconService.getIcon(this.name()));
  classes = computed(() => `inline-block w-${this.size()} h-${this.size()} ${this.class()}`);
}

// --- CARD COMPONENT ---
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300 h-full">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {}

// --- BUTTON COMPONENT ---
@Component({
  selector: 'app-btn',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <button
      [class]="btnClasses()"
      (click)="clicked.emit($event)">
      @if (icon()) {
        <app-icon [name]="icon()!" [size]="5" class="mr-2"></app-icon>
      }
      <ng-content></ng-content>
    </button>
  `
})
export class BtnComponent {
  variant = input<'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'>('primary');
  icon = input<string | null>(null);
  fullWidth = input<boolean>(false);
  clicked = output<MouseEvent>();

  btnClasses = computed(() => {
    const base = "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
    const width = this.fullWidth() ? "w-full" : "";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm shadow-blue-600/20",
      secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500",
      ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
      outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-200 shadow-sm",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500"
    };

    return `${base} ${variants[this.variant()]} ${width}`;
  });
}

// --- BADGE COMPONENT ---
@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="badgeClasses()">
      {{ label() }}
    </span>
  `
})
export class BadgeComponent {
  label = input.required<string>();
  color = input<'green' | 'blue' | 'yellow' | 'red' | 'gray' | 'purple'>('gray');

  badgeClasses = computed(() => {
    const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider";
    const colors = {
      green: "bg-emerald-50 text-emerald-700 border-emerald-200",
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      yellow: "bg-amber-50 text-amber-700 border-amber-200",
      red: "bg-red-50 text-red-700 border-red-200",
      gray: "bg-slate-100 text-slate-700 border-slate-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200"
    };
    return `${base} ${colors[this.color()]}`;
  });
}

// --- TEXT INPUT COMPONENT ---
@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-4">
      @if (label()) {
        <label class="block text-sm font-medium text-slate-700 mb-1.5">
          {{ label() }}
          @if (required()) { <span class="text-red-500">*</span> }
        </label>
      }
      <div class="relative">
        <input
          [type]="type()"
          [placeholder]="placeholder()"
          [value]="value()"
          (input)="onInput($event)"
          class="block w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm placeholder-slate-400
                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        />
      </div>
      @if (hint()) {
        <p class="mt-1.5 text-xs text-slate-500">{{ hint() }}</p>
      }
    </div>
  `
})
export class InputComponent {
  label = input<string | null>(null);
  placeholder = input<string>('');
  type = input<string>('text');
  value = input<string>('');
  required = input<boolean>(false);
  hint = input<string | null>(null);
  
  valueChange = output<string>();

  onInput(e: Event) {
    this.valueChange.emit((e.target as HTMLInputElement).value);
  }
}

// --- PROGRESS BAR COMPONENT ---
@Component({
  selector: 'app-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full bg-slate-100 rounded-full h-1.5">
      <div [class]="barClass()" [style.width.%]="value()"></div>
    </div>
  `
})
export class ProgressBarComponent {
  value = input.required<number>();
  color = input<'blue' | 'green' | 'amber'>('blue');

  barClass = computed(() => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-emerald-500',
      amber: 'bg-amber-500'
    };
    return `h-1.5 rounded-full ${colors[this.color()]}`;
  });
}

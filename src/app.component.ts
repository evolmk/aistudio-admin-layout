
import { Component, signal, ChangeDetectionStrategy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from './services/icon.service';
import { IconComponent, BtnComponent } from './components/ui/primitives';
import { DashboardViewComponent } from './pages/dashboard-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BtnComponent, DashboardViewComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private iconService = inject(IconService);
  
  currentView = signal<'dashboard'>('dashboard');
  
  // Default to Expanded (false) as requested ("by default sidenav is open")
  sidebarCollapsed = signal<boolean>(false); 
  
  profileOpen = signal<boolean>(false);
  searchOpen = signal<boolean>(false);

  // Menu Definition
  menuGroups = [
    {
      title: null, // No header for the first item
      items: [
        { label: 'Dashboard', icon: 'dashboard', id: 'dashboard' }
      ]
    },
    {
      title: 'Commercial',
      items: [
        { label: 'Orders', icon: 'orders', id: 'orders' },
        { label: 'Quotes', icon: 'quotes', id: 'quotes' },
        { label: 'Customers', icon: 'customers', id: 'customers' },
        { label: 'Vendors', icon: 'vendors', id: 'vendors' }
      ]
    },
    {
      title: 'Inventory',
      items: [
        { label: 'Parts', icon: 'parts', id: 'parts' },
        { label: 'Machines', icon: 'machines', id: 'machines' }
      ]
    },
    {
      title: 'Assets',
      items: [
        { label: 'Media', icon: 'media', id: 'media' },
        { label: 'Drawings', icon: 'drawings', id: 'drawings' }
      ]
    }
  ];

  @HostListener('window:keydown.meta.k', ['$event'])
  @HostListener('window:keydown.ctrl.k', ['$event'])
  handleSearchShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.toggleSearch();
  }

  @HostListener('window:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.searchOpen()) {
      this.searchOpen.set(false);
    }
  }

  setView(view: string) {
    // Just mock navigation for now
    // this.currentView.set(view);
    
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 1024) {
      this.sidebarCollapsed.set(true);
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleProfile() {
    this.profileOpen.update(v => !v);
  }

  toggleSearch() {
    this.searchOpen.update(v => !v);
  }
}

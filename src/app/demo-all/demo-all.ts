import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
  Card, Carousel, Modal, Navbar, NavItem, Sidebar,
  Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer,
  AlertService, Form,
  FormStyle, BaseColors, BaseSize, DropdownItem,
  FilesType, FileData, ChangeEventType, AnimationType,
  NavItemsType, UserItemsType, UserProfile, AuthButtonsType,
  LoaderType, ButtonVariant, ChVariantType, ShapeType
} from '../../../projects/ngx-zs-component/src/public-api';

@Component({
  selector: 'app-demo-all',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
    Card, Carousel, Modal, Navbar, NavItem, Sidebar,
    Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer
  ],
  templateUrl: './demo-all.html',
  styleUrl: './demo-all.css'
})
export class DemoAll {
  readonly alertService = inject(AlertService);

  // ==============================================
  // Data Arrays for Looping
  // ==============================================
  readonly formStyles: FormStyle[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'violet', 'teal'];
  readonly baseColors: BaseColors[] = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'rose', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink'];
  readonly baseSizes: BaseSize[] = ['sm', 'md', 'lg'];
  readonly btnSizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  readonly btnVariants: ButtonVariant[] = ['solid', 'outline'];
  readonly chVariants: ChVariantType[] = ['solid', 'regular'];
  readonly shapes: ShapeType[] = ['square', 'circle'];
  readonly animations: AnimationType[] = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'none'];
  readonly loaderTypes: LoaderType[] = ['spinner', 'pro', 'double', 'gear', 'fan', 'pulse', 'dots', 'bars'];

  // ==============================================
  // Input Types Demo
  // ==============================================
  readonly inputTypes = [
    { type: 'text' as const, label: 'Text', placeholder: 'Enter text' },
    { type: 'email' as const, label: 'Email', placeholder: 'Enter email' },
    { type: 'password' as const, label: 'Password', placeholder: 'Enter password' },
    { type: 'number' as const, label: 'Number', placeholder: 'Enter number', min: 0, max: 100, step: 1 },
    { type: 'tel' as const, label: 'Tel', placeholder: 'Enter tel' },
    { type: 'phone' as const, label: 'Phone', placeholder: 'Enter phone' },
    { type: 'url' as const, label: 'URL', placeholder: 'Enter URL' },
    { type: 'search' as const, label: 'Search', placeholder: 'Search...' },
    { type: 'date' as const, label: 'Date', placeholder: '' },
    { type: 'datetime-local' as const, label: 'Datetime Local', placeholder: '' },
    { type: 'month' as const, label: 'Month', placeholder: '' },
    { type: 'week' as const, label: 'Week', placeholder: '' },
    { type: 'time' as const, label: 'Time', placeholder: '' },
  ];

  // ==============================================
  // Select Items
  // ==============================================
  readonly selectItems: DropdownItem<number>[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' }
  ];

  // ==============================================
  // Navbar Data
  // ==============================================
  readonly navItems: NavItemsType = {
    routerLinkActive: 'zs:bg-blue-500 zs:text-white zs:rounded-md',
    colorClass: 'zs:hover:bg-gray-100 zs:dark:hover:bg-gray-700 zs:rounded-md',
    items: [
      { id: 'home', label: 'Home', routerLink: '/' },
      { id: 'products', label: 'Products', children: [
        { id: 'p1', label: 'Electronics', routerLink: '/electronics' },
        { id: 'p2', label: 'Clothing', routerLink: '/clothing' },
        { id: 'p3', label: 'Books', routerLink: '/books' }
      ], childrenConfig: { childrenOpenWindow: true, childrenWindowDir: 'bottom-left' }},
      { id: 'about', label: 'About', routerLink: '/about' },
      { id: 'contact', label: 'Contact', routerLink: '/contact' }
    ]
  };

  readonly userMenuItems: UserItemsType = {
    items: [
      { id: 'profile', label: 'Profile', routerLink: '/profile' },
      { id: 'settings', label: 'Settings', routerLink: '/settings' },
      { id: 'logout', label: 'Logout', action: () => this.showAlert('info', 'Logout clicked!') }
    ]
  };

  readonly userProfile: UserProfile = {
    name: 'Ziad Shalaby',
    username: 'ziadshalaby',
    email: 'ziad@example.com'
  };

  readonly authButtons: AuthButtonsType = {
    showAuthButtons: true,
    login: { btnStyle: 'secondary', variant: 'outline' },
    signup: { btnStyle: 'primary', variant: 'solid' }
  };

  // ==============================================
  // Footer Data
  // ==============================================
  readonly footerPages = [
    { label: 'Privacy Policy', routerLink: '/privacy' },
    { label: 'Terms of Service', routerLink: '/terms' },
    { label: 'Contact Us', routerLink: '/contact' }
  ];

  // ==============================================
  // Carousel Data
  // ==============================================
  readonly carouselItems = [
    { id: 1, title: 'Slide 1', description: 'First slide description' },
    { id: 2, title: 'Slide 2', description: 'Second slide description' },
    { id: 3, title: 'Slide 3', description: 'Third slide description' },
    { id: 4, title: 'Slide 4', description: 'Fourth slide description' },
    { id: 5, title: 'Slide 5', description: 'Fifth slide description' }
  ];

  // ==============================================
  // Interactive State Signals
  // ==============================================
  readonly modalOpen = signal(false);
  readonly sidebarOpen = signal(false);
  readonly currentPage = signal(1);
  readonly totalPages = signal(10);
  readonly totalItems = signal(100);
  readonly searchValue = signal<string | null>(null);
  readonly selectedItems = signal<DropdownItem<number>[]>([]);
  readonly multiSelectedItems = signal<DropdownItem<number>[]>([]);
  readonly checkboxValue = signal(false);
  readonly toggleValue = signal(false);
  readonly rangeValue = signal(75);
  readonly files = signal<FilesType>(new Map());
  readonly inputValue = signal<string | null>(null);
  readonly isLoggedIn = signal(true);
  readonly isLoading = signal(true);
  readonly activeSlide = signal(0);

  // ==============================================
  // Form Service Demo
  // ==============================================
  readonly loginForm = new Form<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  // ==============================================
  // Alert Demo
  // ==============================================
  showAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string): void {
    this.alertService.addAlert({ type, message, autoClose: true, duration: 3000 });
  }

  showBulkAlerts(): void {
    this.alertService.bulkAlert(
      ['First info alert', 'Second info alert', 'Third info alert'],
      { type: 'info', autoClose: true, duration: 2000 }
    );
  }

  // ==============================================
  // Modal Demo
  // ==============================================
  openModal(): void {
    this.modalOpen.set(true);
  }

  onModalConfirm(): void {
    this.modalOpen.set(false);
    this.showAlert('success', 'Modal confirmed!');
  }

  onModalCancel(): void {
    this.modalOpen.set(false);
    this.showAlert('warning', 'Modal cancelled!');
  }

  // ==============================================
  // Pagination Demo
  // ==============================================
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.showAlert('info', `Navigated to page ${page}`);
  }

  // ==============================================
  // File Demo
  // ==============================================
  onFileChange(event: ChangeEventType<FileData[]>): void {
    console.log('Files changed:', event);
  }

  // ==============================================
  // Input Validator Demo
  // ==============================================
  usernameValidator = (value: string | null): string[] => {
    const errors: string[] = [];
    if (!value) return errors;
    if (value.length < 3) errors.push('Username must be at least 3 characters');
    if (value.includes(' ')) errors.push('Username cannot contain spaces');
    return errors;
  };

  // ==============================================
  // Carousel
  // ==============================================
  onSlideChange(index: number): void {
    this.activeSlide.set(index);
  }

  ss = ['primary', 'danger', 'warning'] as FormStyle[]
}
import { Component, signal, HostListener, effect, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zIndices, ZIndicesType } from '../z-index';


// ==============================================
// Types
// ==============================================
export type themeTypes = 'light' | 'dark';


// ==============================================
// Component Metadata
// ==============================================
@Component({
  selector: 'ZS-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css'
})
export class ThemeToggle {
  readonly zIndices: ZIndicesType = zIndices;

  // ==============================================
  // Signals
  // ==============================================
  readonly currentTheme = signal<themeTypes>('light');
  readonly isOpen = signal<boolean>(false);
  private readonly userSelectedTheme = signal<boolean>(false);
  
  private lastEmittedTheme: themeTypes | null = null;
  private lastManualTheme: themeTypes | null = null;
  
  // ==============================================
  // Inputs
  // ==============================================
  readonly bodyClass = input<string>('zs:bg-white zs:dark:bg-gray-900 zs:text-gray-900 zs:dark:text-gray-100');
  readonly showDefaultUI = input<boolean>(true);
  readonly setManualTheme = input<themeTypes | null>(null);


  // ==============================================
  // Outputs
  // ==============================================
  readonly themeChangeEv = output<themeTypes>();


  // ==============================================
  // Lifecycle & Side Effects
  // ==============================================
  constructor() {
    // ① تهيئة الثيم
    const savedTheme = localStorage.getItem('theme') as themeTypes | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
      this.currentTheme.set(savedTheme);
      this.userSelectedTheme.set(true);
    } else {
      this.currentTheme.set(systemPrefersDark.matches ? 'dark' : 'light');
    }

    // ② مراقبة تغيّر ثيم النظام (لو المستخدم لم يختر يدويًا)
    effect((onCleanup) => {
      const listener = (e: MediaQueryListEvent) => {
        if (!this.userSelectedTheme()) {
          this.currentTheme.set(e.matches ? 'dark' : 'light');
        }
      };

      systemPrefersDark.addEventListener('change', listener);
      onCleanup(() => systemPrefersDark.removeEventListener('change', listener));
    });

    // ③ مزامنة الثيم مع DOM و localStorage
    effect(() => {
      const theme = this.currentTheme();
      document.documentElement.classList.toggle('dark', theme === 'dark');

      const classes = this.bodyClass()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      document.body.classList.value = '';
      classes.forEach(c => document.body.classList.add(c));

      if (this.userSelectedTheme()) {
        localStorage.setItem('theme', theme);
      }
    });

    effect(() => {
      const manual = this.setManualTheme();

      if (manual && manual !== this.lastManualTheme) {
        this.lastManualTheme = manual;
        this.setTheme(manual);
      }
    });

    effect(() => {
      const theme = this.currentTheme();
      if (theme !== this.lastEmittedTheme) {
        this.lastEmittedTheme = theme;
        this.themeChangeEv.emit(theme);
      }
    });
  }

  // ==============================================
  // Component Methods
  // ==============================================
  toggleOpen(): void {
    this.isOpen.set(!this.isOpen());
  }

  setTheme(theme: themeTypes): void {
    if (this.currentTheme() !== theme) {
      this.currentTheme.set(theme);
      this.userSelectedTheme.set(true);
    }
    this.isOpen.set(false);
  }

  // ==============================================
  // Host Listeners
  // ==============================================
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('zs-theme-toggle') && this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}
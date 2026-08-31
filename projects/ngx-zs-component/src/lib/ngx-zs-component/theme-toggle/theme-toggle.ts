import { Component, signal, HostListener, effect, output, input, linkedSignal, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
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
  readonly fromTop = input<number>(1/4);

  readonly panelTop = linkedSignal<number>(() => window.innerHeight * this.fromTop());
  private readonly pressTop = signal<number>(0);

  private isDragging = signal<boolean>(false);
  private startY = 0;
  private startTop = 0;

  private readonly transitionValue: string = 'zs:transition-[translate] zs:duration-300'
  readonly transition = signal<string>('')

  // ==============================================
  // Outputs
  // ==============================================
  readonly themeChangeEv = output<themeTypes>();


  // ==============================================
  // Lifecycle & Side Effects
  // ==============================================
  constructor() {
    const savedTop = localStorage.getItem('themeToggleTop');
    if (savedTop) {
      this.panelTop.set(+savedTop);
    }

    const savedTheme = localStorage.getItem('theme') as themeTypes | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
      this.currentTheme.set(savedTheme);
      this.userSelectedTheme.set(true);
    } else {
      this.currentTheme.set(systemPrefersDark.matches ? 'dark' : 'light');
    }

    effect((onCleanup) => {
      const listener = (e: MediaQueryListEvent) => {
        if (!this.userSelectedTheme()) {
          this.currentTheme.set(e.matches ? 'dark' : 'light');
        }
      };

      systemPrefersDark.addEventListener('change', listener);
      onCleanup(() => systemPrefersDark.removeEventListener('change', listener));
    });

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
  isDragged(): boolean {
    const DRAG_THRESHOLD = 6; // px

    const moved =
      Math.abs(this.panelTop() - this.pressTop()) > DRAG_THRESHOLD;

    if (moved) {
      this.pressTop.set(this.panelTop());
      return true;
    }

    return false
  }

  toggleOpen(): void {
    if(this.isDragged()) return;
    this.transition.set(this.transitionValue);

    this.isOpen.set(!this.isOpen());
  }

  setTheme(theme: themeTypes): void {
    if(this.isDragged()) return;
    this.transition.set(this.transitionValue);

    if (this.currentTheme() !== theme) {
      this.currentTheme.set(theme);
      this.userSelectedTheme.set(true);
    }
    this.isOpen.set(false);
  }

  onDragStart(event: PointerEvent): void {
    this.isDragging.set(true);
    this.startY = event.clientY;
    this.startTop = this.panelTop();

    this.transition.set('');
    this.pressTop.set(this.panelTop());

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  private animationFrameId: number | null = null;
  onDragMove(event: PointerEvent): void {
    if (!this.isDragging()) return;

    const deltaY = event.clientY - this.startY;
    const minTop = 80;
    const maxTop = window.innerHeight - 120;
    let targetTop = this.startTop + deltaY;
    targetTop = Math.max(minTop, Math.min(maxTop, targetTop));

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.panelTop.set(targetTop);

      this.startY = event.clientY;
      this.startTop = targetTop;
      this.animationFrameId = null;
    });
  }

  onDragEnd(event: PointerEvent): void {
    this.isDragging.set(false);
    localStorage.setItem('themeToggleTop', String(this.panelTop()));
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
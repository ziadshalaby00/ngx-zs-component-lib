import { Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { FormPaletteMap, FormStyle } from '../palette-service';

// ==============================================================================
// Types
// ==============================================================================
export interface VariantType {
  border?: boolean,
  border_hover?: boolean,
  shadow?: boolean,
}

export type AnimationType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'none';

// ==============================================================================
// Component
// ==============================================================================
@Component({
  selector: 'ZS-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  // ==========================================================================
  // Inputs
  // ==========================================================================
  readonly cardStyle = input<FormStyle>('primary');
  readonly variant = input<VariantType>();
  readonly clickable = input<boolean>(false);
  readonly animation = input<AnimationType>('none');
  readonly bodyClass = input<string>('zs:bg-gray-100 zs:dark:bg-gray-800');

  // ==========================================================================
  // Local State
  // ==========================================================================
  readonly cardRef = viewChild<ElementRef>('cardRef');
  readonly isVisible = signal(false);

  constructor() {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.isVisible.set(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    queueMicrotask(() => {
      const el = this.cardRef()?.nativeElement;
      if (el) observer.observe(el);
    });
  }

  // ==========================================================================
  // Computed Classes
  // ==========================================================================
  readonly classList = computed(() => {
    const style = this.cardStyle();
    const variant = this.variant();
    const clickable = this.clickable();
    const animation = this.animation();
    const visible = this.isVisible();
    const bodyClass = this.bodyClass();

    const palette = FormPaletteMap.get(style) ?? {
      border: '',
      borderHover: '',
      ring: '',
    };

    const base = 'zs:w-full zs:h-full zs:overflow-hidden zs:flex zs:flex-col zs:gap-4 zs:rounded-lg zs:transition-all zs:duration-300';

    // ---------------------
    // Border Handling
    // ---------------------
    const border = (variant?.border ?? true) ? `zs:border ${palette.border}` : 'zs:border-0';

    // ---------------------
    // Shadow Handling
    // ---------------------
    const shadowClasses = (variant?.shadow ?? true)
      ? 'zs:shadow-md zs:dark:shadow-slate-700/50 zs:hover:shadow-lg'
      : 'zs:shadow-none';

    // ---------------------
    // Hover Border Handling
    // ---------------------
    const hoverBorder = (variant?.border_hover ?? true) ? palette.borderHover : '';

    // ---------------------
    // Clickable / Focus Effects
    // ---------------------
    const clickEffects = clickable
      ? `zs:cursor-pointer zs:hover:scale-[1.02] zs:active:scale-[0.97] zs:focus-visible:ring-2 ${palette.ring}`
      : '';

    // ---------------------
    // Animation Handling
    // ---------------------
    const animationClass = animation !== 'none' ? `animate-from-${animation}` : '';
    const visibleClass = visible ? 'animate-visible' : '';

    // ---------------------
    // Combine Classes
    // ---------------------
    return [
      base,
      border,
      hoverBorder,
      bodyClass,
      shadowClasses,
      clickEffects,
      animationClass,
      visibleClass
    ]
      .filter(Boolean)
      .join(' ');
  });
}
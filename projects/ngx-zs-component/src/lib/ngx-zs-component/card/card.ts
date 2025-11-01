import { Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { FormPaletteMap, FormStyle } from '../palette-service';
import { VisibilityObserverService } from '../visibility-observer/visibility-observer-service';
import { CommonModule } from '@angular/common';

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
  styleUrl: './card.css',
  imports: [CommonModule]
})
export class Card {
  readonly visibility = inject(VisibilityObserverService)

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
    queueMicrotask(() => {
      const el = this.cardRef()?.nativeElement;
      if (!el) return;

      this.visibility.observe(el, () => {
        this.isVisible.set(true);
      })
    });
  }

  // ==========================================================================
  // Computed Classes
  // ==========================================================================

  readonly visibleClasses  = computed<string>(() => {
    const visible = this.isVisible();
    return visible ? 'animate-visible' : '';
  })

  readonly animationClasses = computed<string>(() => {
    const animation = this.animation();
    return animation !== 'none' ? `animate-from-${animation}` : '';
  })

  readonly classList = computed<string>(() => {
    const style = this.cardStyle();
    const variant = this.variant();
    const clickable = this.clickable();
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
    // Combine Classes
    // ---------------------
    return [
      base,
      border,
      hoverBorder,
      bodyClass,
      shadowClasses,
      clickEffects,
    ]
      .filter(Boolean)
      .join(' ');
  });
}
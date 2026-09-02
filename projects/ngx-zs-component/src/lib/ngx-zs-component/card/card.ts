import { Component, computed, ElementRef, inject, input, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { cardPaletteMap, FormStyle, ringPaletteMap } from '../palette-service';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  readonly isVisible = signal<boolean>(false);

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

  readonly animationClasses = computed<string>(() => {
    const animation = this.animation();
    const visible = this.isVisible();

    const animateMap: Record<AnimationType, string> = {
      'top': 'zs:-translate-y-8',
      'bottom': 'zs:translate-y-8',
      'left': 'zs:-translate-x-8',
      'right': 'zs:translate-x-8',
      'top-left': 'zs:-translate-y-8 zs:-translate-x-8',
      'top-right': 'zs:-translate-y-8 zs:translate-x-8',
      'bottom-left': 'zs:translate-y-8 zs:-translate-x-8',
      'bottom-right': 'zs:translate-y-8 zs:translate-x-8',
      'none': ''
    };

    if (visible) {
      return `zs:opacity-100
      zs:translate-x-0
      zs:translate-y-0`;
    }

    // Hidden state
    if (animation === 'none') {
      return 'zs:opacity-100';
    }

    return [
      'zs:opacity-0',
      animateMap[animation],
    ].filter(Boolean).join(' ');
  });

  readonly classList = computed<string>(() => {
    const style = this.cardStyle();
    const variant = this.variant();
    const clickable = this.clickable();
    const bodyClass = this.bodyClass();

    const ringPalette = ringPaletteMap.get(style)!;
    const cardPalette = cardPaletteMap.get(style)!;

    const base =
      `zs:w-full zs:h-full zs:flex zs:flex-col zs:gap-4
      zs:transition-[transform,translate,scale,opacity]
      zs:duration-[500ms,500ms,250ms,500ms]
      zs:transform-gpu zs:rounded-lg 
      zs:motion-reduce:transition-none`;

    // ---------------------
    // Border Handling
    // ---------------------
    const border = (variant?.border ?? true) ? `zs:border ${cardPalette.border}` : 'zs:border-0';

    // ---------------------
    // Shadow Handling
    // ---------------------
    const shadowClasses = (variant?.shadow ?? true)
      ? 'zs:shadow-md zs:dark:shadow-slate-700/50 zs:hover:shadow-lg'
      : 'zs:shadow-none';

    // ---------------------
    // Hover Border Handling
    // ---------------------
    const hoverBorder = (variant?.border_hover ?? true) ? cardPalette.borderHover : '';

    // ---------------------
    // Clickable / Focus Effects
    // ---------------------
    const clickEffects = clickable
      ? `zs:cursor-pointer zs:hover:scale-[1.02] zs:active:scale-[0.97] zs:focus-visible:ring-2 ${ringPalette.ring}`
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
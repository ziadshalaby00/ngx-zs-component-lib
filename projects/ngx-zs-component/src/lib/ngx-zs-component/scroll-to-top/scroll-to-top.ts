// ========================================================================
// Imports
// ========================================================================

import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, input, signal } from '@angular/core';
import { BaseColors, ColorMapping } from '../palette-service';
import { zIndices, ZIndicesType } from '../z-index';


// ========================================================================
// Types
// ========================================================================

export type PositionType = 'left' | 'right';


// ========================================================================
// Component Declaration
// ========================================================================

@Component({
  selector: 'ZS-scroll-to-top',
  imports: [CommonModule],
  templateUrl: './scroll-to-top.html',
  styleUrl: './scroll-to-top.css'
})
export class ScrollToTop {
    readonly zIndices: ZIndicesType = zIndices;
  
  // ========================================================================
  // Inputs
  // ========================================================================

  /**
   * Determines the horizontal position of the button ('left' or 'right').
   * Default: 'right'
   */
  readonly position = input<PositionType>('right');

  /**
   * Tailwind CSS class for the circle's color (background ring).
   */
  readonly circleColorClass = input<string>('zs:text-gray-400/60 zs:dark:text-gray-600/70 zs:group-hover:brightness-110');

  /**
   * BaseColors class for the arrow and progress indicator color.
   */
  readonly arrowProgressColor = input<BaseColors>('blue');


  // ========================================================================
  // Constants
  // ========================================================================

  private readonly circleRadius: number = 22;
  readonly circleCircumference: number = 2 * Math.PI * this.circleRadius;


  // ========================================================================
  // Internal State
  // ========================================================================

  readonly scrollY = signal<number>(0);


  // ========================================================================
  // Computed Properties
  // ========================================================================
  readonly arrowProgressColorClass = computed<string>(() => 
    ColorMapping.get(this.arrowProgressColor())?.text ?? 'zs:text-blue-600'
  );

  /**
   * Computes the stroke-dashoffset for the progress circle based on scroll position.
   */
  readonly progressOffset = computed<number>(() => {
    const _ = this.scrollY();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? this.scrollY() / maxScroll : 0;
    return this.circleCircumference * (1 - progress);
  });

  /**
   * Returns Tailwind classes to position the button horizontally.
   */
  readonly positionClass = computed<{
    'zs:right-4': boolean;
    'zs:left-4': boolean;
  }>(() => ({
    'zs:right-4': this.position() === 'right',
    'zs:left-4': this.position() === 'left',
  }));


  // ========================================================================
  // Lifecycle Hooks
  // ========================================================================
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.scrollY.set(window.scrollY);
  }


  // ========================================================================
  // Event Handlers
  // ========================================================================
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
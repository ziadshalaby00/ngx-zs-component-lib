// =================================================================================================
// Types
// =================================================================================================

export type LoaderType = 'spinner' | 'pro' | 'double' | 'gear' | 'fan' | 'pulse' | 'dots' | 'bars';

// =================================================================================================
// Component Definition
// =================================================================================================

import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { BaseColors, BaseSize, ColorMapping } from '../palette-service';
import { zIndices, ZIndicesType } from '../z-index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ZS-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './spinner.css'
})
export class Spinner {
  readonly zIndices: ZIndicesType = zIndices;
  
  // =================================================================================================
  // Inputs
  // =================================================================================================

  readonly loading = input<boolean>(false);
  readonly isFloating = input<boolean>(false);
  readonly color = input<BaseColors>('blue');
  readonly withBox = input<boolean>(false);
  readonly boxColorClass = input<string>('zs:bg-gray-300/90 zs:dark:bg-gray-400/80');
  readonly type = input<LoaderType>('spinner');
  readonly size = input<BaseSize>('md');

  // =================================================================================================
  // Computed Properties
  // =================================================================================================

  readonly wrapperClasses = computed<string>(() =>
    this.isFloating()
      ? `zs:fixed zs:inset-0 zs:flex zs:items-center zs:justify-center 
      ${ this.zIndices.spinner } zs:bg-black/50 zs:dark:bg-black/70`
      : 'zs:flex zs:items-center zs:justify-center'
  );

  readonly boxClasses = computed<string>(() =>
    this.withBox()
      ? `zs:p-5 zs:rounded-lg zs:shadow-md ${this.boxColorClass()}`
      : ''
  );

  readonly spinnerSizeTextClass = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:text-3xl',
      md: 'zs:text-5xl',
      lg: 'zs:text-7xl'
    };
    return sizes[this.size()];
  });

  readonly spinnerSizeDotsClass = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:size-2',
      md: 'zs:size-4',
      lg: 'zs:size-6'
    };
    return sizes[this.size()];
  });

  readonly spinnerSizeBarsClass = (num: number): string => {
    const sizes: Record<BaseSize, string[]> = {
      sm: ['zs:w-1 zs:h-3', 'zs:w-1 zs:h-3.5', 'zs:w-1 zs:h-4'],
      md: ['zs:w-1.5 zs:h-6', 'zs:w-1.5 zs:h-8', 'zs:w-1.5 zs:h-10'],
      lg: ['zs:w-2 zs:h-8', 'zs:w-2 zs:h-9', 'zs:w-2 zs:h-10']
    };
    return sizes[this.size()][num - 1];
  };

  readonly spinnerSizeProClass = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:border-t-3 zs:border-b-3 zs:size-7',
      md: 'zs:border-t-5 zs:border-b-5 zs:size-12',
      lg: 'zs:border-t-7 zs:border-b-7 zs:size-18'
    };
    return sizes[this.size()];
  });

  readonly spinnerSizePulseClass = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:border-3 zs:size-7',
      md: 'zs:border-5 zs:size-12',
      lg: 'zs:border-7 zs:size-18'
    };
    return sizes[this.size()];
  });

  readonly spinnerSizeDoubleClass = (num: 1 | 2): string => {
    const sizes: Record<BaseSize, { 1: string; 2: string }> = {
      sm: { 1: 'zs:border-3 zs:size-7', 2: 'zs:border-3 zs:size-5' },
      md: { 1: 'zs:border-5 zs:size-12', 2: 'zs:border-5 zs:size-8.5' },
      lg: { 1: 'zs:border-7 zs:size-18', 2: 'zs:border-7 zs:size-13' }
    };
    return sizes[this.size()][num];
  };

  readonly bgColor = computed<string | undefined>(() =>
    ColorMapping.get(this.color())?.bg
  );

  readonly borderColor = computed<string | undefined>(() =>
    ColorMapping.get(this.color())?.border
  );

  readonly textColor = computed<string | undefined>(() =>
    ColorMapping.get(this.color())?.text
  );
}
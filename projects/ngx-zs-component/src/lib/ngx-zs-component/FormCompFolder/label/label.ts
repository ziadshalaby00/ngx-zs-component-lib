// ==============================================
// Component Metadata
// ==============================================
import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { BaseSize } from '../../palette-service';
import { CommonModule } from '@angular/common';

type sizeClassesType = Record<BaseSize, { label: string; hint: string }>;

@Component({
  selector: 'ZS-label',
  imports: [CommonModule],
  templateUrl: './label.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './label.css'
})
export class Label {

  // ==============================================
  // Label & Hint Configuration
  // ==============================================
  readonly label   = input<string | null>(null);
  readonly hint    = input<string | null>(null);
  readonly hintId  = input<string | null>(null);
  readonly size    = input<BaseSize>('md')

  // ==============================================
  // Accessibility & State Inputs
  // ==============================================
  readonly required = input<boolean>(false);
  readonly for      = input<string | null>(null);

  
  // ==============================================
  // Computed Classes
  // ==============================================
  readonly sizeClasses = computed<{ label: string; hint: string }>(() => {
    const sizes: sizeClassesType = {
      sm: { label: 'zs:text-xs', hint: 'zs:text-[10px]' },
      md: { label: 'zs:text-sm', hint: 'zs:text-xs' },
      lg: { label: 'zs:text-base', hint: 'zs:text-sm' },
    };
    return sizes[this.size()];
  });
}
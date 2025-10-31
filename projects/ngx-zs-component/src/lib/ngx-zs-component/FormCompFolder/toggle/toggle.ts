import { Component, computed, input, model } from '@angular/core';
import { BaseColors, BaseSize, ColorMapping } from '../../palette-service';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ZS-toggle',
  imports: [Label, CommonModule],
  templateUrl: './toggle.html',
  styleUrl: './toggle.css'
})
export class Toggle {
  // ==============================================
  // Inputs
  // ==============================================
  readonly Id = input<string>(crypto.randomUUID());
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly color = input<BaseColors>('blue');
  readonly disabled = input<boolean>(false);
  readonly isReadonly = input<boolean>(false);
  readonly icon = input<string>('')
  readonly size = input<BaseSize>('md')

  // ==============================================
  // Model
  // ==============================================
  readonly value = model<boolean>(false);

  // ==============================================
  // Computed Signals
  // ==============================================
  readonly toggleClasses = computed<string>(() => {
    const disabledClass = this.disabled() ? 'zs:opacity-60' : '';
    const interactionClass = this.disabledOrReadonly() ? 'zs:cursor-not-allowed' : '';

    return [
      disabledClass,
      interactionClass
    ].join(' ')
  })

  readonly colorClasses = (type: 'border' | 'bg' | 'text') => {
    const color = ColorMapping.get(this.color());
    if (!color) return '';

    return color[type]
  };

  readonly btnSize = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:w-16 zs:h-8',
      md: 'zs:w-20 zs:h-10',
      lg: 'zs:w-24 zs:h-12'
    }
    return sizes[this.size()];
  })

  readonly wrapperSize = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:size-6 zs:text-[10px]',
      md: 'zs:size-8 zs:text-sm',
      lg: 'zs:size-10 zs:text-base'
    }
    return sizes[this.size()];
  })

  readonly transSize = computed<string>(() => {
    const sizes: Record<BaseSize, string> = {
      sm: 'zs:translate-x-7',
      md: 'zs:translate-x-9',
      lg: 'zs:translate-x-11'
    }
    return sizes[this.size()];
  })

  readonly isChecked = computed<boolean>(() => this.value());
  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.isReadonly());

  // ==============================================
  // Handlers
  // ==============================================
  toggleChecked() {
    if (this.disabledOrReadonly()) return;
    this.value.update(v => !v);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleChecked();
    }
  }
}

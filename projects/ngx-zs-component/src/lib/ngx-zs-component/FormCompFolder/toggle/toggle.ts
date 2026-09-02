import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  DisabledReason,
  FormCheckboxControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import {
  BaseColors,
  BaseSize,
  ColorMapping,
} from '../../palette-service';

import { Label } from '../label/label';
import { InputErrors } from '../input-errors/input-errors';

@Component({
  selector: 'ZS-toggle',
  imports: [
    CommonModule,
    Label,
    InputErrors,
  ],
  templateUrl: './toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './toggle.css',
})
export class Toggle implements FormCheckboxControl {

  // ==============================================
  // Inputs — Component API
  // ==============================================

  readonly Id = input<string>(crypto.randomUUID());

  readonly label = input<string | null>(null);

  readonly hint = input<string | null>(null);

  readonly color = input<BaseColors>('blue');

  readonly size = input<BaseSize>('md');

  readonly iconTpl = input<TemplateRef<any>>();


  // ==============================================
  // FormCheckboxControl
  // ==============================================

  /**
   * Main value of the toggle.
   *
   * Signal Forms uses `checked` for checkbox-style
   * controls.
   */
  readonly checked = model<boolean>(false);


  // ==============================================
  // FormUiControl
  // ==============================================

  // ----------------------------------------------
  // Interaction state
  // ----------------------------------------------

  readonly touched = input<boolean>(false);

  readonly dirty = input<boolean>(false);

  /**
   * Notify Signal Forms that the control was touched.
   */
  readonly touch = output<void>();


  // ----------------------------------------------
  // Availability state
  // ----------------------------------------------

  readonly disabled = input<boolean>(false);

  readonly readonly = input<boolean>(false);

  readonly hidden = input<boolean>(false);

  readonly disabledReasons =
    input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);


  // ----------------------------------------------
  // Validation state
  // ----------------------------------------------

  readonly errors =
    input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly invalid = input<boolean>(false);
  readonly showError = computed(() =>
    this.touched() &&
    this.invalid()
  );


  // ----------------------------------------------
  // Validation constraints
  // ----------------------------------------------

  readonly required = input<boolean>(false);


  // ----------------------------------------------
  // Field metadata
  // ----------------------------------------------

  readonly name = input<string>('');


  // ==============================================
  // Computed — State
  // ==============================================

  readonly isChecked = computed<boolean>(() => this.checked());

  readonly disabledOrReadonly = computed<boolean>(
    () => this.disabled() || this.readonly()
  );


  // ==============================================
  // Computed — Colors
  // ==============================================

  readonly colorClasses = (
    type: 'border' | 'bg' | 'text'
  ) => {

    const color = ColorMapping.get(this.color());

    if (!color) {
      return '';
    }

    return color[type];
  };


  // ==============================================
  // Computed — Toggle Classes
  // ==============================================

  readonly toggleClasses = computed<string>(() => {

    const disabledClass = this.disabled()
      ? 'zs:opacity-60'
      : '';

    const interactionClass = this.disabledOrReadonly()
      ? 'zs:cursor-not-allowed'
      : 'zs:cursor-pointer';

    return [
      disabledClass,
      interactionClass,
    ]
      .filter(Boolean)
      .join(' ');
  });


  // ==============================================
  // Computed — Button Size
  // ==============================================

  readonly btnSize = computed<string>(() => {

    const sizes: Record<BaseSize, string> = {
      sm: 'zs:w-16 zs:h-8',
      md: 'zs:w-20 zs:h-10',
      lg: 'zs:w-24 zs:h-12',
    };

    return sizes[this.size()];
  });


  // ==============================================
  // Computed — Switch Thumb Size
  // ==============================================

  readonly wrapperSize = computed<string>(() => {

    const sizes: Record<BaseSize, string> = {
      sm: 'zs:size-6 zs:text-[10px]',
      md: 'zs:size-8 zs:text-sm',
      lg: 'zs:size-10 zs:text-base',
    };

    return sizes[this.size()];
  });


  // ==============================================
  // Computed — Switch Translation
  // ==============================================

  readonly transSize = computed<string>(() => {

    const sizes: Record<BaseSize, string> = {
      sm: 'zs:translate-x-7',
      md: 'zs:translate-x-9',
      lg: 'zs:translate-x-11',
    };

    return sizes[this.size()];
  });


  // ==============================================
  // Handlers
  // ==============================================

  toggleChecked(): void {

    if (this.disabledOrReadonly()) {
      return;
    }

    this.checked.update(value => !value);

    /**
     * A toggle interaction is a discrete interaction.
     * Notify Signal Forms immediately.
     */
    this.touch.emit();
  }


  // ==============================================
  // Keyboard
  // ==============================================

  onKeyDown(event: KeyboardEvent): void {

    if (
      event.key === ' ' ||
      event.key === 'Enter'
    ) {

      event.preventDefault();

      this.toggleChecked();
    }
  }


  // ==============================================
  // Blur
  // ==============================================

  onBlur(): void {

    if (this.disabledOrReadonly()) {
      return;
    }

    this.touch.emit();
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
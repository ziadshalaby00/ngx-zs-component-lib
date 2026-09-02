import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, ChangeDetectionStrategy } from '@angular/core';
import { BaseSize, checkboxTextPaletteMap, ringPaletteMap, FormStyle } from '../../palette-service';
import { Label } from '../label/label';
import {
  FormCheckboxControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree
} from '@angular/forms/signals';
import { InputErrors } from '../input-errors/input-errors';

// ==============================================
// Types
// ==============================================

export type ChVariantType = 'solid' | 'regular'
export type ShapeType = 'square' | 'circle'


// ==============================================
// Class
// ==============================================

@Component({
  selector: 'ZS-checkbox',
  imports: [Label, CommonModule, InputErrors],
  templateUrl: './checkbox.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './checkbox.css'
})
export class Checkbox implements FormCheckboxControl {
  // ==============================================
  // Inputs — own component API (not tied to Signal Forms)
  // ==============================================

  readonly Id = input<string>(crypto.randomUUID());
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly inputStyle = input<FormStyle>('secondary');
  readonly size = input<BaseSize>('md');

  readonly variant = input<ChVariantType>('regular');
  readonly shape = input<ShapeType>('square');


  // ==============================================
  // FormCheckboxControl — required
  // ==============================================

  /**
   * Required by FormCheckboxControl. Renamed from `value` — a checkbox-style
   * control must NOT expose a `value` property, since FormField uses its
   * presence/absence (vs `checked`) to decide whether to treat the control
   * as a FormValueControl or a FormCheckboxControl. This is a breaking
   * rename: update checkbox.html and any consumer using [(value)] to
   * [(checked)].
   */
  readonly checked = model<boolean>(false);


  // ==============================================
  // FormUiControl — optional state, wired automatically by [formField]
  // ==============================================

  // Interaction state
  readonly touched = input<boolean>(false);
  /** Reports an interaction to Signal Forms (needed for e.g. debounce('blur')). */
  readonly touch = output<void>();
  readonly dirty = input<boolean>(false);

  // Availability state
  readonly disabled = input<boolean>(false);
  /**
   * Renamed from `isReadonly` to match FormUiControl's `readonly` exactly, so
   * [formField] can bind it automatically. Breaking rename — update
   * checkbox.html and any consumer using [isReadonly] to [readonly].
   */
  readonly readonly = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);

  // Validation state
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly invalid = input<boolean>(false);

  readonly showError = computed(() =>
    this.touched() &&
    this.invalid()
  );

  // Validation constraints
  readonly required = input<boolean>(false);

  // Field metadata
  readonly name = input<string>('');


  // ==============================================
  // Computed Signals
  // ==============================================

  readonly palette = computed<{
    checkboxTextPalette: { checkBoxText: string, checkBoxTextHover: string },
    ringPalette: { ring: string }
  }>(
    () => {
      const checkboxTextPalette = checkboxTextPaletteMap.get(this.inputStyle())!;
      const ringPalette = ringPaletteMap.get(this.inputStyle())!;
      return { checkboxTextPalette, ringPalette }
    }
  );

  readonly iconClasses = computed<string>(() => {
    const v: ChVariantType = this.variant()
    const s: ShapeType = this.shape()

    const variantClass: Record<'true' | 'false', Record<ChVariantType, string>> = {
      true: {
        solid: 'fa-solid',
        regular: 'fa-regular'
      },
      false: {
        solid: 'fa-regular',
        regular: 'fa-regular'
      }
    }
    const shapeClass: Record<'true' | 'false', Record<ShapeType, string>> = {
      true: {
        square: 'fa-square-check',
        circle: 'fa-circle-check'
      },
      false: {
        square: 'fa-square',
        circle: 'fa-circle'
      },
    }

    const disabledClass = this.disabled() ? 'zs:opacity-60' : '';
    const interactionClass = this.disabledOrReadonly() ? 'zs:cursor-not-allowed' : '';

    const state = this.checked() ? 'true' : 'false' as ('true' | 'false');
    return [
      variantClass[state][v],
      shapeClass[state][s],
      disabledClass,
      interactionClass
    ].filter(Boolean).join(' ')
  })

  readonly sizeClass = computed<string>(() => {
    const sizeClasses: Record<BaseSize, string> = {
      sm: 'zs:text-[20px]',
      md: 'zs:text-[30px]',
      lg: 'zs:text-[45px]'
    }
    return sizeClasses[this.size()]
  });

  readonly isChecked = computed<boolean>(() => this.checked());
  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.readonly());


  // ==============================================
  // Handlers
  // ==============================================

  toggleChecked() {
    if (this.disabledOrReadonly()) return;
    this.checked.update(v => !v);

    // A click is itself a discrete, committing interaction for a checkbox —
    // mark it touched right away rather than waiting for blur.
    this.touch.emit();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleChecked();
    }
  }

  /** Wire this to (blur) on the focusable element, e.g. for keyboard/tab-out interaction. */
  onBlur(): void {
    if (this.disabledOrReadonly()) return;
    this.touch.emit();
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
// field.ts
import { CommonModule } from '@angular/common';
import { Component, computed, input, TemplateRef } from '@angular/core';
import { inputPaletteMap, ringPaletteMap, BaseSize, FormStyle } from '../../palette-service';
import { Label } from '../label/label';
import { InputErrors } from '../input-errors/input-errors';

// ==============================================================================
// Types
// ==============================================================================

type SizeClassesType = 'container';

// ==============================================================================
// Constants
// ==============================================================================

const SIZE_CLASSES_MAP = new Map<SizeClassesType, Record<BaseSize, string>>([
  [
    'container',
    {
      sm: 'zs:px-2 zs:py-1 zs:rounded-md',
      md: 'zs:px-3 zs:py-2 zs:rounded-lg',
      lg: 'zs:px-4 zs:py-3 zs:rounded-lg',
    },
  ],
]);

// ==============================================================================
// Component Definition
// ==============================================================================
@Component({
  imports: [CommonModule, Label, InputErrors],
  selector: 'ZS-field',
  styleUrl: './field.css',
  templateUrl: './field.html',
})
export class Field {
  // ==============================================================================
  // Inputs
  // ==============================================================================

  readonly Id = input<string>(crypto.randomUUID());

  /** لازم يبقى نفس id بتاع الـ <input>/<textarea> اللي جوه ng-content عشان الـ label يتربط صح */
  readonly for = input<string | null>(null);

  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly required = input<boolean>(false);

  readonly fieldStyle = input<FormStyle>('secondary');
  readonly size = input<BaseSize>('md');

  readonly disabled = input<boolean>(false);
  readonly isReadonly = input<boolean>(false);

  readonly iconTpl = input<TemplateRef<any>>();

  /**
   * أخطاء جاية من بره (Signal Forms / Reactive Forms / أي منطق فاليديشن خاص بيك).
   * الكومبوننت ده مالوش أي فاليديشن جوانية خالص — هو بس بيعرض اللي إنت بتبعته.
   */
  readonly errors = input<string[]>([]);

  // ==============================================================================
  // Computed Properties
  // ==============================================================================

  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.isReadonly());

  readonly containerClasses = computed<string>(() => {
    const baseClasses =
      'zs:border zs:transition-[border-color,background-color,box-shadow,opacity] zs:duration-150 zs:ease-out zs:focus-within:ring-2 motion-reduce:zs:transition-none';
    const hasError = this.errors().length > 0;

    let styleConfig = inputPaletteMap.get(this.fieldStyle())!;
    let ringConfig = ringPaletteMap.get(this.fieldStyle())!;
    if (hasError) {
      styleConfig = inputPaletteMap.get('danger')!;
      ringConfig = ringPaletteMap.get('danger')!;
    }

    const disabledClass = this.disabled() ? 'zs:opacity-60' : '';
    const interactionClass = this.disabledOrReadonly()
      ? 'zs:cursor-not-allowed'
      : 'zs:cursor-text';

    return [
      baseClasses,
      styleConfig.border,
      styleConfig.borderHover,
      styleConfig.inputBg,
      styleConfig.text,
      ringConfig.ring,
      disabledClass,
      interactionClass,
    ]
      .filter(Boolean)
      .join(' ');
  });

  getSize(type: SizeClassesType): string {
    return SIZE_CLASSES_MAP.get(type)?.[this.size()] ?? '';
  }
}

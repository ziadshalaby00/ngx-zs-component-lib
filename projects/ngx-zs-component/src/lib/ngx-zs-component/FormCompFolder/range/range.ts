// ==============================================
// Imports
// ==============================================
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  model,
  output,
  signal,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
  DisabledReason,
} from '@angular/forms/signals';
import { BaseSize, buttonSolidPaletteMap, FormStyle, inputPaletteMap } from '../../palette-service';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';
import { InputErrors } from '../input-errors/input-errors';

// ==============================================
// Component Metadata
// ==============================================
@Component({
  selector: 'ZS-range',
  imports: [Label, CommonModule, InputErrors],
  templateUrl: './range.html',
  styleUrl: './range.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Range implements FormValueControl<number> {

  // ==============================================
  // Inputs (config)
  // ==============================================
  readonly Id = input<string>(crypto.randomUUID());
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);

  // NOTE: these two also double as the FormUiControl `min`/`max`
  // constraint pass-through. If a schema rule declares min()/max() on
  // the bound field, the FormField directive will overwrite these
  // inputs with the schema's values — which is actually the desired
  // behavior for a slider (constraint == visual bound). Just be aware
  // of it if you ever want the slider bounds to differ from the
  // validation bounds.
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);

  readonly theMin = computed(() => this.min() ?? 0);
  readonly theMax = computed(() => this.max() ?? 100);

  readonly step = input<number>(10);

  readonly inputStyle = input<FormStyle>('secondary');
  readonly size = input<BaseSize>('md');

  readonly showValue = input<boolean>(true);

  // ==============================================
  // FormUiControl — Availability state
  // ==============================================
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);

  // ==============================================
  // FormUiControl — Validation state
  // ==============================================
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly required = input<boolean>(false);

  // ==============================================
  // FormUiControl — Interaction state
  // ==============================================
  readonly touched = input<boolean>(false);
  readonly touch = output<void>();

  // ==============================================
  // Model (required by FormValueControl<number>)
  // ==============================================
  readonly value = model<number>(50);

  // ==============================================
  // References & Internal State
  // ==============================================
  readonly trackRef = viewChild<ElementRef<HTMLDivElement>>('track');
  readonly dragging = signal<boolean>(false);

  // ==============================================
  // Computed Properties
  // ==============================================
  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.readonly());

  readonly percent = computed<number>(() => {
    const range = this.theMax() - this.theMin();
    return ((this.value() - this.theMin()) / range) * 100;
  });

  rangeSizeClasses = (type: 'size' | 'height'): string => {
    const sizeClasses: Record<'size' | 'height', Record<BaseSize, string>> = {
      height: {
        sm: 'zs:h-1.5',
        md: 'zs:h-2.5',
        lg: 'zs:h-3.5',
      },
      size: {
        sm: 'zs:size-3.5',
        md: 'zs:size-5',
        lg: 'zs:size-7',
      }
    }
    return sizeClasses[type][this.size()]
  }

  readonly dotCLasses = computed<string>(() => {
    const sizeClasses: Record<BaseSize, string> = {
      sm: 'zs:text-[6px]',
      md: 'zs:text-[10px]',
      lg: 'zs:text-[14px]',
    }
    return sizeClasses[this.size()]
  })

  readonly gapCLasses = computed<string>(() => {
    const sizeClasses: Record<BaseSize, string> = {
      sm: 'zs:gap-3.5',
      md: 'zs:gap-4',
      lg: 'zs:gap-6',
    }
    return sizeClasses[this.size()]
  })

  readonly palette = computed<{
    buttonSolidPalette: {
      btnBG: string;
      btnBGHover: string;
    };
    inputPalette: {
      border: string;
      borderHover: string;
      inputBg: string;
      text: string;
    };
  }>(() => {
    const buttonSolidPalette = buttonSolidPaletteMap.get(this.inputStyle())!;
    const inputPalette = inputPaletteMap.get(this.inputStyle())!;
    return { buttonSolidPalette, inputPalette }
  })

  readonly rangeClasses = computed<string>(() => {
    const base = 'zs:relative zs:w-full zs:rounded-full zs:cursor-pointer';
    const sizeClasses = this.rangeSizeClasses('height');
    const disabledClass = this.disabled() ? 'zs:opacity-60' : '';
    const interactionClass = !this.disabledOrReadonly() ? 'zs:group' : '';
    const invalidClass = this.invalid() ? 'zs:ring-2 zs:ring-red-500' : '';

    return [
      sizeClasses,
      this.palette().inputPalette.border,
      this.palette().inputPalette.inputBg,
      this.palette().inputPalette.text,
      base,
      disabledClass,
      interactionClass,
      invalidClass,
    ].join(' ');
  });

  readonly ThumbClasses = computed<string>(() => {
    return [
      this.palette().buttonSolidPalette.btnBG,
      this.palette().buttonSolidPalette.btnBGHover,
      this.dragging() ? 'zs:scale-110 zs:shadow-lg' : '',
      this.rangeSizeClasses('size')
    ].join(' ')
  })

  // ==============================================
  // Event Handlers — pointer interaction
  // ==============================================
  onMouseDown(event: MouseEvent): void {
    if (this.disabledOrReadonly()) return;
    this.dragging.set(true);
    this.updateValueFromEvent(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.disabledOrReadonly() || !this.dragging()) return;
    this.updateValueFromEvent(event);
  }

  onMouseUp(): void {
    if (this.disabledOrReadonly()) return;
    if (this.dragging()) {
      this.dragging.set(false);
      // Report the interaction as a "blur" so debounce('blur') schemas work.
      this.touch.emit();
    }
  }

  // ==============================================
  // Event Handlers — keyboard interaction (a11y + lets the control
  // be usable/testable without a mouse, which Signal Forms consumers
  // will expect from any FormValueControl)
  // ==============================================
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabledOrReadonly()) return;

    const step = this.step();
    let delta = 0;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'Home':
        event.preventDefault();
        this.value.set(this.theMin());
        return;
      case 'End':
        event.preventDefault();
        this.value.set(this.theMax());
        return;
      default:
        return;
    }

    event.preventDefault();
    const next = Math.min(this.theMax(), Math.max(this.theMin(), this.value() + delta));
    this.value.set(next);
  }

  onBlur(): void {
    this.touch.emit();
  }

  // ==============================================
  // Private Helpers
  // ==============================================
  private updateValueFromEvent(event: MouseEvent): void {
    if (this.disabledOrReadonly()) return;

    const track = this.trackRef()?.nativeElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const percent = x / rect.width;
    const rawValue = this.theMin() + percent * (this.theMax() - this.theMin());

    const stepped = Math.round(rawValue / this.step()) * this.step();
    this.value.set(Math.min(this.theMax(), Math.max(this.theMin(), stepped)));
  }

  calcThumbPosition(): string {
    const p = this.percent();
    const track = this.trackRef()?.nativeElement;
    if (!track) return `${p}%`;

    const trackWidth = track.offsetWidth;
    const displacementSizes: Record<BaseSize, number> = {
      sm: 6,
      md: 10,
      lg: 14,
    };

    const displacementPx = displacementSizes[this.size()];
    const displacementPercent = (displacementPx / trackWidth) * 100;

    const displacement = p - displacementPercent;
    return `${displacement}%`;
  }

  // ==============================================
  // Lifecycle & Side Effects
  // ==============================================
  constructor() {
    const mouseUpHandler = this.onMouseUp.bind(this);
    const mouseMoveHandler = this.onMouseMove.bind(this);

    effect((): (() => void) | void => {
      if (!this.dragging()) return;

      window.addEventListener('mouseup', mouseUpHandler);
      window.addEventListener('mousemove', mouseMoveHandler);

      return () => {
        window.removeEventListener('mouseup', mouseUpHandler);
        window.removeEventListener('mousemove', mouseMoveHandler);
      };
    });
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
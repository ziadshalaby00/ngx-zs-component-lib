// ==============================================
// Imports
// ==============================================
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  model,
  signal,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import { BaseSize, buttonSolidPaletteMap, FormStyle, inputPaletteMap } from '../../palette-service';
import { Label } from '../label/label';
import { CommonModule } from '@angular/common';

// ==============================================
// Component Metadata
// ==============================================
@Component({
  selector: 'ZS-range',
  imports: [Label, CommonModule],
  templateUrl: './range.html',
  styleUrl: './range.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Range {

  // ==============================================
  // Inputs
  // ==============================================
  readonly Id = input<string>(crypto.randomUUID());
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);

  readonly min = input<number>(10);
  readonly max = input<number>(400);
  readonly step = input<number>(10);

  readonly inputStyle = input<FormStyle>('secondary');
  readonly size = input<BaseSize>('md');

  readonly disabled = input<boolean>(false);
  readonly isReadonly = input<boolean>(false);

  readonly showValue = input<boolean>(true);

  // ==============================================
  // Model
  // ==============================================
  readonly value = model<number>(200);

  // ==============================================
  // References & Internal State
  // ==============================================
  readonly trackRef = viewChild<ElementRef<HTMLDivElement>>('track');
  readonly dragging = signal<boolean>(false);

  // ==============================================
  // Computed Properties
  // ==============================================
  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.isReadonly());

  readonly percent = computed<number>(() => {
    const range = this.max() - this.min();
    return ((this.value() - this.min()) / range) * 100;
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

    return [
      sizeClasses,
      this.palette().inputPalette.border,
      this.palette().inputPalette.inputBg,
      this.palette().inputPalette.text,
      base,
      disabledClass,
      interactionClass
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
  // Event Handlers
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
    this.dragging.set(false);
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
    const rawValue = this.min() + percent * (this.max() - this.min());

    const stepped = Math.round(rawValue / this.step()) * this.step();
    this.value.set(Math.min(this.max(), Math.max(this.min(), stepped)));
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
}
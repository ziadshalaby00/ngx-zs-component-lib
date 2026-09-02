import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  TemplateRef,
  viewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { inputPaletteMap, BaseSize, FormStyle, ringPaletteMap } from '../../palette-service';
import { Label } from '../label/label';
import { InputErrors } from '../input-errors/input-errors';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree
} from '@angular/forms/signals';

// ==============================================================================
// Types
// ==============================================================================

export type DateType =
  | 'date' 
  | 'datetime-local' 
  | 'month' 
  | 'week' 
  | 'time';

export type InputType =
  | DateType 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'phone'
  | 'url'
  | 'search';

type SizeClassesType = 'container' | 'field' | 'leftIcon' | 'rightIcon';

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
  [
    'field',
    {
      sm: 'zs:text-xs',
      md: 'zs:text-sm',
      lg: 'zs:text-base',
    },
  ],
  [
    'leftIcon',
    {
      sm: 'zs:text-sm zs:mr-1.5',
      md: 'zs:text-base zs:mr-2',
      lg: 'zs:text-lg zs:mr-2.5',
    },
  ],
  [
    'rightIcon',
    {
      sm: 'zs:text-xs',
      md: 'zs:text-sm',
      lg: 'zs:text-base',
    },
  ],
]);

const DATE_ICON_MAP: Record<DateType, string> = {
  date: 'fas fa-calendar',
  'datetime-local': 'fas fa-calendar',
  month: 'fas fa-calendar-days',
  week: 'fas fa-calendar-week',
  time: 'fas fa-clock',
};

const ICONS = {
  spinner: 'fas fa-spinner fa-spin',
};

// ==============================================================================
// Component Definition
// ==============================================================================

@Component({
  selector: 'ZS-input',
  imports: [CommonModule, Label, InputErrors],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './input.css'
})
export class Input implements FormValueControl<string | number | null> {
  // ==============================================================================
  // Inputs — own component API (not tied to Signal Forms)
  // ==============================================================================

  readonly Id = input<string>(crypto.randomUUID());
  readonly iName = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly type = input<InputType>('text');
  readonly inputStyle = input<FormStyle>('secondary');

  readonly autocomplete = input<string | null>('off');
  readonly inputmode = input<string | null>(null);

  readonly iconTpl = input<TemplateRef<any>>();
  readonly showSearchIcon = input<boolean>(false);
  readonly showLoaderIconOnSearchInput = input<boolean>(false);

  readonly spellcheck = input<boolean>(false);

  // Native HTML min/max attribute (supports date strings e.g. "2024-01-01").
  // Renamed from `min`/`max` because those names now belong to FormUiControl's
  // numeric schema constraints below — see note further down.
  // BREAKING CHANGE for input.html: replace [min]="min()" / [max]="max()"
  // with [attr.min]="htmlMin()" / [attr.max]="htmlMax()".
  readonly htmlMin = input<string | number | null>(null);
  readonly htmlMax = input<string | number | null>(null);
  readonly step = input<number | null>(null);

  readonly autofocus = input<boolean>(false);
  readonly searchDebounceDelay = input<number>(300);
  readonly size = input<BaseSize>('md');

  // ==============================================================================
  // ViewChild
  // ==============================================================================

  readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputEl');

  // ==============================================================================
  // FormValueControl — required
  // ==============================================================================

  /** Required by FormValueControl<string | null>. Bound automatically by [formField]. */
  readonly value = model<string | number | null>(null);

  // ==============================================================================
  // FormUiControl — optional state, wired automatically by [formField] when present
  // ==============================================================================

  // Interaction state
  /** Kept as a model for backwards compatibility with any existing [(touched)] usage. */
  readonly touched = model<boolean>(false);
  /** Reports a blur to the form. Required for e.g. debounce('blur') to work. */
  readonly touch = output<void>();
  readonly dirty = input<boolean>(false);

  // Availability state
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);

  // Validation state
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly invalid = input<boolean>(false);

  // Validation constraints coming from schema rules (required()/min()/minLength()/...)
  readonly required = input<boolean>(false);
  readonly min = input<string | number | undefined>(undefined);
  readonly max = input<string | number | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  // Field metadata
  readonly name = input<string>('');

  // Kept for backwards compatibility with manual (non-schema) usage of the component.
  readonly minlength = input<number | null>(null);
  readonly maxlength = input<number | null>(null);

  // ==============================================================================
  // Model (kept)
  // ==============================================================================
  // (value/touched declared above, grouped with the rest of the FormValueControl contract)

  // ==============================================================================
  // Outputs
  // ==============================================================================

  readonly enterEv = output<void>();
  readonly focusEv = output<void>();
  readonly blurEv = output<void>();
  readonly changedEv = output<string | number | null>();
  readonly searchEv = output<string | number | null>();
  readonly clearedEv = output<void>();
  readonly keydownEv = output<KeyboardEvent>();

  // ==============================================================================
  // Internal State (Signals)
  // ==============================================================================

  readonly showPassword = signal<boolean>(false);
  private searchDebounceTimer?: ReturnType<typeof setTimeout>;
  readonly loaderIconOnSearchInput = signal<string | null>(null);

  // ==============================================================================
  // Computed Properties
  // ==============================================================================

  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.readonly());

  readonly containerClasses = computed<string>(() => {
    const baseClasses =
      'zs:border zs:transition-[border-color,background-color,box-shadow,opacity] zs:duration-150 zs:ease-out zs:focus-within:ring-2 motion-reduce:zs:transition-none';

    let styleConfig = inputPaletteMap.get(this.inputStyle())!;
    let ringConfig = ringPaletteMap.get(this.inputStyle())!;
    if (this.invalid()) {
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

  // Computed date icon
  readonly isDate = computed<boolean>(() => {
    const dateTypes: DateType[] = ['date', 'datetime-local', 'month', 'week', 'time'];
    return dateTypes.includes(this.type() as DateType);
  });

  readonly dateIcon = computed<string>(() => {
    return DATE_ICON_MAP[this.type() as DateType] || 'fas fa-calendar';
  });

  readonly showClear = computed<boolean>(() => this.type() !== 'password' && !!this.value());

  readonly supportsMinMaxStep = computed<boolean>(() => {
    const t = this.type();
    return this.isDate() || ['number'].includes(t);
  });

  /** Merges the schema-driven constraint with the manual (backwards-compat) one. */
  readonly effectiveMinLength = computed<number | undefined>(
    () => this.minLength() ?? this.minlength() ?? undefined
  );
  readonly effectiveMaxLength = computed<number | undefined>(
    () => this.maxLength() ?? this.maxlength() ?? undefined
  );

  // ==============================================================================
  // Getters
  // ==============================================================================

  get actualType(): string {
    if (this.type() === 'phone') return 'tel';
    if (this.type() === 'search') return 'text';
    if (this.type() === 'password' && this.showPassword()) return 'text';
    return this.type();
  }

  getSize(type: SizeClassesType): string {
    return SIZE_CLASSES_MAP.get(type)?.[this.size()] ?? '';
  }

  // ==============================================================================
  // Lifecycle Hooks
  // ==============================================================================

  ngAfterViewInit() {
    if (this.autofocus()) {
      queueMicrotask(() => this.inputEl()?.nativeElement.focus());
    }
  }

  // ==============================================================================
  // Event Handlers
  // ==============================================================================
  focusInput(event: MouseEvent): void {
    const input = (event.currentTarget as HTMLElement).querySelector('input');
    input?.focus();
  }

  onInput(event: Event): void {
    if (this.disabledOrReadonly()) return;

    const input = event.target as HTMLInputElement;

    let value: string | number | null = input.value;

    if (this.type() === 'number') {
      value = input.value === '' ? null : input.valueAsNumber;
    }

    this.value.set(value);

    if (this.type() === 'search') {
      if (this.showLoaderIconOnSearchInput()) {
        this.loaderIconOnSearchInput.set(ICONS.spinner);
      }

      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }

      this.searchDebounceTimer = setTimeout(() => {
        this.searchEv.emit(this.value());
        this.loaderIconOnSearchInput.set(null);
      }, this.searchDebounceDelay());
    }
  }

  onEnter(): void {
    if (this.disabledOrReadonly()) return;
    this.enterEv.emit();
  }

  onFocus(): void {
    this.focusEv.emit();
  }

  onBlur(): void {
    if (this.disabledOrReadonly()) return;

    this.touched.set(true);
    // Tells Signal Forms this field was blurred — required for e.g. debounce('blur').
    this.touch.emit();
    this.blurEv.emit();
  }

  onChange(): void {
    if (this.disabledOrReadonly()) return;
    this.touched.set(true);

    this.changedEv.emit(this.value());
  }

  onSearch(): void {
    if (this.disabledOrReadonly()) return;
    clearTimeout(this.searchDebounceTimer);
    this.searchEv.emit(this.value());
  }

  clear(): void {
    if (this.disabledOrReadonly()) return;
    clearTimeout(this.searchDebounceTimer);
    this.value.set(null);
    this.searchEv.emit(null);
    this.clearedEv.emit();
  }

  togglePassword(): void {
    if (this.disabledOrReadonly()) return;
    this.showPassword.update((v) => !v);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabledOrReadonly()) return;
    this.keydownEv.emit(event);
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
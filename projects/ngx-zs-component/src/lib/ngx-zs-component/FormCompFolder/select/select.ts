// =================================================================================================
// Imports
// =================================================================================================
import {
  Component,
  signal,
  computed,
  input,
  model,
  output,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FormValueControl,
  WithOptionalFieldTree,
  ValidationError,
  DisabledReason
} from '@angular/forms/signals';

import { Input } from '../input/input';
import { Label } from '../label/label';
import { FormStyle, inputPaletteMap, selectPaletteMap } from '../../palette-service';
import { InputErrors } from '../input-errors/input-errors';
import { zIndices, ZIndicesType } from '../../z-index';


// =================================================================================================
// Interfaces
// =================================================================================================
export interface DropdownItem<T> {
  id: T;
  name: string;
  [key: string]: any;
}

// =================================================================================================
// Component Declaration
// =================================================================================================
@Component({
  selector: 'ZS-select',
  imports: [CommonModule, FormsModule, Input, Label, InputErrors],
  templateUrl: './select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './select.css'
})
export class Select<T> implements FormValueControl<DropdownItem<T>[]> {
  readonly zIndices: ZIndicesType = zIndices;

  // =================================================================================================
  // Static configuration inputs
  // =================================================================================================
  readonly Id = input<string>(crypto.randomUUID());
  readonly items = input.required<DropdownItem<T>[]>();

  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);

  readonly inputStyle = input<FormStyle>('secondary');
  readonly placeholder = input<string>('Select an option...');

  readonly showSearch = input<boolean>(true);
  readonly searchPlaceholder = input<string>('Search...');

  readonly noResultsText = input<string>('No results found');
  readonly showClearButton = input<boolean>(true);

  readonly searchDebounceDelay = input<number>(300);
  readonly showLoaderIconOnSearchInput = input<boolean>(false);

  readonly multiple = input<boolean>(false);

  // =================================================================================================
  // FormValueControl — required value model.
  // NOTE: replaces the old `selectedItems` model. `[formField]` binds to
  // this signal directly, so there is no need for `preselectedIds` /
  // the old constructor effect anymore — pass the initial selection
  // through the form model you give to `form(...)` instead.
  // =================================================================================================
  readonly value = model<DropdownItem<T>[]>([]);

  // =================================================================================================
  // FormUiControl — optional state signals.
  // Any of these that exist on the component are auto-bound by
  // [formField] once it detects them; the rest are simply ignored
  // when the control is used outside a Signal Form.
  // =================================================================================================
  readonly disabled = input<boolean>(false);
  readonly hidden = input<boolean>(false);
  readonly required = input<boolean>(false);

  // Renamed from `isReadonly` -> `readonly` so [formField] can bind it.
  readonly readonly = input<boolean>(false);

  readonly touched = input<boolean>(false);
  readonly dirty = input<boolean>(false);

  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  readonly pending = input<boolean>(false);

  readonly showError = computed(() =>
    this.touched() &&
    this.invalid()
  );

  readonly disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly name = input<string>('');

  // Emitted on "blur" (dropdown closes / selection made in single mode)
  // so `debounce('blur')` and touched-tracking behave like a native control.
  readonly touch = output<void>();

  // =================================================================================================
  // Outputs (still useful for standalone / non-form usage)
  // =================================================================================================
  readonly selectedItemsEv = output<DropdownItem<T>[]>();
  readonly selectionClearedEv = output<void>();


  // =================================================================================================
  // Local Signals
  // =================================================================================================
  readonly isOpen = signal<boolean>(false);
  readonly searchQuery = signal<string | number | null>(null);


  // =================================================================================================
  // Computed Signals
  // =================================================================================================
  readonly styleEntry = computed<{
    inputEntry: {
      border: string;
      borderHover: string;
      inputBg: string;
      text: string;
    };
    selectEntry: {
      bgSelect: string;
      cleartext: string;
      cleartexthover: string;
    };
  }>(() => {
    // Previously referenced `this.error()`, which didn't exist on the
    // class — now driven by the real form-provided `invalid` / `errors`.
    const hasError = this.showError();

    let inputEntry = inputPaletteMap.get(this.inputStyle())!;
    let selectEntry = selectPaletteMap.get(this.inputStyle())!;

    if (hasError) {
      selectEntry = selectPaletteMap.get('danger')!;
      inputEntry = inputPaletteMap.get('danger')!;
    }

    return { inputEntry, selectEntry };
  });

  readonly disabledOrReadonly = computed<boolean>(
    () => this.disabled() || this.readonly()
  );

  readonly filteredItems = computed<DropdownItem<T>[]>(() => {
    const query = this.searchQuery();
    if (!query) return this.items();

    const lowerQuery = String(query).toLowerCase();
    return this.items().filter(item =>
      item.name.toLowerCase().includes(lowerQuery)
    );
  });

  readonly containerClasses = computed<string>(() => {
    const base = `
      zs:border zs:transition-opacity zs:duration-150
      zs:flex zs:items-center zs:justify-between
      zs:w-full zs:min-w-48 zs:px-3 zs:py-2
      zs:rounded-lg zs:shadow-sm
    `.trim();

    const disabledCls = this.disabled() ? 'zs:opacity-60' : '';
    const cursorCls = this.disabledOrReadonly()
      ? 'zs:cursor-not-allowed'
      : 'zs:cursor-text';

    const inputEntry = this.styleEntry().inputEntry;
    return [
      base,
      inputEntry.border,
      inputEntry.borderHover,
      inputEntry.inputBg,
      inputEntry.text,
      disabledCls,
      cursorCls
    ].filter(Boolean).join(' ');
  });

  readonly clearClass = computed<string>(() => {
    const base = 'zs:mt-2 zs:text-sm zs:flex zs:items-center';
    return [
      base,
      this.styleEntry().selectEntry.cleartext,
      this.styleEntry().selectEntry.cleartexthover
    ].filter(Boolean).join(' ');
  });

  readonly showItemsClass = computed<string>(() => {
    return this.styleEntry().selectEntry.bgSelect ?? '';
  });


  // =================================================================================================
  // Utility Methods
  // =================================================================================================
  readonly getBgSelectClasses = (selected: boolean): string => {
    return selected
      ? `${this.styleEntry().selectEntry.bgSelect} zs:hover:opacity-80`
      : 'zs:hover:bg-gray-200/50 zs:dark:hover:bg-gray-600/40';
  };


  // =================================================================================================
  // Public Methods
  // Note: no constructor effect anymore. Signal Forms manages field
  // state through its own internal effects — a control shouldn't run
  // its own effect against the same model signal (see "Making controls
  // reusable / Design considerations" in the Signal Forms guide).
  // =================================================================================================
  toggleDropdown(): void {
    if (this.disabledOrReadonly()) return;

    const willOpen = !this.isOpen();
    this.isOpen.set(willOpen);

    if (willOpen) {
      this.searchQuery.set(null);
    } else {
      // Closing the dropdown is this control's equivalent of a native blur.
      this.touch.emit();
    }
  }

  selectItem(items: DropdownItem<T>[]): void {
    if (!items?.length || !items[0]) return;

    if (this.multiple()) {
      const existing = this.value() ?? [];
      const clicked = items[0];

      const alreadySelected = existing.some(i => i?.id === clicked.id);
      const next = alreadySelected
        ? existing.filter(i => i?.id !== clicked.id)
        : [...existing, clicked];

      this.value.set(next);
      this.selectedItemsEv.emit(next);
    } else {
      this.value.set([items[0]]);
      this.selectedItemsEv.emit([items[0]]);
      this.isOpen.set(false);
      this.searchQuery.set(null);
      this.touch.emit();
    }
  }

  clearSelection(): void {
    if (this.disabledOrReadonly()) return;

    this.value.set([]);
    this.selectionClearedEv.emit();
    this.touch.emit();
  }

  inSelectItems(item?: DropdownItem<T>): boolean {
    if (!item) return false;
    return this.value()?.some(i => i?.id === item.id) ?? false;
  }

  trackByFn(_index: number, item: DropdownItem<T>): T {
    return item.id;
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
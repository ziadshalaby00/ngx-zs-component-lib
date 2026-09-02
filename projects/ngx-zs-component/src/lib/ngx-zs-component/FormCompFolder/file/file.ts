// ==============================================================================
// Imports
// ==============================================================================

import { Component, computed, ElementRef, input, model, output, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormStyle, inputPaletteMap, ringPaletteMap } from '../../palette-service';
import { Label } from '../label/label';
import { InputErrors } from '../input-errors/input-errors';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import {
  FormValueControl,
  ValidationError,
  DisabledReason,
  WithOptionalFieldTree
} from '@angular/forms/signals';

// ==============================================================================
// Types & Interfaces
// ==============================================================================

export interface FileData {
  name: string;
  size: number;
  type: string;
  url?: string;
  file: File;
}

export type FilesType = Map<string, FileData>;

// ==============================================================================
// Component Metadata
// ==============================================================================

@Component({
  selector: 'ZS-file',
  imports: [Label, InputErrors, CommonModule, Button],
  templateUrl: './file.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './file.css'
})
export class FileInput implements FormValueControl<FilesType> {

  // ==============================================================================
  // Inputs — own component API (not tied to Signal Forms)
  // ==============================================================================

  readonly Id = input<string>(crypto.randomUUID());
  readonly iName = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly inputStyle = input<FormStyle>('secondary');

  readonly autofocus = input<boolean>(false);

  readonly accept = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly allowPreview = input<boolean>(true);

  // ==============================================================================
  // FormValueControl — required
  // ==============================================================================

  /**
   * Required by FormValueControl<FilesType>. This is now the canonical model —
   * internal logic below reads/writes `value`, not `files`.
   *
   * NOTE: the schema's `required()` rule (and similar) typically checks for
   * null/undefined/empty-string/empty-array. An empty Map won't automatically
   * be treated as "empty" by those rules, since Map isn't one of the types they
   * check. If you need `required()` to work out of the box for "no files
   * selected", either validate file count via a custom schema rule (e.g.
   * `validate(path, ({value}) => value().size === 0 ? {kind: 'required'} : null)`),
   * or switch the value type to `FileData[]` instead of a Map.
   */
  readonly value = model<FilesType>(new Map());

  /**
   * Backwards-compat alias so existing template/consumer code referencing
   * `files()` keeps working. It's the exact same signal as `value` (same
   * object reference), so reads/writes through either name stay in sync.
   * If any consumer relies on template two-way binding `[(files)]="x"` from
   * OUTSIDE this component, prefer migrating them to `[(value)]` — aliasing
   * guarantees the signal stays in sync but doesn't re-register `files` as a
   * genuine Angular component input.
   */
  readonly files = this.value;

  // Interaction state
  readonly touched = input<boolean>(false);
  /** Reports a blur/interaction to Signal Forms — wire (blur) on the native file input to this. */
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

  readonly showError = computed(() =>
    this.touched() &&
    this.invalid()
  );

  // Validation constraints
  readonly required = input<boolean>(false);

  // Field metadata
  readonly name = input<string>('');

  // ==============================================================================
  // Outputs
  // ==============================================================================

  readonly changeEv = output<FileData[]>();

  // ==============================================================================
  // ViewChild
  // ==============================================================================

  readonly fileInputRef = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // ==============================================================================
  // Computed Properties
  // ==============================================================================

  readonly palette = computed<{
    inputPalette: {
      border: string;
      borderHover: string;
      inputBg: string;
      text: string;
    };
    ringPalette: {
      ring: string;
    };
  }>(() => {
    const inputPalette = inputPaletteMap.get(this.inputStyle())!;
    const ringPalette = ringPaletteMap.get(this.inputStyle())!;
    return { inputPalette, ringPalette};
  });

  readonly hasFiles = computed<boolean>(() => this.value().size > 0);

  readonly totalSize = computed<number>(() =>
    this.filesMapToList().reduce((sum, f) => sum + f.size, 0)
  );

  readonly disabledOrReadonly = computed<boolean>(() => this.disabled() || this.readonly());

  readonly filesMapToList = computed<FileData[]>(() => {
    const files = this.value();
    return files.size ? Array.from(files.values()) : [];
  });

  // ==============================================================================
  // Event Handlers
  // ==============================================================================

  handleFileChange(event: Event): void {
    if (this.disabledOrReadonly()) return;

    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const selected: FileData[] = Array.from(input.files).map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: this.allowPreview()
        ? URL.createObjectURL(f)
        : undefined,
      file: f,
    }));

    this.value.update((prev: FilesType) => {
      const multiple = this.multiple();

      // ==========================================
      // Single file → remove old files completely
      // ==========================================
      if (!multiple) {
        prev.forEach(file => {
          if (file.url?.startsWith('blob:')) {
            URL.revokeObjectURL(file.url);
          }
        });

        const next = new Map<string, FileData>();

        for (const nf of selected) {
          next.set(this.fileKey(nf), nf);
        }

        return next;
      }

      // ==========================================
      // Multiple files → keep existing files
      // ==========================================
      const next = new Map(prev);

      for (const nf of selected) {
        next.set(this.fileKey(nf), nf);
      }

      return next;
    });

    this.touch.emit();
    this.emitChangeValue(this.filesMapToList());

    // Allow selecting the same file again
    input.value = '';
  }

  removeFile(id: string): void {
    if (this.disabledOrReadonly()) return;

    this.value.update((prev: FilesType) => {
      const next = new Map(prev);
      const file = prev.get(id);

      if (file?.url?.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
      }

      next.delete(id);
      return next;
    });

    this.emitChangeValue(this.filesMapToList());

    // Reset native file input
    const inputEl = this.fileInputRef()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
    }
  }

  /** Wire this to (blur) on the native file input / trigger button so the
   * field registers as touched even when the user cancels the file dialog. */
  onBlur(): void {
    if (this.disabledOrReadonly()) return;

    this.touch.emit();
  }

  // ==============================================================================
  // Private Helpers
  // ==============================================================================

  formatSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  preview(url: string | undefined): void {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private fileKey(f: FileData): string {
    return `${f.name}_${f.size}_${f.type}`;
  }

  private emitChangeValue(value: FileData[]): void {
    this.changeEv.emit(value);
  }

  // ==============================================================================
  // Lifecycle Hooks
  // ==============================================================================

  ngOnDestroy(): void {
    this.value().forEach(f => {
      if (f.url?.startsWith('blob:')) {
        URL.revokeObjectURL(f.url);
      }
    });
  }

  readonly errorsUI = computed<string[]>(() => this.errors().map(v => v.message ?? ''));
}
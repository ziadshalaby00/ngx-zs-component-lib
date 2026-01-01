import { signal, WritableSignal, effect } from '@angular/core';

export type ZFormField<T> = WritableSignal<{
  value: T | null;
  valid: boolean;
  touched: boolean;
}>;

export type ZFormFieldMap<T extends Record<string, any>> = {
  [K in keyof T]: ZFormField<T[K]>;
};

export class Form<T extends Record<string, any>> {
  public readonly fields: ZFormFieldMap<T>;
  public readonly initialValues: T;

  constructor(initial: T) {
    this.initialValues = { ...initial };
    this.fields = Object.keys(initial).reduce((acc, key) => {
      (acc as any)[key] = signal({
        value: initial[key],
        valid: false,
        touched: false, 
      });
      return acc;
    }, {} as ZFormFieldMap<T>);
  }

  // ==============================================
  // Field Accessors
  // ==============================================

  public set<K extends keyof T>(key: K, value: T[K] | null, valid: boolean = true, touched: boolean = true): void {
    const current = this.fields[key]();
    this.fields[key].set({ value, valid, touched: touched || current.touched });
  }

  public patch<K extends keyof T>(key: K, partial: Partial<{ value: T[K] | null; valid: boolean; touched: boolean }>): void {
    const current = this.fields[key]();
    this.fields[key].set({ ...current, ...partial });
  }

  public get<K extends keyof T>(key: K): { value: T[K] | null; valid: boolean; touched: boolean } {
    return this.fields[key]();
  }

  // ==============================================
  // Form State & Validation
  // ==============================================

  public markAllTouched(): void {
    for (const key in this.fields) {
      const field = this.fields[key as keyof T]();
      this.fields[key as keyof T].set({ ...field, touched: true });
    }
  }

  public allTouched(): boolean {
    return Object.keys(this.fields).every(key => this.fields[key as keyof T]().touched);
  }

  // ==============================================
  // Reset
  // ==============================================

  public reset(): void {
    for (const key in this.fields) {
      this.fields[key as keyof T].set({
        value: this.initialValues[key as keyof T],
        valid: false,
        touched: false,
      });
    }
  }

  // ==============================================
  // Data Extraction & Submission
  // ==============================================

  public getValues(): T {
    const result: Partial<T> = {};
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        result[key] = this.fields[key]().value ?? undefined;
      }
    }
    return result as T;
  }

  public getValidations(): Record<keyof T, boolean> {
    const result: Partial<Record<keyof T, boolean>> = {};
    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        result[key] = this.fields[key]().valid;
      }
    }
    return result as Record<keyof T, boolean>;
  }

  public allFilled(): Record<keyof T, boolean> {
    const result: Partial<Record<keyof T, boolean>> = {};

    for (const key in this.fields) {
      if (this.fields.hasOwnProperty(key)) {
        const val = this.fields[key as keyof T]().value;
        result[key as keyof T] = val !== null && val !== undefined && val !== '';
      }
    }

    return result as Record<keyof T, boolean>;
  }

  public submit(
    callback: (values: T) => void,
    allowEmptyFields: (keyof T)[] = [],
    allowInvalidFields: (keyof T)[] = []
  ): void {
    this.markAllTouched();

    const filled = this.allFilled();
    const validations = this.getValidations();

    const allFilled = Object.keys(filled).every((key) => {
      if (allowEmptyFields.includes(key as keyof T)) return true;
      return filled[key as keyof T];
    });

    const allValid = Object.keys(validations).every((key) => {
      if (allowInvalidFields.includes(key as keyof T)) return true;
      return validations[key as keyof T];
    });

    if (!allFilled || !allValid) return;

    callback(this.getValues());
  }
}

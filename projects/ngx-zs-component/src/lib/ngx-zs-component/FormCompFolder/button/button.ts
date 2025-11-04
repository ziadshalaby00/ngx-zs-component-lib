// ==============================================
// Types
// ==============================================

export type ButtonVariant = 'solid' | 'outline';
export type BtnSizeType = 'xs' | BaseSize | 'xl'

// ==============================================
// Imports
// ==============================================

import {
  Component,
  input,
  computed,
  output,
} from '@angular/core';
import { FormStyle, BaseSize, buttonSolidPaletteMap, ringPaletteMap, buttonOutlinePaletteMap } from '../../palette-service';
import { CommonModule } from '@angular/common';


// ==============================================
// Component Metadata
// ==============================================

@Component({
  selector: 'ZS-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {


  // ==============================================
  // Inputs
  // ==============================================
  readonly Id = input<string>(crypto.randomUUID());
  readonly btnStyle = input<FormStyle>('primary');
  readonly variant = input<ButtonVariant>('solid');
  readonly size = input<BtnSizeType>('md');
  readonly disabled = input<boolean>(false);
  readonly icon = input<string | null>(null); // Optional FontAwesome icon class (e.g., "fa fa-plus")
  readonly type = input<'button' | 'submit' | 'reset'>('button');


  // ==============================================
  // Outputs
  // ==============================================

  readonly clickedEv = output<Event>();


  // ==============================================
  // Computed Properties
  // ==============================================

  readonly solidTextColor = computed<string>(() => {
    if(['primary', 'dark', 'violet', 'secondary'].includes(this.btnStyle())) 
      return 'zs:text-slate-100'
    return 'zs:text-slate-800 zs:dark:text-slate-100'
  });

  readonly baseClasses = computed<string>(() => {
    const size = this.size();
    const variant = this.variant();
    const solidPalette = buttonSolidPaletteMap.get(this.btnStyle())!;
    const outlinePalette = buttonOutlinePaletteMap.get(this.btnStyle())!;
    const ringConfig = ringPaletteMap.get(this.btnStyle())!;

    const solidPadding = {
      xs: 'zs:px-2 zs:py-1',
      sm: 'zs:px-3.5 zs:py-1.75',
      md: 'zs:px-5 zs:py-2.5',
      lg: 'zs:px-6.5 zs:py-3.25',
      xl: 'zs:px-8 zs:py-4',
    }[size];

    const outlinePadding = {
      xs: 'zs:px-[calc(--spacing(2)-1px)] zs:py-[calc(--spacing(2)-1px)]',
      sm: 'zs:px-[calc(--spacing(3.5)-1px)] zs:py-[calc(--spacing(1.75)-1px)]',
      md: 'zs:px-[calc(--spacing(5)-1px)] zs:py-[calc(--spacing(2.5)-1px)]',
      lg: 'zs:px-[calc(--spacing(6.5)-1px)] zs:py-[calc(--spacing(3.25)-1px)]',
      xl: 'zs:px-[calc(--spacing(8)-1px)] zs:py-[calc(--spacing(4)-1px)]',
    }[size];

    const solidClasses = this.join(
      solidPalette.btnBG,
      solidPalette.btnBGHover,
      'zs:hover:scale-[1.02]',
      'zs:shadow-md zs:dark:shadow-slate-700/50',
      'zs:hover:shadow-lg',
      'zs:active:shadow-sm',
      ['dark', 'secondary'].includes(this.btnStyle()) ? 'zs:dark:hover:shadow-sm' : '',
      this.solidTextColor(),
    );

    const outlineClasses = this.join(
      'zs:bg-transparent',
      'zs:border-[1px]',
      outlinePalette.border,
      outlinePalette.btnBGHover,
      outlinePalette.text,
      'zs:hover:text-gray-50',
      'zs:hover:shadow-sm',
    )

    const stateClasses = this.disabled()
      ? 'zs:opacity-60 zs:cursor-not-allowed zs:shadow-none'
      : this.join(
        'zs:active:scale-[0.97]',

        'zs:transition-[background-color,color,border-color,box-shadow,opacity]',
        'zs:duration-200',
        'zs:ease-in-out',
      )

    return this.join(
      variant === 'solid' ? solidPadding : outlinePadding,
      variant === 'solid' ? solidClasses : outlineClasses,
      stateClasses,
      ringConfig.ring,
      'zs:inline-flex zs:items-center zs:justify-center',
      ['xl'].includes(size) ? 'zs:rounded-xl' : 'zs:rounded-lg',
      'zs:focus-visible:ring-2',
      'zs:select-none',
      'zs:outline-hidden',
    )
  });


  // ==============================================
  // Methods
  // ==============================================
  private join(...classes: string[]): string {
    return classes.join(' ');
  }

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clickedEv.emit(event);
    }
  }
}
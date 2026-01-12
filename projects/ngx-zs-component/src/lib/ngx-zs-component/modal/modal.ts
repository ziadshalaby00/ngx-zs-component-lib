import { Component, computed, effect, HostListener, input, model, output, Signal, signal, TemplateRef, untracked } from '@angular/core';
import { BaseSize, FormStyle, modalPaletteMap } from '../palette-service';
import { Button, ButtonVariant } from '../FormCompFolder/button/button';
import { CommonModule } from '@angular/common';
import { zIndices, ZIndicesType } from '../z-index';


// ==============================================
// Interfaces
// ==============================================

export interface BtnType {
  show?: boolean;
  text?: string;

  btnStyle?: FormStyle;
  variant?: ButtonVariant;
  size?: BaseSize;
  iconTpl?: Signal<TemplateRef<any> | undefined> | null;
  disabled?: boolean;
}
export type BtnTypeDefault = Required<BtnType>;
export type Position = 'left top' | 'left bot' | 'right top' | 'right bot' | 'center' | 'top' | 'bot'

// ==============================================
// Maps
// ==============================================

const positionMap: Record<Position, string> = {
  'left top': 'zs:justify-start zs:items-start',
  'left bot': 'zs:justify-start zs:items-end',
  'right top': 'zs:justify-end zs:items-start',
  'right bot': 'zs:justify-end zs:items-end',
  'top': 'zs:justify-center zs:items-start',
  'bot': 'zs:justify-center zs:items-end',
  'center': 'zs:justify-center zs:items-center',
};

// ==============================================
// Component Metadata
// ==============================================

@Component({
  selector: 'ZS-modal',
  imports: [Button, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  readonly zIndices: ZIndicesType = zIndices;

  // ==============================================
  // Model
  // ==============================================

  /** 🔹 Model لتحديد الفتح والإغلاق */
  readonly open = model<boolean>(false);


  // ==============================================
  // Inputs
  // ==============================================

  readonly title = input<string>('Modal Title');
  readonly modalStyle = input<FormStyle>('primary');

  readonly showCancelIcon = input<boolean>(true);
  readonly showHeader = input<boolean>(true);
  readonly showBody = input<boolean>(true);
  readonly showFooter = input<boolean>(true);

  readonly cancelConfig = input<BtnType>();
  readonly confirmConfig = input<BtnType>();

  readonly position = input<Position>('center');
  readonly closeOnOverlay = input<boolean>(true);

  // ==============================================
  // Defaults
  // ==============================================

  readonly cancelConfigDefault: BtnTypeDefault = {
    show: true,
    text: 'Cancel',

    btnStyle: 'secondary',
    variant: 'outline',
    size: 'md',
    iconTpl: null,
    disabled: false
  }
  readonly confirmConfigDefault: BtnTypeDefault = {
    show: true,
    text: 'Confirm',

    btnStyle: 'primary',
    variant: 'solid',
    size: 'md',
    iconTpl: null,
    disabled: false
  }
  readonly cancelMerged = computed<{
    show: boolean;
    text: string;
    btnStyle: FormStyle;
    variant: ButtonVariant;
    size: BaseSize;
    iconTpl: Signal<TemplateRef<any> | undefined> | null;
    disabled: boolean;
  }>(() => ({
    ...this.cancelConfigDefault,
    ...(this.cancelConfig() ?? {})
  }));

  readonly confirmMerged = computed<{
    show: boolean;
    text: string;
    btnStyle: FormStyle;
    variant: ButtonVariant;
    size: BaseSize;
    iconTpl: Signal<TemplateRef<any> | undefined> | null;
    disabled: boolean;
  }>(() => ({
    ...this.confirmConfigDefault,
    ...(this.confirmConfig() ?? {})
  }));


  // ==============================================
  // Outputs
  // ==============================================

  readonly confirmEv = output<void>();
  readonly cancelEv = output<void>();
  readonly closedEv = output<void>();


  // ==============================================
  // Computed Signals
  // ==============================================

  readonly palette = computed<{
    border: string;
    text: string;
  }>(() => modalPaletteMap.get(this.modalStyle())!)

  readonly isOpen = signal<boolean>(false);
  readonly positionClass = computed<string>(() => positionMap[this.position()])

  private setTimeId?: ReturnType<typeof setTimeout>;
  constructor() {
    effect(() => {
      const state = this.open();
      if(state) this.isOpen.set(true)
      
      untracked(() => {
        clearTimeout(this.setTimeId);
        if (!state && this.isOpen()) {
          this.setTimeId = window.setTimeout(() => this.isOpen.set(false), 250);
        }
      })
    })

    effect(() => {
      const open = this.open();
      const classToBudy = 'zs:overflow-hidden';

      if(open) document.body.classList.add(classToBudy);
      else document.body.classList.remove(classToBudy);
    })
  }

  // ==============================================
  // Methods
  // ==============================================

  close() {
    this.open.set(false);
    this.closedEv.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (this.closeOnOverlay()) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) this.close();
  }
}
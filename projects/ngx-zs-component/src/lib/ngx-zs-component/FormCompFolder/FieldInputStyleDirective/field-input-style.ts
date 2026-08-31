import { Directive, ElementRef, inject, input, effect } from '@angular/core';
import { BaseSize } from '../../palette-service';

const FIELD_SIZE_CLASSES: Record<BaseSize, string> = {
  sm: 'zs:text-xs',
  md: 'zs:text-sm',
  lg: 'zs:text-base',
};

@Directive({
  selector: 'input[zsInputStyle], textarea[zsInputStyle], select[zsInputStyle]',
})
export class FieldInputStyle {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly size = input<BaseSize>('md');

  constructor() {
    this.el.nativeElement.classList.add(
      ...'zs:flex-1 zs:bg-transparent zs:outline-hidden zs:caret-current zs:w-full'.split(' ')
    );

    effect(() => {
      Object.values(FIELD_SIZE_CLASSES).forEach((cls) =>
        this.el.nativeElement.classList.remove(...cls.split(' '))
      );
      this.el.nativeElement.classList.add(...FIELD_SIZE_CLASSES[this.size()].split(' '));
    });
  }
}
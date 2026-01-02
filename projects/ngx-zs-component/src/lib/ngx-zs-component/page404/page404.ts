import { RouterModule } from '@angular/router';
import { Component, computed, effect, input, output, signal, TemplateRef, viewChild } from '@angular/core';
import { FormStyle, page404PaletteMap } from '../palette-service';
import { CommonModule } from '@angular/common';

interface Page404StyleType {
  btnBG: string;
  btnBGHover: string;
  iconText: string;
}

@Component({
  selector: 'ZS-page404',
  imports: [RouterModule, CommonModule],
  templateUrl: './page404.html',
  styleUrl: './page404.css'
})
export class Page404 {
  // ========================================================================
  // Inputs
  // ========================================================================
  readonly title = input<string>('Page Not Found');
  readonly message = input<string>('Hmm… this page doesn’t seem to exist. Try checking the URL or going back home.');
  readonly iconTpl = input<TemplateRef<any>>();
  readonly pageStyle = input<FormStyle | 'normal'>('normal');

  readonly showButton = input<boolean>(true);
  readonly buttonText = input<string>('Go Home');
  readonly routerLink = input<string>('/');

  // ========================================================================
  // Outputs
  // ========================================================================
  readonly style = computed<Page404StyleType>(() => {
    if(this.pageStyle() === 'normal') 
      return {
        btnBG: 'zs:bg-sky-500 zs:dark:bg-sky-600',
        btnBGHover: 'zs:hover:bg-sky-600 zs:dark:hover:bg-sky-500',
        iconText: 'zs:text-sky-600 zs:dark:text-sky-500'
      }

    const pallete: Page404StyleType = page404PaletteMap.get(this.pageStyle() as FormStyle)!
    return {
      btnBG: pallete.btnBG,
      btnBGHover: pallete.btnBGHover,
      iconText: pallete.iconText
    }
  });

  // ========================================================================
  // Outputs
  // ========================================================================
  readonly onAction = output<void>();
}

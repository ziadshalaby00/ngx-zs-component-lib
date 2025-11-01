import { RouterModule } from '@angular/router';
import { Component, computed, input, output } from '@angular/core';
import { FormPaletteEntry, FormPaletteMap, FormStyle } from '../palette-service';
import { CommonModule } from '@angular/common';

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
  readonly title = input('Page Not Found');
  readonly message = input('Hmm… this page doesn’t seem to exist. Try checking the URL or going back home.');
  readonly icon = input('fa-ghost');
  readonly pageStyle = input<FormStyle | 'normal'>('normal')

  readonly showButton = input(true);
  readonly buttonText = input('Go Home');
  readonly routerLink = input<string>('/');

  // ========================================================================
  // Outputs
  // ========================================================================
  readonly style = computed<{
    btnBG: string;
    btnBgHover: string;
    iconText: string;
  }>(() => {
    if(this.pageStyle() === 'normal') return {
      btnBG: 'zs:bg-sky-500 zs:dark:bg-sky-600',
      btnBgHover: 'zs:hover:bg-sky-600 zs:dark:hover:bg-sky-500',
      iconText: 'zs:text-sky-600 zs:dark:text-sky-500'
    }

    const pallete: FormPaletteEntry = FormPaletteMap.get(this.pageStyle() as FormStyle ?? 'violet')!
    return {
      btnBG: pallete.btnBG,
      btnBgHover: pallete.btnBGHover,
      iconText: pallete.checkBoxText
    }
  });

  // ========================================================================
  // Outputs
  // ========================================================================
  readonly onAction = output<void>();
}

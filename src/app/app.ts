import { Footer } from './../../projects/ngx-zs-component/src/lib/ngx-zs-component/footer/footer';
import { ScrollToTop } from './../../projects/ngx-zs-component/src/lib/ngx-zs-component/scroll-to-top/scroll-to-top';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './test/test';
import { ThemeToggle, themeTypes } from "../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle";
import { Button } from '../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/button/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Test,
    ThemeToggle,
    ScrollToTop,
    Footer,
    Button
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngx-zs-component-project');
  readonly setTheme = signal<themeTypes | null>(null)
}

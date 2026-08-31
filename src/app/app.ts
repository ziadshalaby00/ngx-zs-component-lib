import { Footer } from './../../projects/ngx-zs-component/src/lib/ngx-zs-component/footer/footer';
import { ScrollToTop } from './../../projects/ngx-zs-component/src/lib/ngx-zs-component/scroll-to-top/scroll-to-top';
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle, themeTypes } from "../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle";
import { Button } from '../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/button/button';
import { Alert } from '../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert/alert';
import { AlertService } from '../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert-service/alert-service';
import { DemoAll } from './demo-all/demo-all';

@Component({
  selector: 'app-root',
  imports: [
    Alert,
    DemoAll
],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngx-zs-component-project');
  readonly setTheme = signal<themeTypes | null>(null)
}

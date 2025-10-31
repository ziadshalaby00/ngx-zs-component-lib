import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './test/test';
import { ThemeToggle } from "../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle";
// import { Input } from './ngx-zs-component/FormCompFolder/input/input';
// import { Range } from './ngx-zs-component/FormCompFolder/range/range';
// import { Alert } from './ngx-zs-component/AlertFolder/alert/alert';
// import { Card } from './ngx-zs-component/card/card';
// import { Carousel } from './ngx-zs-component/carousel/carousel';
// import { Connection } from './ngx-zs-component/connection/connection';
// import { Button } from './ngx-zs-component/FormCompFolder/button/button';
// import { Checkbox } from './ngx-zs-component/FormCompFolder/checkbox/checkbox';
// import { FileInput } from './ngx-zs-component/FormCompFolder/file/file';
// import { Select } from './ngx-zs-component/FormCompFolder/select/select';
// import { Toggle } from './ngx-zs-component/FormCompFolder/toggle/toggle';
// import { Modal } from './ngx-zs-component/modal/modal';
// import { Navbar } from './ngx-zs-component/navbar/navbar';
// import { NavItem } from './ngx-zs-component/NavItemFolder/nav-item/nav-item';
// import { Page404 } from './ngx-zs-component/page404/page404';
// import { Pagination } from './ngx-zs-component/pagination/pagination';
// import { ScrollToTop } from './ngx-zs-component/scroll-to-top/scroll-to-top';
// import { Spinner } from './ngx-zs-component/spinner/spinner';
// import { ThemeToggle } from './ngx-zs-component/theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Test,
    ThemeToggle
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngx-zs-component-project');
}

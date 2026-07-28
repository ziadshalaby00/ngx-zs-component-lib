import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// استيراد جميع المكونات من المكتبة
import { Alert } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert/alert';
import { AlertService } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert-service/alert-service';
import { Button } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/button/button';
import { Checkbox } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/checkbox/checkbox';
import { FileInput } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/file/file';
import { Input } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/input/input';
import { Label } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/label/label';
import { Range } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/range/range';
import { Select } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/select/select';
import { Toggle } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/toggle/toggle';
import { Card } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/card/card';
import { Carousel } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/carousel/carousel';
import { Connection } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/connection/connection';
import { Footer } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/footer/footer';
import { Modal } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/modal/modal';
import { Navbar } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/navbar/navbar';
import { NavItem } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/NavItemFolder/nav-item/nav-item';
import { Page404 } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/page404/page404';
import { Pagination } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/pagination/pagination';
import { ScrollToTop } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/scroll-to-top/scroll-to-top';
import { Sidebar } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/sidebar/sidebar';
import { Spinner } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/spinner/spinner';
import { ThemeToggle } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle';

// أنواع مساعدة
import { DropdownItem } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/select/select';
import { NavbarItem } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/NavItemFolder/nav-item/nav-item';
import { NavItemsType } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/navbar/navbar';

@Component({
  selector: 'app-demo-all',
  standalone: true,
  imports: [
    CommonModule,
    Alert,
    Button,
    Checkbox,
    FileInput,
    Input,
    Label,
    Range,
    Select,
    Toggle,
    Card,
    Carousel,
    Connection,
    Footer,
    Modal,
    Navbar,
    NavItem,
    Page404,
    Pagination,
    ScrollToTop,
    Sidebar,
    Spinner,
    ThemeToggle,
  ],
  templateUrl: './demo-all.html',
  styleUrls: ['./demo-all.css']
})
export class DemoAll {

}
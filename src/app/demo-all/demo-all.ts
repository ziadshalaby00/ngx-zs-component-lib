import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import all library components & services
import {
  Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
  Alert, Card, Carousel, Modal, Navbar, NavItem, Sidebar,
  Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer,
  AlertService, Form, ExtractorService,
  FormStyle, BaseColors, BaseSize, DropdownItem, NavbarItem, AlertType,
  FilesType, FileData, ChangeEventType, VariantType, AnimationType,
  NavItemsType, UserItemsType, UserProfile, AuthButtonsType, MobileModeType,
  BtnType, Position, LoaderType, ValidatorFn
} from '../../../projects/ngx-zs-component/src/public-api';

@Component({
  selector: 'app-demo-all',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
    Alert, Card, Carousel, Modal, Navbar, NavItem, Sidebar,
    Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer
  ],
  templateUrl: './demo-all.html',
  styleUrl: './demo-all.css'
})
export class DemoAll {
 
}
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
  Card, Carousel, Modal, Navbar, NavItem, Sidebar,
  Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer,
  AlertService,
  FormStyle, BaseColors, BaseSize, DropdownItem,
  FilesType, FileData, AnimationType,
  NavItemsType, UserItemsType, UserProfile, AuthButtonsType,
  LoaderType, ButtonVariant, ChVariantType, ShapeType
} from '../../../projects/ngx-zs-component/src/public-api';
import { disabled, form, FormField, max, min, readonly, required, validate } from '@angular/forms/signals';

interface Country {
  code: string;
  name: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-demo-all',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormField,
    Button, Input, Select, Checkbox, Toggle, Range, FileInput, Label, InputErrors,
    Card, Carousel, Modal, Navbar, NavItem, Sidebar,
    Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer
  ],
  templateUrl: './demo-all.html',
  styleUrl: './demo-all.css'
})
export class DemoAll {

}
# 📦 ngx-zs-component Library Documentation

## 🚀 Overview

**ngx-zs-component** is a comprehensive, modern Angular component library built with **Angular 20** and **Tailwind CSS 4**. It provides a rich set of reusable, accessible, and highly customizable UI components following the latest Angular best practices, including **zoneless change detection** and **standalone components**.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [📦 Installation](#-installation)
- [🔧 Quick Start](#-quick-start)
- [📋 Component Catalog](#-component-catalog)
  - [🎨 Form Components](#-form-components)
  - [🧩 UI Components](#-ui-components)
- [📖 Component Usage Examples](#-component-usage-examples)
  - [1. Button Component](#1-button-component)
  - [2. Input Component](#2-input-component)
  - [3. Select Component](#3-select-component)
  - [4. Checkbox Component](#4-checkbox-component)
  - [5. Toggle Component](#5-toggle-component)
  - [6. Card Component](#6-card-component)
  - [7. Modal Component](#7-modal-component)
  - [8. Alert System](#8-alert-system)
  - [9. Navbar Component](#9-navbar-component)
  - [10. Sidebar Component](#10-sidebar-component)
  - [11. Carousel Component](#11-carousel-component)
  - [12. Spinner Component](#12-spinner-component)
  - [13. ThemeToggle Component](#13-themetoggle-component)
  - [14. ScrollToTop Component](#14-scrolltotop-component)
  - [15. Pagination Component](#15-pagination-component)
  - [16. Page404 Component](#16-page404-component)
  - [17. Connection Component](#17-connection-component)
  - [18. Footer Component](#18-footer-component)
  - [19. NavItem Component (Standalone)](#19-navitem-component-standalone)
  - [20. Range Component](#20-range-component)
  - [21. File Input Component](#21-file-input-component)
  - [22. Label Component](#22-label-component)
  - [23. InputErrors Component](#23-inputerrors-component)
  - [24. Custom Validators (ValidatorFn)](#24-custom-validators-validatorfn)
- [🛠️ Services](#️-services)
  - [AlertService](#alertservice)
  - [NavItemService](#navitemservice)
  - [FormService](#formservice)
  - [ExtractorService](#extractorservice)
  - [VisibilityObserverService](#visibilityobserverservice)
- [🎨 Theme & Styling](#-theme--styling)
  - [Palette Service](#palette-service)
  - [Color System](#color-system)
  - [Z-Index System](#z-index-system)
- [🌙 Dark Mode Mechanism](#-dark-mode-mechanism)
- [📱 Responsive Design](#-responsive-design)
- [♿ Accessibility (a11y)](#-accessibility-a11y)
- [🚀 Performance Features](#-performance-features)
- [📦 Dependencies](#-dependencies)
  - [Required Peer Dependencies](#required-peer-dependencies)
  - [Internal Dependencies](#internal-dependencies)
- [🌐 CDN & Font Awesome Setup](#-cdn--font-awesome-setup)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)
- [⚡ Quick Reference](#-quick-reference)
  - [Common Imports](#common-imports)
  - [Common CSS Classes](#common-css-classes)
- [🙏 Acknowledgments](#-acknowledgments)
- [📚 Additional Resources](#-additional-resources)

---

## ✨ Features

- ✅ **Standalone Components** – No NgModules needed, just import and use
- ✅ **Zoneless Change Detection** – Built for Angular's new zoneless architecture
- ✅ **Tailwind CSS 4** – Utility-first styling with dark mode support
- ✅ **Font Awesome 6** – Rich iconography throughout all components
- ✅ **Full Accessibility (a11y)** – ARIA attributes, keyboard navigation, screen reader support
- ✅ **Dark & Light Themes** – Seamless theme switching with persistent storage
- ✅ **Type Safe** – Full TypeScript support with strict typing
- ✅ **Responsive** – Mobile-first design with responsive breakpoints
- ✅ **Customizable** – Extensive inputs for styling, behavior, and content

---

## 📦 Installation

```bash
npm install @ziadshalaby/ngx-zs-component
```

---

## 🔧 Quick Start

### 1. Import the global styles

In your `styles.css` or `styles.scss`:

```css
@import '@ziadshalaby/ngx-zs-component/output.css';
```

### 2. Use a component in your template

```typescript
import { Component } from '@angular/core';
import { Button } from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Button],
  template: `
    <ZS-button (clickedEv)="handleClick()">
      Click Me!
    </ZS-button>
  `
})
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

---

## 📋 Component Catalog

### 🎨 Form Components

| Component | Selector | Description |
|-----------|----------|-------------|
| Button | `ZS-button` | Versatile button with solid/outline variants, sizes, and styles |
| Input | `ZS-input` | Form input with validation, password toggle, search, and more |
| Select | `ZS-select` | Dropdown select with search, multi-select, and custom rendering |
| Checkbox | `ZS-checkbox` | Custom checkbox with variant and shape options |
| Toggle | `ZS-toggle` | Toggle switch with customizable colors and sizes |
| Range | `ZS-range` | Custom range slider with progress tracking |
| File | `ZS-file` | File upload with drag-and-drop and preview support |
| Label | `ZS-label` | Label with hint/description support |
| InputErrors | `ZS-input-errors` | Error message display for form validation |

---

### 🧩 UI Components

| Component | Selector | Description |
|-----------|----------|-------------|
| Alert | `ZS-alert` | Toast/notification system with positioning and auto-close |
| Card | `ZS-card` | Card with animations, hover effects, and visibility detection |
| Carousel | `ZS-carousel` | Responsive carousel with drag, indicators, and auto-play |
| Modal | `ZS-modal` | Modal dialog with customizable header, body, and footer |
| Navbar | `ZS-navbar` | Responsive navigation bar with dropdowns and user menu |
| NavItem | `ZS-nav-item` | Navigation item with nested dropdown support |
| Sidebar | `ZS-sidebar` | Collapsible sidebar with overlay and floating modes |
| Pagination | `ZS-pagination` | Pagination controls with page navigation |
| Spinner | `ZS-spinner` | Loading spinners with multiple styles and sizes |
| ThemeToggle | `ZS-theme-toggle` | Theme switcher with drag-to-reposition |
| ScrollToTop | `ZS-scroll-to-top` | Scroll-to-top button with progress ring |
| Page404 | `ZS-page404` | 404 error page with custom messages and actions |
| Connection | `ZS-connection` | Online/offline status indicator |
| Footer | `ZS-footer` | Footer with navigation links and copyright |

---

## 📖 Component Usage Examples

### 1. **Button Component**

```html
<!-- Solid Primary Button -->
<ZS-button btnStyle="primary" size="md" (clickedEv)="onClick()">
  Primary Button
</ZS-button>

<!-- Outline Danger Button with Icon -->
<ZS-button 
  btnStyle="danger" 
  variant="outline" 
  [iconTpl]="iconTemplate"
  size="lg"
>
  Delete
</ZS-button>

<ng-template #iconTemplate>
  <i class="fas fa-trash"></i>
</ng-template>

<!-- Disabled Button -->
<ZS-button btnStyle="secondary" [disabled]="true">
  Disabled
</ZS-button>
```

**Inputs:**
- `btnStyle`: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'violet' | 'teal'`
- `variant`: `'solid' | 'outline'`
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `disabled`: `boolean`
- `type`: `'button' | 'submit' | 'reset'`
- `iconTpl`: `TemplateRef<any>`

**Outputs:**
- `clickedEv`: `EventEmitter<Event>`

---

### 2. **Input Component**

```html
<!-- Basic Input -->
<ZS-input
  [Id]="'email'"
  label="Email Address"
  hint="We'll never share your email"
  type="email"
  placeholder="Enter your email"
  [required]="true"
  (changedEv)="onChange($event)"
/>

<!-- Password Input with Toggle -->
<ZS-input
  label="Password"
  type="password"
  [showSearchIcon]="false"
  [maxlength]="20"
  [minlength]="8"
/>

<!-- Search Input with Debounce -->
<ZS-input
  type="search"
  placeholder="Search..."
  [searchDebounceDelay]="500"
  [showLoaderIconOnSearchInput]="true"
  (searchEv)="handleSearch($event)"
/>

<!-- Date Input -->
<ZS-input
  type="date"
  label="Birth Date"
  [min]="'2000-01-01'"
  [max]="'2010-12-31'"
/>

<!-- Number Input with Range -->
<ZS-input
  type="number"
  label="Age"
  [min]="18"
  [max]="99"
  [step]="1"
/>
```

**Inputs:**
- `type`: `'text' | 'email' | 'password' | 'number' | 'search' | 'date' | 'phone' | 'url'`
- `inputStyle`: FormStyle (color theme)
- `size`: `'sm' | 'md' | 'lg'`
- `value`: `string | null` (two-way bindable via `[value]` and `(valueChange)`)
- `touched`: `boolean` (two-way bindable)
- `disabled`, `isReadonly`, `required`
- `label`, `hint`, `placeholder`
- `maxlength`, `minlength`
- `min`, `max`, `step` (for number/date)
- `validateFns`: `ValidatorFn[]`

**Outputs:**
- `changedEv`: `EventEmitter<ChangeEventType>`
- `searchEv`: `EventEmitter<string | null>`
- `enterEv`, `focusEv`, `blurEv`, `clearedEv`
- `keydownEv`: `EventEmitter<KeyboardEvent>`

---

### 3. **Select Component**

```typescript
// Define your items
const items: DropdownItem<number>[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];
```

```html
<!-- Single Select -->
<ZS-select
  label="Choose an option"
  [items]="items"
  [required]="true"
  placeholder="Select..."
  [showSearch]="true"
  (selectedItemsEv)="onSelect($event)"
/>

<!-- Multi-Select -->
<ZS-select
  label="Select multiple"
  [items]="items"
  [multiple]="true"
  [preselectedIds]="[1, 3]"
  (selectedItemsEv)="onMultiSelect($event)"
/>
```

**Inputs:**
- `items`: `DropdownItem<T>[]` (required)
- `multiple`: `boolean`
- `preselectedIds`: `(number | string)[]`
- `showSearch`: `boolean`
- `showClearButton`: `boolean`
- `required`, `disabled`, `isReadonly`
- `placeholder`, `searchPlaceholder`, `noResultsText`
- `searchDebounceDelay`: `number`

**Outputs:**
- `selectedItemsEv`: `EventEmitter<ChangeEventType<DropdownItem<T>[]>>`
- `selectionClearedEv`: `EventEmitter<void>`

---

### 4. **Checkbox Component**

```html
<!-- Basic Checkbox -->
<ZS-checkbox
  label="Accept Terms"
  hint="You must accept to continue"
  [value]="isAccepted"
  (valueChange)="isAccepted = $event"
/>

<!-- Checkbox with Different Style -->
<ZS-checkbox
  label="Remember Me"
  inputStyle="primary"
  variant="solid"
  shape="circle"
  size="lg"
/>
```

**Inputs:**
- `label`: `string | null`
- `hint`: `string | null`
- `inputStyle`: FormStyle
- `size`: `'sm' | 'md' | 'lg'`
- `variant`: `'solid' | 'regular'`
- `shape`: `'square' | 'circle'`
- `disabled`, `isReadonly`

**Two-way Binding:**
- `value`: `boolean` (via `[value]` and `(valueChange)`)

---

### 5. **Toggle Component**

```html
<!-- Basic Toggle -->
<ZS-toggle
  label="Enable Notifications"
  color="blue"
  [value]="isEnabled"
  (valueChange)="isEnabled = $event"
/>

<!-- Toggle with Icon -->
<ZS-toggle
  label="Dark Mode"
  color="indigo"
  [iconTpl]="iconTemplate"
  size="lg"
/>

<ng-template #iconTemplate>
  <i class="fas fa-moon"></i>
</ng-template>
```

**Inputs:**
- `label`: `string | null`
- `hint`: `string | null`
- `color`: BaseColors (slate, gray, blue, red, etc.)
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`, `isReadonly`
- `iconTpl`: `TemplateRef<any>`

**Two-way Binding:**
- `value`: `boolean` (via `[value]` and `(valueChange)`)

---

### 6. **Card Component**

```html
<!-- Basic Card -->
<ZS-card cardStyle="primary" [clickable]="true">
  <div class="zs:p-6">
    <h3 class="zs:text-xl zs:font-bold">Card Title</h3>
    <p>Card content goes here</p>
  </div>
</ZS-card>

<!-- Card with Animation -->
<ZS-card 
  cardStyle="success" 
  animation="bottom"
  [variant]="{ shadow: true, border: true, border_hover: true }"
  [clickable]="true"
  (click)="handleCardClick()"
>
  <div class="zs:p-4">Animated Card</div>
</ZS-card>
```

**Inputs:**
- `cardStyle`: FormStyle
- `variant`: `{ border?: boolean, border_hover?: boolean, shadow?: boolean }`
- `clickable`: `boolean`
- `animation`: `'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none'`
- `bodyClass`: `string` (for custom background/color)

---

### 7. **Modal Component**

```html
<ZS-modal
  [(open)]="isModalOpen"
  title="Confirm Action"
  modalStyle="primary"
  [position]="'center'"
  [showCancelIcon]="true"
  [confirmConfig]="confirmConfig"
  [cancelConfig]="cancelConfig"
  (confirmEv)="handleConfirm()"
  (cancelEv)="handleCancel()"
>
  <p>Are you sure you want to proceed?</p>
</ZS-modal>
```

```typescript
export class MyComponent {
  isModalOpen = false;
  
  confirmConfig = {
    text: 'Yes, Confirm',
    btnStyle: 'success' as FormStyle,
    variant: 'solid' as ButtonVariant
  };
  
  cancelConfig = {
    text: 'Cancel',
    btnStyle: 'secondary' as FormStyle,
    variant: 'outline' as ButtonVariant
  };
}
```

**Inputs:**
- `open`: `boolean` (two-way bindable)
- `title`: `string`
- `modalStyle`: FormStyle
- `position`: `'center' | 'top' | 'bot' | 'left top' | 'left bot' | 'right top' | 'right bot'`
- `showHeader`, `showBody`, `showFooter`: `boolean`
- `showCancelIcon`: `boolean`
- `closeOnOverlay`: `boolean`
- `cancelConfig`, `confirmConfig`: `BtnType`

**Outputs:**
- `confirmEv`: `EventEmitter<void>`
- `cancelEv`: `EventEmitter<void>`
- `closedEv`: `EventEmitter<void>`

---

### 8. **Alert System**

```typescript
import { AlertService } from '@ziadshalaby/ngx-zs-component';

@Component({
  // ...
})
export class MyComponent {
  private alertService = inject(AlertService);
  
  showSuccess() {
    this.alertService.addAlert({
      type: 'success',
      message: 'Operation completed successfully!',
      autoClose: true,
      duration: 3000
    });
  }
  
  showError() {
    this.alertService.addAlert({
      type: 'danger',
      message: 'Something went wrong!',
      autoClose: false
    });
  }
  
  bulkAlerts() {
    this.alertService.bulkAlert(
      ['Alert 1', 'Alert 2', 'Alert 3'],
      { type: 'info', autoClose: true, duration: 2000 }
    );
  }
}
```

```html
<!-- Place in your root component -->
<ZS-alert 
  [positionClass]="'zs:top-4 zs:right-4'"
  [direction]="'top'"
  [defaultAutoClose]="true"
  [defaultDuration]="5000"
  [defaultShowCloseButton]="true"
></ZS-alert>
```

**Alert Types:**
- `'success'` – Green theme with check icon
- `'danger'` – Red theme with exclamation icon
- `'warning'` – Yellow theme with warning icon
- `'info'` – Blue theme with info icon

---

### 9. **Navbar Component**

```typescript
// Define navigation items
const navItems: NavItemsType = {
  routerLinkActive: 'zs:bg-primary-500 zs:text-white',
  colorClass: 'zs:hover:bg-gray-100 zs:dark:hover:bg-gray-700',
  items: [
    {
      id: 'home',
      label: 'Home',
      routerLink: '/',
      iconTpl: homeIcon
    },
    {
      id: 'products',
      label: 'Products',
      children: [
        { id: 'p1', label: 'Electronics', routerLink: '/electronics' },
        { id: 'p2', label: 'Clothing', routerLink: '/clothing' }
      ],
      childrenConfig: {
        childrenOpenWindow: true,
        childrenWindowDir: 'bottom-left'
      }
    }
  ]
};

const userMenuItems: UserItemsType = {
  items: [
    { id: 'profile', label: 'Profile', routerLink: '/profile' },
    { id: 'settings', label: 'Settings', routerLink: '/settings' },
    { id: 'logout', label: 'Logout', action: () => this.logout() }
  ]
};
```

```html
<ZS-navbar
  [fixed]="true"
  [mobileMode]="'lg'"
  [logoUrl]="logoUrl"
  [siteNameConfig]="{
    siteName: 'My App',
    siteNameColorClass: 'zs:text-gray-800 zs:dark:text-white',
    routerLink: '/'
  }"
  [navItems]="navItems"
  [authButtons]="{
    showAuthButtons: true,
    login: { btnStyle: 'secondary', variant: 'outline' },
    signup: { btnStyle: 'primary', variant: 'solid' }
  }"
  [isLoggedIn]="isLoggedIn"
  [userProfile]="userProfile"
  [userMenuItems]="userMenuItems"
  [showSearchBar]="true"
  [searchPlaceholder]="'Search...'"
  [(searchValue)]="searchQuery"
  (loginClickedEv)="onLogin()"
  (signupClickedEv)="onSignup()"
  (searchSubmittedEv)="onSearch($event)"
  (anyItemClickedEv)="onNavItemClick($event)"
></ZS-navbar>
```

**Inputs:**
- `fixed`: `boolean`
- `mobileMode`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `logoUrl`: `string`
- `siteNameConfig`: `SiteNameConfigType`
- `navItems`: `NavItemsType`
- `authButtons`: `AuthButtonsType`
- `isLoggedIn`: `boolean`
- `userProfile`: `UserProfile`
- `userMenuItems`: `UserItemsType`
- `showSearchBar`: `boolean`
- `showUserSection`: `boolean`
- `searchPlaceholder`: `string`

**Outputs:**
- `loginClickedEv`, `signupClickedEv`
- `searchSubmittedEv`: `EventEmitter<string | null>`
- `anyItemClickedEv`: `EventEmitter<NavbarItem>`

---

### 10. **Sidebar Component**

```html
<ZS-sidebar
  header="Menu"
  [(openSide)]="isSidebarOpen"
  [floating]="true"
  [preventClose]="false"
  [closeOnOverlay]="true"
  class="zs:h-screen"
>
  <div main class="zs:p-4">
    <!-- Sidebar content -->
    <nav class="zs:flex zs:flex-col zs:gap-2">
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/profile">Profile</a>
      <a routerLink="/settings">Settings</a>
    </nav>
  </div>
</ZS-sidebar>
```

**Inputs:**
- `header`: `string`
- `openSide`: `boolean` (two-way bindable)
- `floating`: `boolean`
- `preventClose`: `boolean`
- `closeOnOverlay`: `boolean`

---

### 11. **Carousel Component**

```html
<ZS-carousel
  [itemsNumber]="5"
  [arrows]="true"
  [showIndicators]="true"
  [autoPlay]="true"
  [duration]="3000"
  [maxItemsPerBox]="4"
  [itemMinWidth]="200"
  arrowColor="blue"
  [(currentIndex)]="activeSlide"
  (indexChangeEv)="onSlideChange($event)"
>
  <div carousel-item *ngFor="let item of items">
    <div class="zs:p-4 zs:bg-gray-100 zs:dark:bg-gray-800 zs:rounded-lg zs:m-2">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</ZS-carousel>
```

**Inputs:**
- `itemsNumber`: `number` (required)
- `arrows`: `boolean`
- `arrowColor`: BaseColors
- `showIndicators`: `boolean`
- `autoPlay`: `boolean`
- `duration`: `number`
- `maxItemsPerBox`: `number`
- `itemMinWidth`: `number`

**Two-way Binding:**
- `currentIndex`: `number` (via `[currentIndex]` and `(currentIndexChange)`)

**Outputs:**
- `indexChangeEv`: `EventEmitter<number>`

---

### 12. **Spinner Component**

```html
<!-- Basic Spinner -->
<ZS-spinner
  [loading]="isLoading"
  type="spinner"
  size="md"
  color="blue"
/>

<!-- Full-page Overlay Spinner -->
<ZS-spinner
  [loading]="isLoading"
  [isFloating]="true"
  type="pro"
  size="lg"
  color="primary"
  [withBox]="true"
/>

<!-- Different Spinner Types -->
<ZS-spinner type="dots" color="success" size="lg" />
<ZS-spinner type="bars" color="danger" size="md" />
<ZS-spinner type="gear" color="violet" size="sm" />
<ZS-spinner type="fan" color="teal" size="lg" />
<ZS-spinner type="pulse" color="info" size="md" />
<ZS-spinner type="double" color="warning" size="lg" />
```

**Types:**
- `'spinner'` – Font Awesome spinner icon
- `'pro'` – Progress ring spinner
- `'double'` – Double ring spinner
- `'gear'` – Gear icon spinner
- `'fan'` – Fan icon spinner
- `'pulse'` – Pulse ring spinner
- `'dots'` – Bouncing dots
- `'bars'` – Animated bars

**Inputs:**
- `loading`: `boolean`
- `isFloating`: `boolean` (full-screen overlay)
- `type`: LoaderType
- `size`: `'sm' | 'md' | 'lg'`
- `color`: BaseColors
- `withBox`: `boolean`
- `boxColorClass`: `string`

---

### 13. **ThemeToggle Component**

```html
<!-- Default Theme Toggle -->
<ZS-theme-toggle
  [bodyClass]="'zs:bg-white zs:dark:bg-gray-900 zs:text-gray-900 zs:dark:text-gray-100'"
  [showDefaultUI]="true"
  [fromTop]="0.25"
  (themeChangeEv)="onThemeChange($event)"
></ZS-theme-toggle>

<!-- Custom Implementation (No UI) -->
<ZS-theme-toggle
  [showDefaultUI]="false"
  (themeChangeEv)="onThemeChange($event)"
></ZS-theme-toggle>
```

**Features:**
- Persistent theme storage in `localStorage`
- System preference detection
- Drag-to-reposition
- Smooth animations
- Keyboard accessible

---

### 14. **ScrollToTop Component**

```html
<ZS-scroll-to-top
  [position]="'right'"
  arrowProgressColor="blue"
  [circleColorClass]="'zs:text-gray-400/60 zs:dark:text-gray-600/70'"
/>
```

**Inputs:**
- `position`: `'left' | 'right'`
- `arrowProgressColor`: BaseColors
- `circleColorClass`: `string` (custom CSS classes)

---

### 15. **Pagination Component**

```html
<ZS-pagination
  [totalPages]="totalPages"
  [currentPage]="currentPage"
  [showTotalItems]="true"
  [totalItems]="totalItems"
  [totalItemsMessage]="'Total items:'"
  (pageChangeEv)="onPageChange($event)"
/>
```

**Inputs:**
- `totalPages`: `number` (required)
- `currentPage`: `number` (required)
- `showTotalItems`: `boolean`
- `totalItemsMessage`: `string`
- `totalItems`: `number`

**Outputs:**
- `pageChangeEv`: `EventEmitter<number>`

---

### 16. **Page404 Component**

```html
<ZS-page404
  title="Oops! Page Not Found"
  message="The page you're looking for doesn't exist or has been moved."
  pageStyle="primary"
  buttonText="Back to Home"
  routerLink="/"
  (onAction)="handleAction()"
/>
```

**Inputs:**
- `title`: `string`
- `message`: `string`
- `pageStyle`: `FormStyle | 'normal'`
- `showButton`: `boolean`
- `buttonText`: `string`
- `routerLink`: `string`
- `iconTpl`: `TemplateRef<any>`

**Outputs:**
- `onAction`: `EventEmitter<void>`

---

### 17. **Connection Component**

```html
<ZS-connection (isOnlineEv)="onConnectionChange($event)"></ZS-connection>
```

**Outputs:**
- `isOnlineEv`: `EventEmitter<boolean>`

---

### 18. **Footer Component**

```html
<ZS-footer [showDefultContent]="true" [pages]="footerPages">
  <div rights>&copy; 2026 My Company. All rights reserved.</div>
</ZS-footer>
```

```typescript
const footerPages: PagesType[] = [
  { label: 'Privacy Policy', routerLink: '/privacy' },
  { label: 'Terms of Service', routerLink: '/terms' },
  { label: 'Contact Us', routerLink: '/contact' }
];
```

---

### 19. **NavItem Component (Standalone)**

The `ZS-nav-item` component can be used independently outside the Navbar for building custom navigation menus, dropdowns, or any hierarchical navigation structure.

```html
<!-- Basic NavItem -->
<ZS-nav-item
  [item]="navItem"
  [collectionName]="'my-collection'"
  (anyItemClickedEv)="onItemClick($event)"
></ZS-nav-item>

<!-- NavItem with Children (Dropdown) -->
<ZS-nav-item
  [item]="navItemWithChildren"
  [collectionName]="'dropdown-collection'"
  (anyItemClickedEv)="onItemClick($event)"
></ZS-nav-item>
```

```typescript
import { Component } from '@angular/core';
import { NavItem, NavbarItem } from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [NavItem],
  template: `
    <div class="zs:p-4">
      <ZS-nav-item
        [item]="settingsMenu"
        [collectionName]="'settings-menu'"
        (anyItemClickedEv)="handleMenuClick($event)"
      ></ZS-nav-item>
    </div>
  `
})
export class MyComponent {
  // Simple leaf item
  readonly simpleItem: NavbarItem = {
    id: 'profile',
    label: 'My Profile',
    routerLink: '/profile',
    action: () => console.log('Profile clicked')
  };

  // Item with children (dropdown)
  readonly settingsMenu: NavbarItem = {
    id: 'settings',
    label: '⚙️ Settings',
    children: [
      { 
        id: 'account', 
        label: 'Account Settings', 
        routerLink: '/settings/account',
        closeParentMenuAfterClick: true 
      },
      { 
        id: 'privacy', 
        label: 'Privacy', 
        routerLink: '/settings/privacy',
        closeParentMenuAfterClick: true 
      },
      { 
        id: 'notifications', 
        label: 'Notifications', 
        routerLink: '/settings/notifications',
        closeParentMenuAfterClick: true 
      }
    ],
    childrenConfig: {
      childrenOpenWindow: true,      // Opens as floating dropdown
      childrenWindowDir: 'bottom-right',
      showChevronDownIcon: true,
      closeMenuOnPointerOutside: true
    }
  };

  handleMenuClick(item: NavbarItem) {
    console.log('Menu item clicked:', item.label);
    item.action?.();
  }
}
```

**NavItem Configuration Options:**

```typescript
export interface NavbarItem {
  id: string | number;
  label: string;
  routerLink?: string;                // Router link for navigation
  routerLinkActive?: string;          // Active state class
  action?: () => void;                // Custom action on click
  iconTpl?: Signal<TemplateRef<any> | undefined>;
  iconClasses?: string;
  children?: NavbarItem[];            // Nested items
  childrenConfig?: {
    showChevronDownIcon?: boolean;     // Default: true
    childrenOpenWindow?: boolean;      // Default: false (inline)
    childrenWindowDir?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    closeMenuOnPointerOutside?: boolean;
  };
  closeParentMenuAfterClick?: boolean; // Auto-close parent after click
  colorClass?: string;                // Custom CSS classes
  useDefaultColorClass?: 'text' | 'bg';
}
```

**Key Features:**
- ✅ **Nested Dropdown Support** – Unlimited nesting levels
- ✅ **Floating or Inline** – Choose between dropdown or inline display
- ✅ **Auto-close** – Configurable close behavior
- ✅ **Keyboard Accessible** – Full keyboard navigation
- ✅ **Custom Actions** – Support for `action()` callbacks
- ✅ **Router Integration** – Built-in RouterLink support

---

### 20. **Range Component**

The `ZS-range` component provides a custom range slider with visual feedback, progress tracking, and accessibility features.

```html
<!-- Basic Range Slider -->
<ZS-range
  label="Select Price Range"
  [min]="100"
  [max]="1000"
  [step]="50"
  [value]="selectedPrice"
  (valueChange)="selectedPrice = $event"
/>

<!-- Range with Different Style -->
<ZS-range
  label="Volume"
  hint="Adjust the volume level"
  inputStyle="success"
  size="lg"
  [showValue]="true"
  [value]="volume"
  (valueChange)="volume = $event"
/>

<!-- Disabled Range -->
<ZS-range
  label="Rating"
  [min]="1"
  [max]="5"
  [step]="1"
  [value]="4.5"
  [disabled]="true"
/>
```

**Inputs:**
- `label`: `string | null`
- `hint`: `string | null`
- `min`: `number` (default: 10)
- `max`: `number` (default: 400)
- `step`: `number` (default: 10)
- `inputStyle`: FormStyle
- `size`: `'sm' | 'md' | 'lg'`
- `disabled`: `boolean`
- `isReadonly`: `boolean`
- `showValue`: `boolean` (default: true)

**Two-way Binding:**
- `value`: `number` (via `[value]` and `(valueChange)`)

---

### 21. **File Input Component**

The `ZS-file` component provides a complete file upload solution with drag-and-drop, preview, validation, and multiple file support.

```html
<!-- Basic File Upload -->
<ZS-file
  label="Upload Document"
  hint="Supported: PDF, DOCX, JPG"
  accept=".pdf,.docx,.jpg,.png"
  [maxSize]="5 * 1024 * 1024"
  [(files)]="uploadedFiles"
  (changeEv)="onFileChange($event)"
/>

<!-- Multiple File Upload -->
<ZS-file
  label="Upload Images"
  hint="Select multiple images"
  accept="image/*"
  [multiple]="true"
  [maxFiles]="10"
  [required]="true"
  inputStyle="primary"
  [(files)]="imageFiles"
/>

<!-- File Upload with Preview -->
<ZS-file
  label="Profile Picture"
  accept="image/*"
  [allowPreview]="true"
  [maxSize]="2 * 1024 * 1024"
  [required]="true"
  [validateFns]="[fileValidator]"
  [(files)]="profilePicture"
/>

<!-- Readonly File List -->
<ZS-file
  label="Attachments"
  [files]="existingFiles"
  [isReadonly]="true"
  [allowPreview]="true"
/>
```

```typescript
import { Component } from '@angular/core';
import { FileInput, FilesType, FileData } from '@ziadshalaby/ngx-zs-component';

@Component({
  // ...
})
export class MyComponent {
  uploadedFiles: FilesType = new Map();
  imageFiles: FilesType = new Map();
  profilePicture: FilesType = new Map();

  // Custom validator
  fileValidator = (files: FileData[]): string[] => {
    const errors: string[] = [];
    for (const file of files) {
      if (!file.name.match(/^[a-zA-Z0-9\s\-_]+\.(jpg|png|pdf)$/)) {
        errors.push(`Invalid filename: ${file.name}`);
      }
    }
    return errors;
  };

  onFileChange(event: any) {
    console.log('Files changed:', event);
    console.log('Valid:', event.valid);
  }
}
```

**Inputs:**
- `label`: `string | null`
- `hint`: `string | null`
- `placeholder`: `string | null`
- `inputStyle`: FormStyle
- `accept`: `string` (MIME types or extensions)
- `multiple`: `boolean`
- `maxSize`: `number` (bytes, default: 5MB)
- `maxFiles`: `number | 'infinity'` (default: 'infinity')
- `allowPreview`: `boolean` (default: true)
- `required`: `boolean`
- `disabled`: `boolean`
- `isReadonly`: `boolean`
- `autofocus`: `boolean`
- `validateFns`: `ValidatorFn<FileData[]>[]`

**Two-way Binding:**
- `files`: `FilesType` (Map of file data)
- `touched`: `boolean`

**Outputs:**
- `changeEv`: `EventEmitter<ChangeEventType<FileData[]>>`

---

### 22. **Label Component**

The `ZS-label` component provides consistent labeling with hint/description support for form controls.

```html
<!-- Basic Label -->
<ZS-label
  label="Email Address"
  for="email-input"
/>

<!-- Label with Hint -->
<ZS-label
  label="Password"
  hint="Minimum 8 characters"
  for="password-input"
  [required]="true"
/>

<!-- Label with Different Sizes -->
<ZS-label
  label="Large Label"
  hint="Large hint text"
  size="lg"
  for="large-input"
/>

<ZS-label
  label="Small Label"
  hint="Small hint text"
  size="sm"
  for="small-input"
/>
```

**Inputs:**
- `label`: `string | null`
- `hint`: `string | null`
- `hintId`: `string | null` (for accessibility linking)
- `size`: `'sm' | 'md' | 'lg'` (default: 'md')
- `required`: `boolean`
- `for`: `string | null` (input ID reference)

**Size Classes:**
- `sm`: `text-xs` label, `text-[10px]` hint
- `md`: `text-sm` label, `text-xs` hint
- `lg`: `text-base` label, `text-sm` hint

---

### 23. **InputErrors Component**

The `ZS-input-errors` component displays validation error messages with automatic extraction from nested error objects.

```html
<!-- Simple Error Display -->
<ZS-input-errors
  [Id]="'email-error'"
  [errors]="[emailErrors]"
/>

<!-- Multiple Error Sources -->
<ZS-input-errors
  [Id]="'form-errors'"
  [errors]="[requiredError, minLengthError, customErrors]"
/>
```

```typescript
import { Component } from '@angular/core';
import { InputErrors } from '@ziadshalaby/ngx-zs-component';

@Component({
  // ...
  imports: [InputErrors],
  template: `
    <ZS-input-errors
      [errors]="[validationErrors]"
    />
  `
})
export class MyComponent {
  validationErrors = [
    'Email is required',
    'Password must be at least 8 characters',
    'Password must contain a number'
  ];

  // Can also handle nested error objects
  apiErrors = {
    field: 'email',
    errors: ['Invalid format', 'Already exists']
  };
}
```

**Inputs:**
- `Id`: `string` (default: auto-generated UUID)
- `errors`: `(string[])[]` – Array of error arrays or nested error structures

**Features:**
- ✅ **Automatic Extraction** – Uses `ExtractorService` to flatten nested errors
- ✅ **Accessibility** – `role="status"` and `aria-live="polite"`
- ✅ **Customizable** – Accepts any error structure
- ✅ **Clean UI** – Bulleted list with icons

---

### 24. **Custom Validators (ValidatorFn)**

You can create custom validators for `ZS-input` and `ZS-file` components using the `ValidatorFn` type.

#### Input Validator Example

```typescript
import { ValidatorFn } from '@ziadshalaby/ngx-zs-component';

// Custom username validator
const usernameValidator: ValidatorFn<string | null> = (value) => {
  const errors: string[] = [];
  
  if (value === null || value === '') {
    errors.push('Username is required');
    return errors;
  }

  // Check for spaces
  if (value.includes(' ')) {
    errors.push('Username cannot contain spaces');
  }

  // Check for special characters (only letters, numbers, underscore)
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  // Check minimum length
  if (value.length < 3) {
    errors.push('Username must be at least 3 characters');
  }

  return errors;
};

// Custom password strength validator
const passwordValidator: ValidatorFn<string | null> = (value) => {
  const errors: string[] = [];
  
  if (!value) {
    errors.push('Password is required');
    return errors;
  }

  if (value.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(value)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(value)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(value)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*]/.test(value)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return errors;
};
```

#### Using Validators in Input

```html
<ZS-input
  label="Username"
  placeholder="Choose a username"
  [validateFns]="[usernameValidator, usernameAvailabilityValidator]"
  (changedEv)="onUsernameChange($event)"
/>

<ZS-input
  type="password"
  label="Password"
  [validateFns]="[passwordValidator]"
/>
```

#### File Input Validator Example

```typescript
import { FileData, ValidatorFn } from '@ziadshalaby/ngx-zs-component';

// Custom file validator
const fileValidator: ValidatorFn<FileData[]> = (files) => {
  const errors: string[] = [];
  
  if (!files || files.length === 0) {
    return ['No files selected'];
  }

  // Check for specific file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      errors.push(`Invalid file type: ${file.name} (${file.type})`);
    }
  }

  // Check for executable files
  const executableExtensions = ['.exe', '.bat', '.sh', '.app'];
  for (const file of files) {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (executableExtensions.includes(ext)) {
      errors.push(`Executable files are not allowed: ${file.name}`);
    }
  }

  return errors;
};
```

---

## 🛠️ Services

### **AlertService**

```typescript
class AlertService {
  // Signal containing all active alerts
  readonly alerts: Signal<AlertType[]>;
  
  // Add a single alert
  addAlert(newAlert: NewAlert): void;
  
  // Add multiple alerts
  bulkAlert(newAlerts: string[], options: BulkAlert): void;
  
  // Called when an alert is closed
  onAlertClosed(id: string | number): void;
}
```

### **NavItemService**

```typescript
class NavItemService {
  // Map of collections with open state
  readonly collections: Signal<Map<string, CollectionEntry>>;
  
  // Get currently open index for a collection
  openIndex(collectionName: string): string;
  
  // Add an item to a collection
  addItemInCollection(collectionName: string, index: string): void;
  
  // Change the open index of a collection
  onOpenIndexChange(collectionName: string, index: string): void;
}
```

### **FormService**

```typescript
class Form<T extends Record<string, any>> {
  readonly fields: ZFormFieldMap<T>;
  readonly initialValues: T;
  
  constructor(initial: T);
  
  // Field accessors
  set<K extends keyof T>(key: K, value: T[K] | null, valid?: boolean, touched?: boolean): void;
  patch<K extends keyof T>(key: K, partial: Partial<{ value: T[K] | null; valid: boolean; touched: boolean }>): void;
  get<K extends keyof T>(key: K): { value: T[K] | null; valid: boolean; touched: boolean };
  
  // Form state
  markAllTouched(): void;
  allTouched(): boolean;
  reset(): void;
  
  // Data extraction
  getValues(): T;
  getValidations(): Record<keyof T, boolean>;
  allFilled(): Record<keyof T, boolean>;
  canSubmit(allowEmptyFields?: (keyof T)[], allowInvalidFields?: (keyof T)[]): boolean;
  submit(callback: (values: T) => void, allowEmptyFields?: (keyof T)[], allowInvalidFields?: (keyof T)[]): void;
}
```

**Example Usage:**

```typescript
interface LoginForm {
  email: string;
  password: string;
}

const loginForm = new Form<LoginForm>({
  email: '',
  password: ''
});

// Set field values
loginForm.set('email', 'user@example.com');
loginForm.set('password', 'secret123');

// Get form values
const values = loginForm.getValues(); // { email: 'user@example.com', password: 'secret123' }

// Submit form
loginForm.submit((values) => {
  console.log('Form submitted:', values);
});
```

### **ExtractorService**

```typescript
class ExtractorService {
  // Extract all error messages recursively from any structure
  extract(input: unknown): string[];
}
```

### **VisibilityObserverService**

```typescript
class VisibilityObserverService {
  // Observe element visibility with IntersectionObserver
  observe(el: Element, callback: () => void): void;
  unobserve(el: Element): void;
}
```

---

## 🎨 Theme & Styling

### **Palette Service**

The library uses a unified palette system for consistent theming across all components.

**Available Styles:**
```typescript
type FormStyle = 
  | 'primary'   // Blue
  | 'secondary' // Slate
  | 'success'   // Green
  | 'danger'    // Red
  | 'warning'   // Amber
  | 'info'      // Cyan
  | 'dark'      // Dark
  | 'violet'    // Violet
  | 'teal';     // Teal
```

### **Color System**

```typescript
type BaseColors = 
  'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' |
  'red' | 'orange' | 'amber' | 'yellow' | 'rose' |
  'lime' | 'green' | 'emerald' | 'teal' |
  'cyan' | 'sky' | 'blue' | 'indigo' |
  'violet' | 'purple' | 'fuchsia' | 'pink';
```

### **Z-Index System**

```typescript
type KeyType = 
  'alert' | 'spinner' | 'modal' | 'themeToggle' |
  'navbar' | 'navbarOverlay' | 'sideBar' | 'sideBarOverlay' |
  'scrollToTop' | 'navItemDropdown' | 'selectDropdown';
```

**Usage in Templates:**
```html
<div class="{{ zIndices.alert }}">Alert content</div>
```

---

## 🌙 Dark Mode Mechanism

The library implements dark mode by toggling the `dark` class on the `document.documentElement` (`<html>` element). This approach ensures that all components respond correctly to dark mode changes and allows for seamless integration with your own application's theming.

### How It Works

```typescript
// Inside ThemeToggle component
effect(() => {
  const theme = this.currentTheme();
  // Toggle 'dark' class on document.documentElement
  document.documentElement.classList.toggle('dark', theme === 'dark');
  
  // Apply body classes for background and text colors
  const classes = this.bodyClass()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  
  document.body.classList.value = '';
  classes.forEach(c => document.body.classList.add(c));
  
  // Persist to localStorage
  if (this.userSelectedTheme()) {
    localStorage.setItem('theme', theme);
  }
});
```

### Customizing the Body Classes

You can customize the body's background and text colors using the `bodyClass` input:

```html
<!-- Custom body classes -->
<ZS-theme-toggle
  [bodyClass]="'zs:bg-slate-50 zs:dark:bg-slate-950 zs:text-slate-900 zs:dark:text-slate-100'"
/>

<!-- Custom with your own theme variables -->
<ZS-theme-toggle
  [bodyClass]="'zs:bg-white zs:dark:bg-[#1a1a2e] zs:text-black zs:dark:text-white'"
/>
```

### Custom Dark Mode Implementation

If you want to implement your own theme toggle without using the default UI:

```html
<ZS-theme-toggle
  [showDefaultUI]="false"
  (themeChangeEv)="onThemeChange($event)"
></ZS-theme-toggle>
```

```typescript
import { Component } from '@angular/core';
import { ThemeToggle, themeTypes } from '@ziadshalaby/ngx-zs-component';

@Component({
  // ...
  imports: [ThemeToggle],
  template: `
    <button (click)="toggleTheme()">
      Toggle Theme
    </button>
    <ZS-theme-toggle
      [showDefaultUI]="false"
      (themeChangeEv)="onThemeChange($event)"
    ></ZS-theme-toggle>
  `
})
export class MyComponent {
  private themeToggle = inject(ThemeToggle);
  
  toggleTheme() {
    const current = this.themeToggle.currentTheme();
    this.themeToggle.setTheme(current === 'dark' ? 'light' : 'dark');
  }
  
  onThemeChange(theme: themeTypes) {
    console.log('Theme changed to:', theme);
    // Your custom logic here
  }
}
```

### Manual Theme Control

You can also control the theme manually without the ThemeToggle component:

```typescript
import { effect } from '@angular/core';

// Set theme
const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

// Read theme from localStorage
const getSavedTheme = (): 'light' | 'dark' | null => {
  return localStorage.getItem('theme') as 'light' | 'dark' | null;
};

// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const systemTheme = prefersDark.matches ? 'dark' : 'light';

// Apply theme
const theme = getSavedTheme() || systemTheme;
setTheme(theme);

// Listen for system preference changes
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

### Important Notes for Custom Implementation

1. **Class Toggling**: The library always toggles the `dark` class on `document.documentElement`. This is the standard Tailwind approach for dark mode.

2. **Body Classes**: The library applies CSS classes to the `document.body`. If you're using your own body classes, make sure to coordinate with the library's `bodyClass` input.

3. **CSS Variables**: If you use CSS custom properties for theming, you can style them based on the `dark` class:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

:root.dark {
  --bg-primary: #1a1a2e;
  --text-primary: #ffffff;
}
```

4. **Conflicts**: If your application also toggles the `dark` class, ensure there's no conflict. The library's effect will always reflect its internal state, so it's recommended to use the library's ThemeToggle component or set the theme programmatically through it.

---

## 📱 Responsive Design

All components are built with mobile-first responsive design using Tailwind's responsive prefixes:

- `xs:` – Mobile devices (480px+)
- `sm:` – Tablets (640px+)
- `md:` – Small laptops (768px+)
- `lg:` – Desktops (1024px+)
- `xl:` – Large screens (1280px+)
- `2xl:` – Extra large screens (1536px+)

---

## ♿ Accessibility (a11y)

All components follow WAI-ARIA best practices:

- ✅ Proper ARIA roles and attributes
- ✅ Keyboard navigation (Tab, Enter, Space, Escape)
- ✅ Focus management and focus indicators
- ✅ Screen reader support with `sr-only` labels
- ✅ Color contrast compliance
- ✅ `aria-live` regions for dynamic content
- ✅ `aria-expanded`, `aria-controls`, `aria-haspopup`
- ✅ `aria-label`, `aria-labelledby`, `aria-describedby`
- ✅ `role` attributes for semantic meaning

---

## 🚀 Performance Features

- **Zoneless Change Detection** – Reduced change detection cycles
- **OnPush Change Detection** – Optimized rendering
- **Standalone Components** – Lazy loading friendly
- **Signal-based State** – Fine-grained reactivity
- **Lazy Loading** – Components loaded on demand
- **Tree Shaking** – Unused features removed during build
- **ViewChild/ContentChild** – Efficient DOM queries

---

## 📦 Dependencies

### Required Peer Dependencies

```json
{
  "@angular/common": "^20.3.0 || ^21.0.0",
  "@angular/core": "^20.3.0 || ^21.0.0"
}
```

### Internal Dependencies

```json
{
  "tslib": "^2.3.0",
  "tailwindcss": "^4.1.16",
  "@tailwindcss/cli": "^4.1.16"
}
```

---

## 🌐 CDN & Font Awesome Setup

The library uses **Font Awesome 6** for icons. Include the following in your project:

```html
<!-- In your index.html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">
```

Or import in your `styles.css`:

```css
@import '~@fortawesome/fontawesome-free/css/all.min.css';
```

---

## 📄 License

MIT © [Ziad Shalaby](https://github.com/ziadshalaby00)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

- **GitHub Issues**: [Report a bug](https://github.com/ziadshalaby00/ngx-zs-component-lib/issues)
- **Email**: shalabyziad94@gmail.com

---

## ⚡ Quick Reference

### Common Imports

```typescript
// Components
import { Button, Input, Select, Checkbox, Toggle, Range, FileInput } from '@ziadshalaby/ngx-zs-component';
import { Alert, Card, Carousel, Modal, Navbar, NavItem, Sidebar } from '@ziadshalaby/ngx-zs-component';
import { Pagination, Spinner, ThemeToggle, ScrollToTop, Page404, Connection, Footer } from '@ziadshalaby/ngx-zs-component';

// Services
import { AlertService, NavItemService, Form, ExtractorService, VisibilityObserverService } from '@ziadshalaby/ngx-zs-component';

// Types
import { FormStyle, BaseColors, BaseSize, DropdownItem, NavbarItem, AlertType } from '@ziadshalaby/ngx-zs-component';
```

### Common CSS Classes

```css
/* Shadow Utilities */
.shadow-sm-all, .shadow-md-all, .shadow-lg-all
.shadow-sm-all-night, .shadow-md-all-night, .shadow-lg-all-night

/* Scroll Utilities */
.scroll, .scroll-primary, .scroll-secondary, .scroll-success, .scroll-danger, .scroll-warning, .scroll-info, .scroll-violet, .scroll-teal, .scroll-dark

/* Sidebar Shadow */
.sidebar-shadow-right

/* Custom Animations */
.animate-fade-in, .animate-fadeIn, .animate-fadeOut, .animate-modalIn, .animate-modalOut
.animate-float, .animate-bounce, .animate-spin, .animate-pulse
.animate-bar-scale
```

---

## 🙏 Acknowledgments

- [Angular Team](https://angular.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [ng-packagr](https://github.com/ng-packagr/ng-packagr)

---

*Built with ❤️ by Ziad Shalaby*

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

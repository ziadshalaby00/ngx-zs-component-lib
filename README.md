# NGX ZS Component Library

A modern, accessible, and highly customizable Angular component library built with **Tailwind CSS v4**, featuring full **dark mode** support, responsive design, and a unified theming system.

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Theming](#theming)
- [Components](#components)
  - [Alert](#alert)
  - [Button](#button)
  - [Card](#card)
  - [Input](#input)
  - [Checkbox & Toggle](#checkbox--toggle)
  - [Select](#select)
  - [Modal](#modal)
  - [Navbar](#navbar)
  - [Sidebar](#sidebar)
  - [Spinner](#spinner)
  - [Theme Toggle](#theme-toggle)
  - [Scroll To Top](#scroll-to-top)
  - [Pagination](#pagination)
  - [Footer](#footer)
  - [Connection Status](#connection-status)
- [Form Service](#form-service)
- [Utilities](#utilities)
- [Z-Index System](#z-index-system)

---

## Installation

```bash
npm install @ziadshalaby/ngx-zs-component
```

### Peer Dependencies

Ensure your project has Angular 20.3+ installed:

```bash
npm install @angular/common @angular/core @angular/forms @angular/router
```

### Required Assets

The library uses **Font Awesome** icons. Include Font Awesome in your `angular.json`:

```json
"styles": [
  "src/styles.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
]
```

Or import in your global CSS:

```css
@import "@fortawesome/fontawesome-free/css/all.min.css";
```

### Tailwind CSS Setup

This library requires **Tailwind CSS v4** with the `zs` prefix.

1. Install Tailwind CSS v4:

```bash
npm install -D tailwindcss @tailwindcss/postcss postcss
```

2. Create `.postcssrc.json`:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

3. Import the library's global styles in your `styles.css`:

```css
@import "@ziadshalaby/ngx-zs-component/output.css";
```

Or if building from source, import the global CSS directly:

```css
@import "tailwindcss" prefix(zs);
@import "@ziadshalaby/ngx-zs-component/styles/global.css";
```

---

## Theming

### Available Color Styles

All components support a unified palette system with 9 color themes:

| Style | Description |
|-------|-------------|
| `primary` | Blue theme (default) |
| `secondary` | Slate/Gray theme |
| `success` | Green theme |
| `danger` | Red theme |
| `warning` | Amber/Yellow theme |
| `info` | Cyan/Sky theme |
| `dark` | Dark/Slate theme |
| `violet` | Purple/Violet theme |
| `teal` | Teal theme |

### Dark Mode

The library supports automatic dark mode via the `.dark` class on the `<html>` element.

Use the built-in `ZS-theme-toggle` component, or manually toggle:

```typescript
document.documentElement.classList.toggle('dark', isDark);
```

All components automatically adapt their colors, borders, and shadows for dark mode.

### Global CSS Variables

Customize scrollbar colors using CSS variables:

```css
.scroll-primary {
  --scroll-thumb: #3b82f6;
  --scroll-track: #dbeafe;
}
```

---

## Components

### Alert

Toast notification system with auto-close progress bar.

```typescript
import { Alert, AlertService } from '@ziadshalaby/ngx-zs-component';

@Component({
  imports: [Alert],
  template: `
    <ZS-alert 
      position="zs:top-4 zs:right-4"
      direction="top"
      [defaultAutoClose]="true"
      [defaultDuration]="5000">
    </ZS-alert>
  `
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
      autoClose: false,
      showCloseButton: true
    });
  }

  showBulk() {
    this.alertService.bulkAlert(
      ['Error 1', 'Error 2', 'Error 3'],
      { type: 'warning', autoClose: true, duration: 4000 }
    );
  }
}
```

**Alert Types:** `success` | `danger` | `warning` | `info`

---

### Button

Versatile button with solid and outline variants.

```html
<!-- Solid Button (default) -->
<ZS-button btnStyle="primary" size="md" (clickedEv)="onClick($event)">
  Submit
</ZS-button>

<!-- Outline Button -->
<ZS-button btnStyle="danger" variant="outline" size="sm">
  Cancel
</ZS-button>

<!-- Button with Icon -->
<ZS-button btnStyle="success" [iconTpl]="saveIcon">
  Save Changes
</ZS-button>

<ng-template #saveIcon>
  <i class="fas fa-save"></i>
</ng-template>

<!-- Disabled State -->
<ZS-button [disabled]="isLoading" btnStyle="secondary">
  <ZS-spinner *ngIf="isLoading" [loading]="true" size="sm" type="spinner"></ZS-spinner>
  <span *ngIf="!isLoading">Click Me</span>
</ZS-button>
```

**Sizes:** `xs` | `sm` | `md` | `lg` | `xl`

**Variants:** `solid` | `outline`

**Styles:** All 9 palette colors

---

### Card

Flexible container with animations and interactive states.

```html
<ZS-card 
  cardStyle="primary"
  [clickable]="true"
  animation="top"
  bodyClass="zs:bg-white zs:dark:bg-slate-800"
  [variant]="{ border: true, border_hover: true, shadow: true }">

  <div class="zs:p-4">
    <h3 class="zs:text-lg zs:font-bold">Card Title</h3>
    <p class="zs:text-gray-600 zs:dark:text-gray-400">Card content goes here...</p>
  </div>

</ZS-card>
```

**Animations:** `top` | `bottom` | `left` | `right` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `none`

**Variant Options:**
- `border`: Show border (default: true)
- `border_hover`: Highlight border on hover (default: true)
- `shadow`: Show shadow (default: true)

---

### Input

Full-featured input with built-in validation, icons, and password toggle.

```html
<ZS-input
  label="Email Address"
  hint="We'll never share your email"
  type="email"
  inputStyle="primary"
  size="md"
  [required]="true"
  placeholder="Enter your email"
  [(value)]="email"
  (changedEv)="onEmailChange($event)"
  (enterEv)="onSubmit()">
</ZS-input>

<!-- Password Input -->
<ZS-input
  label="Password"
  type="password"
  inputStyle="secondary"
  [required]="true"
  minlength="8"
  [(value)]="password">
</ZS-input>

<!-- Search Input with Debounce -->
<ZS-input
  type="search"
  placeholder="Search products..."
  [showSearchIcon]="true"
  [showLoaderIconOnSearchInput]="true"
  [searchDebounceDelay]="300"
  (searchEv)="onSearch($event)">
</ZS-input>

<!-- Date Input -->
<ZS-input
  label="Birth Date"
  type="date"
  [min]="'1990-01-01'"
  [max]="'2025-12-31'"
  [(value)]="birthDate">
</ZS-input>

<!-- Input with Custom Icon -->
<ZS-input
  label="Username"
  type="text"
  [iconTpl]="userIcon"
  [(value)]="username">
</ZS-input>

<ng-template #userIcon>
  <i class="fas fa-user zs:text-gray-400 zs:mr-2"></i>
</ng-template>
```

**Input Types:** `text` | `email` | `password` | `number` | `tel` | `phone` | `url` | `search` | `date` | `datetime-local` | `month` | `week` | `time`

**Validation Features:**
- Required fields
- Min/Max length
- Email format
- Phone number format
- URL validation
- Number range (min/max)
- Date range (min/max)
- Custom validators via `validateFns`

**Change Event:**
```typescript
interface ChangeEventType<T> {
  value: T;
  valid: boolean;
  fromForce: boolean;
}
```

---

### Checkbox & Toggle

```html
<!-- Checkbox -->
<ZS-checkbox
  label="Accept Terms"
  hint="You must agree to continue"
  inputStyle="success"
  size="md"
  variant="solid"
  shape="square"
  [(value)]="accepted">
</ZS-checkbox>

<!-- Toggle Switch -->
<ZS-toggle
  label="Dark Mode"
  color="blue"
  size="md"
  [(value)]="isDarkMode">
</ZS-toggle>

<!-- Toggle with Custom Icon -->
<ZS-toggle
  label="Notifications"
  color="green"
  size="lg"
  [iconTpl]="bellIcon"
  [(value)]="notificationsEnabled">
</ZS-toggle>

<ng-template #bellIcon>
  <i class="fas fa-bell"></i>
</ng-template>
```

**Checkbox Variants:** `solid` | `regular`

**Checkbox Shapes:** `square` | `circle`

**Toggle Colors:** Any color from the `BaseColors` palette

---

### Select

Multi-select dropdown with search and keyboard navigation.

```html
<ZS-select
  label="Choose Country"
  hint="Select your country of residence"
  inputStyle="primary"
  [items]="countries"
  [required]="true"
  placeholder="Select a country..."
  [showSearch]="true"
  searchPlaceholder="Search countries..."
  [(selectedItems)]="selectedCountry"
  (selectedItemsEv)="onCountryChange($event)">
</ZS-select>

<!-- Multi-Select -->
<ZS-select
  label="Skills"
  [items]="skills"
  [multiple]="true"
  [showClearButton]="true"
  placeholder="Select skills..."
  [(selectedItems)]="selectedSkills">
</ZS-select>

<!-- Pre-selected Items -->
<ZS-select
  label="Categories"
  [items]="categories"
  [multiple]="true"
  [preselectedIds]="['cat-1', 'cat-3']"
  [(selectedItems)]="selectedCategories">
</ZS-select>
```

```typescript
interface DropdownItem<T> {
  id: T;
  name: string;
  // Additional properties allowed
}

const countries: DropdownItem<string>[] = [
  { id: 'us', name: 'United States' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'eg', name: 'Egypt' },
];
```

---

### Modal

Accessible dialog with animations and configurable buttons.

```html
<ZS-modal
  title="Confirm Action"
  modalStyle="primary"
  position="center"
  [open]="showModal"
  [showCancelIcon]="true"
  [closeOnOverlay]="true"
  [cancelConfig]="{ text: 'Cancel', btnStyle: 'secondary', variant: 'outline' }"
  [confirmConfig]="{ text: 'Delete', btnStyle: 'danger', variant: 'solid' }"
  (confirmEv)="onConfirm()"
  (cancelEv)="onCancel()"
  (closedEv)="showModal = false">

  <p>Are you sure you want to delete this item? This action cannot be undone.</p>

</ZS-modal>

<!-- Trigger -->
<ZS-button btnStyle="danger" (clickedEv)="showModal = true">
  Delete Item
</ZS-button>
```

**Positions:** `center` | `top` | `bot` | `left top` | `left bot` | `right top` | `right bot`

---

### Navbar

Responsive navigation bar with mobile menu, user dropdown, and search.

```html
<ZS-navbar
  [fixed]="true"
  mobileMode="lg"
  [logoUrl]="'assets/logo.png'"
  [siteNameConfig]="{ siteName: 'MyApp', routerLink: '/' }"
  [navItems]="navItems"
  [isLoggedIn]="true"
  [userProfile]="userProfile"
  [userMenuItems]="userMenuItems"
  [authButtons]="authButtons"
  [showSearchBar]="true"
  searchPlaceholder="Search..."
  (loginClickedEv)="onLogin()"
  (signupClickedEv)="onSignup()"
  (searchSubmittedEv)="onSearch($event)"
  (anyItemClickedEv)="onNavItemClick($event)">
</ZS-navbar>
```

```typescript
import { NavItemsType, UserItemsType, UserProfile, AuthButtonsType, NavbarItem } from '@ziadshalaby/ngx-zs-component';

const navItems: NavItemsType = {
  routerLinkActive: 'zs:bg-blue-500 zs:text-white',
  colorClass: 'zs:hover:bg-blue-100',
  items: [
    { id: 'home', label: 'Home', routerLink: '/home' },
    { 
      id: 'products', 
      label: 'Products', 
      children: [
        { id: 'electronics', label: 'Electronics', routerLink: '/products/electronics' },
        { id: 'clothing', label: 'Clothing', routerLink: '/products/clothing' }
      ],
      childrenConfig: {
        childrenOpenWindow: true,
        childrenWindowDir: 'bottom-left',
        closeMenuOnPointerOutside: true
      }
    },
    { id: 'about', label: 'About', routerLink: '/about' }
  ]
};

const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe',
  imageUrl: 'assets/avatar.jpg'
};

const userMenuItems: UserItemsType = {
  items: [
    { id: 'profile', label: 'Profile', routerLink: '/profile' },
    { id: 'settings', label: 'Settings', routerLink: '/settings' },
    { 
      id: 'logout', 
      label: 'Logout', 
      action: () => this.logout(),
      colorClass: 'zs:text-red-600'
    }
  ]
};

const authButtons: AuthButtonsType = {
  showAuthButtons: true,
  login: { btnStyle: 'secondary', variant: 'outline' },
  signup: { btnStyle: 'primary', variant: 'solid' }
};
```

---

### Sidebar

Collapsible sidebar with overlay and keyboard support.

```html
<ZS-sidebar
  header="Menu"
  [(openSide)]="sidebarOpen"
  [floating]="false"
  [preventClose]="false"
  [closeOnOverlay]="true"
  class="zs:h-screen">

  <div main class="zs:p-4 zs:flex zs:flex-col zs:gap-2">
    <a routerLink="/dashboard" class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Dashboard</a>
    <a routerLink="/users" class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Users</a>
    <a routerLink="/settings" class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Settings</a>
  </div>

</ZS-sidebar>
```

**Modes:**
- `floating="false"`: Pushes content (layout shift)
- `floating="true"`: Overlays content with backdrop

---

### Spinner

Multiple loading indicators with floating overlay support.

```html
<!-- Inline Spinner -->
<ZS-spinner [loading]="isLoading" type="spinner" color="blue" size="md"></ZS-spinner>

<!-- Floating Overlay -->
<ZS-spinner 
  [loading]="isLoading" 
  [isFloating]="true" 
  type="pulse" 
  color="primary" 
  size="lg"
  [withBox]="true">
</ZS-spinner>

<!-- Types -->
<ZS-spinner [loading]="true" type="dots" color="success" size="sm"></ZS-spinner>
<ZS-spinner [loading]="true" type="bars" color="danger" size="md"></ZS-spinner>
<ZS-spinner [loading]="true" type="double" color="violet" size="lg"></ZS-spinner>
```

**Types:** `spinner` | `pro` | `double` | `gear` | `fan` | `pulse` | `dots` | `bars`

**Colors:** All `BaseColors` from the palette

---

### Theme Toggle

Draggable theme switcher panel.

```html
<!-- Default UI (draggable panel) -->
<ZS-theme-toggle
  [showDefaultUI]="true"
  [fromTop]="0.25"
  [bodyClass]="'zs:bg-white zs:dark:bg-gray-900 zs:text-gray-900 zs:dark:text-gray-100'"
  (themeChangeEv)="onThemeChange($event)">
</ZS-theme-toggle>

<!-- Programmatic Control -->
<ZS-theme-toggle
  [showDefaultUI]="false"
  [setManualTheme]="currentTheme">
</ZS-theme-toggle>
```

```typescript
import { themeTypes } from '@ziadshalaby/ngx-zs-component';

// The component automatically:
// - Detects system preference
// - Saves to localStorage
// - Applies .dark class to <html>
// - Can be dragged vertically
```

---

### Scroll To Top

Progress-aware scroll button with SVG ring animation.

```html
<ZS-scroll-to-top
  position="right"
  arrowProgressColor="blue"
  circleColorClass="zs:text-gray-400/60 zs:dark:text-gray-600/70">
</ZS-scroll-to-top>
```

---

### Pagination

```html
<ZS-pagination
  [totalPages]="20"
  [currentPage]="currentPage"
  [showTotalItems]="true"
  totalItemsMessage="Total products:"
  [totalItems]="450"
  (pageChangeEv)="onPageChange($event)">
</ZS-pagination>
```

---

### Footer

```html
<ZS-footer
  [showDefultContent]="true"
  [pages]="footerPages">
  <span rights>Custom copyright text</span>
</ZS-footer>
```

```typescript
const footerPages = [
  { label: 'Privacy Policy', routerLink: '/privacy' },
  { label: 'Terms of Service', routerLink: '/terms' },
  { label: 'Contact', routerLink: '/contact' }
];
```

---

### Connection Status

Online/offline indicator badge.

```html
<ZS-connection (isOnlineEv)="onConnectionChange($event)"></ZS-connection>
```

---

## Form Service

Signal-based form state management without RxJS.

```typescript
import { Form } from '@ziadshalaby/ngx-zs-component';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const loginForm = new Form<LoginForm>({
  email: '',
  password: '',
  remember: false
});

// Set field value
loginForm.set('email', 'user@example.com', true);

// Patch field
loginForm.patch('password', { value: 'secret123', valid: true });

// Get field state
const emailState = loginForm.get('email');
console.log(emailState.value, emailState.valid, emailState.touched);

// Check if all fields are valid and filled
const canSubmit = loginForm.canSubmit();

// Submit with validation
loginForm.submit((values) => {
  console.log('Form submitted:', values);
  // { email: 'user@example.com', password: 'secret123', remember: false }
});

// Reset to initial values
loginForm.reset();

// Get all values
const values = loginForm.getValues();

// Get validation states
const validations = loginForm.getValidations();
```

---

## Utilities

### Extractor Service

Recursively extract error messages from any structure:

```typescript
import { ExtractorService } from '@ziadshalaby/ngx-zs-component';

const extractor = inject(ExtractorService);

const errors = extractor.extract({
  field1: ['Error 1', 'Error 2'],
  field2: new Error('Server error'),
  nested: { field3: 'Another error' }
});
// Result: ['Error 1', 'Error 2', 'Server error', 'Another error']
```

### Visibility Observer

Trigger animations when elements enter viewport:

```typescript
import { VisibilityObserverService } from '@ziadshalaby/ngx-zs-component';

const observer = inject(VisibilityObserverService);

observer.observe(myElement, () => {
  console.log('Element is visible!');
});
```

---

## Z-Index System

The library uses a centralized z-index system to prevent stacking conflicts:

| Layer | Z-Index | Component |
|-------|---------|-----------|
| Alert | 2200 | `ZS-alert` |
| Spinner (floating) | 2000 | `ZS-spinner` |
| Modal | 1800 | `ZS-modal` |
| Theme Toggle | 1600 | `ZS-theme-toggle` |
| Navbar | 1400 | `ZS-navbar` |
| Navbar Overlay | 1300 | Mobile menu backdrop |
| Sidebar | 1200 | `ZS-sidebar` |
| Sidebar Overlay | 1100 | Sidebar backdrop |
| Scroll To Top | 800 | `ZS-scroll-to-top` |
| NavItem Dropdown | 200 | `ZS-nav-item` dropdowns |
| Select Dropdown | 200 | `ZS-select` dropdown |

---

## Carousel

Touch-enabled carousel with drag support and autoplay.

```html
<ZS-carousel
  [itemsNumber]="products.length"
  [maxItemsPerBox]="4"
  [itemMinWidth]="200"
  [arrows]="true"
  arrowColor="gray"
  [showIndicators]="true"
  [autoPlay]="true"
  [duration]="3000"
  [(currentIndex)]="currentSlide"
  (indexChangeEv)="onSlideChange($event)">

  @for (product of products; track product.id) {
    <div carousel-item class="zs:p-2">
      <ZS-card cardStyle="primary" [clickable]="true">
        <img [src]="product.image" class="zs:w-full zs:h-48 zs:object-cover zs:rounded-t-lg">
        <div class="zs:p-4">
          <h3 class="zs:font-bold">{{ product.name }}</h3>
          <p class="zs:text-green-600">{{ product.price }}</p>
        </div>
      </ZS-card>
    </div>
  }

</ZS-carousel>
```

---

## File Input

Drag-and-drop file upload with preview and validation.

```html
<ZS-file
  label="Upload Documents"
  hint="PDF, JPG, PNG up to 5MB"
  inputStyle="primary"
  placeholder="Drag & drop files here or click to browse"
  accept=".pdf,.jpg,.png"
  [multiple]="true"
  [maxSize]="5 * 1024 * 1024"
  [maxFiles]="5"
  [allowPreview]="true"
  [required]="true"
  [(files)]="uploadedFiles"
  (changeEv)="onFilesChange($event)">
</ZS-file>
```

---

## Range Slider

```html
<ZS-range
  label="Price Range"
  hint="Select your budget"
  [min]="0"
  [max]="1000"
  [step]="10"
  [(value)]="price"
  inputStyle="primary"
  size="md"
  [showValue]="true">
</ZS-range>
```

---

## Page 404

```html
<ZS-page404
  title="Page Not Found"
  message="The page you're looking for doesn't exist or has been moved."
  pageStyle="normal"
  [showButton]="true"
  buttonText="Back to Home"
  routerLink="/"
  (onAction)="handle404Action()">
</ZS-page404>
```

**Page Styles:** `normal` | Any `FormStyle` (`primary`, `secondary`, etc.)

---

## Accessibility

All components include:
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Reduced motion support (`motion-reduce`)
- ✅ High contrast support

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

MIT © Ziad Ahmed Shalaby

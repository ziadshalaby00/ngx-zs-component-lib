A comprehensive Angular component library (version 3.4.0) built with Angular 20+ and Tailwind CSS. It provides a rich set of reusable UI components with built-in theming support (light/dark modes), responsive design, and accessibility features.

[![npm version](https://badge.fury.io/js/%40ziadshalaby%2Fngx-zs-component.svg)](https://badge.fury.io/js/%40ziadshalaby%2Fngx-zs-component)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red.svg)](https://angular.io/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Components API](#components-api)
  - [Form Components](#form-components)
  - [Layout Components](#layout-components)
  - [Feedback Components](#feedback-components)
  - [Navigation Components](#navigation-components)
  - [Utility Components](#utility-components)
- [Services API](#services-api)
- [Types & Interfaces](#types--interfaces)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Advanced Usage](#advanced-usage)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**@ziadshalaby/ngx-zs-component** is a modern Angular component library designed to accelerate UI development with:

- **Signal-based reactivity** for optimal performance
- **Tailwind CSS** with automatic dark mode
- **Comprehensive theming** with 9 color variants
- **Full accessibility** (WAI-ARIA compliant)
- **Zoneless Angular** ready
- **TypeScript-first** with full type safety

### What Problem Does It Solve?

Building consistent, accessible, and themeable UIs in Angular often requires:
- Assembling multiple UI libraries or building components from scratch
- Managing dark mode implementation
- Ensuring accessibility compliance
- Maintaining consistent styling across large applications

This library provides a complete, battle-tested solution with a unified design system, eliminating the need to reinvent common UI patterns.

### Key Use Cases

| Use Case | Description |
|----------|-------------|
| **Enterprise Applications** | Consistent UI with theming, accessibility, and performance |
| **Admin Dashboards** | Rich set of form controls, navigation, and data display components |
| **Angular Projects** | Rapid prototyping and production-ready components |
| **Dark Mode Apps** | Built-in dark mode support with seamless switching |
| **Accessible UIs** | All components include proper ARIA attributes and keyboard navigation |

---

## Features

| Feature | Description |
|---------|-------------|
| **Signal-Based** | All components use Angular Signals for reactive state management |
| **Tailwind CSS** | Utility-first styling with `zs:` prefix and dark mode support |
| **9 Color Variants** | Primary, Secondary, Success, Danger, Warning, Info, Dark, Violet, Teal |
| **Dark Mode Ready** | Built-in dark mode with `ThemeToggle` component and `dark:` variants |
| **Accessibility** | ARIA attributes, keyboard navigation, focus management, screen reader support |
| **Form Components** | Input, Select, Checkbox, Toggle, Range, File, Button, Label, Field |
| **Layout Components** | Card, Carousel, Modal, Sidebar, Navbar, Footer |
| **Feedback Components** | Alert (with service), Spinner, Connection Status |
| **Navigation** | NavItem, Pagination, Scroll-to-Top |
| **Utility Components** | Theme Toggle, Page 404, Input Errors |
| **Services** | AlertService, Form (lightweight forms), ExtractorService, NavItemService, VisibilityObserverService |
| **Zoneless Ready** | Compatible with `provideZonelessChangeDetection()` |
| **TypeScript** | Full type safety with exported interfaces and types |
| **Standalone Components** | All components are standalone and tree-shakable |

---

## Installation

### Prerequisites

- Angular `^20.3.0 || ^21.0.0 || ^22.0.0`
- Tailwind CSS configured in your project

### Install the Library

```bash
npm install @ziadshalaby/ngx-zs-component
```

### Configure Tailwind CSS

If you're using Tailwind CSS, add the following to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    // ... existing content
    "./node_modules/@ziadshalaby/ngx-zs-component/**/*.{html,ts}"
  ],
  darkMode: 'class',
  // The library uses the 'zs:' prefix. Ensure your Tailwind setup supports it.
}
```

### Import Global Styles

In your `styles.css` or `styles.scss`, import the library's global styles:

```css
/* If using Tailwind's @import */
@import "@ziadshalaby/ngx-zs-component/global.css";

/* Or via relative path */
@import "../node_modules/@ziadshalaby/ngx-zs-component/global.css";
```

### Font Awesome (Optional)

The library uses Font Awesome for icons. Add it to your project:

```html
<!-- In your index.html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
```

---

## Quick Start

### 1. Import a Component

All components are standalone. Import them directly in your Angular component:

```typescript
import { Component } from '@angular/core';
import { Button, AlertService, Alert } from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Alert],
  template: `
    <ZS-button (clickedEv)="showAlert()">Click Me</ZS-button>
    <ZS-alert></ZS-alert>
  `
})
export class ExampleComponent {
  private alertService = inject(AlertService);

  showAlert() {
    this.alertService.addAlert({
      type: 'success',
      message: 'Hello from ngx-zs-component!',
      autoClose: true
    });
  }
}
```

### 2. Complete Working Example

```typescript
import { Component, signal, inject } from '@angular/core';
import { 
  Button, Input, Alert, AlertService, 
  Card, ThemeToggle, themeTypes 
} from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [Button, Input, Alert, Card, ThemeToggle],
  template: `
    <ZS-theme-toggle 
      (themeChangeEv)="onThemeChange($event)"
    ></ZS-theme-toggle>

    <ZS-card cardStyle="primary" animation="bottom">
      <div class="zs:p-6">
        <h2>Welcome to ngx-zs-component!</h2>
        <ZS-input 
          label="Your Name"
          placeholder="Enter your name"
          [(value)]="name"
        ></ZS-input>
        <ZS-button 
          btnStyle="primary" 
          (clickedEv)="submit()"
        >
          Submit
        </ZS-button>
      </div>
    </ZS-card>

    <ZS-alert></ZS-alert>
  `
})
export class DemoComponent {
  private alertService = inject(AlertService);
  name = signal<string | null>(null);

  submit() {
    this.alertService.addAlert({
      type: 'success',
      message: `Hello, ${this.name() || 'World'}!`,
      autoClose: true,
      duration: 3000
    });
  }

  onThemeChange(theme: themeTypes) {
    console.log('Theme changed to:', theme);
  }
}
```

---

## Core Concepts

### 1. Theme System

The library uses a **unified palette map** (`unifiedPaletteMap`) that defines all styling for each color variant:

```typescript
// Available variants
type FormStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'violet' | 'teal';
```

Each variant provides:
- Input styling (border, background, text)
- Button styling (solid and outline)
- Select styling
- Checkbox styling
- Card styling
- Modal styling
- Page 404 styling

### 2. Signal-Based Reactivity

All components use Angular Signals for state management, making them compatible with zoneless change detection:

```typescript
// Model binding (two-way)
[(value)]="mySignal"

// Model input (one-way)
[value]="mySignal()"

// Output events
(valueChangeEv)="handleChange($event)"
```

### 3. Dark Mode

Dark mode is implemented using the `dark` class on the `<html>` element:

```html
<html class="dark">
  <!-- Dark mode styles are applied via Tailwind's dark: variant -->
</html>
```

Use the `ZS-theme-toggle` component for automatic dark mode switching.

### 4. Z-Index Management

The library provides a centralized z-index system:

```typescript
export const zIndices = {
  alert: 'zs:z-2200',
  spinner: 'zs:z-2000',
  modal: 'zs:z-1800',
  themeToggle: 'zs:z-1600',
  navbar: 'zs:z-1400',
  navbarOverlay: 'zs:z-1300',
  sideBar: 'zs:z-1200',
  sideBarOverlay: 'zs:z-1100',
  scrollToTop: 'zs:z-800',
  navItemDropdown: 'zs:z-200',
  selectDropdown: 'zs:z-200'
};
```

### 5. Component Prefix

All components use the `ZS-` prefix to avoid naming conflicts:
- `ZS-button`, `ZS-input`, `ZS-alert`, etc.

---

## Components API

### Form Components

#### `ZS-button`

A versatile button component with multiple variants, sizes, and styles.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `btnStyle` | `FormStyle` | `'primary'` | Color variant |
| `variant` | `'solid' \| 'outline'` | `'solid'` | Button style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Icon template |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `clickedEv` | `Event` | Emitted when button is clicked |

**Example:**

```html
<!-- Solid button -->
<ZS-button btnStyle="primary" (clickedEv)="handleClick()">
  Submit
</ZS-button>

<!-- Outline button with icon -->
<ZS-button 
  btnStyle="danger" 
  variant="outline" 
  [iconTpl]="iconTemplate"
>
  Delete
</ZS-button>

<ng-template #iconTemplate>
  <i class="fas fa-trash"></i>
</ng-template>

<!-- Disabled button -->
<ZS-button btnStyle="secondary" [disabled]="true">
  Disabled
</ZS-button>
```

---

#### `ZS-input`

A feature-rich input component with validation, formatting, and various input types.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `iName` | `string \| null` | `null` | Input name attribute |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint/helper text |
| `placeholder` | `string \| null` | `null` | Placeholder text |
| `type` | `InputType` | `'text'` | Input type |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Left icon template |
| `showSearchIcon` | `boolean` | `false` | Show search icon |
| `showLoaderIconOnSearchInput` | `boolean` | `false` | Show loader on search |
| `maxlength` | `number \| null` | `null` | Max character length |
| `minlength` | `number \| null` | `null` | Min character length |
| `spellcheck` | `boolean` | `false` | Spellcheck enabled |
| `min` | `string \| number \| null` | `null` | Min value (number/date) |
| `max` | `string \| number \| null` | `null` | Max value (number/date) |
| `step` | `number \| null` | `null` | Step increment |
| `validateFns` | `ValidatorFn[]` | `[]` | Custom validators |
| `formatFn` | `FormatterFn` | `(val) => val?.trim() ?? null` | Formatting function |
| `autofocus` | `boolean` | `false` | Autofocus on load |
| `searchDebounceDelay` | `number` | `300` | Search debounce (ms) |
| `size` | `BaseSize` | `'md'` | Input size |

**Input Types:**

```typescript
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'phone' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'week' | 'time';
```

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `enterEv` | `void` | Emitted on Enter key |
| `focusEv` | `void` | Emitted on focus |
| `blurEv` | `void` | Emitted on blur |
| `changedEv` | `ChangeEventType<string \| null>` | Emitted on value change |
| `searchEv` | `string \| null` | Emitted on search |
| `clearedEv` | `void` | Emitted when cleared |
| `keydownEv` | `KeyboardEvent` | Emitted on keydown |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `value` | `string \| null` | Input value (two-way) |
| `touched` | `boolean` | Tracks if user interacted |

**Example:**

```html
<!-- Basic text input -->
<ZS-input 
  label="Username"
  placeholder="Enter username"
  [(value)]="username"
  [required]="true"
  [validateFns]="[usernameValidator]"
></ZS-input>

<!-- Email input with validation -->
<ZS-input 
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  hint="We'll never share your email"
  [(value)]="email"
  (changedEv)="onEmailChange($event)"
></ZS-input>

<!-- Password with show/hide toggle -->
<ZS-input 
  type="password"
  label="Password"
  placeholder="Enter password"
  [(value)]="password"
  [minlength]="8"
></ZS-input>

<!-- Search input with debounce -->
<ZS-input 
  type="search"
  label="Search"
  placeholder="Search..."
  [showLoaderIconOnSearchInput]="true"
  (searchEv)="performSearch($event)"
></ZS-input>

<!-- Date input -->
<ZS-input 
  type="date"
  label="Birth Date"
  [(value)]="birthDate"
  [min]="'1900-01-01'"
  [max]="'2020-01-01'"
></ZS-input>

<!-- Number input with range -->
<ZS-input 
  type="number"
  label="Age"
  [min]="18"
  [max]="99"
  [step]="1"
  [(value)]="age"
></ZS-input>
```

---

#### `ZS-select`

A customizable dropdown select component with search and multi-select support.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `items` | `DropdownItem<T>[]` | **Required** | Options list |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `showSearch` | `boolean` | `true` | Show search input |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `noResultsText` | `string` | `'No results found'` | No results message |
| `showClearButton` | `boolean` | `true` | Show clear button |
| `searchDebounceDelay` | `number` | `300` | Search debounce (ms) |
| `showLoaderIconOnSearchInput` | `boolean` | `false` | Show loader on search |
| `preselectedIds` | `(number \| string)[]` | `[]` | Pre-selected IDs |
| `multiple` | `boolean` | `false` | Multi-select mode |
| `validateFns` | `ValidatorFn<DropdownItem<T>[]>[]` | `[]` | Custom validators |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `selectedItemsEv` | `ChangeEventType<DropdownItem<T>[]>` | Emitted on selection change |
| `selectionClearedEv` | `void` | Emitted when cleared |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `selectedItems` | `DropdownItem<T>[]` | Selected items (two-way) |
| `touched` | `boolean` | Tracks if user interacted |

**Example:**

```typescript
// Define items
const options: DropdownItem<number>[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];

// Component
selected = signal<DropdownItem<number>[]>([]);
multiSelected = signal<DropdownItem<number>[]>([]);
```

```html
<!-- Single select -->
<ZS-select
  label="Choose an option"
  [items]="options"
  placeholder="Select..."
  [(selectedItems)]="selected"
  inputStyle="primary"
></ZS-select>

<!-- Multi-select -->
<ZS-select
  label="Select multiple"
  [items]="options"
  [multiple]="true"
  [preselectedIds]="[1, 3]"
  [(selectedItems)]="multiSelected"
  inputStyle="success"
></ZS-select>
```

---

#### `ZS-checkbox`

A customizable checkbox component with variant and shape options.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `size` | `BaseSize` | `'md'` | Checkbox size |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `variant` | `'solid' \| 'regular'` | `'regular'` | Icon style |
| `shape` | `'square' \| 'circle'` | `'square'` | Checkbox shape |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `value` | `boolean` | Checked state (two-way) |

**Example:**

```html
<!-- Basic checkbox -->
<ZS-checkbox 
  label="Accept terms"
  [(value)]="accepted"
></ZS-checkbox>

<!-- Solid variant -->
<ZS-checkbox 
  label="Solid style"
  variant="solid"
  inputStyle="primary"
  [(value)]="solidChecked"
></ZS-checkbox>

<!-- Circle shape -->
<ZS-checkbox 
  label="Circle shape"
  shape="circle"
  inputStyle="success"
  [(value)]="circleChecked"
></ZS-checkbox>
```

---

#### `ZS-toggle`

A toggle switch component with color and size options.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `color` | `BaseColors` | `'blue'` | Toggle color |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Icon template |
| `size` | `BaseSize` | `'md'` | Toggle size |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `value` | `boolean` | Toggle state (two-way) |

**Example:**

```html
<!-- Basic toggle -->
<ZS-toggle 
  label="Enable notifications"
  [(value)]="notificationsEnabled"
></ZS-toggle>

<!-- Custom color -->
<ZS-toggle 
  label="Dark mode"
  color="violet"
  [(value)]="darkMode"
></ZS-toggle>

<!-- With icon template -->
<ZS-toggle 
  label="Wi-Fi"
  color="teal"
  [iconTpl]="wifiIcon"
  [(value)]="wifiOn"
></ZS-toggle>

<ng-template #wifiIcon>
  <i class="fas fa-wifi"></i>
</ng-template>
```

---

#### `ZS-range`

A customizable range slider component.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `min` | `number` | `10` | Minimum value |
| `max` | `number` | `400` | Maximum value |
| `step` | `number` | `10` | Step increment |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `size` | `BaseSize` | `'md'` | Range size |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `showValue` | `boolean` | `true` | Show current value |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `value` | `number` | Current value (two-way) |

**Example:**

```html
<!-- Basic range -->
<ZS-range 
  label="Volume"
  [min]="0"
  [max]="100"
  [step]="5"
  [(value)]="volume"
></ZS-range>

<!-- With custom style -->
<ZS-range 
  label="Brightness"
  [min]="0"
  [max]="100"
  inputStyle="primary"
  size="lg"
  [(value)]="brightness"
></ZS-range>
```

---

#### `ZS-file`

A file upload component with preview and validation support.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `iName` | `string \| null` | `null` | Input name attribute |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `placeholder` | `string \| null` | `null` | Placeholder text |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `autofocus` | `boolean` | `false` | Autofocus |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field |
| `validateFns` | `ValidatorFn<FileData[]>[]` | `[]` | Custom validators |
| `accept` | `string` | `''` | Accepted file types |
| `multiple` | `boolean` | `false` | Multiple files |
| `maxSize` | `number` | `5 * 1024 * 1024` | Max total size (bytes) |
| `allowPreview` | `boolean` | `true` | Enable file preview |
| `maxFiles` | `number \| 'infinity'` | `'infinity'` | Max file count |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `changeEv` | `ChangeEventType<FileData[]>` | Emitted on file change |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `files` | `FilesType` | Files map (two-way) |
| `touched` | `boolean` | Tracks if user interacted |

**Example:**

```html
<!-- Single file upload -->
<ZS-file
  label="Upload Document"
  hint="Max 5MB"
  accept=".pdf,.docx,.jpg,.png"
  [maxSize]="5 * 1024 * 1024"
  [(files)]="files"
  inputStyle="primary"
></ZS-file>

<!-- Multiple file upload -->
<ZS-file
  label="Upload Images"
  hint="Select multiple images"
  accept="image/*"
  [multiple]="true"
  [maxFiles]="5"
  [allowPreview]="true"
  [(files)]="files"
  inputStyle="success"
></ZS-file>
```

---

#### `ZS-label`

A label component for form fields.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `hintId` | `string \| null` | `null` | Hint ID |
| `size` | `BaseSize` | `'md'` | Label size |
| `required` | `boolean` | `false` | Required indicator |
| `for` | `string \| null` | `null` | Associated input ID |

**Example:**

```html
<ZS-label 
  label="Username"
  hint="Min 3 characters"
  [required]="true"
  for="username-input"
></ZS-label>
```

---

#### `ZS-input-errors`

A component for displaying validation errors.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `errors` | `string[][]` | `[]` | Error messages |

**Example:**

```html
<ZS-input-errors 
  [errors]="[['Email is required', 'Invalid email format']]"
></ZS-input-errors>
```

---

#### `ZS-field`

A headless field wrapper that provides consistent styling for form controls.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `for` | `string \| null` | `null` | Associated input ID |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `required` | `boolean` | `false` | Required indicator |
| `fieldStyle` | `FormStyle` | `'secondary'` | Color variant |
| `size` | `BaseSize` | `'md'` | Field size |
| `disabled` | `boolean` | `false` | Disabled state |
| `isReadonly` | `boolean` | `false` | Readonly state |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Left icon template |
| `errors` | `string[]` | `[]` | Error messages |

**Example:**

```html
<ZS-field 
  label="Custom Field" 
  hint="Enter your value"
  [required]="true"
>
  <input 
    type="text" 
    placeholder="Type here..."
    class="zs:flex-1 zs:bg-transparent zs:outline-hidden"
  >
</ZS-field>
```

---

#### `FieldInputStyle` Directive

A directive that applies consistent styling to native inputs, textareas, and selects.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `size` | `BaseSize` | `'md'` | Input size |

**Example:**

```html
<input zsInputStyle type="text" placeholder="Styled input">
<textarea zsInputStyle placeholder="Styled textarea"></textarea>
<select zsInputStyle>
  <option>Option 1</option>
</select>
```

---

### Layout Components

#### `ZS-card`

A versatile card component with animations and hover effects.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `cardStyle` | `FormStyle` | `'primary'` | Color variant |
| `variant` | `VariantType` | `undefined` | Card variant options |
| `clickable` | `boolean` | `false` | Clickable state |
| `animation` | `AnimationType` | `'none'` | Entrance animation |
| `bodyClass` | `string` | `'zs:bg-gray-100 zs:dark:bg-gray-800'` | Body CSS class |

**Animation Types:**

```typescript
type AnimationType = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none';
```

**Example:**

```html
<!-- Basic card -->
<ZS-card cardStyle="primary">
  <div class="zs:p-6">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </div>
</ZS-card>

<!-- Clickable card with animation -->
<ZS-card 
  cardStyle="success" 
  animation="bottom" 
  [clickable]="true"
  [variant]="{ shadow: true, border: true, border_hover: true }"
>
  <div class="zs:p-6">
    <h3>Interactive Card</h3>
    <p>Click me!</p>
  </div>
</ZS-card>
```

---

#### `ZS-carousel`

A responsive carousel component with drag support and auto-play.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `itemsNumber` | `number` | **Required** | Total number of items |
| `arrows` | `boolean` | `true` | Show navigation arrows |
| `arrowColor` | `BaseColors` | `'gray'` | Arrow color |
| `showIndicators` | `boolean` | `true` | Show indicators |
| `autoPlay` | `boolean` | `true` | Auto-play slides |
| `duration` | `number` | `3000` | Auto-play interval (ms) |
| `maxItemsPerBox` | `number` | `4` | Max items per slide |
| `itemMinWidth` | `number` | `200` | Min item width (px) |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `indexChangeEv` | `number` | Emitted on slide change |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `currentIndex` | `number` | Current slide index (two-way) |

**Example:**

```html
<ZS-carousel
  [itemsNumber]="items.length"
  [arrows]="true"
  [showIndicators]="true"
  [autoPlay]="true"
  [duration]="3000"
  [maxItemsPerBox]="3"
  arrowColor="blue"
  [(currentIndex)]="activeSlide"
>
  @for (item of items; track item.id) {
    <div carousel-item>
      <div class="zs:p-6 zs:bg-blue-500 zs:rounded-lg zs:m-2 zs:h-48 zs:text-white">
        <h3>{{ item.title }}</h3>
      </div>
    </div>
  }
</ZS-carousel>
```

---

#### `ZS-modal`

A modal dialog component with configurable buttons and positioning.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `'Modal Title'` | Modal title |
| `modalStyle` | `FormStyle` | `'primary'` | Color variant |
| `showCancelIcon` | `boolean` | `true` | Show close icon |
| `showHeader` | `boolean` | `true` | Show header |
| `showBody` | `boolean` | `true` | Show body |
| `showFooter` | `boolean` | `true` | Show footer |
| `cancelConfig` | `BtnType` | `undefined` | Cancel button config |
| `confirmConfig` | `BtnType` | `undefined` | Confirm button config |
| `position` | `Position` | `'center'` | Modal position |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `confirmEv` | `void` | Emitted on confirm |
| `cancelEv` | `void` | Emitted on cancel |
| `closedEv` | `void` | Emitted when closed |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `open` | `boolean` | Modal open state (two-way) |

**Example:**

```html
<ZS-button (clickedEv)="modalOpen.set(true)">Open Modal</ZS-button>

<ZS-modal
  [(open)]="modalOpen"
  title="Confirm Action"
  modalStyle="primary"
  [position]="'center'"
  [confirmConfig]="{ text: 'Yes, Confirm', btnStyle: 'success' }"
  [cancelConfig]="{ text: 'Cancel', btnStyle: 'secondary', variant: 'outline' }"
  (confirmEv)="onConfirm()"
  (cancelEv)="onCancel()"
>
  <p>Are you sure you want to proceed?</p>
</ZS-modal>
```

---

#### `ZS-sidebar`

A sidebar component with floating and fixed modes.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `header` | `string` | `'Side Bar'` | Sidebar header |
| `preventClose` | `boolean` | `false` | Prevent closing |
| `floating` | `boolean` | `false` | Floating mode |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |

**Model:**

| Model | Type | Description |
|-------|------|-------------|
| `openSide` | `boolean` | Sidebar open state (two-way) |

**Example:**

```html
<ZS-button (clickedEv)="sidebarOpen.set(true)">Open Sidebar</ZS-button>

<ZS-sidebar
  header="Menu"
  [(openSide)]="sidebarOpen"
  [floating]="true"
  [closeOnOverlay]="true"
>
  <div main class="zs:p-4 zs:flex zs:flex-col zs:gap-2">
    <a class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Dashboard</a>
    <a class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Profile</a>
    <a class="zs:p-2 zs:rounded zs:hover:bg-gray-100">Settings</a>
  </div>
</ZS-sidebar>
```

---

#### `ZS-navbar`

A responsive navigation bar component with search, auth, and user menu.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `fixed` | `boolean` | `true` | Fixed navbar |
| `mobileMode` | `MobileModeType` | `'lg'` | Mobile breakpoint |
| `logoUrl` | `string \| undefined` | `undefined` | Logo image URL |
| `siteNameConfig` | `SiteNameConfigType \| undefined` | `undefined` | Site name config |
| `authButtons` | `AuthButtonsType` | `{ showAuthButtons: false }` | Auth button config |
| `showUserSection` | `boolean` | `true` | Show user section |
| `showSearchBar` | `boolean` | `false` | Show search bar |
| `navItems` | `NavItemsType` | `undefined` | Navigation items |
| `isLoggedIn` | `boolean` | `false` | Login state |
| `userProfile` | `UserProfile \| undefined` | `undefined` | User profile |
| `userMenuItems` | `UserItemsType` | `undefined` | User menu items |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `loginClickedEv` | `void` | Emitted on login click |
| `signupClickedEv` | `void` | Emitted on signup click |
| `searchSubmittedEv` | `string \| null` | Emitted on search |
| `anyItemClickedEv` | `NavbarItem` | Emitted on any nav item click |

**Models:**

| Model | Type | Description |
|-------|------|-------------|
| `searchValue` | `string \| null` | Search value (two-way) |
| `isMobileMenuOpen` | `boolean` | Mobile menu state (two-way) |
| `isUserMenuOpen` | `boolean` | User menu state (two-way) |
| `isMoreOpen` | `boolean` | More menu state (two-way) |

**Example:**

```typescript
// Component setup
navItems: NavItemsType = {
  routerLinkActive: 'zs:bg-blue-500 zs:text-white zs:rounded-md',
  items: [
    { id: 'home', label: 'Home', routerLink: '/' },
    { id: 'products', label: 'Products', children: [
      { id: 'p1', label: 'Electronics', routerLink: '/electronics' }
    ], childrenConfig: { childrenOpenWindow: true } }
  ]
};

userProfile: UserProfile = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com'
};

authButtons: AuthButtonsType = {
  showAuthButtons: true,
  login: { btnStyle: 'secondary', variant: 'outline' },
  signup: { btnStyle: 'primary', variant: 'solid' }
};
```

```html
<ZS-navbar
  [fixed]="true"
  mobileMode="lg"
  [siteNameConfig]="{ siteName: 'My App' }"
  [navItems]="navItems"
  [authButtons]="authButtons"
  [isLoggedIn]="isLoggedIn()"
  [userProfile]="userProfile"
  [showSearchBar]="true"
  (loginClickedEv)="onLogin()"
  (searchSubmittedEv)="onSearch($event)"
></ZS-navbar>
```

---

#### `ZS-footer`

A footer component with navigation links.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `showDefultContent` | `boolean` | `true` | Show default content |
| `pages` | `PagesType[]` | `[]` | Navigation pages |

**Example:**

```html
<ZS-footer [showDefultContent]="true" [pages]="footerPages">
  <div rights>&copy; 2026 My Company. All rights reserved.</div>
</ZS-footer>
```

---

### Feedback Components

#### `ZS-alert`

A notification component that works with `AlertService`. This component is typically placed once in your app and renders all alerts from the service.

**Note:** The `ZS-alert` component is configured via inputs but primarily displays alerts from the `AlertService`.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `positionClass` | `string` | `'zs:top-4 zs:right-4'` | Position classes |
| `direction` | `'top' \| 'bottom'` | `'top'` | Stack direction |
| `maxh` | `string` | `'zs:max-h-[calc(100vh-1.2rem)]'` | Max height |
| `defaultShowCloseButton` | `boolean` | `true` | Show close button by default |
| `defaultAutoClose` | `boolean` | `true` | Auto-close by default |
| `defaultDuration` | `number` | `5000` | Default duration (ms) |

**Example:**

```html
<!-- Place once in your app layout -->
<ZS-alert 
  positionClass="zs:top-4 zs:right-4"
  direction="top"
  [defaultAutoClose]="true"
  [defaultDuration]="3000"
></ZS-alert>
```

---

#### `ZS-spinner`

A loading spinner component with multiple styles and sizes.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `loading` | `boolean` | `false` | Show spinner |
| `isFloating` | `boolean` | `false` | Floating overlay mode |
| `color` | `BaseColors` | `'blue'` | Spinner color |
| `withBox` | `boolean` | `false` | Show background box |
| `boxColorClass` | `string` | `'zs:bg-gray-300/90 zs:dark:bg-gray-400/80'` | Box CSS class |
| `type` | `LoaderType` | `'spinner'` | Spinner type |
| `size` | `BaseSize` | `'md'` | Spinner size |

**Loader Types:**

```typescript
type LoaderType = 'spinner' | 'pro' | 'double' | 'gear' | 'fan' | 'pulse' | 'dots' | 'bars';
```

**Example:**

```html
<!-- Basic spinner -->
<ZS-spinner [loading]="isLoading()" type="spinner" size="md" color="blue"></ZS-spinner>

<!-- Fullscreen overlay -->
<ZS-spinner 
  [loading]="isLoading()" 
  [isFloating]="true" 
  type="double" 
  size="lg" 
  color="violet" 
  [withBox]="true"
></ZS-spinner>

<!-- Different types -->
<ZS-spinner [loading]="true" type="pro"></ZS-spinner>
<ZS-spinner [loading]="true" type="dots"></ZS-spinner>
<ZS-spinner [loading]="true" type="bars"></ZS-spinner>
```

---

#### `ZS-connection`

A connection status indicator component.

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `isOnlineEv` | `boolean` | Emitted on connection status change |

**Example:**

```html
<ZS-connection (isOnlineEv)="onConnectionChange($event)"></ZS-connection>
```

---

### Navigation Components

#### `ZS-nav-item`

A navigation item component with dropdown support.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `item` | `NavbarItem` | **Required** | Navigation item |
| `collectionName` | `string` | **Required** | Collection identifier |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `anyItemClickedEv` | `NavbarItem` | Emitted on click |

**Example:**

```html
<!-- Simple item -->
<ZS-nav-item
  [item]="{ id: 'home', label: 'Home', routerLink: '/' }"
  collectionName="demo"
></ZS-nav-item>

<!-- With dropdown -->
<ZS-nav-item
  [item]="{
    id: 'settings',
    label: 'Settings',
    children: [
      { id: 'account', label: 'Account', routerLink: '/account' },
      { id: 'privacy', label: 'Privacy', routerLink: '/privacy' }
    ],
    childrenConfig: { childrenOpenWindow: true }
  }"
  collectionName="demo"
></ZS-nav-item>
```

---

#### `ZS-pagination`

A pagination component.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `totalPages` | `number` | **Required** | Total number of pages |
| `currentPage` | `number` | **Required** | Current page |
| `showTotalItems` | `boolean` | `false` | Show total items |
| `totalItemsMessage` | `string` | `'Total items:'` | Total items message |
| `totalItems` | `number` | `undefined` | Total items count |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `pageChangeEv` | `number` | Emitted on page change |

**Example:**

```html
<ZS-pagination
  [totalPages]="totalPages()"
  [currentPage]="currentPage()"
  [showTotalItems]="true"
  [totalItems]="totalItems()"
  (pageChangeEv)="onPageChange($event)"
></ZS-pagination>
```

---

#### `ZS-scroll-to-top`

A scroll-to-top button with progress ring.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'right'` | Button position |
| `circleColorClass` | `string` | `'zs:text-gray-400/60 zs:dark:text-gray-600/70 zs:group-hover:brightness-110'` | Circle color class |
| `arrowProgressColor` | `BaseColors` | `'blue'` | Arrow and progress color |

**Example:**

```html
<ZS-scroll-to-top
  position="right"
  arrowProgressColor="blue"
></ZS-scroll-to-top>
```

---

### Utility Components

#### `ZS-theme-toggle`

A theme toggle component for switching between light and dark modes.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `bodyClass` | `string` | `'zs:bg-white zs:dark:bg-gray-900 zs:text-gray-900 zs:dark:text-gray-100'` | Body CSS classes |
| `showDefaultUI` | `boolean` | `true` | Show default UI |
| `setManualTheme` | `themeTypes \| null` | `null` | Manual theme override |
| `fromTop` | `number` | `1/4` | Position from top (fraction) |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `themeChangeEv` | `themeTypes` | Emitted on theme change |

**Example:**

```html
<ZS-theme-toggle
  [bodyClass]="'zs:bg-white zs:dark:bg-gray-900 zs:text-gray-900 zs:dark:text-gray-100'"
  [showDefaultUI]="true"
  (themeChangeEv)="onThemeChange($event)"
></ZS-theme-toggle>
```

---

#### `ZS-page404`

A 404 error page component.

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `'Page Not Found'` | Page title |
| `message` | `string` | `'Hmm… this page doesn’t seem to exist.'` | Error message |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Icon template |
| `pageStyle` | `FormStyle \| 'normal'` | `'normal'` | Style variant |
| `showButton` | `boolean` | `true` | Show home button |
| `buttonText` | `string` | `'Go Home'` | Button text |
| `routerLink` | `string` | `'/'` | Home route |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `onAction` | `void` | Emitted on button click |

**Example:**

```html
<ZS-page404
  title="Oops! Page Not Found"
  message="The page you're looking for doesn't exist."
  pageStyle="primary"
  buttonText="Back to Home"
  routerLink="/"
></ZS-page404>
```

---

## Services API

### `AlertService`

A service for managing notifications.

**Methods:**

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `addAlert` | `newAlert: NewAlert` | `void` | Add a single alert |
| `bulkAlert` | `newAlerts: string[], options: BulkAlert` | `void` | Add multiple alerts |
| `onAlertClosed` | `id: string \| number` | `void` | Called when alert closes |

**Signals:**

| Signal | Type | Description |
|--------|------|-------------|
| `alerts` | `AlertType[]` | Current alerts array |

**Example:**

```typescript
import { inject } from '@angular/core';
import { AlertService } from '@ziadshalaby/ngx-zs-component';

export class MyComponent {
  private alertService = inject(AlertService);

  showSuccess() {
    this.alertService.addAlert({
      type: 'success',
      message: 'Operation completed!',
      autoClose: true,
      duration: 3000
    });
  }

  showBulk() {
    this.alertService.bulkAlert(
      ['Alert 1', 'Alert 2', 'Alert 3'],
      { type: 'info', autoClose: true, duration: 2000 }
    );
  }
}
```

---

### `Form<T>`

A lightweight form state management class using Signals.

**Constructor:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `initial` | `T` | Initial form values |

**Methods:**

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `set` | `key: K, value: T[K] \| null, valid?: boolean, touched?: boolean` | `void` | Set field value |
| `patch` | `key: K, partial: Partial<{ value: T[K] \| null; valid: boolean; touched: boolean }>` | `void` | Patch field |
| `get` | `key: K` | `{ value: T[K] \| null; valid: boolean; touched: boolean }` | Get field |
| `markAllTouched` | - | `void` | Mark all fields touched |
| `allTouched` | - | `boolean` | Check if all touched |
| `reset` | - | `void` | Reset form |
| `getValues` | - | `T` | Get all values |
| `getValidations` | - | `Record<keyof T, boolean>` | Get validation states |
| `allFilled` | - | `Record<keyof T, boolean>` | Get filled states |
| `canSubmit` | `allowEmptyFields?: (keyof T)[], allowInvalidFields?: (keyof T)[]` | `boolean` | Check if submitable |
| `submit` | `callback: (values: T) => void, allowEmptyFields?: (keyof T)[], allowInvalidFields?: (keyof T)[]` | `void` | Submit form |

**Example:**

```typescript
import { Form } from '@ziadshalaby/ngx-zs-component';

interface LoginForm {
  email: string;
  password: string;
}

const loginForm = new Form<LoginForm>({
  email: '',
  password: ''
});

// Set values
loginForm.set('email', 'user@example.com', true);

// Get values
const email = loginForm.get('email');

// Submit
loginForm.submit((values) => {
  console.log('Submitting:', values);
});
```

---

### `ExtractorService`

A service for recursively extracting error messages from any structure.

**Methods:**

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `extract` | `input: unknown` | `string[]` | Extract error messages |

**Example:**

```typescript
import { inject } from '@angular/core';
import { ExtractorService } from '@ziadshalaby/ngx-zs-component';

export class MyComponent {
  private extractor = inject(ExtractorService);

  extractErrors() {
    const errors = this.extractor.extract({
      errors: ['Error 1', 'Error 2'],
      nested: { message: 'Nested error' }
    });
    // ['Error 1', 'Error 2', 'Nested error']
  }
}
```

---

### `NavItemService`

A service for managing navigation dropdown states.

**Methods:**

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `openIndex` | `collectionName: string` | `string` | Get open index |
| `addItemInCollection` | `collectionName: string, index: string` | `void` | Add item to collection |
| `onOpenIndexChange` | `collectionName: string, index: string` | `void` | Change open index |

---

### `VisibilityObserverService`

A service that wraps the Intersection Observer API.

**Methods:**

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `observe` | `el: Element, callback: () => void` | `void` | Observe element |
| `unobserve` | `el: Element` | `void` | Unobserve element |

---

## Types & Interfaces

### Core Types

```typescript
// Color and styling types
type FormStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'violet' | 'teal';
type BaseSize = 'sm' | 'md' | 'lg';
type BaseColors = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'rose' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink';

// Alert types
interface AlertType {
  id: number | string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  autoClose?: boolean;
  duration?: number;
  showCloseButton?: boolean;
  progress?: number;
}

// Dropdown item
interface DropdownItem<T> {
  id: T;
  name: string;
  [key: string]: any;
}

// Change event
interface ChangeEventType<T = string | null> {
  value: T;
  valid: boolean;
  fromForce: boolean;
}

// Navbar item
interface NavbarItem {
  id: string | number;
  label: string;
  routerLink?: string;
  routerLinkActive?: string;
  action?: () => void;
  iconTpl?: Signal<TemplateRef<any> | undefined>;
  iconClasses?: string;
  children?: NavbarItem[];
  childrenConfig?: {
    showChevronDownIcon?: boolean;
    childrenOpenWindow?: boolean;
    childrenWindowDir?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    closeMenuOnPointerOutside?: boolean;
  };
  closeParentMenuAfterClick?: boolean;
  colorClass?: string;
  useDefaultColorClass?: 'text' | 'bg';
}

// File data
interface FileData {
  name: string;
  size: number;
  type: string;
  url?: string;
}
type FilesType = Map<string, FileData>;

// Theme types
type themeTypes = 'light' | 'dark';
```

---

## Configuration

### Global CSS Variables

The library uses CSS custom properties for theming:

```css
/* Scrollbar colors */
--scroll-thumb: #888;
--scroll-track: #f1f1f1;

/* Carousel */
--carousel-item-width: 25%;
```

### Tailwind Configuration

The library uses the `zs:` prefix for all Tailwind classes. Your Tailwind configuration should support this:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // The library uses the 'zs:' prefix
  // Ensure your content includes library files
  content: [
    // ... your content
    "./node_modules/@ziadshalaby/ngx-zs-component/**/*.{html,ts}"
  ]
}
```

### Z-Index Configuration

You can override z-index values by importing and modifying the `zIndices` object:

```typescript
import { zIndices } from '@ziadshalaby/ngx-zs-component';

zIndices.modal = 'zs:z-2000';
```

---

## Usage Examples

### Example 1: Login Form

```typescript
import { Component, signal, inject } from '@angular/core';
import { 
  Button, Input, Alert, AlertService, 
  Form, Card, ThemeToggle 
} from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Button, Input, Alert, Card, ThemeToggle],
  template: `
    <div class="zs:max-w-md zs:mx-auto zs:mt-20">
      <ZS-card cardStyle="primary" animation="bottom">
        <div class="zs:p-8">
          <h2 class="zs:text-2xl zs:font-bold zs:mb-6">Login</h2>
          
          <ZS-input
            type="email"
            label="Email"
            placeholder="you@example.com"
            [required]="true"
            [(value)]="loginForm.get('email').value"
          ></ZS-input>
          
          <ZS-input
            type="password"
            label="Password"
            placeholder="Enter password"
            [required]="true"
            [minlength]="6"
            [(value)]="loginForm.get('password').value"
          ></ZS-input>
          
          <ZS-button 
            btnStyle="primary" 
            [disabled]="isLoading()"
            (clickedEv)="submit()"
            class="zs:w-full"
          >
            {{ isLoading() ? 'Logging in...' : 'Login' }}
          </ZS-button>
        </div>
      </ZS-card>
      
      <ZS-alert></ZS-alert>
    </div>
  `
})
export class LoginComponent {
  private alertService = inject(AlertService);
  isLoading = signal(false);
  
  loginForm = new Form<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  submit() {
    this.isLoading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.alertService.addAlert({
        type: 'success',
        message: 'Login successful!',
        autoClose: true
      });
    }, 1500);
  }
}
```

### Example 2: Registration Form with Validation

```typescript
import { Component, signal, inject } from '@angular/core';
import { 
  Button, Input, Select, Checkbox, Alert, AlertService, 
  Form, Card 
} from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Button, Input, Select, Checkbox, Alert, Card],
  template: `
    <div class="zs:max-w-md zs:mx-auto zs:mt-20">
      <ZS-card cardStyle="success" animation="bottom">
        <div class="zs:p-8">
          <h2 class="zs:text-2xl zs:font-bold zs:mb-6">Register</h2>
          
          <ZS-input
            label="Username"
            placeholder="Choose a username"
            [required]="true"
            [validateFns]="[usernameValidator]"
            [(value)]="registerForm.get('username').value"
          ></ZS-input>
          
          <ZS-input
            type="email"
            label="Email"
            placeholder="you@example.com"
            [required]="true"
            [(value)]="registerForm.get('email').value"
          ></ZS-input>
          
          <ZS-input
            type="password"
            label="Password"
            placeholder="Create a password"
            [required]="true"
            [minlength]="8"
            [(value)]="registerForm.get('password').value"
          ></ZS-input>
          
          <ZS-select
            label="Role"
            [items]="roles"
            placeholder="Select a role"
            [required]="true"
            [(selectedItems)]="selectedRole"
          ></ZS-select>
          
          <ZS-checkbox
            label="I agree to the Terms of Service"
            [required]="true"
            [(value)]="termsAccepted"
          ></ZS-checkbox>
          
          <ZS-button 
            btnStyle="success" 
            [disabled]="!canSubmit()"
            (clickedEv)="submit()"
            class="zs:w-full zs:mt-4"
          >
            Register
          </ZS-button>
        </div>
      </ZS-card>
      
      <ZS-alert></ZS-alert>
    </div>
  `
})
export class RegisterComponent {
  private alertService = inject(AlertService);
  
  registerForm = new Form<{ username: string; email: string; password: string }>({
    username: '',
    email: '',
    password: ''
  });
  
  roles: DropdownItem<number>[] = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Designer' },
    { id: 3, name: 'Manager' }
  ];
  selectedRole = signal<DropdownItem<number>[]>([]);
  termsAccepted = signal(false);

  usernameValidator = (value: string | null): string[] => {
    const errors: string[] = [];
    if (!value) return errors;
    if (value.length < 3) errors.push('Username must be at least 3 characters');
    if (value.includes(' ')) errors.push('Username cannot contain spaces');
    if (!/^[a-zA-Z0-9_]+$/.test(value)) errors.push('Username can only contain letters, numbers, and underscores');
    return errors;
  };

  canSubmit(): boolean {
    return this.registerForm.canSubmit() && 
           this.selectedRole().length > 0 && 
           this.termsAccepted();
  }

  submit() {
    this.alertService.addAlert({
      type: 'success',
      message: 'Registration successful!',
      autoClose: true
    });
  }
}
```

---

## Advanced Usage

### Custom Validation with `ZS-input`

```typescript
// Create a custom validator
passwordValidator = (value: string | null): string[] => {
  const errors: string[] = [];
  if (!value) return errors;
  
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
  
  return errors;
};

// Use in template
<ZS-input
  type="password"
  label="Password"
  [validateFns]="[passwordValidator]"
  [required]="true"
></ZS-input>
```

### Custom Styling with `ZS-card`

```typescript
// Custom card style
const customCardStyle = 'zs:bg-gradient-to-r zs:from-blue-500 zs:to-purple-600';

<ZS-card 
  cardStyle="primary"
  [bodyClass]="customCardStyle"
  [variant]="{ shadow: true, border: false }"
>
  <div class="zs:p-6 zs:text-white">
    <h3>Custom Card</h3>
  </div>
</ZS-card>
```

### Integrating with Reactive Forms

```typescript
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input } from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [Input, ReactiveFormsModule],
  template: `
    <ZS-input
      [value]="form.get('email')?.value"
      (changedEv)="form.get('email')?.setValue($event.value)"
      [error]="form.get('email')?.touched && form.get('email')?.invalid ? ['Invalid email'] : []"
    ></ZS-input>
  `
})
export class ReactiveFormComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
}
```

### Using Form Class with Validation

```typescript
interface UserForm {
  name: string;
  email: string;
  age: number;
}

const form = new Form<UserForm>({
  name: '',
  email: '',
  age: 18
});

// Custom validation logic
function validateUser(form: Form<UserForm>): boolean {
  const email = form.get('email').value;
  const age = form.get('age').value;
  
  if (email && !email.includes('@')) {
    form.set('email', email, false);
    return false;
  }
  
  if (age && age < 18) {
    form.set('age', age, false);
    return false;
  }
  
  return true;
}

// Submit with validation
form.submit(
  (values) => {
    // Valid submission
    console.log('Submitting:', values);
  },
  [], // No empty fields allowed
  ['age'] // Age can be invalid (will be handled in callback)
);
```

### Extending the Library

#### Custom Color Variant

```typescript
import { unifiedPaletteMap, FormStyle } from '@ziadshalaby/ngx-zs-component';

// Add a custom color variant
const customVariant: FormStyle = 'custom' as FormStyle;

unifiedPaletteMap.set(customVariant, {
  input: {
    border: 'zs:border-pink-200 zs:dark:border-pink-700',
    borderHover: 'zs:hover:border-pink-500 zs:dark:hover:border-pink-500',
    inputBg: 'zs:bg-pink-50 zs:dark:bg-slate-900',
    text: 'zs:text-pink-900 zs:dark:text-pink-100'
  },
  // ... include all other palette properties
});
```

---

## Error Handling

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot read properties of undefined` | Accessing signal value before initialization | Use optional chaining: `mySignal()?.property` |
| `NG0304: 'ZS-xxx' is not a known element` | Component not imported | Import the component in your standalone component or module |
| `Tailwind classes not applying` | Missing Tailwind configuration | Ensure Tailwind is properly configured and the `zs:` prefix is supported |
| `Dark mode not working` | Missing dark class on html element | Add `dark` class to `<html>` or use `ZS-theme-toggle` |
| `Font Awesome icons not showing` | Font Awesome not loaded | Add Font Awesome CSS to your project |
| `Alerts not appearing` | ZS-alert not added to template | Add `<ZS-alert></ZS-alert>` to your root component |
| `Form validation not triggering` | `touched` not set | The `touched` signal is automatically updated on blur and change events |

### Error Messages from ExtractorService

The `ExtractorService` can extract error messages from various data structures:

```typescript
// Extract from Error objects
const errors = extractor.extract(new Error('Something went wrong'));
// ['Something went wrong']

// Extract from arrays
const errors = extractor.extract(['Error 1', 'Error 2']);
// ['Error 1', 'Error 2']

// Extract from nested objects
const errors = extractor.extract({
  errors: ['Error 1'],
  nested: { message: 'Nested error' }
});
// ['Error 1', 'Nested error']
```

---

## Best Practices

### 1. Use Signal-Based Reactivity

Always use signals for state management:

```typescript
// ✅ Good
value = signal<string | null>(null);
isLoading = signal(false);

// ❌ Avoid
value = '';
isLoading = false;
```

### 2. Import Components Individually

Import only the components you need to reduce bundle size:

```typescript
// ✅ Good
import { Button, Input } from '@ziadshalaby/ngx-zs-component';

// ❌ Avoid
import * as ZS from '@ziadshalaby/ngx-zs-component';
```

### 3. Use Two-Way Binding Where Appropriate

Use `[(value)]` for form controls:

```typescript
// ✅ Good
<ZS-input [(value)]="mySignal"></ZS-input>

// ❌ Avoid
<ZS-input [value]="mySignal()" (changedEv)="mySignal.set($event.value)"></ZS-input>
```

### 4. Leverage the Alert Service

Use the alert service for user feedback instead of custom toast implementations:

```typescript
// ✅ Good
private alertService = inject(AlertService);
this.alertService.addAlert({ type: 'success', message: 'Saved!', autoClose: true });

// ❌ Avoid
window.alert('Saved!');
```

### 5. Use Form Class for Complex Forms

For multi-field forms with validation, use the `Form` class:

```typescript
// ✅ Good
form = new Form<LoginForm>({ email: '', password: '' });
// Use form.get('email').value, form.submit(), etc.

// ❌ Avoid
email = signal('');
password = signal('');
// Manual validation logic
```

### 6. Enable Zoneless Change Detection

The library works best with zoneless change detection:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // ... other providers
  ]
};
```

### 7. Performance Considerations

- **Use `trackBy` with `@for` loops** when rendering lists
- **Avoid unnecessary signal updates** - batch updates when possible
- **Use `computed` signals** for derived state instead of manual subscriptions
- **Lazy load components** when possible

---

## FAQ

### Q: Can I use this library with Angular 19 or earlier?
A: This library is designed for Angular 20+ and uses features like signals and standalone components. For earlier versions, consider using older versions of the library.

### Q: Does this library work with Ionic or React?
A: No, this is an Angular-only library built specifically for Angular applications.

### Q: Can I customize the colors beyond the provided variants?
A: Yes, you can extend the `unifiedPaletteMap` or override CSS classes using Tailwind's `@layer` or custom CSS.

### Q: How do I change the default positions of alerts?
A: Use the `positionClass` and `maxh` inputs on the `<ZS-alert>` component.

### Q: Is this library accessible?
A: Yes, all components include proper ARIA attributes, keyboard navigation, and screen reader support.

### Q: Can I use this library without Tailwind CSS?
A: No, the library is built on Tailwind CSS. However, the global CSS file includes all necessary styles, so you don't need to configure Tailwind separately.

### Q: How do I implement dark mode?
A: Use the `<ZS-theme-toggle>` component, or manually add the `dark` class to the `<html>` element.

### Q: Can I use this library in an existing project?
A: Yes, the library works alongside existing code. Just import the components and services you need.

### Q: Does the library support internationalization (i18n)?
A: The library's text content (like button labels, placeholders) can be overridden via inputs, making it compatible with i18n.

### Q: How do I test components from this library?
A: Use Angular's standard testing utilities. All components include test files (.spec.ts) for reference.

---

## Troubleshooting

### Problem: Components not rendering

**Solution:**
1. Verify the component is imported in your standalone component or module
2. Ensure the global CSS is imported in your `styles.css`
3. Check for console errors

### Problem: Styling not applied

**Solution:**
1. Verify Tailwind CSS is properly configured
2. Import the global CSS file
3. Check that the `zs:` prefix is being recognized by Tailwind

### Problem: Dark mode not working

**Solution:**
1. Ensure the `dark` class is added to the `<html>` element
2. Check that Tailwind's `darkMode` is set to `'class'`
3. Verify the `ZS-theme-toggle` is properly configured

### Problem: Form validation not showing errors

**Solution:**
1. Ensure the `touched` signal is being updated (happens automatically on blur)
2. Check that `error()` signal is properly connected to `ZS-input-errors`
3. Verify your custom validator returns an array of strings

### Problem: Alert not showing

**Solution:**
1. Ensure `<ZS-alert>` is added to your template
2. Verify the `AlertService` is properly injected
3. Check that `addAlert` is called with valid parameters

### Problem: Select dropdown not opening

**Solution:**
1. Check `disabled` and `isReadonly` inputs
2. Verify `items` is not empty
3. Ensure no event propagation issues in parent components

### Problem: Carousel not responsive

**Solution:**
1. Adjust `maxItemsPerBox` and `itemMinWidth` inputs
2. Ensure parent container has proper width
3. Verify CSS variables like `--carousel-item-width` are not overridden

---

## Contributing

Contributions are welcome! Please follow these steps:

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/ziadshalaby00/ngx-zs-component-lib.git
cd ngx-zs-component-lib
```

2. Install dependencies:
```bash
npm install
```

3. Build the library:
```bash
ng build ngx-zs-component
```

4. Run the demo application:
```bash
ng serve
```

### Testing

Run unit tests:
```bash
ng test
```

### Building for Production

```bash
ng build ngx-zs-component --configuration production
```

### Publishing

1. Build the library:
```bash
ng build ngx-zs-component
```

2. Navigate to the dist directory:
```bash
cd dist/ngx-zs-component
```

3. Publish to npm:
```bash
npm publish
```

### Guidelines

- Follow Angular coding conventions
- Add JSDoc comments for all public APIs
- Include unit tests for new features
- Update documentation for API changes
- Follow semantic versioning

---

## License

[Ziad Shalaby](https://github.com/ziadshalaby00)
This project is licensed under the MIT License.

---

## Changelog / Versioning

### Version 3.4.0

- Added `ZS-field` component for flexible form field wrapping
- Enhanced theme toggle with drag-to-position functionality
- Improved accessibility across all components
- Updated Tailwind CSS integration

### Version 3.0.0

- Migrated to Angular 20+ with signal-based reactivity
- Added zoneless change detection support
- Complete rewrite of all components using standalone architecture
- Introduced unified palette system

---

*For more information, visit the [GitHub repository](https://github.com/ziadshalaby00/ngx-zs-component-lib) or contact the maintainer.*

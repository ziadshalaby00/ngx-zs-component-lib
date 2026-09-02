# @ziadshalaby/ngx-zs-component

**A comprehensive Angular component library (version 4.6.4) built with Angular 20+ and Tailwind CSS.** It provides a rich set of reusable UI components with built-in theming support (light/dark modes), responsive design, and accessibility features.

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
- **Angular Signals Forms** integration for seamless form validation

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
| **Form Components** | Input, Select, Checkbox, Toggle, Range, File, Button, Label |
| **Layout Components** | Card, Carousel, Modal, Sidebar, Navbar, Footer |
| **Feedback Components** | Alert (with service), Spinner, Connection Status |
| **Navigation** | NavItem, Pagination, Scroll-to-Top |
| **Utility Components** | Theme Toggle, Page 404, Input Errors |
| **Services** | AlertService, ExtractorService, NavItemService, VisibilityObserverService |
| **Signals Forms Integration** | All form controls implement `FormValueControl` or `FormCheckboxControl` interfaces |
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
import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { Button, AlertService, Alert, Input } from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Button, Alert, Input],
  template: `
    <form [form]="loginForm">
      <ZS-input
        label="Email"
        placeholder="Enter your email"
        [formField]="loginForm.fields.email"
      ></ZS-input>
      
      <ZS-button (clickedEv)="showAlert()">Click Me</ZS-button>
      <ZS-alert></ZS-alert>
    </form>
  `
})
export class ExampleComponent {
  private alertService = inject(AlertService);

  loginForm = form({
    email: formField({ value: '', validators: [required()] }),
  });

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
import { form, formField, required, email } from '@angular/forms/signals';
import { 
  Button, Input, Alert, AlertService, 
  Card, ThemeToggle, themeTypes, Select, Checkbox
} from '@ziadshalaby/ngx-zs-component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [Button, Input, Alert, Card, ThemeToggle, Select, Checkbox],
  template: `
    <ZS-theme-toggle 
      (themeChangeEv)="onThemeChange($event)"
    ></ZS-theme-toggle>

    <ZS-card cardStyle="primary" animation="bottom">
      <div class="zs:p-6">
        <h2>Welcome to ngx-zs-component!</h2>
        
        <form [form]="demoForm">
          <ZS-input 
            label="Your Name"
            placeholder="Enter your name"
            [formField]="demoForm.fields.name"
          ></ZS-input>

          <ZS-input 
            type="email"
            label="Email"
            placeholder="Enter your email"
            [formField]="demoForm.fields.email"
          ></ZS-input>

          <ZS-select
            label="Role"
            [items]="roles"
            [formField]="demoForm.fields.role"
          ></ZS-select>

          <ZS-checkbox
            label="Accept Terms"
            [formField]="demoForm.fields.terms"
          ></ZS-checkbox>
          
          <ZS-button 
            btnStyle="primary" 
            (clickedEv)="submit()"
            [disabled]="!demoForm.valid()"
          >
            Submit
          </ZS-button>
        </form>
      </div>
    </ZS-card>

    <ZS-alert></ZS-alert>
  `
})
export class DemoComponent {
  private alertService = inject(AlertService);

  roles: DropdownItem<number>[] = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Designer' },
    { id: 3, name: 'Manager' }
  ];

  demoForm = form({
    name: formField({ value: '', validators: [required()] }),
    email: formField({ value: '', validators: [required(), email()] }),
    role: formField({ value: [] as DropdownItem<number>[], validators: [required()] }),
    terms: formField({ value: false, validators: [required()] })
  });

  submit() {
    if (this.demoForm.valid()) {
      this.alertService.addAlert({
        type: 'success',
        message: 'Form submitted successfully!',
        autoClose: true,
        duration: 3000
      });
    }
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

### 3. Signals Forms Integration

All form components implement Angular's `FormValueControl` or `FormCheckboxControl` interfaces, enabling seamless integration with Signals Forms:

```typescript
import { form, formField, required, email } from '@angular/forms/signals';

const myForm = form({
  name: formField({ value: '', validators: [required(), minLength(3)] }),
  email: formField({ value: '', validators: [required(), email()] })
});
```

```html
<form [form]="myForm">
  <ZS-input [formField]="myForm.fields.name"></ZS-input>
  <ZS-input type="email" [formField]="myForm.fields.email"></ZS-input>
</form>
```

### 4. Dark Mode

Dark mode is implemented using the `dark` class on the `<html>` element:

```html
<html class="dark">
  <!-- Dark mode styles are applied via Tailwind's dark: variant -->
</html>
```

Use the `ZS-theme-toggle` component for automatic dark mode switching.

### 5. Z-Index Management

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

### 6. Component Prefix

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

A feature-rich input component with validation, formatting, and various input types. **Now implements `FormValueControl<string | number | null>` for Signals Forms integration.**

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
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `required` | `boolean` | `false` | Required field |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Left icon template |
| `showSearchIcon` | `boolean` | `false` | Show search icon |
| `showLoaderIconOnSearchInput` | `boolean` | `false` | Show loader on search |
| `maxlength` | `number \| null` | `null` | Max character length |
| `minlength` | `number \| null` | `null` | Min character length |
| `spellcheck` | `boolean` | `false` | Spellcheck enabled |
| `htmlMin` | `string \| number \| null` | `null` | Min value (number/date) |
| `htmlMax` | `string \| number \| null` | `null` | Max value (number/date) |
| `step` | `number \| null` | `null` | Step increment |
| `autofocus` | `boolean` | `false` | Autofocus on load |
| `searchDebounceDelay` | `number` | `300` | Search debounce (ms) |
| `size` | `BaseSize` | `'md'` | Input size |
| `autocomplete` | `string \| null` | `'off'` | Autocomplete attribute |
| `inputmode` | `string \| null` | `null` | Input mode attribute |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `ModelSignal<string \| number \| null>` | Input value (two-way) |
| `touched` | `ModelSignal<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on blur |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |
| `min` | `Input<string \| number>` | Min constraint |
| `max` | `Input<string \| number>` | Max constraint |
| `minLength` | `Input<number>` | Min length constraint |
| `maxLength` | `Input<number>` | Max length constraint |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `enterEv` | `void` | Emitted on Enter key |
| `focusEv` | `void` | Emitted on focus |
| `blurEv` | `void` | Emitted on blur |
| `changedEv` | `string \| number \| null` | Emitted on value change |
| `searchEv` | `string \| number \| null` | Emitted on search |
| `clearedEv` | `void` | Emitted when cleared |
| `keydownEv` | `KeyboardEvent` | Emitted on keydown |

**Example with Signals Forms:**

```typescript
import { form, formField, required, email, minLength, maxLength } from '@angular/forms/signals';

const myForm = form({
  username: formField({ 
    value: '', 
    validators: [required(), minLength(3), maxLength(20)] 
  }),
  email: formField({ 
    value: '', 
    validators: [required(), email()] 
  }),
  password: formField({ 
    value: '', 
    validators: [required(), minLength(8)] 
  }),
  age: formField({ 
    value: 0, 
    validators: [min(18), max(99)] 
  })
});
```

```html
<form [form]="myForm">
  <!-- Basic text input -->
  <ZS-input 
    label="Username"
    placeholder="Enter username"
    [formField]="myForm.fields.username"
  ></ZS-input>

  <!-- Email input with validation -->
  <ZS-input 
    type="email"
    label="Email Address"
    placeholder="you@example.com"
    hint="We'll never share your email"
    [formField]="myForm.fields.email"
  ></ZS-input>

  <!-- Password input -->
  <ZS-input 
    type="password"
    label="Password"
    placeholder="Enter password"
    [formField]="myForm.fields.password"
  ></ZS-input>

  <!-- Search input with debounce -->
  <ZS-input 
    type="search"
    label="Search"
    placeholder="Search..."
    [showLoaderIconOnSearchInput]="true"
    (searchEv)="performSearch($event)"
  ></ZS-input>

  <!-- Number input with range -->
  <ZS-input 
    type="number"
    label="Age"
    [formField]="myForm.fields.age"
  ></ZS-input>

  <!-- Date input -->
  <ZS-input 
    type="date"
    label="Birth Date"
    [htmlMin]="'1900-01-01'"
    [htmlMax]="'2020-01-01'"
    [(value)]="birthDate"
  ></ZS-input>
</form>
```

---

#### `ZS-select`

A customizable dropdown select component with search and multi-select support. **Now implements `FormValueControl<DropdownItem<T>[]>` for Signals Forms integration.**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `items` | `DropdownItem<T>[]` | **Required** | Options list |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `showSearch` | `boolean` | `true` | Show search input |
| `searchPlaceholder` | `string` | `'Search...'` | Search placeholder |
| `noResultsText` | `string` | `'No results found'` | No results message |
| `showClearButton` | `boolean` | `true` | Show clear button |
| `searchDebounceDelay` | `number` | `300` | Search debounce (ms) |
| `showLoaderIconOnSearchInput` | `boolean` | `false` | Show loader on search |
| `multiple` | `boolean` | `false` | Multi-select mode |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `ModelSignal<DropdownItem<T>[]>` | Selected items (two-way) |
| `touched` | `Input<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on blur |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `selectedItemsEv` | `DropdownItem<T>[]` | Emitted on selection change |
| `selectionClearedEv` | `void` | Emitted when cleared |

**Example with Signals Forms:**

```typescript
import { form, formField, required } from '@angular/forms/signals';

const options: DropdownItem<number>[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' }
];

const myForm = form({
  singleSelect: formField({ 
    value: [] as DropdownItem<number>[], 
    validators: [required()] 
  }),
  multiSelect: formField({ 
    value: [] as DropdownItem<number>[], 
    validators: [required()] 
  })
});
```

```html
<form [form]="myForm">
  <!-- Single select -->
  <ZS-select
    label="Choose an option"
    [items]="options"
    placeholder="Select..."
    [formField]="myForm.fields.singleSelect"
    inputStyle="primary"
  ></ZS-select>

  <!-- Multi-select -->
  <ZS-select
    label="Select multiple"
    [items]="options"
    [multiple]="true"
    [formField]="myForm.fields.multiSelect"
    inputStyle="success"
  ></ZS-select>
</form>
```

---

#### `ZS-checkbox`

A customizable checkbox component with variant and shape options. **Now implements `FormCheckboxControl` for Signals Forms integration.**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `size` | `BaseSize` | `'md'` | Checkbox size |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `variant` | `'solid' \| 'regular'` | `'regular'` | Icon style |
| `shape` | `'square' \| 'circle'` | `'square'` | Checkbox shape |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `checked` | `ModelSignal<boolean>` | Checked state (two-way) |
| `touched` | `Input<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on interaction |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |

**Example with Signals Forms:**

```typescript
import { form, formField, required } from '@angular/forms/signals';

const myForm = form({
  terms: formField({ value: false, validators: [required()] }),
  notifications: formField({ value: true })
});
```

```html
<form [form]="myForm">
  <!-- Basic checkbox -->
  <ZS-checkbox 
    label="Accept terms"
    [formField]="myForm.fields.terms"
  ></ZS-checkbox>

  <!-- Solid variant -->
  <ZS-checkbox 
    label="Solid style"
    variant="solid"
    inputStyle="primary"
    [formField]="myForm.fields.notifications"
  ></ZS-checkbox>
</form>
```

---

#### `ZS-toggle`

A toggle switch component with color and size options. **Now implements `FormCheckboxControl` for Signals Forms integration.**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `color` | `BaseColors` | `'blue'` | Toggle color |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `iconTpl` | `TemplateRef<any>` | `undefined` | Icon template |
| `size` | `BaseSize` | `'md'` | Toggle size |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `checked` | `ModelSignal<boolean>` | Toggle state (two-way) |
| `touched` | `Input<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on interaction |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |

**Example with Signals Forms:**

```typescript
import { form, formField } from '@angular/forms/signals';

const myForm = form({
  darkMode: formField({ value: false }),
  notifications: formField({ value: true })
});
```

```html
<form [form]="myForm">
  <ZS-toggle 
    label="Enable notifications"
    [formField]="myForm.fields.notifications"
  ></ZS-toggle>

  <ZS-toggle 
    label="Dark mode"
    color="violet"
    [formField]="myForm.fields.darkMode"
  ></ZS-toggle>
</form>
```

---

#### `ZS-range`

A customizable range slider component. **Now implements `FormValueControl<number>` for Signals Forms integration.**

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `Id` | `string` | `crypto.randomUUID()` | Unique identifier |
| `label` | `string \| null` | `null` | Label text |
| `hint` | `string \| null` | `null` | Hint text |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `10` | Step increment |
| `inputStyle` | `FormStyle` | `'secondary'` | Color variant |
| `size` | `BaseSize` | `'md'` | Range size |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `showValue` | `boolean` | `true` | Show current value |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `ModelSignal<number>` | Current value (two-way) |
| `touched` | `Input<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on interaction |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |
| `min` | `Input<number>` | Min constraint |
| `max` | `Input<number>` | Max constraint |

**Example with Signals Forms:**

```typescript
import { form, formField, required, min, max } from '@angular/forms/signals';

const myForm = form({
  volume: formField({ 
    value: 50, 
    validators: [required(), min(0), max(100)] 
  }),
  brightness: formField({ 
    value: 75, 
    validators: [required(), min(0), max(100)] 
  })
});
```

```html
<form [form]="myForm">
  <ZS-range 
    label="Volume"
    [min]="0"
    [max]="100"
    [step]="5"
    [formField]="myForm.fields.volume"
  ></ZS-range>

  <ZS-range 
    label="Brightness"
    [min]="0"
    [max]="100"
    inputStyle="primary"
    size="lg"
    [formField]="myForm.fields.brightness"
  ></ZS-range>
</form>
```

---

#### `ZS-file`

A file upload component with preview and validation support. **Now implements `FormValueControl<FilesType>` for Signals Forms integration.**

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
| `readonly` | `boolean` | `false` | Readonly state |
| `hidden` | `boolean` | `false` | Hidden state |
| `required` | `boolean` | `false` | Required field |
| `accept` | `string` | `''` | Accepted file types |
| `multiple` | `boolean` | `false` | Multiple files |
| `allowPreview` | `boolean` | `true` | Enable file preview |

**Signals Forms Control Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `ModelSignal<FilesType>` | Files map (two-way) |
| `touched` | `Input<boolean>` | Tracks if user interacted |
| `touch` | `Output<void>` | Emitted on blur |
| `dirty` | `Input<boolean>` | Dirty state |
| `disabled` | `Input<boolean>` | Disabled state |
| `readonly` | `Input<boolean>` | Readonly state |
| `hidden` | `Input<boolean>` | Hidden state |
| `errors` | `Input<ValidationError[]>` | Validation errors |
| `invalid` | `Input<boolean>` | Invalid state |
| `required` | `Input<boolean>` | Required constraint |

**Outputs:**

| Output | Type | Description |
|--------|------|-------------|
| `changeEv` | `FileData[]` | Emitted on file change |

**Example with Signals Forms:**

```typescript
import { form, formField, required } from '@angular/forms/signals';

const myForm = form({
  document: formField({ 
    value: new Map() as FilesType, 
    validators: [required()] 
  }),
  images: formField({ 
    value: new Map() as FilesType 
  })
});
```

```html
<form [form]="myForm">
  <!-- Single file upload -->
  <ZS-file
    label="Upload Document"
    hint="Max 5MB"
    accept=".pdf,.docx,.jpg,.png"
    [formField]="myForm.fields.document"
    inputStyle="primary"
  ></ZS-file>

  <!-- Multiple file upload -->
  <ZS-file
    label="Upload Images"
    hint="Select multiple images"
    accept="image/*"
    [multiple]="true"
    [allowPreview]="true"
    [formField]="myForm.fields.images"
    inputStyle="success"
  ></ZS-file>
</form>
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

// File data
interface FileData {
  name: string;
  size: number;
  type: string;
  url?: string;
}
type FilesType = Map<string, FileData>;

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

// Theme types
type themeTypes = 'light' | 'dark';
```

### Signals Forms Types

```typescript
// Form value control interface
interface FormValueControl<T> {
  value: ModelSignal<T>;
  touched?: Input<boolean>;
  touch?: Output<void>;
  dirty?: Input<boolean>;
  disabled?: Input<boolean>;
  readonly?: Input<boolean>;
  hidden?: Input<boolean>;
  disabledReasons?: Input<readonly WithOptionalFieldTree<DisabledReason>[]>;
  errors?: Input<readonly WithOptionalFieldTree<ValidationError>[]>;
  invalid?: Input<boolean>;
  pending?: Input<boolean>;
  required?: Input<boolean>;
  min?: Input<string | number | undefined>;
  max?: Input<string | number | undefined>;
  minLength?: Input<number | undefined>;
  maxLength?: Input<number | undefined>;
  name?: Input<string>;
}

// Form checkbox control interface
interface FormCheckboxControl {
  checked: ModelSignal<boolean>;
  touched?: Input<boolean>;
  touch?: Output<void>;
  dirty?: Input<boolean>;
  disabled?: Input<boolean>;
  readonly?: Input<boolean>;
  hidden?: Input<boolean>;
  disabledReasons?: Input<readonly WithOptionalFieldTree<DisabledReason>[]>;
  errors?: Input<readonly WithOptionalFieldTree<ValidationError>[]>;
  invalid?: Input<boolean>;
  pending?: Input<boolean>;
  required?: Input<boolean>;
  name?: Input<string>;
}
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

### Example 1: Login Form with Signals Forms

```typescript
import { Component, inject } from '@angular/core';
import { form, formField, required, email, minLength } from '@angular/forms/signals';
import { 
  Button, Input, Alert, AlertService, 
  Card, ThemeToggle 
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
          
          <form [form]="loginForm">
            <ZS-input
              type="email"
              label="Email"
              placeholder="you@example.com"
              [formField]="loginForm.fields.email"
            ></ZS-input>
            
            <ZS-input
              type="password"
              label="Password"
              placeholder="Enter password"
              [formField]="loginForm.fields.password"
            ></ZS-input>
            
            <ZS-button 
              btnStyle="primary" 
              [disabled]="!loginForm.valid() || isLoading()"
              (clickedEv)="submit()"
              class="zs:w-full"
            >
              {{ isLoading() ? 'Logging in...' : 'Login' }}
            </ZS-button>
          </form>
        </div>
      </ZS-card>
      
      <ZS-alert></ZS-alert>
    </div>
  `
})
export class LoginComponent {
  private alertService = inject(AlertService);
  isLoading = signal(false);
  
  loginForm = form({
    email: formField({ 
      value: '', 
      validators: [required(), email()] 
    }),
    password: formField({ 
      value: '', 
      validators: [required(), minLength(6)] 
    })
  });

  submit() {
    if (!this.loginForm.valid()) return;
    
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
import { form, formField, required, email, minLength, maxLength, pattern } from '@angular/forms/signals';
import { 
  Button, Input, Select, Checkbox, Alert, AlertService, 
  Card, DropdownItem
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
          
          <form [form]="registerForm">
            <ZS-input
              label="Username"
              placeholder="Choose a username"
              [formField]="registerForm.fields.username"
            ></ZS-input>
            
            <ZS-input
              type="email"
              label="Email"
              placeholder="you@example.com"
              [formField]="registerForm.fields.email"
            ></ZS-input>
            
            <ZS-input
              type="password"
              label="Password"
              placeholder="Create a password"
              [formField]="registerForm.fields.password"
            ></ZS-input>
            
            <ZS-select
              label="Role"
              [items]="roles"
              placeholder="Select a role"
              [formField]="registerForm.fields.role"
            ></ZS-select>
            
            <ZS-checkbox
              label="I agree to the Terms of Service"
              [formField]="registerForm.fields.terms"
            ></ZS-checkbox>
            
            <ZS-button 
              btnStyle="success" 
              [disabled]="!registerForm.valid()"
              (clickedEv)="submit()"
              class="zs:w-full zs:mt-4"
            >
              Register
            </ZS-button>
          </form>
        </div>
      </ZS-card>
      
      <ZS-alert></ZS-alert>
    </div>
  `
})
export class RegisterComponent {
  private alertService = inject(AlertService);
  
  registerForm = form({
    username: formField({ 
      value: '', 
      validators: [
        required(), 
        minLength(3), 
        maxLength(20),
        pattern('^[a-zA-Z0-9_]+$', 'Username can only contain letters, numbers, and underscores')
      ] 
    }),
    email: formField({ 
      value: '', 
      validators: [required(), email()] 
    }),
    password: formField({ 
      value: '', 
      validators: [
        required(), 
        minLength(8),
        pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$', 'Password must contain uppercase, lowercase, and number')
      ] 
    }),
    role: formField({ 
      value: [] as DropdownItem<number>[], 
      validators: [required()] 
    }),
    terms: formField({ 
      value: false, 
      validators: [required()] 
    })
  });
  
  roles: DropdownItem<number>[] = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Designer' },
    { id: 3, name: 'Manager' }
  ];

  submit() {
    if (!this.registerForm.valid()) return;
    
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

### Custom Validation with Signals Forms

```typescript
import { form, formField, required } from '@angular/forms/signals';
import { validate } from '@angular/forms/signals/validation';

// Create custom validators
const usernameValidator = validate((value: string) => {
  const errors: string[] = [];
  if (!value) return errors;
  if (value.length < 3) errors.push('Username must be at least 3 characters');
  if (value.includes(' ')) errors.push('Username cannot contain spaces');
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  return errors;
});

const passwordValidator = validate((value: string) => {
  const errors: string[] = [];
  if (!value) return errors;
  if (value.length < 8) errors.push('Password must be at least 8 characters');
  if (!/[A-Z]/.test(value)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(value)) errors.push('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(value)) errors.push('Password must contain at least one number');
  return errors;
});

const myForm = form({
  username: formField({ 
    value: '', 
    validators: [required(), usernameValidator] 
  }),
  password: formField({ 
    value: '', 
    validators: [required(), passwordValidator] 
  })
});
```

```html
<ZS-input
  type="password"
  label="Password"
  [formField]="myForm.fields.password"
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
| `Form validation not triggering` | `touched` not set | The `touch` output is automatically emitted on blur/interaction |

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

### 3. Use Signals Forms for Validation

Leverage Angular's Signals Forms for validation instead of manual validation:

```typescript
// ✅ Good
const form = form({
  email: formField({ value: '', validators: [required(), email()] })
});

// ❌ Avoid
email = signal('');
emailErrors = computed(() => {
  // Manual validation logic
});
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

### 5. Enable Zoneless Change Detection

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

### 6. Performance Considerations

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

### Q: What is the difference between `validateFns` and Signals Forms validation?
A: `validateFns` was removed in v4.6.4. All validation is now handled through Angular's Signals Forms using `formField` with validators.

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
1. Ensure the `touch` output is being emitted (happens automatically on blur/interaction)
2. Check that `errors` input is properly connected to the form
3. Verify your custom validator returns an array of strings

### Problem: Alert not showing

**Solution:**
1. Ensure `<ZS-alert>` is added to your template
2. Verify the `AlertService` is properly injected
3. Check that `addAlert` is called with valid parameters

### Problem: Select dropdown not opening

**Solution:**
1. Check `disabled` and `readonly` inputs
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

### Version 4.6.4

- **BREAKING**: Removed `ZS-field` component
- **BREAKING**: Removed `FieldInputStyle` directive
- **BREAKING**: Removed `Form<T>` service
- **BREAKING**: All form components now implement Angular Signals Forms interfaces
- **BREAKING**: Removed `validateFns` and `formatFn` inputs from form components
- **BREAKING**: Renamed `isReadonly` to `readonly` in all form components
- **BREAKING**: Renamed `selectedItems` to `value` in `ZS-select`
- **BREAKING**: Renamed `files` to `value` in `ZS-file`
- Added Signals Forms integration for all form controls
- Added `formField` binding for seamless form validation
- Improved accessibility across all components

### Version 3.0.0

- Migrated to Angular 20+ with signal-based reactivity
- Added zoneless change detection support
- Complete rewrite of all components using standalone architecture
- Introduced unified palette system

---

*For more information, visit the [GitHub repository](https://github.com/ziadshalaby00/ngx-zs-component-lib) or contact the maintainer.*
import { Signal, ChangeDetectionStrategy } from '@angular/core';
// ==============================================
// Imports
// ==============================================

import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItem, NavbarItem } from '../NavItemFolder/nav-item/nav-item';
import { ButtonVariant, Button } from '../FormCompFolder/button/button';
import { BaseSize, FormStyle } from '../palette-service';
import { zIndices, ZIndicesType } from '../z-index';

// ==============================================
// Interfaces & Types
// ==============================================

export interface UserProfile {
  name: string;
  username?: string;
  email?: string;
  imageUrl?: string;
  [key: string]: any;
}

export type NavbarItemExport = Omit<NavbarItem, 'childrenOpenWindow'>;

export interface NavItemsType {
  routerLinkActive?: string;
  colorClass?: string;

  items: NavbarItemExport[];
}

export type UserItemsType =
  Omit<NavItemsType, 'routerLinkActive' | 'colorClass'>;

export interface SiteNameConfigType {
  siteName: string;
  siteNameColorClass?: string;
  routerLink?: string;
}

export interface AuthButtonsType {
  showAuthButtons: boolean;
  login?: {
    btnStyle?: FormStyle;
    variant?: ButtonVariant;
    size?: BaseSize;
    iconTpl?: Signal<TemplateRef<any> | undefined>;
  }
  signup?: {
    btnStyle?: FormStyle,
    variant?: ButtonVariant,
    size?: BaseSize,
    iconTpl?: Signal<TemplateRef<any> | undefined>;
  }
}

export type MobileModeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' 

// ==============================================
// Component Decorator
// ==============================================

@Component({
  selector: 'ZS-navbar',
  imports: [RouterModule, CommonModule, NavItem, Button],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.css'
})
export class Navbar {
  readonly zIndices: ZIndicesType = zIndices;
  
  // ==============================================
  // Inputs
  // ==============================================

  readonly fixed = input<boolean>(true);
  readonly mobileMode = input<MobileModeType>('lg');

  readonly logoUrl = input<string | undefined>();
  readonly siteNameConfig = input<SiteNameConfigType | undefined>();

  readonly authButtons = input<AuthButtonsType>({ showAuthButtons: false });
  readonly showUserSection = input<boolean>(true);
  readonly showSearchBar = input<boolean>(false);

  readonly navItems = input<NavItemsType>();

  readonly isLoggedIn = input<boolean>(false);
  readonly userProfile = input<UserProfile | undefined>();

  readonly userMenuItems = input<UserItemsType>();

  readonly searchPlaceholder = input<string>('Search...');
  
  // ==============================================
  // Outputs
  // ==============================================

  readonly loginClickedEv = output<void>();
  readonly signupClickedEv = output<void>();
  readonly searchSubmittedEv = output<string | null>();
  readonly anyItemClickedEv = output<NavbarItem>();

  // ==============================================
  // Models
  // ==============================================

  readonly searchValue = model<string | null>(null);
  readonly isMobileMenuOpen = model<boolean>(false);

  readonly isUserMenuOpen = model<boolean>(false);
  readonly isMoreOpen = model<boolean>(false);

  // ==============================================
  // Computed Properties
  // ==============================================

  readonly visibleNavItems = computed<NavbarItem[]>(() => {
    const items = this.navItems()?.items ?? [];
    const limit = this.showSearchBar() ? 2 : 5;
    return items.slice(0, limit).map(item => this.toNavbarItem(
      item,
      true,
      this.navItems()?.routerLinkActive, 
      this.navItems()?.colorClass
    ));
  });

  readonly moreNavItems = computed<NavbarItem[]>(() => {
    const items = this.navItems()?.items ?? [];
    const start = this.showSearchBar() ? 2 : 5;
    return items.slice(start).map(item => this.toNavbarItem(
      item,
      true,
      this.navItems()?.routerLinkActive, 
      this.navItems()?.colorClass
    ));
  });

  readonly mobileNavItems = computed<NavbarItem[]>(() =>
    (this.navItems()?.items ?? []).map(item => this.toNavbarItem(
      item,
      false,
      this.navItems()?.routerLinkActive, 
      this.navItems()?.colorClass
    ))
  );

  readonly getUserMenuItems = computed<NavbarItem[]>(() =>
    this.userMenuItems()!.items.map(item => this.toNavbarItem(item, false))
  );

  readonly desktopVisibilityClass = computed(() => {
    switch (this.mobileMode()) {
      case 'xs': return 'zs:xs:flex';
      case 'sm': return 'zs:sm:flex';
      case 'md': return 'zs:md:flex';
      case 'lg': return 'zs:lg:flex';
      case 'xl': return 'zs:xl:flex';
      default: return '';
    }
  });

  readonly desktopVisibilityClassBlock = computed(() => {
    switch (this.mobileMode()) {
      case 'xs': return 'zs:xs:block';
      case 'sm': return 'zs:sm:block';
      case 'md': return 'zs:md:block';
      case 'lg': return 'zs:lg:block';
      case 'xl': return 'zs:xl:block';
      default: return '';
    }
  });

  readonly desktopHiddenClass = computed(() => {
    switch (this.mobileMode()) {
      case 'xs': return 'zs:xs:hidden';
      case 'sm': return 'zs:sm:hidden';
      case 'md': return 'zs:md:hidden';
      case 'lg': return 'zs:lg:hidden';
      case 'xl': return 'zs:xl:hidden';
      default: return '';
    }
  });

  // ==============================================
  // Private Helper Methods
  // ==============================================

  private toNavbarItem(
    item: NavbarItemExport,
    childrenOpenWindow = false,
    generalRouterLinkActive?: string,
    generalColorClass?: string,
  ): NavbarItem {
    return {
      ...item,
      colorClass: item.colorClass ?? generalColorClass,
      routerLinkActive: item.routerLinkActive ?? generalRouterLinkActive,
      childrenConfig: {
        childrenOpenWindow
      },
      children: item.children?.map(child => this.toNavbarItem(
        child, 
        childrenOpenWindow, 
        generalRouterLinkActive,
        generalColorClass
      )) ?? []
    };
  }

  // ==============================================
  // Event Handlers
  // ==============================================

  onSearchSubmit(): void {
    this.searchSubmittedEv.emit(this.searchValue());
  }

  onLogin(): void {
    this.loginClickedEv.emit();
  }

  onSignup(): void {
    this.signupClickedEv.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(value => !value);
  }

  closeNavMenus(): void {
    this.isMobileMenuOpen.set(false);
    this.isMoreOpen.set(false);
  }

  itemClicked(event: NavbarItem, type: 'navItems' | 'userItems'): void {
    this.anyItemClickedEv.emit(event);
  }

  // ==============================================
  // Lifecycle Hooks
  // ==============================================

  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth >= 1024) {
        this.isMobileMenuOpen.set(false);
      }
    });
    this.resizeObserver.observe(document.body);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
}
import { Component, computed, inject } from '@angular/core';
import { AuthButtonsType, Navbar, NavbarItemExport, navItemsType, SiteNameConfigType, UserProfile } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/navbar/navbar';
import { Input } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/input/input";
import { Alert } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert/alert";
import { AlertService } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert-service/alert-service';

@Component({
  selector: 'app-test',
  imports: [Navbar, Input, Alert],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  // private router: Router = inject(Router)

  // readonly isMobileMenuOpen = model<boolean>(false)
  
  readonly alertService = inject(AlertService)
  constructor() {
    
  }

  siteNameConfig: SiteNameConfigType = {
    siteName: 'NgxZsComponent',
    siteNameColorClass: 'text-gray-800 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300'
  }

  authButtons: AuthButtonsType = {
    showAuthButtons: true,
    signup: {
      btnStyle: 'teal'
    },
    login: {
      btnStyle: 'dark'
    }
  }

  navItems: navItemsType = {
    navItems: [
      { 
        label: 'Test', 
        routerLink: '/test', 
        icon: 'fa-solid fa-vial',
        iconClass: 'text-lg', 
        colorClass: `text-green-600 hover:text-green-700 dark:hover:text-green-500`, 
      },
      { label: 'Products', routerLink: '/products', icon: 'fas fa-tag', iconClass: 'text-lg'},
      { label: 'Cart', routerLink: '/cart', icon: 'fas fa-shopping-cart', iconClass: 'text-blue-700 dark:text-blue-500 text-lg'},
      { label: 'About Us', routerLink: '/about'},
      { label: 'Contact Us', routerLink: '/contact'},
      {
        label: 'Legal Pages',
        children: [
          { label: 'Privacy Policy', routerLink: '/privacyPolicy', useDefaultColorClass: 'bg' },
          { label: 'Terms & Conditions', routerLink: '/termsConditions', useDefaultColorClass: 'bg'},
        ]
      },
    ]
  }

  userProfile = computed<UserProfile | undefined>(() => {
    return {
      name: 'Ziad Shalaby',
      email: 'shalabyziad94@gmail.com',
      username: 'ziad123'
    }
  })

  userMenuItems: NavbarItemExport[] = [
    { label: 'Profile', routerLink: '/profile', icon: 'fa-solid fa-user ', iconClass: 'text-lg'},
    { 
      label: 'Cart', 
      routerLink: '/cart', 
      icon: 'fas fa-shopping-cart',
      iconClass: 'text-lg text-blue-700 dark:text-blue-500', 
    },
    { 
      label: 'Dashboard', 
      icon: 'fa-solid fa-gear',
      children: [
        { 
          label: 'Orders', 
          routerLink: '/orders', 
          icon: 'fas fa-box',
          iconClass: 'text-lg text-indigo-500',
          useDefaultColorClass: 'bg'
        },
        { label: 'Addresses', routerLink: '/addresses', icon: 'fa-solid fa-location-dot', iconClass: 'text-lg', useDefaultColorClass: 'bg' },
        { label: 'Reviews', routerLink: '/reviews', icon: 'fa-solid fa-star', iconClass: 'text-lg', useDefaultColorClass: 'bg' },
      ]
    },
    { 
      label: 'Logout', 
      action: () => this.logout(),
      colorClass: 'text-red-700 hover:text-red-800 dark:hover:text-red-600',
      icon: 'fas fa-sign-out-alt',
      iconClass: 'text-lg',
    }
  ];

  onLogin() {
    // this.router.navigate(['/login'])
  }

  onSignup() {
    // this.router.navigate(['/signup'])
  }

  onSearch(query: string | null) {
    console.log('Search for:', query);
  }

  logout() {
    // 
  }

  va = (value: string | null) => value === '1' ? ['value is 1'] : ['value not 1']
}

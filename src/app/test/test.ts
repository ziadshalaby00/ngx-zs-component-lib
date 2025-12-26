import { Sidebar } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/sidebar/sidebar';
import { Checkbox } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/checkbox/checkbox';
import { Modal } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/modal/modal';
import { Select } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/select/select';
import { AnimationType, Card } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/card/card';
import { Component, computed, inject, signal } from '@angular/core';
import { AuthButtonsType, Navbar, NavbarItemExport, navItemsType, SiteNameConfigType, UserProfile } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/navbar/navbar';
import { Input } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/input/input";
import { Alert } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert/alert";
import { AlertService } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert-service/alert-service';
import { FormStyle } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/palette-service';
import { Button } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/button/button";
import { themeTypes } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle';
import { FileInput } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/file/file'

@Component({
  selector: 'app-test',
  imports: [Navbar, Sidebar, Checkbox, Input, Card],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  // private router: Router = inject(Router)

  // readonly isMobileMenuOpen = model<boolean>(false)
  

  readonly alertService = inject(AlertService)

  siteNameConfig: SiteNameConfigType = {
    siteName: 'NgxZsComponent',
    siteNameColorClass: `zs:text-gray-800 zs:hover:text-gray-600 
    zs:dark:text-gray-100 zs:dark:hover:text-gray-300`
  }

  authButtons: AuthButtonsType = {
    showAuthButtons: true,
    signup: {
      btnStyle: 'primary'
    },
    login: {
      btnStyle: 'violet'
    }
  }

  navItems: navItemsType = {
    navItems: [
      // { 
      //   label: 'Test', 
      //   routerLink: '/test', 
      //   icon: 'fa-solid fa-vial',
      //   iconClass: 'zs:text-lg', 
      //   colorClass: `zs:text-green-600 zs:hover:text-green-700 zs:dark:hover:text-green-500`, 
      // },
      // { label: 'Products', routerLink: '/products', icon: 'fas fa-tag', iconClass: 'zs:text-lg'},
      // { label: 'Cart', routerLink: '/cart', 
      //   icon: 'fas fa-shopping-cart', 
      //   iconClass: 'zs:text-blue-700 zs:dark:text-blue-500 zs:text-lg'},
      // { label: 'About Us', routerLink: '/about'},
      // { label: 'Contact Us', routerLink: '/contact'},
      // {
      //   label: 'Legal Pages',
      //   children: [
      //     { label: 'Privacy Policy', routerLink: '/privacyPolicy', useDefaultColorClass: 'bg' },
      //     { label: 'Terms & Conditions', routerLink: '/termsConditions', useDefaultColorClass: 'bg'},
      //   ]
      // },
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
    { label: 'Profile', routerLink: '/profile', icon: 'fa-solid fa-user ', iconClass: 'zs:text-lg'},
    { 
      label: 'Cart', 
      routerLink: '/cart', 
      icon: 'fas fa-shopping-cart',
      iconClass: 'zs:text-lg zs:text-blue-700 zs:dark:text-blue-500', 
    },
    { 
      label: 'Dashboard', 
      icon: 'fa-solid fa-gear',
      children: [
        { 
          label: 'Orders', 
          routerLink: '/orders', 
          icon: 'fas fa-box',
          iconClass: 'zs:text-lg zs:text-indigo-500',
          useDefaultColorClass: 'bg'
        },
        { label: 'Addresses', routerLink: '/addresses', 
          icon: 'fa-solid fa-location-dot', 
          iconClass: 'zs:text-lg zs:text-lime-500', useDefaultColorClass: 'bg' },
        { label: 'Reviews', routerLink: '/reviews', icon: 'fa-solid fa-star', 
          iconClass: 'zs:text-lg zs:text-yellow-600', useDefaultColorClass: 'bg' },
      ]
    },
    { 
      label: 'Logout', 
      action: () => this.logout(),
      colorClass: 'zs:text-red-700 zs:hover:text-red-800 zs:dark:hover:text-red-600',
      icon: 'fas fa-sign-out-alt',
      iconClass: 'zs:text-lg',
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

  readonly styles: FormStyle[] = ['primary'
 , 'secondary'
 , 'warning'
 , 'success'
 , 'danger'
 , 'dark'
 , 'info'
 , 'violet'
 , 'teal']


 constructor() {
  this.alertService.bulkAlert([
    'ziad ahmed shalaby',
    'ziad ahmed shalaby',
    'ziad ahmed shalaby',
    'ziad ahmed shalaby',
    'ziad ahmed shalaby',
    'ziad ahmed shalaby',
  ], {
    autoClose: false,
    type: 'danger'
  })
 }
}

import { Pagination } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/pagination/pagination';
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
import { ScrollToTop } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/scroll-to-top/scroll-to-top";

@Component({
  selector: 'app-test',
  imports: [Navbar, Sidebar, Checkbox, Input, Card, ScrollToTop, Pagination],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  // private router: Router = inject(Router)

  // readonly isMobileMenuOpen = model<boolean>(false)
  readonly ccc = signal(5)

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

  readonly logoUrl: string = 'https://i.postimg.cc/Zqwmp84j/android-chrome-512x512.png';

  readonly iconClass: string = 'zs:text-sky-500 zs:dark:text-sky-600';

  readonly navItems = signal<navItemsType>({
    routerLinkActive: 'zs:bg-sky-500 zs:dark:bg-sky-700 zs:text-gray-100',
    colorClass: 'zs:hover:bg-sky-100 zs:dark:hover:bg-sky-700/50',
    navItems: [
      {
        label: 'Home',
        routerLink: '/home',
        icon: 'fa-solid fa-house zs:text-lg',
        iconClass: this.iconClass
      },
      {
        label: 'Azkar',
        icon: 'fa-solid fa-mosque zs:text-lg',
        iconClass: this.iconClass,
        children: [
          {
            label: 'Morning Azkar',
            routerLink: '/azkar/morning',
            icon: 'fa-solid fa-sun zs:text-lg',
            iconClass: 'zs:text-yellow-500',
            closeMenuAfterClick: false
          },
          {
            label: 'Evening Azkar',
            routerLink: '/azkar/evening',
            icon: 'fa-solid fa-moon zs:text-lg',
            iconClass: 'zs:text-gray-900 zs:dark:text-gray-100',
            closeMenuAfterClick: true
          },
          {
            label: 'After Prayer Azkar',
            routerLink: '/azkar/afterPrayer',
            icon: 'fa-solid fa-person-praying zs:text-lg',
            iconClass: 'zs:text-purple-500',
            closeMenuAfterClick: true
          },
          {
            label: 'Tasbeeh',
            routerLink: '/azkar/tasbeeh',
            icon: 'fa-solid fa-leaf zs:text-lg',
            iconClass: 'zs:text-orange-500',
            closeMenuAfterClick: true
          },
          {
            label: 'Comprehensive Supplication',
            routerLink: '/azkar/comprehensiveSupplication',
            icon: 'fa-solid fa-star zs:text-lg',
            iconClass: 'zs:text-emerald-500',
            closeMenuAfterClick: true
          },
          {
            label: 'The Most Beautiful Names of Allah',
            routerLink: '/azkar/namesOfAllah',
            icon: 'fa-solid fa-star zs:text-lg',
            iconClass: 'zs:text-emerald-500',
            closeMenuAfterClick: true
          },
          {
            label: 'Favorites',
            routerLink: '/azkar/favorites',
            icon: 'fa-solid fa-heart zs:text-lg',
            iconClass: 'zs:text-red-600 zs:dark:text-red-700',
            closeMenuAfterClick: true
          }
        ]
      },
      {
        label: 'History',
        routerLink: '/history',
        icon: 'fa-solid fa-clock-rotate-left zs:text-lg',
        iconClass: this.iconClass
      },
      {
        label: 'Features',
        routerLink: '/features',
        icon: 'fa-solid fa-puzzle-piece zs:text-lg',
        iconClass: this.iconClass
      }
    ]
  });

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

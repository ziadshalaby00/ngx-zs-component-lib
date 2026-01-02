import { Page404 } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/page404/page404';
import { Pagination } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/pagination/pagination';
import { Sidebar } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/sidebar/sidebar';
import { Checkbox } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/checkbox/checkbox';
import { Modal } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/modal/modal';
import { Select } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/select/select';
import { AnimationType, Card } from './../../../projects/ngx-zs-component/src/lib/ngx-zs-component/card/card';
import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { AuthButtonsType, Navbar, NavbarItemExport, NavItemsType, SiteNameConfigType, UserItemsType, UserProfile } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/navbar/navbar';
import { Input } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/input/input";
import { Alert } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert/alert";
import { AlertService } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/AlertFolder/alert-service/alert-service';
import { FormStyle } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/palette-service';
import { Button } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/button/button";
import { themeTypes } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/theme-toggle/theme-toggle';
import { FileInput } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/FormCompFolder/file/file'
import { ScrollToTop } from "../../../projects/ngx-zs-component/src/lib/ngx-zs-component/scroll-to-top/scroll-to-top";
import { NavItem } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/NavItemFolder/nav-item/nav-item';

@Component({
  selector: 'app-test',
  imports: [
    Navbar,
    Sidebar,
    Checkbox, 
    Input, 
    Card, 
    ScrollToTop, 
    Pagination,
    Page404,
    NavItem
  ],
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

  private readonly homeIcon = viewChild<TemplateRef<any>>('homeIcon');
  private readonly azkarIcon = viewChild<TemplateRef<any>>('azkarIcon');
  
  readonly navItems = signal<NavItemsType>({
    routerLinkActive: 'zs:bg-sky-500 zs:dark:bg-sky-700 zs:text-gray-100',
    colorClass: 'zs:hover:bg-sky-100 zs:dark:hover:bg-sky-700/50',
    closeMobileMenu: true,
    closeUserMenu: false,
    closeMoreMenu: true,
    items: [
      {
        label: 'Home',
        routerLink: '/home',
        iconTpl: this.homeIcon,
        iconClasses: 'zs:text-sky-500 zs:dark:text-sky-600'
      },
      {
        label: 'Azkar',
        iconTpl: this.azkarIcon,
        children: [
          {
            label: 'Morning Azkar',
            routerLink: '/azkar/morning',
            closeMenuAfterClick: false
          },
          {
            label: 'Evening Azkar',
            routerLink: '/azkar/evening',
            closeMenuAfterClick: true
          },
          {
            label: 'After Prayer Azkar',
            routerLink: '/azkar/afterPrayer',
            closeMenuAfterClick: true
          },
          {
            label: 'Tasbeeh',
            routerLink: '/azkar/tasbeeh',
            closeMenuAfterClick: true
          },
          {
            label: 'Comprehensive Supplication',
            routerLink: '/azkar/comprehensiveSupplication',
            closeMenuAfterClick: true
          },
          {
            label: 'The Most Beautiful Names of Allah',
            routerLink: '/azkar/namesOfAllah',
            closeMenuAfterClick: true
          },
          {
            label: 'Favorites',
            routerLink: '/azkar/favorites',
            closeMenuAfterClick: true
          }
        ]
      },
      {
        label: 'History',
        routerLink: '/history',
      },
      {
        label: 'Features',
        routerLink: '/features',
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

  userMenuItems = signal<UserItemsType>({
    closeMobileMenu: true,
    closeUserMenu: true,
    closeMoreMenu: false,
    items: [
      { 
        label: 'Profile',
        routerLink: '/profile', 
        // icon: 'fa-solid fa-user ', 
        // iconClass: 'zs:text-lg'
      },
      { 
        label: 'Cart', 
        routerLink: '/cart', 
        // icon: 'fas fa-shopping-cart',
        // iconClass: 'zs:text-lg zs:text-blue-700 zs:dark:text-blue-500', 
      },
      { 
        label: 'Dashboard', 
        // icon: 'fa-solid fa-gear',
        children: [
          { 
            label: 'Orders', 
            routerLink: '/orders', 
            // icon: 'fas fa-box',
            // iconClass: 'zs:text-lg zs:text-indigo-500',
            useDefaultColorClass: 'bg'
          },
          { 
            label: 'Addresses', routerLink: '/addresses', 
            // icon: 'fa-solid fa-location-dot', 
            // iconClass: 'zs:text-lg zs:text-lime-500', 
            useDefaultColorClass: 'bg' 
          },
          { 
            label: 'Reviews', routerLink: '/reviews', 
            // icon: 'fa-solid fa-star', 
            // iconClass: 'zs:text-lg zs:text-yellow-600', 
            useDefaultColorClass: 'bg' 
          },
        ]
      },
      { 
        label: 'Logout', 
        action: () => this.logout(),
        colorClass: 'zs:text-red-700 zs:hover:text-red-800 zs:dark:hover:text-red-600',
        // icon: 'fas fa-sign-out-alt',
        // iconClass: 'zs:text-lg',
      }
    ]
  });

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

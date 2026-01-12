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
import { NavbarItem, NavItem } from '../../../projects/ngx-zs-component/src/lib/ngx-zs-component/NavItemFolder/nav-item/nav-item';

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
    NavItem,
    Modal,
    Button
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
    items: [
      {
        id: 'nav-0',
        label: 'Home',
        routerLink: '/home',
        iconTpl: this.homeIcon,
        iconClasses: 'zs:text-sky-500 zs:dark:text-sky-600'
      },
      {
        id: 'nav-1',
        label: 'Azkar',
        iconTpl: this.azkarIcon,
        children: [
          {
            id: 'nav-10',
            label: 'Morning Azkar',
            routerLink: '/azkar/morning',
            closeMenuAfterClick: false
          },
          {
            id: 'nav-11',
            label: 'Evening Azkar',
            routerLink: '/azkar/evening',
            closeMenuAfterClick: true
          },
          {
            id: 'nav-12',
            label: 'After Prayer Azkar',
            routerLink: '/azkar/afterPrayer',
            closeMenuAfterClick: true
          },
          {
            id: 'nav-13',
            label: 'Tasbeeh',
            routerLink: '/azkar/tasbeeh',
            closeMenuAfterClick: true
          },
          {
            id: 'nav-14',
            label: 'Comprehensive Supplication',
            routerLink: '/azkar/comprehensiveSupplication',
            closeMenuAfterClick: true
          },
          {
            id: 'nav-15',
            label: 'The Most Beautiful Names of Allah',
            routerLink: '/azkar/namesOfAllah',
            closeMenuAfterClick: true
          },
          {
            id: 'nav-16',
            label: 'Favorites',
            routerLink: '/azkar/favorites',
            closeMenuAfterClick: true
          }
        ]
      },
      {
        id: 'nav-2',
        label: 'History',
        routerLink: '/history',
      },
      {
        id: 'nav-3',
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
    items: [
      { 
        id: 'user-0',
        label: 'Profile',
        routerLink: '/profile', 
      },
      { 
        id: 'user-1',
        label: 'Cart', 
        routerLink: '/cart', 
      },
      { 
        id: 'user-2',
        label: 'Dashboard', 
        children: [
          { 
            id: 'user-20',
            label: 'Orders', 
            routerLink: '/orders', 
            useDefaultColorClass: 'bg'
          },
          { 
            id: 'user-21',
            label: 'Addresses', routerLink: '/addresses', 
            useDefaultColorClass: 'bg' 
          },
          { 
            id: 'user-22',
            label: 'Reviews', routerLink: '/reviews', 
            useDefaultColorClass: 'bg' 
          },
        ]
      },
      { 
        id: 'user-3',
        label: 'Logout', 
        action: () => this.logout(),
        colorClass: 'zs:text-red-700 zs:hover:text-red-800 zs:dark:hover:text-red-600',
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


  readonly chatSettingsIconTpl = viewChild<TemplateRef<any>>('chatSettingsIcon')
  readonly chatSettings = signal<NavbarItem>({
    id: 'chat-settings',
    label: '',
    iconTpl: this.chatSettingsIconTpl,
    children: [
      {
        id: 'view-profile',
        label: 'View Profile',
        action: () => {console.log(this.chatSettings().children?.[0].label)},
      },
      {
        id: 'mark-as-read',
        label: 'Mark As Read',
        action: () => {console.log(this.chatSettings().children?.[1].label)}
      },
      {
        id: 'delete-chat',
        label: 'Delete Chat',
        action: () => {console.log(this.chatSettings().children?.[2].label)}
      },
    ],
    showChevronDownIcon: false,
    childrenOpenWindow: true,
    childrenWindowDir: 'right',
    // closeOnPointerOutside: true
  })

  readonly items = ['ziad', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah', 'ahmed', 'salah']

  cardClicked(event: any) {
    console.log(event)
  }

  readonly isSettingsHover = signal(false);

}

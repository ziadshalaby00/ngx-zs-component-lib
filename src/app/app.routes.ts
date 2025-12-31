import { Routes } from '@angular/router';
import { Test } from './test/test';


export const routes: Routes = [
    { path: 'test', component: Test},
    // { path: '**', component: Page404},
    { path: '', component: Test},
    { path: 'home', component: Test},
    { path: 'azkar/:category', component: Test},
    { path: 'history', component: Test},
    { path: 'features', component: Test},
    { path: '**', component: Test},
];
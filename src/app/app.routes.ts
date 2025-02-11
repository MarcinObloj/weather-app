import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'cities', loadComponent: () => import('./cities/cities.component').then(m => m.CitiesComponent) },
    { path: 'observed-cities', loadComponent: () => import('./weather/observed-cities/observed-cities.component').then(m => m.ObservedCitiesComponent) },
    { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) }
];

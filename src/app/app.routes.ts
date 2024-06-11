import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./holiday-checker/holiday-checker.component').then(c => c.HolidayCheckerComponent)
    }
];

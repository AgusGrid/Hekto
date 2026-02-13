import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ui-kit',
    loadComponent: () => import("@pages/ui-kit/ui-kit.component").then(m => m.UiKitComponent)
  },
  {
    path: '',
    redirectTo: 'ui-kit',
    pathMatch: 'full'
  }
];
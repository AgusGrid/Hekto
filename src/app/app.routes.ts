import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("@pages/home/home.component").then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import("@app/pages/products/product-lister/product-lister").then(m => m.ProductListerComponent)
  },
  {
    path: 'ui-kit',
    loadComponent: () => import("@pages/ui-kit/ui-kit.component").then(m => m.UiKitComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];  
import { Routes } from '@angular/router';
import { LadingPageComponent } from './ladingPage/lading-page/lading-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AdminCategoryFormComponent } from './admin/categories/category-form/admin-category-form.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminCategoryTableComponent } from './admin/categories/admin-category-table/admin-category-table.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminProductTableComponent } from './admin/admin-product-table/admin-product-table.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //rutas publicas
  { path: 'home', component: LadingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },

  //rutas administrativas
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProductTableComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'categories', component: AdminCategoryTableComponent },
      { path: 'categories/new', component: AdminCategoryFormComponent },
      { path: 'categories/edit/:id', component: AdminCategoryFormComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];

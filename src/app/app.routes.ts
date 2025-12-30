import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { ProductsComponent } from './products/products'; // Confirma que dentro de la carpeta 'products' el archivo se llame 'products.ts'
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'products', 
    component: ProductsComponent,
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: 'login' }
];
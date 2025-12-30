import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


import { AuthService } from '../services/auth'; 

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isTokenExpired()) {
    return true; 
  } else {
 
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};
import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../authservice/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // if (!authService.isLoggedIn()) {
  //   router.navigate(['/']);
  //   return false;
  // }

  if (!authService.isLoggedIn()) {
    alert('Access Denied !');
    router.navigateByUrl('/');
    return false;
  }

  // return false;

  return true;
};

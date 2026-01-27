import { inject } from '@angular/core';
import { AuthService } from './../authservice/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const superadminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  if (user && user.isSuperAdmin === true) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

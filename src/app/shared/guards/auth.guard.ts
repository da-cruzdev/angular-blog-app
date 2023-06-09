import { Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = Inject(AuthService);
  const router = new Router();
  if (auth.isLoggedInGuard) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {Router, ActivationStart, ActivationEnd, NavigationEnd, NavigationStart} from '@angular/router';

export class PermissionGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}

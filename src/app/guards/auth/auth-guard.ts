import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthGuardData, createAuthGuard} from 'keycloak-angular';

const authGuard = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData): Promise<boolean  | UrlTree> => {
  const {authenticated, grantedRoles, keycloak} = authData;

  if (!authenticated) {
    await keycloak.login();
    return false;
  }

  const requiredRoles = route.data['roles'];
  if (!requiredRoles) {
    return false;
  }

  const hasRequiredRole = (): boolean => {
    console.log(grantedRoles.resourceRoles);
    if (!grantedRoles.resourceRoles["hms-frontend"]) return false;
    const roles: string[] = grantedRoles.resourceRoles["hms-frontend"];
    return roles.some((role: string) => requiredRoles.includes(role.toUpperCase()));
  }

  if (authenticated && hasRequiredRole()) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(authGuard)

import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { FrontendRoleEnum } from '../../utils/FrontendRoleEnum';

const authGuard = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const router = inject(Router); // ✅ moved to top, before any use

  const { authenticated, grantedRoles, keycloak } = authData;

  if (!authenticated) {
    await keycloak.login();
    return false;
  }

  const requiredRoles: string[] = route.data['roles'];
  if (!requiredRoles) {
    return router.parseUrl('/forbidden');
  }

  if (!grantedRoles.realmRoles) {
    return router.parseUrl('/forbidden');
  }

  const roles: string[] = grantedRoles.realmRoles;

  const hasRequiredRole = (): boolean => {
    return roles.some((role: string) => requiredRoles.includes(role.toUpperCase()));

  };
  if (hasRequiredRole()) {
    return true;
  }

  if (roles.includes(FrontendRoleEnum.SUPERADMIN)) {
    return router.parseUrl('/admin/dashboard');
  } else if (roles.includes(FrontendRoleEnum.HOSPITAL_ADMIN)) {
    return router.parseUrl('/hospital-admin/dashboard');
  } else if (roles.includes(FrontendRoleEnum.DOCTOR)) {
    return router.parseUrl('/doctor-admin');
  }

  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(authGuard);

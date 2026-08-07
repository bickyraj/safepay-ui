import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RealmRoleEnum} from '../../utils/RealmRoleEnum';

export const landingPageGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true;
  }

  if (authService.hasRole(RealmRoleEnum.SUPERADMIN)) {
    return router.parseUrl('/admin/dashboard');
  } else if (authService.hasRole(RealmRoleEnum.HOSPITAL_ADMIN)) {
    return router.parseUrl('/hospital-admin/dashboard');
  } else if (authService.hasRole(RealmRoleEnum.DOCTOR)) {
    return router.parseUrl('/doctor-admin');
  }

  return true;
};

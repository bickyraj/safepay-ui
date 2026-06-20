import { Routes } from '@angular/router';
import {canActivateAuthRole} from './guards/auth/auth-guard';
import {Dashboard} from './pages/dashboard/dashboard';
import {FrontendRoleEnum} from './utils/FrontendRoleEnum';
import {ErrorLayoutComponent} from './layout/error-layout/error-layout.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {NotFoundComponent} from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [canActivateAuthRole],
    data: {
      roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
    }
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
];

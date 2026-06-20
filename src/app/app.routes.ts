import { Routes } from '@angular/router';
import {canActivateAuthRole} from './guards/auth/auth-guard';
import {Dashboard} from './pages/dashboard/dashboard';
import {FrontendRoleEnum} from './utils/FrontendRoleEnum';
import {ErrorLayoutComponent} from './layout/error-layout/error-layout.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RealmRoleEnum} from './utils/RealmRoleEnum';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {LandingLayoutComponent} from './layout/landing-layout/landing-layout.component';
import {LandingPage} from './pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: '',
        component: LandingPage
      },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      },
    ]
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

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
import {SafepayaiComponent} from './pages/safepayai/safepayai.component';
import {Hospital} from './pages/hospital/hospital';
import {Doctor} from './pages/doctor/doctor';
import {User} from './pages/user/user';
import {HospitalDetail} from './pages/hospital/hospital-detail/hospital-detail';

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
      {
        path: 'hospitals',
        component: Hospital,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      },
      {
        path: 'hospitals/:id',
        component: HospitalDetail,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      },
      {
        path: 'doctors',
        component: Doctor,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      },
      {
        path: 'users',
        component: User,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      },
      {
        path: 'ai',
        component: SafepayaiComponent,
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

import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/auth/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { FrontendRoleEnum } from './utils/FrontendRoleEnum';
import { ErrorLayoutComponent } from './layout/error-layout/error-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { LandingPage } from './pages/landing-page/landing-page';
import { SafepayaiComponent } from './pages/safepayai/safepayai.component';
import { Hospital } from './pages/hospital/hospital';
import { Doctor } from './pages/doctor/doctor';
import { User } from './pages/user/user';
import { HospitalDetail } from './pages/hospital/hospital-detail/hospital-detail';
import { Staff } from './pages/hospital/staff/staff';
import { HospitalAdminLayout } from './layout/hospital-admin-layout/hospital-admin-layout';
import {HospitalAdminDashboard} from './pages/hospital/admin/hospital-admin-dashboard/hospital-admin-dashboard';
import {PatientCase} from './pages/patient-case/patient-case';
import {CreatePatientCase} from './pages/patient-case/create-patient-case/create-patient-case';

export const routes: Routes = [
  // Public landing page
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: LandingPage }
    ]
  },

  // Hospital-admin-specific area (separate prefix avoids collision with /hospital/:id below)
  {
    path: 'hospital-admin',
    component: HospitalAdminLayout,
    children: [
      {
        path: '',
        component: HospitalAdminDashboard,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.HOSPITAL_ADMIN],
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'dashboard',
        component: HospitalAdminDashboard,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.HOSPITAL_ADMIN],
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'cases',
        data: { breadcrumb: 'Patient Cases' },
        children: [
          {
            path: '',
            component: PatientCase,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.HOSPITAL_ADMIN],
              breadcrumb: 'Patient Cases'
            }
          },
          {
            path: 'add',
            component: CreatePatientCase,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.HOSPITAL_ADMIN],
              breadcrumb: 'Add Patient Case'
            }
          }
        ]
      }
    ]
  },

  // Main admin area
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Dashboard'
        },
      },
      {
        path: '',
        component: Dashboard,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'hospitals',
        component: Hospital,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Hospital'
        }
      },
      {
        path: 'hospital/:id',
        component: HospitalDetail,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Hospital Detail'
        }
      },
      {
        path: 'hospital/:id/staff',
        component: Staff,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Staff'
        }
      },
      {
        path: 'doctors',
        component: Doctor,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Doctor'
        }
      },
      {
        path: 'users',
        component: User,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
          breadcrumb: 'Users'
        }
      },
      {
        path: 'ai',
        component: SafepayaiComponent,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN]
        }
      }
    ]
  },

  // Error pages — must stay last so '**' doesn't swallow real routes
  {
    path: '',
    component: ErrorLayoutComponent,
    children: [
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

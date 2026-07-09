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
import {PatientCase} from './pages/hospital/admin/patient-case/patient-case';
import {CreatePatientCase} from './pages/hospital/admin/patient-case/create-patient-case/create-patient-case';
import {AdminPatientCase} from './pages/admin/patient-case/admin-patient-case.component';
import {AdminPatientCaseDetail} from './pages/admin/patient-case/patient-case-detail/admin-patient-case-detail.component';
import {DoctorAdmin} from './pages/doctor-admin/doctor-admin';
import {DoctorAdminLayout} from './layout/doctor-admin-layout/doctor-admin-layout';
import {DoctorPatientCase} from './pages/doctor-admin/doctor-patient-case/doctor-patient-case';
import {
  DoctorPatientCaseDetail
} from './pages/doctor-admin/doctor-patient-case/doctor-patient-case-detail/doctor-patient-case-detail';

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
  {
    path: 'doctor-admin',
    component: DoctorAdminLayout,
    data: { breadcrumb: 'Doctor' },
    children: [
      {
        path: '',
        component: DoctorAdmin,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.DOCTOR],
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'dashboard',
        component: DoctorAdmin,
        canActivate: [canActivateAuthRole],
        data: {
          roles: [FrontendRoleEnum.DOCTOR],
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'patient-case',
        data: { breadcrumb: 'Patient Cases' },
        children: [
          {
            path: '',
            component: DoctorPatientCase,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.DOCTOR],
              breadcrumb: ''
            }
          },
          {
            path: ':id',
            component: DoctorPatientCaseDetail,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.DOCTOR],
              breadcrumb: 'Detail'
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
        path: 'patient-cases',
        data: { breadcrumb: 'Patient Cases' }, // no component here!
        children: [
          {
            path: '',
            component: AdminPatientCase,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
              breadcrumb: ''
            }
          },
          {
            path: ':id',
            component: AdminPatientCaseDetail,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
              breadcrumb: 'Details'
            }
          }
        ]
      },
      {
        path: 'hospitals',
        data: { breadcrumb: 'Hospitals' },
        children: [
          {
            path: '',
            component: Hospital,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
              breadcrumb: ''
            }
          },
          {
            path: ':id',
            component: HospitalDetail,
            canActivate: [canActivateAuthRole],
            data: {
              roles: [FrontendRoleEnum.USER, FrontendRoleEnum.SUPERADMIN],
              breadcrumb: 'Hospital Detail'
            }
          }
        ]
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

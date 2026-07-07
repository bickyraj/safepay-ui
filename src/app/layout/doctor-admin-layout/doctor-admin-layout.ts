import { Component } from '@angular/core';
import {Breadcrumb} from '../../common/breadcrumb/breadcrumb';
import {HeaderComponent} from '../header/header.component';
import {HospitalAdminSidebar} from '../hospital-admin-layout/hospital-admin-sidebar/hospital-admin-sidebar';
import {RouterOutlet} from '@angular/router';
import {Toast} from '../../common/toast/toast';
import {DoctorAdminSidebar} from './doctor-admin-sidebar/doctor-admin-sidebar';

@Component({
  selector: 'app-doctor-admin-layout',
  imports: [
    Breadcrumb,
    HeaderComponent,
    RouterOutlet,
    Toast,
    DoctorAdminSidebar
  ],
  templateUrl: './doctor-admin-layout.html',
  styleUrl: './doctor-admin-layout.scss',
  standalone: true
})
export class DoctorAdminLayout {

}

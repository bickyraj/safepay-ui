import { Component } from '@angular/core';
import {HospitalAdminSidebar} from './hospital-admin-sidebar/hospital-admin-sidebar';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-hospital-admin-layout',
  imports: [
    HospitalAdminSidebar,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './hospital-admin-layout.html',
  styleUrl: './hospital-admin-layout.scss',
  standalone: true
})
export class HospitalAdminLayout {

}

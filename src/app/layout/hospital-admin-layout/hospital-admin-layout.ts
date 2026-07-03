import { Component } from '@angular/core';
import {HospitalAdminSidebar} from './hospital-admin-sidebar/hospital-admin-sidebar';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {Breadcrumb} from "../../common/breadcrumb/breadcrumb";
import {Toast} from '../../common/toast/toast';

@Component({
  selector: 'app-hospital-admin-layout',
  imports: [
    HospitalAdminSidebar,
    RouterOutlet,
    HeaderComponent,
    Breadcrumb,
    Toast
  ],
  templateUrl: './hospital-admin-layout.html',
  styleUrl: './hospital-admin-layout.scss',
  standalone: true
})
export class HospitalAdminLayout {

}

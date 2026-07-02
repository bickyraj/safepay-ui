import { Component } from '@angular/core';
import {HospitalAdminSidebar} from './hospital-admin-sidebar/hospital-admin-sidebar';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {Breadcrumb} from "../../common/breadcrumb/breadcrumb";

@Component({
  selector: 'app-hospital-admin-layout',
    imports: [
        HospitalAdminSidebar,
        RouterOutlet,
        HeaderComponent,
        Breadcrumb
    ],
  templateUrl: './hospital-admin-layout.html',
  styleUrl: './hospital-admin-layout.scss',
  standalone: true
})
export class HospitalAdminLayout {

}

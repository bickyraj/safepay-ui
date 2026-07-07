import { Component } from '@angular/core';
import { isCollapsed } from '../../../shared/state/sidebar-toggle.state';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-doctor-admin-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    HasRolesDirective
  ],
  templateUrl: './doctor-admin-sidebar-menu.html',
  styleUrl: './doctor-admin-sidebar-menu.scss',
  standalone: true
})
export class DoctorAdminSidebarMenu {
  protected readonly isCollapsed = isCollapsed;

}

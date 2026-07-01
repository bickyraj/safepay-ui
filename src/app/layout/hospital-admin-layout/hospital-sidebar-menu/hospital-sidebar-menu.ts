import { Component } from '@angular/core';
import { isCollapsed } from '../../../shared/state/sidebar-toggle.state';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-hospital-sidebar-menu',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    HasRolesDirective
  ],
  templateUrl: './hospital-sidebar-menu.html',
  styleUrl: './hospital-sidebar-menu.scss',
  standalone: true
})
export class HospitalSidebarMenu {
  protected readonly isCollapsed = isCollapsed;
}

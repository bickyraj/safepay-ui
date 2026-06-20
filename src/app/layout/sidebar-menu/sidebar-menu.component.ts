import {Component} from '@angular/core';
import {isCollapsed} from '../../shared/state/sidebar-toggle.state';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HasRolesDirective} from 'keycloak-angular';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  templateUrl: './sidebar-menu.component.html',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    HasRolesDirective
  ],
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {
  protected readonly isCollapsed = isCollapsed;
}

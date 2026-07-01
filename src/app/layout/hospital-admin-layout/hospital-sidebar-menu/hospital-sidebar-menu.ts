import { Component } from '@angular/core';
import { isCollapsed } from '../../../shared/state/sidebar-toggle.state';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-hospital-sidebar-menu',
  imports: [
    NgClass
  ],
  templateUrl: './hospital-sidebar-menu.html',
  styleUrl: './hospital-sidebar-menu.scss',
  standalone: true
})
export class HospitalSidebarMenu {
  protected readonly isCollapsed = isCollapsed;
}

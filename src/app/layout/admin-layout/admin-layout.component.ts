import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {HeaderComponent} from '../header/header.component';
import {PageHeaderComponent} from '../page-header/page-header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  imports: [
    SidebarComponent,
    HeaderComponent,
    PageHeaderComponent,
    RouterOutlet
  ],
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}

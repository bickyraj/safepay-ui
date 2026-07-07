import {Component, inject} from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-hospital-admin-dashboard',
  imports: [],
  templateUrl: './hospital-admin-dashboard.html',
  styleUrl: './hospital-admin-dashboard.scss',
  standalone: true
})
export class HospitalAdminDashboard {
  public readonly authService = inject(AuthService);
}

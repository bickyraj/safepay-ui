import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-doctor-admin',
  imports: [],
  templateUrl: './doctor-admin.html',
  styleUrl: './doctor-admin.scss',
  standalone: true
})
export class DoctorAdmin {
  public authService = inject(AuthService);
}

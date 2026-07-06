import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard {

  private readonly AuthService = inject(AuthService);

  public readonly userName: string = this.AuthService.getUserName();

}

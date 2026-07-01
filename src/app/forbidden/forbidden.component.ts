import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  templateUrl: './forbidden.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {

}

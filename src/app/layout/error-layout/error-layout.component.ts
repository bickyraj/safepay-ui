import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-error-layout',
  standalone: true,
  templateUrl: './error-layout.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrl: './error-layout.component.css'
})
export class ErrorLayoutComponent {

}

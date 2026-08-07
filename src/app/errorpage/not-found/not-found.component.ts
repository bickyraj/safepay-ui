import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}

import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-patient-case',
  imports: [
    RouterLink
  ],
  templateUrl: './patient-case.html',
  styleUrl: './patient-case.scss',
  standalone: true
})
export class PatientCase {

}

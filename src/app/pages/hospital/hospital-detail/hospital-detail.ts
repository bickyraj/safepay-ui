import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-hospital-detail',
  imports: [
    RouterLink
  ],
  templateUrl: './hospital-detail.html',
  styleUrl: './hospital-detail.scss',
  standalone: true
})
export class HospitalDetail implements OnInit{
  hospitalId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = params.get('id');
      console.log('Hospital ID:', this.hospitalId);
    });
  }
}

import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HospitalModel} from '../../../model/HospitalModel';
import {HospitalService} from '../../../services/hospital/hospital.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);
  hospitalId: number | null = null;
  hospital: WritableSignal<HospitalModel | null> = signal(null);
  private readonly hospitalService = inject(HospitalService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = Number(params.get('id'));
      this.initHospital(this.hospitalId);
    });
  }

  private initHospital(hospitalId: number) {
    this.hospitalService.getByHospitalId(hospitalId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response.status === true && response.data) {
          this.hospital.set(response.data);
        }
    })
  }
}

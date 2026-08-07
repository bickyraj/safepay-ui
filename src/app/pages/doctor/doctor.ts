import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../common/mx-table/mx-table.component';
import {Subject} from 'rxjs';
import {DoctorModel} from '../../model/DoctorModel';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor',
  imports: [
    MxTableComponent
  ],
  templateUrl: './doctor.html',
  styleUrl: './doctor.scss',
  standalone: true
})
export class Doctor implements OnInit, OnDestroy {

  private readonly  doctorService = inject(DoctorService);
  public readonly columns: (keyof Partial<DoctorModel>)[] = ['id', 'name'];
  public dataList = signal<DoctorModel[]>([]);
  private readonly router = inject(Router);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.doctorService.getList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }

  addDoctor() {
    this.router.navigate(['/admin/doctors/add']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {Component, inject, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {UserService} from '../../../services/user/user.service';
import {UserModel} from '../../../model/UserModel';
import {HospitalService} from '../../../services/hospital/hospital.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-staff',
  imports: [
    MxTableComponent
  ],
  templateUrl: './staff.html',
  styleUrl: './staff.scss',
  standalone: true
})
export class Staff {
  hospitalId: number | null = null;
  private readonly  hospitalService = inject(HospitalService);
  public readonly columns: (keyof Partial<UserModel>)[] = ['id', 'name'];
  public dataList = signal<UserModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = Number(params.get('id'));
      this.loadPage(1);
    });
  }

  loadPage(page: number): void {
    if (this.hospitalId === null) {
      return;
    }
    this.hospitalService.getAllStaffByHospitalId(this.hospitalId).subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

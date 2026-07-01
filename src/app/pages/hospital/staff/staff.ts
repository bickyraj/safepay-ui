import {Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {UserModel} from '../../../model/UserModel';
import {HospitalService} from '../../../services/hospital/hospital.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Modal} from '../../../common/modal/modal';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-staff',
  imports: [
    MxTableComponent,
    Modal,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './staff.html',
  styleUrl: './staff.scss',
  standalone: true
})
export class Staff implements OnInit, OnDestroy{
  hospitalId: number | null = null;
  public openModal: boolean = false;
  private readonly  hospitalService = inject(HospitalService);
  public readonly columns: (keyof Partial<UserModel>)[] = ['id', 'firstName'];
  public dataList = signal<UserModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  private destroy$ = new Subject<void>();

  staffForm: FormGroup;

  staffList = signal<UserModel[]>([]);
  searchText = signal('');
  filteredStaff = computed(() => {
    const list = this.staffList() ?? [];
    const search = this.searchText().toLowerCase();
    return list.filter(user =>
      user.firstName?.toLowerCase().includes(search)
    );
  });
  selectedStaff: UserModel[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.staffForm = new FormGroup({
      role: new FormControl([]),
    });
  }

  submit() {
    const payload = {
      staffIds: this.selectedStaff.map(s => s.id),
      role: this.staffForm.value.role
    };
    this.hospitalService.addUsersToHospital(this.hospitalId!, payload.staffIds, payload.role).subscribe(response => {
      if (response) {
        this.loadPage(1);
        this.initUsersNotInHospital();
        this.close();
      }
    });
  }

  close() {
    this.openModal = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = Number(params.get('id'));
      this.loadPage(1);
      this.initUsersNotInHospital();
    });
  }

  private initUsersNotInHospital() {
    if (this.hospitalId === null) {
      return;
    }
    this.hospitalService.getAllUsersNotInHospital(this.hospitalId).subscribe(response => {
      if (!response.data) {
        this.staffList.set([]);
        return;
      }
      this.staffList.set(response.data);
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

  public openAddStaffModal(): void {
    this.openModal = true;
  }

  addStaff(staff: UserModel) {
    const exists = this.selectedStaff.find(s => s.id === staff.id);
    if (!exists) {
      this.selectedStaff.push(staff);
    }
  }

  removeStaff(staff: UserModel) {
    this.selectedStaff = this.selectedStaff.filter(s => s.id !== staff.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

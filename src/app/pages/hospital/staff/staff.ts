import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {UserService} from '../../../services/user/user.service';
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

  staffForm: FormGroup;

  searchText = '';

  staffList = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Nurse Sarah Smith' },
    { id: 3, name: 'Dr. Michael Brown' },
    { id: 4, name: 'Lab Technician Alex' }
  ];

  filteredStaff = [...this.staffList];
  selectedStaff: any[] = [];

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

    console.log('SUBMIT:', payload);
  }

  close() {
    this.openModal = false;
  }

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

  public openAddStaffModal(): void {
    this.openModal = true;
  }

  filterStaff() {
    const text = this.searchText.toLowerCase();

    this.filteredStaff = this.staffList.filter(s =>
      s.name.toLowerCase().includes(text)
    );
  }

  addStaff(staff: any) {
    const exists = this.selectedStaff.find(s => s.id === staff.id);
    if (!exists) {
      this.selectedStaff.push(staff);
    }
  }

  removeStaff(staff: any) {
    this.selectedStaff = this.selectedStaff.filter(s => s.id !== staff.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

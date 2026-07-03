import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MxTableComponent, PaginationDetails} from '../../common/mx-table/mx-table.component';
import {DoctorModel} from '../../model/DoctorModel';
import {PatientCaseModel} from '../../model/PatientCaseModel';
import {PatientCaseService} from '../../services/patient-case/patient-case.service';

@Component({
  selector: 'app-patient-case',
  imports: [
    RouterLink,
    MxTableComponent
  ],
  templateUrl: './patient-case.html',
  styleUrl: './patient-case.scss',
  standalone: true
})
export class PatientCase implements OnInit{

  public readonly columns: (keyof Partial<PatientCaseModel>)[] = ['name', 'patientId'];
  private patientCaseService = inject(PatientCaseService);

  public dataList = signal<PatientCaseModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.patientCaseService.getList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }
}

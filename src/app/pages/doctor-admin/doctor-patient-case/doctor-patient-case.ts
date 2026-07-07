import {Component, inject, OnInit, signal} from '@angular/core';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {PatientCaseModel} from '../../../model/PatientCaseModel';
import {PatientCaseService} from '../../../services/patient-case/patient-case.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-patient-case',
  imports: [
    MxTableComponent
  ],
  templateUrl: './doctor-patient-case.html',
  styleUrl: './doctor-patient-case.scss',
  standalone: true
})
export class DoctorPatientCase implements OnInit {
  public readonly columns: (keyof Partial<PatientCaseModel>)[] = ['name', 'patientId', 'hospitalName', 'status'];
  private patientCaseService = inject(PatientCaseService);
  private router = inject(Router);

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

  vewCase(caseId: any): void {
    this.router.navigate(['doctor-admin/patient-case/' + caseId])
  }

  loadPage(page: number): void {
    this.patientCaseService.getAllPatientCasesListByDoctor().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }
}

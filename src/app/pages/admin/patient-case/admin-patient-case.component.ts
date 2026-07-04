import {Component, inject, OnInit, signal} from '@angular/core';
import {PatientCaseModel} from '../../../model/PatientCaseModel';
import {PatientCaseService} from '../../../services/patient-case/patient-case.service';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-case',
  imports: [
    MxTableComponent
  ],
  templateUrl: './admin-patient-case.component.html',
  styleUrl: './admin-patient-case.component.scss',
  standalone: true
})
export class AdminPatientCase implements OnInit{
  public readonly columns: (keyof Partial<PatientCaseModel>)[] = ['name', 'patientId', 'hospitalName'];
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
    this.router.navigate(['admin/patient-cases/' + caseId])
  }

  loadPage(page: number): void {
    this.patientCaseService.getAllPatientCasesList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }
}

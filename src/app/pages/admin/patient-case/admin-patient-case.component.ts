import {Component, inject, signal} from '@angular/core';
import {PatientCaseModel} from '../../../model/PatientCaseModel';
import {PatientCaseService} from '../../../services/patient-case/patient-case.service';
import {MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';

@Component({
  selector: 'app-patient-case',
  imports: [
    MxTableComponent
  ],
  templateUrl: './admin-patient-case.component.html',
  styleUrl: './admin-patient-case.component.scss',
  standalone: true
})
export class AdminPatientCase {
  public readonly columns: (keyof Partial<PatientCaseModel>)[] = ['name', 'patientId', 'hospitalName'];
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
    this.patientCaseService.getAllPatientCasesList().subscribe(response => {
      this.dataList.set(response.content);
      this.paginationDetails.set(response);
    });
  }
}

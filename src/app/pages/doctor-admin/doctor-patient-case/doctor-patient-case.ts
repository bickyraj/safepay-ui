import {Component, inject, OnInit, signal} from '@angular/core';
import {MxSubComponent, MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {PatientCaseModel} from '../../../model/PatientCaseModel';
import {PatientCaseService} from '../../../services/patient-case/patient-case.service';
import {Router} from '@angular/router';
import {TablePatientCaseModel} from '../../../model/TablePatientCaseModel';
import {StatusComponent} from '../../../common/status-component/status-component';

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
  public readonly columns: (keyof Partial<TablePatientCaseModel>)[] = ['name', 'patientId', 'hospitalName', 'reportStatus'];
  public components!: Partial<Record<keyof TablePatientCaseModel, MxSubComponent<TablePatientCaseModel>>>;
  private patientCaseService = inject(PatientCaseService);
  private router = inject(Router);

  public dataList = signal<TablePatientCaseModel[]>([]);
  public paginationDetails = signal<PaginationDetails>({
    pageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  });

  ngOnInit(): void {
    this.loadPage(1);
    this.components = {
      reportStatus: {
        component: StatusComponent,
        inputs: {
          value: 'reportStatus'
        }
      }
    }
  }

  vewCase(caseId: any): void {
    this.router.navigate(['doctor-admin/patient-case/' + caseId])
  }

  loadPage(page: number): void {
    this.patientCaseService.getAllPatientCasesListByDoctor().subscribe(response => {
      this.dataList.set(response.content.map((pm) => {
        return {
          id: pm.id,
          name: pm.name,
          patientId: pm.patientId,
          hospitalName: pm.hospitalName,
          status: pm.status,
          assignedDoctorName: '',
          reportStatus: pm.hasReport() ? pm.report.status: 'PENDING'
        }
      }));
      this.paginationDetails.set(response);
    });
  }
}

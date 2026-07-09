import {Component, inject, OnInit, signal, Type} from '@angular/core';
import {PatientCaseService} from '../../../services/patient-case/patient-case.service';
import {MxSubComponent, MxTableComponent, PaginationDetails} from '../../../common/mx-table/mx-table.component';
import {Router} from '@angular/router';
import {StatusComponent} from '../../../common/status-component/status-component';

export class TablePatientCaseModel {
  id!: number;
  name!: string;
  patientId!: string;
  hospitalName!: string;
  status!: string;
  assignedDoctorName!: string;
  reportStatus!: string;
}

@Component({
  selector: 'app-patient-case',
  imports: [
    MxTableComponent
  ],
  templateUrl: './admin-patient-case.component.html',
  styleUrl: './admin-patient-case.component.scss',
  standalone: true
})
export class AdminPatientCase implements OnInit {
  public readonly columns: (keyof Partial<TablePatientCaseModel>)[] =
    ['name', 'patientId', 'hospitalName', 'assignedDoctorName', 'reportStatus'];
  private patientCaseService = inject(PatientCaseService);
  public components!: Partial<Record<keyof TablePatientCaseModel, MxSubComponent<TablePatientCaseModel>>>;
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
    this.router.navigate(['admin/patient-cases/' + caseId])
  }

  loadPage(page: number): void {
    this.patientCaseService.getAllPatientCasesList().subscribe(response => {
      this.dataList.set(response.content.map((pm) => {
        return {
          id: pm.id,
          name: pm.name,
          patientId: pm.patientId,
          hospitalName: pm.hospitalName,
          status: pm.status,
          assignedDoctorName: pm.assignedDoctors[0].doctor.firstName + " " + pm.assignedDoctors[0].doctor.lastName,
          reportStatus: pm.report.status
        }
      }));
      this.paginationDetails.set(response);
    });
  }
}

import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MxSubComponent, MxTableComponent, PaginationDetails} from '../../../../common/mx-table/mx-table.component';
import {PatientCaseModel} from '../../../../model/PatientCaseModel';
import {PatientCaseService} from '../../../../services/patient-case/patient-case.service';
import {TablePatientCaseModel} from '../../../../model/TablePatientCaseModel';
import {StatusComponent} from '../../../../common/status-component/status-component';

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

  public readonly columns: (keyof Partial<TablePatientCaseModel>)[] =
    ['name', 'patientId', 'reportStatus'];
  public components!: Partial<Record<keyof TablePatientCaseModel, MxSubComponent<TablePatientCaseModel>>>;
  private patientCaseService = inject(PatientCaseService);

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

  loadPage(page: number): void {
    this.patientCaseService.getList().subscribe(response => {
      this.dataList.set(response.content.map((pm) => {
        return {
          id: pm.id,
          name: pm.name,
          patientId: pm.patientId,
          hospitalName: pm.hospitalName,
          status: pm.status,
          assignedDoctorName:
            pm.hasAssignedDoctor() ? pm.assignedDoctors[0].doctor.firstName + " " + pm.assignedDoctors[0].doctor.lastName : '',
          reportStatus: pm.hasReport() ? pm.report.status: 'PENDING'
        }
      }));
      this.paginationDetails.set(response);
    });
  }
}

import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientCaseService} from '../../../../services/patient-case/patient-case.service';
import {firstValueFrom} from 'rxjs';
import {PatientCaseModel} from '../../../../model/PatientCaseModel';
import {Modal} from '../../../../common/modal/modal';
import {DoctorModel} from '../../../../model/DoctorModel';
import {DoctorService} from '../../../../services/doctor/doctor.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

export enum AssignmentRole {
  PRIMARY = 'PRIMARY',
  REVIEWER = 'REVIEWER',
  SECOND_OPINION = 'SECOND_OPINION',
  RESIDENT = 'RESIDENT',
  CONSULTANT = 'CONSULTANT'
}

@Component({
  selector: 'app-patient-case-detail',
  imports: [
    Modal,
    ReactiveFormsModule
  ],
  templateUrl: './admin-patient-case-detail.component.html',
  styleUrl: './admin-patient-case-detail.component.scss',
  standalone: true
})
export class AdminPatientCaseDetail implements OnInit {
  patientCaseId: number | null = null;
  public imageIds = signal<string[]>([]);
  private patientCaseService = inject(PatientCaseService);
  public patientCase = signal<PatientCaseModel | undefined>(undefined);
  public openModal: boolean = false;
  public doctorList = signal<DoctorModel[]>([]);
  private doctorService = inject(DoctorService);
  assignForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.assignForm = new FormGroup({
      doctorId: new FormControl<number | null>(
        null,
        Validators.required
      ),

      role: new FormControl<AssignmentRole | null>(
        null,
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientCaseId = Number(params.get('id'));
      this.fetchPatientCaseDetails(this.patientCaseId);
    });

    firstValueFrom(this.doctorService.getList()).then((data) => {
      this.doctorList.set(data.content);
    });
  }

  public openAssignModal(): void {
    this.assignForm.reset();
    this.openModal = true;
  }

  submit() {
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsDirty();
      return;
    }
    // submit form data.
  }

  close() {
    this.openModal = false;
  }

  private fetchPatientCaseDetails(caseId: number): void {
     firstValueFrom(this.patientCaseService.getPatientCaseDetailWithDocumentsByCaseId(caseId))
       .then((data) => {
         this.patientCase.set(data);
         this.imageIds.set(data.documents.map(dc => {
           return `wadouri:http://localhost:8084/api/patient-case/dicom/${dc.s3Key}`
         }));
       });
  }

  initial = computed(() =>
    this.patientCase()?.name?.trim().charAt(0).toUpperCase() ?? ''
  );
}

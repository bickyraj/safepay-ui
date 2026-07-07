import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {PatientCaseService} from '../../../../services/patient-case/patient-case.service';
import {PatientCaseModel} from '../../../../model/PatientCaseModel';
import {DoctorModel} from '../../../../model/DoctorModel';
import {DoctorService} from '../../../../services/doctor/doctor.service';
import {EventService} from '../../../../services/event/event.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {AssignmentRole} from '../../../admin/patient-case/patient-case-detail/admin-patient-case-detail.component';
import {Modal} from '../../../../common/modal/modal';

@Component({
  selector: 'app-doctor-patient-case-detail',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-patient-case-detail.html',
  styleUrl: './doctor-patient-case-detail.scss',
  standalone: true
})
export class DoctorPatientCaseDetail implements OnInit {
  patientCaseId: number | null = null;
  public imageIds = signal<string[]>([]);
  private patientCaseService = inject(PatientCaseService);
  public patientCase = signal<PatientCaseModel | undefined>(undefined);
  public openModal = signal<boolean>(false);
  public doctorList = signal<DoctorModel[]>([]);
  private doctorService = inject(DoctorService);
  private eventService = inject(EventService);
  assignForm: FormGroup;
  private isSubmitting: boolean = false;

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
    this.openModal.set(true);
  }

  submit() {
    if (this.isSubmitting) return;
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsDirty();
      return;
    }
    // submit form data.
    this.isSubmitting = true;
    const doctorId: number = this.assignForm.get('doctorId')?.value;
    const role: AssignmentRole = this.assignForm.get('role')?.value;
    if(!this.patientCaseId) return;
    firstValueFrom(this.patientCaseService.assignDoctorToCase(
      doctorId,
      this.patientCaseId,
      role
    )).then((isSuccess) => {
      if (isSuccess) {
        if (!this.patientCaseId) return;
        this.fetchPatientCaseDetails(this.patientCaseId);
        this.close();
        this.eventService.emit({ message: 'Patient Case has been assigned to the doctor.' });
      }
      this.isSubmitting = false;
    });
  }

  close() {
    this.openModal.set(false);
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

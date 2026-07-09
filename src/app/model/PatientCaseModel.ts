import {AssignmentRole} from '../pages/admin/patient-case/patient-case-detail/admin-patient-case-detail.component';
import {DoctorModel} from './DoctorModel';

export class PatientCaseModel {
  id!: number;
  name!: string;
  patientId!: string;
  hospitalName!: string;
  status!: string;
  documents!: PatientCaseDocumentModel[];
  assignedDoctors!: AssignedDoctorModel[];
  report!: PatientCaseReportModel;

  hasAssignedDoctor(): boolean {
    return this.assignedDoctors !== null && this.assignedDoctors !== undefined && this.assignedDoctors.length > 0;
  }

  hasReport(): boolean {
    return this.report !== null && this.report !== undefined;
  }
}

export class PatientCaseReportModel {
  id!: number;
  status!: string;
}

export class AssignedDoctorModel {
  doctor!: DoctorModel;
  role!: AssignmentRole;
}

export class PatientCaseDocumentModel {
  id!: number;
  fileName!: string;
  s3Key!: string;
  fileType!: string;
  url!: string;
}

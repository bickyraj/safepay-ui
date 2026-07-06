export class PatientCaseModel {
  id!: number;
  name!: string;
  patientId!: string;
  hospitalName!: string;
  documents!: PatientCaseDocumentModel[]
}

export class PatientCaseDocumentModel {
  id!: number;
  fileName!: string;
  s3Key!: string;
  fileType!: string;
  url!: string;
}

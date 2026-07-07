import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientCaseDetail } from './doctor-patient-case-detail';

describe('DoctorPatientCaseDetail', () => {
  let component: DoctorPatientCaseDetail;
  let fixture: ComponentFixture<DoctorPatientCaseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPatientCaseDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientCaseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientCaseDetail } from './admin-patient-case-detail.component';

describe('PatientCaseDetail', () => {
  let component: AdminPatientCaseDetail;
  let fixture: ComponentFixture<AdminPatientCaseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPatientCaseDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPatientCaseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

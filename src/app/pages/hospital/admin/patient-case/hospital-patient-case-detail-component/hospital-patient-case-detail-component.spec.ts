import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPatientCaseDetailComponent } from './hospital-patient-case-detail-component';

describe('HospitalPatientCaseDetailComponent', () => {
  let component: HospitalPatientCaseDetailComponent;
  let fixture: ComponentFixture<HospitalPatientCaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalPatientCaseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalPatientCaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

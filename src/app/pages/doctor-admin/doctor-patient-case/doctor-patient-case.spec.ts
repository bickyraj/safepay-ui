import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientCase } from './doctor-patient-case';

describe('DoctorPatientCase', () => {
  let component: DoctorPatientCase;
  let fixture: ComponentFixture<DoctorPatientCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPatientCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

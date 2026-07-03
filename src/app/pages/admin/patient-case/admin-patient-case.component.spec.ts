import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientCase } from './admin-patient-case.component';

describe('PatientCase', () => {
  let component: AdminPatientCase;
  let fixture: ComponentFixture<AdminPatientCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPatientCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPatientCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

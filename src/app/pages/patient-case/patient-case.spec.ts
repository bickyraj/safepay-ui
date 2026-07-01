import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCase } from './patient-case';

describe('PatientCase', () => {
  let component: PatientCase;
  let fixture: ComponentFixture<PatientCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

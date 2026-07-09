import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientCase } from './create-patient-case';

describe('CreatePatientCase', () => {
  let component: CreatePatientCase;
  let fixture: ComponentFixture<CreatePatientCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePatientCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePatientCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

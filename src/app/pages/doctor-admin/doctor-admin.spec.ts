import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdmin } from './doctor-admin';

describe('DoctorAdmin', () => {
  let component: DoctorAdmin;
  let fixture: ComponentFixture<DoctorAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminDashboard } from './hospital-admin-dashboard';

describe('HospitalAdminDashboard', () => {
  let component: HospitalAdminDashboard;
  let fixture: ComponentFixture<HospitalAdminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalAdminDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdminDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

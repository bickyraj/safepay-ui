import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminLayout } from './doctor-admin-layout';

describe('DoctorAdminLayout', () => {
  let component: DoctorAdminLayout;
  let fixture: ComponentFixture<DoctorAdminLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAdminLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdminLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

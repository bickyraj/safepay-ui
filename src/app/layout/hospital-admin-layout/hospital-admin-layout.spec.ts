import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminLayout } from './hospital-admin-layout';

describe('HospitalAdminLayout', () => {
  let component: HospitalAdminLayout;
  let fixture: ComponentFixture<HospitalAdminLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalAdminLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdminLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

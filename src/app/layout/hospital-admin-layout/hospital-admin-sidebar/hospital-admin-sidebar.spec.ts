import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdminSidebar } from './hospital-admin-sidebar';

describe('HospitalAdminSidebar', () => {
  let component: HospitalAdminSidebar;
  let fixture: ComponentFixture<HospitalAdminSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalAdminSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalAdminSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

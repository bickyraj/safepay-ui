import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminSidebar } from './doctor-admin-sidebar';

describe('DoctorAdminSidebar', () => {
  let component: DoctorAdminSidebar;
  let fixture: ComponentFixture<DoctorAdminSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAdminSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdminSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

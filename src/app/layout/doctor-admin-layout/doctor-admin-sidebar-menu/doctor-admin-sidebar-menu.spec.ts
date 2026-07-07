import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminSidebarMenu } from './doctor-admin-sidebar-menu';

describe('DoctorAdminSidebarMenu', () => {
  let component: DoctorAdminSidebarMenu;
  let fixture: ComponentFixture<DoctorAdminSidebarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAdminSidebarMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdminSidebarMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

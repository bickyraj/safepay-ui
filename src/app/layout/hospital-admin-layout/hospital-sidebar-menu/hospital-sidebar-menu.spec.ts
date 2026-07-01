import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSidebarMenu } from './hospital-sidebar-menu';

describe('HospitalSidebarMenu', () => {
  let component: HospitalSidebarMenu;
  let fixture: ComponentFixture<HospitalSidebarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalSidebarMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalSidebarMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

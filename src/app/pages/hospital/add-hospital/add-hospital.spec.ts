import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospital } from './add-hospital';

describe('AddHospital', () => {
  let component: AddHospital;
  let fixture: ComponentFixture<AddHospital>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHospital]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHospital);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiacomViewerWrapper } from './diacom-viewer-wrapper';

describe('DiacomViewerWrapper', () => {
  let component: DiacomViewerWrapper;
  let fixture: ComponentFixture<DiacomViewerWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiacomViewerWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiacomViewerWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

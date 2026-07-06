import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomViewer } from './dicom-viewer.component';

describe('DicomViewer', () => {
  let component: DicomViewer;
  let fixture: ComponentFixture<DicomViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicomViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicomViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

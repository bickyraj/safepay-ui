import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafepayaiComponent } from './safepayai.component';

describe('SafepayaiComponent', () => {
  let component: SafepayaiComponent;
  let fixture: ComponentFixture<SafepayaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafepayaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafepayaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

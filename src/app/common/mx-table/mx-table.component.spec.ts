import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MxTableComponent} from './mx-table.component';


describe('MxTableComponent', () => {
  let component: MxTableComponent<any>;
  let fixture: ComponentFixture<MxTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPrintingComponent } from './basic-printing.component';

describe('BasicPrintingComponent', () => {
  let component: BasicPrintingComponent;
  let fixture: ComponentFixture<BasicPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPrintingComponent } from './general-printing.component';

describe('GeneralPrintingComponent', () => {
  let component: GeneralPrintingComponent;
  let fixture: ComponentFixture<GeneralPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPrintingTemplateComponent } from './basic-printing-template.component';

describe('BasicPrintingTemplateComponent', () => {
  let component: BasicPrintingTemplateComponent;
  let fixture: ComponentFixture<BasicPrintingTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicPrintingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPrintingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

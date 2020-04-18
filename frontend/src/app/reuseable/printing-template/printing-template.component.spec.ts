import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingTemplateComponent } from './printing-template.component';

describe('PrintingTemplateComponent', () => {
  let component: PrintingTemplateComponent;
  let fixture: ComponentFixture<PrintingTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

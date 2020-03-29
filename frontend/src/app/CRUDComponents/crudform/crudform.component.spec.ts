import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDFormComponent } from './crudform.component';

describe('CRUDFormComponent', () => {
  let component: CRUDFormComponent;
  let fixture: ComponentFixture<CRUDFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

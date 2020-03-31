import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCRUDComponent } from './basic-crud.component';

describe('BasicCRUDComponent', () => {
  let component: BasicCRUDComponent;
  let fixture: ComponentFixture<BasicCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindSuccessComponent } from './bind-success.component';

describe('BindSuccessComponent', () => {
  let component: BindSuccessComponent;
  let fixture: ComponentFixture<BindSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

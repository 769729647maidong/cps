import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUploadComponent } from './index-upload.component';

describe('IndexUploadComponent', () => {
  let component: IndexUploadComponent;
  let fixture: ComponentFixture<IndexUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

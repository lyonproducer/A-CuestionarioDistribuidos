import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstintoComponent } from './instinto.component';

describe('InstintoComponent', () => {
  let component: InstintoComponent;
  let fixture: ComponentFixture<InstintoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstintoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

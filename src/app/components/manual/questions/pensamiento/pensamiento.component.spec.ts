import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensamientoComponent } from './pensamiento.component';

describe('PensamientoComponent', () => {
  let component: PensamientoComponent;
  let fixture: ComponentFixture<PensamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

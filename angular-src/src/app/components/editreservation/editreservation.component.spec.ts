import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreservationComponent } from './editreservation.component';

describe('EditreservationComponent', () => {
  let component: EditreservationComponent;
  let fixture: ComponentFixture<EditreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

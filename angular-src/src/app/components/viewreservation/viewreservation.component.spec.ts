import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreservationComponent } from './viewreservation.component';

describe('ViewreservationComponent', () => {
  let component: ViewreservationComponent;
  let fixture: ComponentFixture<ViewreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

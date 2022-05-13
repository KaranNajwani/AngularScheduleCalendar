import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatlewisCalendarComponent } from './schedule-calendar.component';

describe('MatlewisCalendarComponent', () => {
  let component: MatlewisCalendarComponent;
  let fixture: ComponentFixture<MatlewisCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatlewisCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatlewisCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Input, OnInit } from '@angular/core';
import { CalendarDateFormatter } from 'angular-calendar';
import { Day } from 'src/app/models/day.model';
import { CustomDateFormatter } from '../schedule-calendar/custom-date-formatter.provider';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarDayComponent implements OnInit {

  @Input()
  day!: Day;
  @Input()
  locale!: string;
  dayNumber!: Date;

  constructor() { }

  ngOnInit(): void {
    if (this.day.date)
      this.dayNumber = new Date(this.day.date);
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarUtils, CalendarView, DateAdapter } from 'angular-calendar';
import { GetMonthViewArgs, MonthView, getMonthView } from 'calendar-utils';
import { subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import {ScheduleService} from './schedule-calendar.service';

@Component({
  selector: 'app-schedule-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.css']
  ,
  providers: [
    {
      provide: CalendarUtils,
      useClass: ScheduleCalendarComponent
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    ScheduleService
  ]
})
export class ScheduleCalendarComponent extends CalendarUtils implements OnInit {

  //#region Properties
  refresh = new Subject<void>();
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  toggleWeeks: boolean = false;
  locale: string = 'en_US';
  localePrefix: string = 'en';
  startDate!: Date;
  endDate!: Date;

  args1: GetMonthViewArgs = {
    events: [],
    viewDate: new Date(),
    weekStartsOn: 0,
    excluded: [],
    viewStart: new Date(),
    viewEnd: new Date(),
    weekendDays: []
  };

  CalendarView = CalendarView;
  //#endregion

  //#region Life cycle hooks and constructor
  constructor(dateAdaptor: DateAdapter, private scheduleService: ScheduleService) {
    super(dateAdaptor);
  }

  ngOnInit() {
    this.GetScheduleData();
  }
  //#endregion

  //#region Methods
  deleteEvent() {
    throw new Error('Method not implemented.');
  }

  editEvent() {
    throw new Error('Method not implemented.');
  }

  override getMonthView(args: GetMonthViewArgs): MonthView {
    args.viewStart = this.scheduleService.startDate;
    if (this.scheduleService.isTwoWeek)
      args.viewEnd = subDays(this.scheduleService.endDate, 14);
    else
      args.viewEnd = this.scheduleService.endDate;
    return getMonthView(this.dateAdapter, args);
  }

  getWeekOfMonth(dateOfMonth: string): number {
    var d = new Date(dateOfMonth);
    var date = d.getDate();
    var day = d.getDay();
    const weekOfMonth = Math.ceil((date - 1 - day) / 7) + 1;
    return weekOfMonth;
  }

  toggleWeekView(){
    this.toggleWeeks = !this.toggleWeeks;
    this.scheduleService.isTwoWeek = this.toggleWeeks;
    this.viewDate = new Date();
  }

  closeOpenMonthViewDay() {
    // this.activeDayIsOpen = false;
  }

  GetScheduleData() {
    this.scheduleService.getScheduleData().subscribe(
      (response)=> {
        this.scheduleService.startDate = new Date(response.startDate);
        this.scheduleService.endDate = new Date(response.endDate);
      }
    );
  }

  onChangeLanguage() {
    if (this.locale === 'fr_CA') {
      this.locale = 'en_US';
      this.localePrefix = 'en';
    }
    else if (this.locale === 'en_US') {
      this.locale = 'fr_CA';
      this.localePrefix = 'fr'
    }
    else {
      this.locale = 'en_US';
      this.localePrefix = 'en';
    }
  }
  //#endregion

}

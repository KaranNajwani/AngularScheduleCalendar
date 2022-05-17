import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent, CalendarUtils, CalendarView, DateAdapter, DAYS_OF_WEEK } from 'angular-calendar';
import { WeekViewHour, WeekViewHourSegment, GetMonthViewArgs, MonthView, getMonthView, GetWeekViewArgs, WeekView, MonthViewDay } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek, subDays } from 'date-fns';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { SchedulePayPeriod } from 'src/app/models/schedulepayperiod.model';
import { SwitchView } from 'src/app/models/switchview.model';
import { ApiHttpClientService } from 'src/app/services/api-http-client.service';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
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
export class ScheduleCalendarComponent extends CalendarUtils implements OnInit, AfterViewInit {

  //#region Properties
  trackByDate = (index: number, day: MonthViewDay) => day.date.toISOString();
  schedulePay: Array<SchedulePayPeriod> = new Array<SchedulePayPeriod>();
  datepipe: DatePipe = new DatePipe('yyyy-MM-dd');
  refresh = new Subject<void>();
  switchViewObj: SwitchView = new SwitchView();
  changes!: SimpleChange;
  @Input() someInput!: boolean;
  isCalendarEnabled: boolean = false;
  isCreateModalEnabled: boolean = true;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  scheduleInfo: Schedule = new Schedule();
  toggleWeeks: boolean = false;
  testString: string = '';
  numberOfDays: number = 13;
  locale: string = 'en_US';
  localePrefix: string = 'en';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  startDate!: Date;
  endDate!: Date;
  // weekendDays: number[] = [];

  args1: GetMonthViewArgs = {
    events: [],
    viewDate: new Date(),
    weekStartsOn: 0,
    excluded: [],
    viewStart: new Date(),
    viewEnd: new Date(),
    weekendDays: []
  };

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
    green: {
      primary: "#5bf1ab",
      secondary: "#5bf1ab"
    }
  };

  CalendarView = CalendarView;

  segment: number = 2;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent(event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  //#endregion

  //#region Life cycle hooks and constructor
  constructor(private http: ApiHttpService, private dateAdaptor: DateAdapter, private httpClient: ApiHttpClientService, private httpPromiseClient: HttpClient, private scheduleService: ScheduleService, private scheduleDataService: ScheduleDataService) {
    super(dateAdaptor);
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.GetScheduleData();
    this.GetCurrentScheduleData();
    console.log(this.scheduleInfo);
  }
  //#endregion

  //#region Methods
  deleteEvent(event: CalendarEvent<any>) {
    throw new Error('Method not implemented.');
  }

  editEvent(event: CalendarEvent<any>) {
    throw new Error('Method not implemented.');
  }

   override getMonthView(args: GetMonthViewArgs): MonthView {
  //   // args.viewDate = new Date('2022-05-17');
  //   // const activeMonth = new Date().getMonth()+1;
  //   // const viewDateMonth = args.viewDate.getMonth()+1;
  //   // let isTwoWeekView = localStorage.getItem('isTwoWeek');
  //    let mnthView: MonthView;
    // if(activeMonth === viewDateMonth){
    //   let weekNumber = this.getWeekOfMonth(args.viewDate.toLocaleDateString('en-US'));
    //   // console.log(weekNumber);
    //   // args.viewStart = startOfWeek(startOfMonth(args.viewDate));
    //   // args.viewDate = new Date('2022-05-29');

    //   //#region logic for view start
    //   if((weekNumber === 1 || weekNumber === 2) && isTwoWeekView === 'false'){
    //     args.viewStart = startOfWeek(startOfMonth(args.viewDate));
    //     args.viewEnd = addDays(args.viewStart, 13);
    //   }
    //   else if ((weekNumber === 3 || weekNumber === 4) && isTwoWeekView === 'false') {
    //     args.viewStart = startOfWeek(args.viewDate);
    //     args.viewEnd = addDays(args.viewStart, 13);
    //   }
    //   else if(isTwoWeekView === 'true'){
    //     args.viewStart = startOfWeek(startOfMonth(args.viewDate));
    //     args.viewEnd = addDays(args.viewStart, 27);
    //   }
    //   //#endregion
    //   mnthView = getMonthView(this.dateAdapter, args);
    //   // alert(this.toggleWeeks);
    // }
    // else{
    //   args.viewStart = startOfWeek(startOfMonth(args.viewDate));
    //   args.viewEnd = isTwoWeekView === 'false' ? args.viewEnd = addDays(args.viewStart, 13) : addDays(args.viewStart, 27);
    //   mnthView = getMonthView(this.dateAdapter, args);
    // }


      args.viewStart = this.scheduleService.startDate;
      args.viewEnd = this.scheduleService.endDate;

      let mnthView = getMonthView(this.dateAdapter, args);

     return mnthView;
   }

  getWeekOfMonth(dateOfMonth: string): number {
    var d = new Date(dateOfMonth);
    var date = d.getDate();
    var day = d.getDay();
    const weekOfMonth = Math.ceil((date - 1 - day) / 7) + 1;
    return weekOfMonth;
  }

  hideCalCellRows(){
    let calDays: any;
    calDays = document.querySelector('.cal-days')?.children;
    console.log(calDays);
  }

  public GetSchedulePayPeriod() {
    return this.http.get(`http://localhost:6200/schedulepayperiod`);
    // .subscribe(response => {

    //   // next: response => {
    //     this.schedulePay = response;
    //     this.scheduleService.setStartDate(new Date(this.schedulePay[0].startDate));
    //     this.scheduleService.setEndDate(new Date(this.schedulePay[0].endDate));
    //     this.startDate = new Date(this.schedulePay[0].startDate);
    //     this.endDate = new Date(this.schedulePay[0].endDate);
    //   // }
    // });

    // const schedulePeriod$ = this.httpPromiseClient.get(`http://localhost:6200/schedulepayperiod`);
    // await lastValueFrom(schedulePeriod$).then((response) => {
    //   let singleSchedule = new SchedulePayPeriod();
    //   singleSchedule = response as SchedulePayPeriod;
    //   console.log('singleSchedule');
    //   console.log(singleSchedule);
    //   this.schedulePay.push(singleSchedule);
    //   this.scheduleService.setStartDate(new Date(this.schedulePay[0].startDate));
    //   this.scheduleService.setEndDate(new Date(this.schedulePay[0].endDate));
    //   this.startDate = new Date(this.schedulePay[0].startDate);
    //   this.endDate = new Date(this.schedulePay[0].endDate);
    // })
  }

  toggleWeekView(){
    this.toggleWeeks = !this.toggleWeeks;
    localStorage.setItem('isTwoWeek', String(this.toggleWeeks));
    this.args1.viewDate = new Date();
    this.getMonthView(this.args1);
    // this.viewDate = this.args1.viewDate;
    // this.refresh.next();
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
        day.cssClass = 'bg-pink';
      }
    });
  }

  //get color through appointment status.
  getColorCodeByStatus(status: number): any {
    let color = this.colors.yellow;
    switch (status) {
      case 1: //requested
        color = this.colors.yellow;
        break;
      case 2: //approved
        color = this.colors.green;
        break;
      case 3: //decline
        color = this.colors.red;
        break;
      case 4: //booked already
        color = this.colors.blue;
        break;
    }
    return color;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    window.open(
      `https://www.themoviedb.org/`,
      '_blank'
    );
  }

  // dayClicked({
  //   date,
  //   events,
  // }: {
  //   date: Date;
  //   events: CalendarEvent<{ film: Film }>[];
  // }): void {
  //   console.log("I am firing")
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //       this.viewDate = date;
  //     }
  //   }
  // }

  closeOpenMonthViewDay() {
    // this.activeDayIsOpen = false;
  }

  saveEvent(): void {
    this.events = [...this.events];
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  // loadShifts() {
  //   this.events = [];
  //   this.scheduleInfo.forEach(app => {
  //     let element: CalendarEvent = {
  //       id: app.id,
  //       title: app.shiftTime,
  //       start: new Date(),
  //       end: new Date(),
  //       color: undefined, //get color from db
  //       actions: this.actions,
  //       allDay: false,
  //       draggable: false,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       }
  //     };
  //     this.events.push(element);

  //     this.refresh.next();
  //   });
  // }



  GetScheduleData() {
    this.scheduleService.getScheduleData().subscribe(
      (response)=> {
        this.scheduleService.startDate = new Date(response.startDate);
        this.scheduleService.endDate = new Date(response.endDate);
      }
    );
  }

  GetCurrentScheduleData() {
    this.scheduleDataService.getSchedulePeriodAndShifts().subscribe(
      (response)=> {
        this.scheduleInfo = response;
      }
    );
  }

  GetViewModeValue(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", 1);
    this.http.get(`http://localhost:8000/switchview`, { params: queryParams })
    .subscribe({
      next: response => {
        this.switchViewObj = response;

      }
    });
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

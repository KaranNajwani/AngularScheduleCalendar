import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent, CalendarUtils, CalendarView, DateAdapter, DAYS_OF_WEEK } from 'angular-calendar';
import { WeekViewHour, WeekViewHourSegment, GetMonthViewArgs, MonthView, getMonthView, GetWeekViewArgs, WeekView } from 'calendar-utils';
import { addDays, addHours, endOfDay, endOfMonth, endOfWeek, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek, subDays } from 'date-fns';
import { el } from 'date-fns/locale';
import { Subject } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.model';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

// export class MyCalendarUtils extends CalendarUtils {

//   datepipe: DatePipe = new DatePipe('yyyy-MM-dd');

//   override getMonthView(args: GetMonthViewArgs): MonthView {
//     let weekNumber = this.getWeekOfMonth(args.viewDate.toLocaleDateString('en-US'));
//     console.log(weekNumber);
//     // args.viewStart = startOfWeek(startOfMonth(args.viewDate));
//     args.viewDate = new Date('2022-05-18');
//     args.viewStart = startOfWeek(args.viewDate);
//     if(weekNumber <= 3){
//       args.viewEnd = addDays(args.viewStart, 13);
//     }
//     return getMonthView(this.dateAdapter, args);
//   }

//   getWeekOfMonth(dateOfMonth: string): number {
//     var d = new Date(dateOfMonth);
//     var date = d.getDate();
//     var day = d.getDay();
//     const weekOfMonth = Math.ceil((date - 1 - day) / 7) + 1;
//     return weekOfMonth;
//     }

//   // override getWeekView(args: GetWeekViewArgs): WeekView {
//   //   args.viewStart = startOfWeek(startOfMonth(args.viewDate));
//   //   args.viewEnd = addDays(args.viewStart, 13);
//   //   return this.getWeekView(args);
//   // }

// }

@Component({
  selector: 'app-matlewis-calendar',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './matlewis-calendar.component.html',
  styleUrls: ['./matlewis-calendar.component.css']
  ,
  providers: [
    {
      provide: CalendarUtils,
      useClass: MatlewisCalendarComponent
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class MatlewisCalendarComponent extends CalendarUtils implements OnInit {
  deleteEvent(event: CalendarEvent<any>) {
    throw new Error('Method not implemented.');
  }
  editEvent(event: CalendarEvent<any>) {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.hideCalCellRows();
    this.GetScheduleData();
  }

  datepipe: DatePipe = new DatePipe('yyyy-MM-dd');
  refresh = new Subject<void>();

  // override getMonthView(args: GetMonthViewArgs): MonthView {
  //   console.log(args);
  //   let weekNumber = this.getWeekOfMonth(args.viewDate.toLocaleDateString('en-US'));
  //   // console.log(weekNumber);
  //   // args.viewStart = startOfWeek(startOfMonth(args.viewDate));
  //   // args.viewDate = new Date('2022-05-29');
  //   args.viewStart = startOfWeek(args.viewDate);
  //   // if(weekNumber <= 3){
  //   //   args.viewEnd = addDays(args.viewStart, this.numberOfDays);
  //   // }
  //   alert(this.toggleWeeks);
  //   console.log(this.toggleWeeks)
  //   // alert(this.testString);
  //   if(this.toggleWeeks){
  //     console.log('I am in if condition');
  //     args.viewEnd = endOfWeek(endOfMonth(args.viewDate));
  //   }
  //   else{
  //     console.log('I am in else condition');
  //     args.viewEnd = addDays(args.viewStart, this.numberOfDays);
  //   }
  //   // console.log('--------------------');
  //   var mnthView = getMonthView(this.dateAdapter, args);
  //   // alert(this.toggleWeeks);
  //   console.log(mnthView);
  //   return mnthView;
  // }

  //2nd way -
  // override getMonthView(args: GetMonthViewArgs): MonthView {
  //   // console.log(args);
  //   let weekNumber = this.getWeekOfMonth(args.viewDate.toLocaleDateString('en-US'));
  //   // console.log(weekNumber);
  //   args.viewStart = startOfWeek(startOfMonth(args.viewDate));
  //   // args.viewDate = new Date('2022-05-29');
  //   // args.viewStart = startOfWeek(args.viewDate);
  //   args.viewEnd = endOfWeek(endOfMonth(args.viewDate));
  //   var mnthView = getMonthView(this.dateAdapter, args);
  //   console.log(mnthView);
  //   return mnthView;
  // }

  getWeekOfMonth(dateOfMonth: string): number {
    var d = new Date(dateOfMonth);
    var date = d.getDate();
    var day = d.getDay();
    const weekOfMonth = Math.ceil((date - 1 - day) / 7) + 1;
    return weekOfMonth;
  }


  constructor(private http: ApiHttpService, private dateAdaptor: DateAdapter) {
    super(dateAdaptor);
  }

  hideCalCellRows(){
    let calDays: any;
    calDays = document.querySelector('.cal-days')?.children;
    console.log(calDays);
    // calDays.forEach(element => {
    //   element
    // });
  }

  toggleWeekView(){
    this.toggleWeeks = !this.toggleWeeks;
    this.testString = 'Something added';
    this.args1.viewDate = new Date('2022-06-01');
    // this.getMonthView(this.args1);
    // this.viewDate = this.args1.viewDate;
    console.log('77777777');
    this.viewDate = this.args1.viewDate;
    // this.refresh.next();
  }

  //#region Properties
  isCalendarEnabled: boolean = false;
  isCreateModalEnabled: boolean = true;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  scheduleInfo: Schedule[] = [];
  toggleWeeks: boolean = true;
  testString: string = '';
  numberOfDays: number = 13;
  locale: string = 'en_US';
  localePrefix: string = 'en';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  //#endregion

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

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: this.colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: false,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: this.colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: this.colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: this.colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: false,
  //   },
  // ];


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

  //on month view day click
  // dayClicked({ date, events }: { date: Date; events: Event[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
  //       this.activeDayIsOpen = false;
  //     }
  //     else if (events.length > 0 && this.activeDayIsOpen === false) {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;

  //     if (isSameDay(this.viewDate, date) && this.activeDayIsOpen === false) {
  //       //this.activeDayIsOpen = true;
  //       if (this.isCreateModalEnabled) {
  //         this.openEvent(date, CalendarView.Month);
  //       }
  //     }
  //   }

  // }

  //open appointment modal to create
  openEvent(date: Date, calendarView: CalendarView) {
    // const dialogRef = this.dialog.open(DialogAppointmentComponent, {
    //   maxWidth: '650px',
    //   data: {
    //     appDate: date,
    //     action: 'CREATE',
    //     physicianName: this.physicianName,
    //     physicianId: this.physicianId,
    //     calendarView: calendarView,
    //     userRole: this.userRole
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (this.physicianId !== undefined) {
    //     this.loadAppointments(this.physicianId);
    //   }
    //   else if(this.userRole === UserRoles.Patient && this.physicianId === undefined){
    //     this.loadPatientAppointments(this.userID.toString());
    //   }
    // });
  }

  //hours clicked
  hourSegmentClicked({ date, event }: { date: Date, event: Event[] }): void {
    console.log("hour clicked " + date.getHours());
    if (this.isCreateModalEnabled) {
      this.openEvent(date, CalendarView.Week);
    }
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

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    console.log("I am firing")
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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

  loadShifts() {
    this.events = [];
    this.scheduleInfo.forEach(app => {
      let element: CalendarEvent = {
        id: app.id,
        title: app.shiftTime,
        start: new Date(),
        end: new Date(),
        color: undefined, //get color from db
        actions: this.actions,
        allDay: false,
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        }
      };
      this.events.push(element);

      this.refresh.next();
    });
  }

  // dayClicked({
  //   date,
  //   events,
  // }: {
  //   date: Date;
  //   events: CalendarEvent<{ film: Film }>[];
  // }): void {
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

  // eventClicked(event: CalendarEvent<{ film: Film }>): void {
  //   window.open(
  //     `https://www.themoviedb.org/movie/${event.meta.film.id}`,
  //     '_blank'
  //   );
  // }

  GetScheduleData() {
    this.http.get(`http://localhost:3000/scheduledata`).subscribe({
      next: response => {
        this.scheduleInfo = response;
        // console.log(this.scheduleInfo);
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
}

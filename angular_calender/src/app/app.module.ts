import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { AppComponent } from './app.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import {ScheduleService} from './components/schedule-calendar/schedule-calendar.service';
import { StartdatePipe } from './pipes/startdate.pipe';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';

registerLocaleData(localeFr);
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    ScheduleCalendarComponent,
    StartdatePipe,
    CalendarDayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScheduleModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

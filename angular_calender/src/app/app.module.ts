import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { AppComponent } from './app.component';
import { CalenderExampleComponent } from './components/calender-example/calender-example.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeFr);
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    CalenderExampleComponent,
    ScheduleCalendarComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

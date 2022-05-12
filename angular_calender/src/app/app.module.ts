import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { AppComponent } from './app.component';
import { CalenderExampleComponent } from './components/calender-example/calender-example.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatlewisCalendarComponent } from './components/matlewis-calendar/matlewis-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncEventCalendarComponent } from './components/async-event-calendar/async-event-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeFr);
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    CalenderExampleComponent,
    MatlewisCalendarComponent,
    AsyncEventCalendarComponent
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

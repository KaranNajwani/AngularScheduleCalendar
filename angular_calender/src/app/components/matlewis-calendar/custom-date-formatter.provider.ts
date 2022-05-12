import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  public override weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: any = new DatePipe(locale!).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semaine ${weekNumber} en ${year}`;
  }
}

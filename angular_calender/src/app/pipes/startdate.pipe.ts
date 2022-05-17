import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleService } from '../components/schedule-calendar/schedule-calendar.service';
import { Day } from '../models/day.model';

@Pipe({
  name: 'startdate'
})
export class StartdatePipe implements PipeTransform {

  constructor(private scheduleService: ScheduleService){

  }

  transform(value: Date, ...args: unknown[]): Day {
    const inputValue = formatDate(value, 'yyyy-MM-dd', 'en_US');
    const result = this.scheduleService.schedule.schedule.days.filter(x => x.date === inputValue.toString())[0];
    return result?.shifts.length > 0 ? result : new Day();
  }

}

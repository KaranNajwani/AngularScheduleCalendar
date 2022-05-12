import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, DragAndDropService, EventSettingsModel, MonthService, ResizeService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calender-example',
  templateUrl: './calender-example.component.html',
  styleUrls: ['./calender-example.component.css'],
  providers: [
    // DayService,
    // WeekService,
    // WorkWeekService,
    ResizeService, DragAndDropService,
    MonthService
    // AgendaService
  ],
})
export class CalenderExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public displayDate: Date = new Date(2022, 0, 16);
    // public eventSettings: EventSettingsModel = { dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) };
}

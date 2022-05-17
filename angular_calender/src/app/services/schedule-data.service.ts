import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {

  schedule = {
    "schedule": {
      "clientCode": "904",
      "employeeId": "56",
      "days": [
        {
          "date": "2022-05-10",
          "shifts": [
            {
              "symbol": "S7",
              "portions": [
                {
                  "startTime": "07:00",
                  "endTime": "12:30",
                  "payCode": "Reg",
                  "deptCode": "9876"
                },
                {
                  "startTime": "14:00",
                  "endTime": "15:00",
                  "payCode": "Training",
                  "deptCode": "9876"
                }
              ]
            },
            {
              "symbol": "J15",
              "portions": [
                {
                  "startTime": "07:00",
                  "endTime": "10:30",
                  "payCode": "Reg",
                  "deptCode": "9876"
                },
                {
                  "startTime": "11:00",
                  "endTime": "15:00",
                  "payCode": "Training",
                  "deptCode": "9876"
                }
              ]
            }
          ]
        },
        {
          "date": "2022-05-12",
          "shifts": [
            {
              "symbol": "S7",
              "portions": [
                {
                  "startTime": "07:00",
                  "endTime": "12:30",
                  "payCode": "Reg",
                  "deptCode": "9876"
                },
                {
                  "startTime": "14:00",
                  "endTime": "15:00",
                  "payCode": "Training",
                  "deptCode": "9876"
                }
              ]
            },
            {
              "symbol": "J15",
              "portions": [
                {
                  "startTime": "07:00",
                  "endTime": "10:30",
                  "payCode": "Reg",
                  "deptCode": "9876"
                },
                {
                  "startTime": "11:00",
                  "endTime": "15:00",
                  "payCode": "Training",
                  "deptCode": "9876"
                }
              ]
            }
          ]
        }
      ]
    }
  }

  constructor() { }

  // method to fetch data from server
  public getSchedulePeriodAndShifts(): Observable<any> {
    return of(this.schedule);
  }
}

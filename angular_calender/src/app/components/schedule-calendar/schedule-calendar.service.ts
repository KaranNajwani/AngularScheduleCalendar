import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable(
  {
    providedIn: 'root'
  }
)

export class ScheduleService {

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
                  "startTime": "09:00",
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

  startDate = new Date();
  endDate = new Date();
  isTwoWeek: boolean = false;

  scheduledata = [{ startDate: "2022-05-01", endDate: "2022-05-28" }, { startDate: "2022-05-29", endDate: "2022-06-11" }]
  constructor() { }


  // method to fetch data from server
  public getScheduleData(): Observable<any> {
    return of(this.scheduledata[0])
  }

}

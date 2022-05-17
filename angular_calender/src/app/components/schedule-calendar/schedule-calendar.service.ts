import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable()

export class ScheduleService {

    startDate = new Date();
    endDate = new Date();

    scheduledata = [{startDate:"2022-05-01", endDate:"2022-05-28"},{startDate:"2022-05-29", endDate:"2022-06-11"}]
    constructor() { }


    // method to fetch data from server
    public getScheduleData(): Observable<any> {
       return of(this.scheduledata[0])
    }

}
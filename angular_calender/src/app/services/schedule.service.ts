import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private startDate = new BehaviorSubject<any>(null);
  start = this.startDate.asObservable();

  private endDate = new BehaviorSubject<any>(null);
  end = this.endDate.asObservable();

  constructor() { }

  setStartDate(date: Date){
    this.startDate.next(date);
  }

  setEndDate(date: Date){
    this.endDate.next(date);
  }
}

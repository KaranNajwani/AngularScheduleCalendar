import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchedulePayPeriod } from '../models/schedulepayperiod.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpClientService {

  constructor(private http: HttpClient) { }

  public get<SchedulePayPeriod>(url: string, options?: any) {
    return this.http.get(url, options);
  }
  public post(url: string, data: any, options?: any) : any {
    return this.http.post(url, data, options);
  }
  public put(url: string, data: any, options?: any) : any {
    return this.http.put(url, data, options);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }
}

import { Day } from "./day.model";

export class Schedule {
  // id: string = '';
  // shiftTime: string = '';
  // payCode: string = '';
  // department: string = '';
  // date: string = '';

  clientCode: number = 0;
  employeeId: number = 0;
  days: Array<Day> = new Array<Day>();
}

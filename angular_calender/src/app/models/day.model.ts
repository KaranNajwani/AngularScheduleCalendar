import { Timestamp } from "rxjs";
import { Shift } from "./shift.model";

export class Day{
  date: Date = new Date();
  shifts: Array<Shift> = new Array<Shift>();
}

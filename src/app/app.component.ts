import { Component } from "@angular/core";
import {
  Form,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Day Calendar</h2>
      <div class="day-cal">
        <p-calendar [(ngModel)]="date1"></p-calendar>
      </div>
      <br />
      <br />

      <h2>Week Calendar</h2>
      <div class="week-cal">
        <p-calendar
          [(ngModel)]="date1"
          selectionMode="range"
          (onSelect)="handler($event)"
          [hideOnDateTimeSelect]="true"
        ></p-calendar>
      </div>
    </div>

    <h2>Range Form Control</h2>
    <div class="week-cal">
      <p-calendar
        [formControl]="dateControl"
        selectionMode="range"
        (onSelect)="closeCalendarOverlay($event)"
        [hideOnDateTimeSelect]="true"
      ></p-calendar>
    </div>
  `,
  styles: `
  .container {
    margin: 20px;
  }
  .day-cal {
    width: 250px;
  }
  
  `,
})
export class AppComponent {
  date1: any;
  dateControl = new FormControl([new Date()]);

  handler($event: any) {
    console.log("event -->", $event);
    const weeks = this.getStartAndEndOfWeek($event);
    console.log("weeks -->", weeks);
    this.date1 = weeks;
  }

  closeCalendarOverlay($event: any) {
    const weeks = this.getStartAndEndOfWeek($event);
    this.dateControl.setValue(weeks);
  }

  getStartAndEndOfWeek(date: Date) {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    const sundayOffset = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    startDate.setDate(currentDate.getDate() - sundayOffset); // Start date is the previous Sunday
    endDate.setDate(currentDate.getDate() + (6 - sundayOffset)); //
    console.log(
      "startDate -->",
      startDate.toISOString().slice(0, 10),
      "endDate -->",
      endDate.toISOString().slice(0, 10)
    );

    return [startDate, endDate];
  }

  // Example usage:
  // const inputDate = new Date('2024-03-13');
  // const { startOfWeek, endOfWeek } =
  // console.log("Start of the week:", startOfWeek); // Output: Start of the week: 2024-03-11
  // console.log("End o
}

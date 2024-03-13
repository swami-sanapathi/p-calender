import { Component, ViewChild, signal } from "@angular/core";
import {
  Form,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Calendar, CalendarModule } from "primeng/calendar";

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
          #pCalendar
          [(ngModel)]="date1"
          selectionMode="range"
          (onSelect)="onHandler($event)"
        ></p-calendar>
      </div>
    </div>
    <br />
    <br />
    <br />
    <h2>Range Form Control</h2>
    <div class="week-cal">
      <p-calendar
        [formControl]="dateControl"
        selectionMode="range"
        (onSelect)="closeCalendarOverlay($event)"
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
  date1 = signal<Date[]>([new Date()]);
  @ViewChild("pCalendar") calendar!: Calendar;
  dateControl = new FormControl([new Date()]);

  onHandler($event: any) {
    const weeks = this.getStartAndEndOfWeek($event);
    this.date1.set(weeks);
    console.log(this.date1());
    this.calendar.hideOverlay();
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
    return [startDate, endDate];
  }
}

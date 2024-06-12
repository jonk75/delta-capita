import { Component } from '@angular/core';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';

@Component({
  selector: 'app-holiday-checker',
  standalone: true,
  imports: [
    HolidayFormComponent,
    HolidayListComponent
  ],
  templateUrl: './holiday-checker.component.html'
})

export class HolidayCheckerComponent {}
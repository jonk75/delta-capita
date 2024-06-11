import { Component } from '@angular/core';
import { HolidayCountrySelectorComponent } from './components/holiday-country-selector/holiday-country-selector.component';

@Component({
  selector: 'app-holiday-checker',
  standalone: true,
  imports: [
    HolidayCountrySelectorComponent
  ],
  templateUrl: './holiday-checker.component.html',
  styleUrl: './holiday-checker.component.scss'
})

export class HolidayCheckerComponent {
}
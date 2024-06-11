import { Component } from '@angular/core';
import { HolidayCountrySelectorComponent } from './components/holiday-country-selector/holiday-country-selector.component';
import { HolidaySubdivisionSelectorComponent } from './components/holiday-subdivision-selector/holiday-subdivision-selector.component';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidaySelectorsComponent } from './components/holiday-selectors/holiday-selectors.component';

@Component({
  selector: 'app-holiday-checker',
  standalone: true,
  imports: [
    HolidaySelectorsComponent,
    HolidayListComponent
  ],
  templateUrl: './holiday-checker.component.html',
  styleUrl: './holiday-checker.component.scss'
})

export class HolidayCheckerComponent {
}
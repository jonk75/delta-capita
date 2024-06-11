import { Component, ViewEncapsulation } from '@angular/core';
import { HolidayCountrySelectorComponent } from '../holiday-country-selector/holiday-country-selector.component';
import { HolidaySubdivisionSelectorComponent } from '../holiday-subdivision-selector/holiday-subdivision-selector.component';

@Component({
  selector: 'app-holiday-selectors',
  standalone: true,
  imports: [
    HolidayCountrySelectorComponent,
    HolidaySubdivisionSelectorComponent
  ],
  templateUrl: './holiday-selectors.component.html',
  styleUrl: './holiday-selectors.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HolidaySelectorsComponent {

}

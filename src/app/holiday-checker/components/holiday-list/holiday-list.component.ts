import { Component } from '@angular/core';
import { HolidayService, Holidays } from '../../../services/holiday.service';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.scss'
})

export class HolidayListComponent {
  public readonly holidays: Holidays = this.holidayService.holidays;
  
  constructor(
    private readonly holidayService: HolidayService
  ) {}
}
import { Component, ViewEncapsulation } from '@angular/core';
import { HolidayService, Holidays } from '../../services/holiday.service';
import { DatePipe } from '@angular/common';
import { ErrorComponent } from '../../../components/error/error.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    DatePipe,
    ErrorComponent,
    LoaderComponent
  ],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HolidayListComponent {
  public readonly holidays: Holidays = this.holidayService.holidays;
  
  constructor(
    private readonly holidayService: HolidayService
  ) {}
}
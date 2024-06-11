import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-holiday-country-selector',
  standalone: true,
  imports: [],
  templateUrl: './holiday-country-selector.component.html',
  styleUrl: './holiday-country-selector.component.scss'
})

export class HolidayCountrySelectorComponent implements OnInit {
  constructor(
    private readonly countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries();
  }
}
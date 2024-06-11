import { Component, OnInit } from '@angular/core';
import { Countries, CountryService } from '../../../services/country.service';
import { CommonModule } from '@angular/common';
import { SubdivisionService } from '../../../services/subdivision.service';
import { HolidayService } from '../../../services/holiday.service';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-holiday-country-selector',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './holiday-country-selector.component.html',
  styleUrl: './holiday-country-selector.component.scss'
})

export class HolidayCountrySelectorComponent implements OnInit {
  public readonly countries: Countries = this.countryService.countries;

  constructor(
    private readonly countryService: CountryService,
    private readonly holidayService: HolidayService,
    private readonly subdivisionService: SubdivisionService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries();
  }

  // PUBLIC METHODS

  public async setCountry(
    event: Event
  ) {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    const index: number = Number(target.value);
    const country: Country = this.countries.list()[index];
    await this.subdivisionService.getSubdivisions(country);
    await this.holidayService.getHolidays(country);
  }
}
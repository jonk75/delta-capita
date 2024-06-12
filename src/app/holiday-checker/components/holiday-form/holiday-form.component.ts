import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Countries, CountryService } from '../../../services/country.service';
import { HolidayService } from '../../../services/holiday.service';
import { SubdivisionService, Subdivisions } from '../../../services/subdivision.service';
import { ErrorComponent } from '../../../components/error/error.component';
import { HolidayFormValue } from '../../../models/holiday-form-value';

@Component({
  selector: 'app-holiday-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorComponent
  ],
  templateUrl: './holiday-form.component.html',
  styleUrl: './holiday-form.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HolidayFormComponent implements OnInit {
  public readonly countries: Countries = this.countryService.countries;
  public readonly subdivisions: Subdivisions = this.subdivisionService.subvivisions;
  public readonly formGroup: FormGroup = this.formBuilder.group({
    countryIsoCode: [
      '',
      [
        Validators.required
      ]
    ],
    subdivision: '',
    validFrom: '',
    validTo: ''
  });

  constructor(
    private readonly countryService: CountryService,
    private readonly formBuilder: FormBuilder,
    private readonly holidayService: HolidayService,
    private readonly subdivisionService: SubdivisionService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries();

  }

  // PUBLIC METHODS

  public async setCountry(
    event: Event
  ): Promise<void> {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    await this.subdivisionService.getSubdivisions(target.value);
    const control: AbstractControl = this.formGroup.controls['subdivision'];
    this.formGroup.patchValue({
      subdivision: ''
    });
    if (this.subdivisions.list().length) {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  }

  public async submit(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const values: HolidayFormValue = this.formGroup.value;
    await this.holidayService.getHolidays(
      values.countryIsoCode,
      '2024-01-01',
      '2024-12-31',
      values.subdivision
    );
  }

}
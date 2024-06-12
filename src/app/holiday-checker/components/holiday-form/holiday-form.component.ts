import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Countries, CountryService } from '../../services/country.service';
import { HolidayService } from '../../services/holiday.service';
import { SubdivisionService, Subdivisions } from '../../services/subdivision.service';
import { ErrorComponent } from '../../../components/error/error.component';
import { HolidayFormValue } from '../../models/holiday-form-value';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { HolidayValidators } from '../../validators/holiday.validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    ErrorComponent
  ],
  templateUrl: './holiday-form.component.html',
  styleUrl: './holiday-form.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HolidayFormComponent implements OnInit {
  public showDatePicker: boolean = false;
  public readonly minDate: string = '2020-01-01';
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
    validFrom: [
      '',
      [
        Validators.required,
        HolidayValidators.date(this.minDate)
      ]
    ],
    validTo: [
      '',
      [
        Validators.required,
        HolidayValidators.date(this.minDate)
      ]
    ]
  }, {
    validators: HolidayValidators.dateRange(
      3,
      'validFrom',
      'validTo'
    )
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
    const countryIsoCode: string = target.value;
    const hasChanged: boolean = this.holidayService.resetHolidays(countryIsoCode);
    this.showDatePicker = !hasChanged;
    await this.subdivisionService.getSubdivisions(countryIsoCode);
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
    this.showDatePicker = true;
  }

  public async submit(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const values: HolidayFormValue = this.formGroup.value;
    await this.holidayService.getHolidays(
      values.countryIsoCode,
      values.validFrom,
      values.validTo,
      values.subdivision
    );
  }

}
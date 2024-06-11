import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs';
import { Country } from '../models/country.model';
import { Holiday } from '../models/holiday.model';
import { TranslationService } from './translation.service';

export interface Holidays {
  error: Signal<string>;
  list: Signal<Holiday[]>;
  loading: Signal<boolean>;
}

@Injectable({
  providedIn: 'root'
})

export class HolidayService {
  private api: string = `${environment.api}/PublicHolidays`;
  private _list: Holiday[] = [];
  private readonly list: WritableSignal<Holiday[]> = signal<Holiday[]>(this._list);
  private readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly error: WritableSignal<string> = signal<string>('');
  public readonly holidays: Holidays = {
    error: this.error.asReadonly(),
    list: this.list.asReadonly(),
    loading: this.loading.asReadonly()
  };

  constructor(
    private readonly http: HttpClient,
    private readonly translationService: TranslationService
  ) { }

  // PUBLIC METHODS

  public async getHolidays(
    country: Country,
    validFrom: string = '2022-01-01',
    validTo: string = '2022-06-30',
    languageIsoCode: string = 'EN'
  ) {
    this.loading.set(true);
    this.error.set('');
    const countryIsoCode: string = country.isoCode;
    const source: Observable<Holiday[]> = this.http.get<Holiday[]>(this.api, {
      params: {
        countryIsoCode,
        languageIsoCode,
        validFrom,
        validTo
      }
    });
    await lastValueFrom(source)
      .then(
        (response: Holiday[]) => this.handleSuccess(response)
      )
      .catch(
        (error: HttpErrorResponse) => this.handleError(error)
      );
    this.loading.set(false);
  }

  // PRIVATE METHODS

  private handleError(
    error: HttpErrorResponse
  ) {
    this.error.set(error.error);
  }

  private handleSuccess(
    response: Holiday[]
  ) {
    this._list = response;
    this.setDisplayName();
  }

  private setDisplayName() {
    this._list.forEach((holiday: Holiday) => {
      holiday.displayName = this.translationService.getDisplayName(holiday.name);
    });
    this.list.set(this._list);
  }

}
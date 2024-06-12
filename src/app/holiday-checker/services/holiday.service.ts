import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs';
import { Holiday } from '../models/holiday.model';
import { TranslationService } from '../../services/translation.service';
import { ErrorService } from '../../services/error.service';
import { LanguageService } from '../../services/language.service';

export interface Holidays {
  errors: Signal<string[]>;
  list: Signal<Holiday[]>;
  loaded: Signal<boolean>;
  loading: Signal<boolean>;
}

@Injectable({
  providedIn: 'root'
})

export class HolidayService {
  private _countryIsoCode: string = '';
  private _validFrom: string = '';
  private _validTo: string = '';
  private _subdivision: string = '';
  private _list: Holiday[] = [];
  private readonly api: string = `${environment.api}/PublicHolidays`;
  private readonly list: WritableSignal<Holiday[]> = signal<Holiday[]>(this._list);
  private readonly loaded: WritableSignal<boolean> = signal<boolean>(false);
  private readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly errors: WritableSignal<string[]> = signal<string[]>([]);
  public readonly holidays: Holidays = {
    errors: this.errors.asReadonly(),
    list: this.list.asReadonly(),
    loaded: this.loaded.asReadonly(),
    loading: this.loading.asReadonly()
  };

  constructor(
    private readonly errorService: ErrorService,
    private readonly http: HttpClient,
    private readonly languageService: LanguageService,
    private readonly translationService: TranslationService
  ) { }

  // PUBLIC METHODS

  public async getHolidays(
    countryIsoCode: string,
    validFrom: string,
    validTo: string,
    subdivision?: string
  ): Promise<void> {
    if (this._countryIsoCode === countryIsoCode && this._validFrom === validFrom && this._validTo === validTo) {
      if (this._subdivision === subdivision) {
        return;
      } else {
        this.filterHolidays(subdivision);
      }
    }
    this.loading.set(true);
    this.errors.set([]);
    const languageIsoCode: string = environment.lang;
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
        (response: Holiday[]) => this.handleSuccess(
          response,
          countryIsoCode,
          validFrom,
          validTo,
          subdivision
        )
      )
      .catch(
        (error: HttpErrorResponse) => this.handleError(error)
      );
    this.loading.set(false);
  }

  public resetHolidays(
    countryIsoCode: string
  ): boolean {
    if (this._countryIsoCode !== countryIsoCode) {
      this.list.set([]);
      this.loaded.set(false);
      return true;
    }
    return false;
  }

  // PRIVATE METHODS

  private filterHolidays(
    subdivision?: string
  ): void {
    if (!subdivision) {
      this._subdivision = '';
      this.list.set(this._list);
      return;
    }
    const filtered: Holiday[] = this._list.map(holiday => (
      {
        ...holiday,
        subdivisions: holiday.subdivisions ? holiday.subdivisions?.filter(item => item.code === subdivision) : []
      }
    )).filter(holiday => holiday.subdivisions.length > 0 || holiday.nationwide);
    this._subdivision = subdivision;
    this.list.set(filtered);
  }

  private handleError(
    error: HttpErrorResponse
  ): void {
    const errors: string[] = this.errorService.handleError(error);
    this.errors.set(errors);
  }

  private handleSuccess(
    response: Holiday[],
    countryIsoCode: string,
    validFrom: string,
    validTo: string,
    subdivision?: string
  ): void {
    this._countryIsoCode = countryIsoCode;
    this._validFrom = validFrom;
    this._validTo = validTo;
    this._list = response;
    this.setDisplayName();
    this.filterHolidays(subdivision);
    this.loaded.set(true);
  }

  private setDisplayName(): void {
    this._list.forEach((holiday: Holiday) => {
      holiday.displayName = this.translationService.getDisplayName(holiday.name);
    });
  }

}
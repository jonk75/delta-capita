import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { Country } from '../models/country.model';
import { TranslationService } from './translation.service';
import { ErrorService } from './error.service';

export interface Countries {
  errors: Signal<string[]>;
  list: Signal<Country[]>;
  loading: Signal<boolean>;
}

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private _list: Country[] = [];
  private readonly api: string = `${environment.api}/Countries`;
  private readonly list: WritableSignal<Country[]> = signal<Country[]>(this._list);
  private readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly errors: WritableSignal<string[]> = signal<string[]>([]);
  public readonly countries: Countries = {
    errors: this.errors.asReadonly(),
    list: this.list.asReadonly(),
    loading: this.loading.asReadonly()
  };

  constructor(
    private readonly errorService: ErrorService,
    private readonly http: HttpClient,
    private readonly translationService: TranslationService
  ) { }

  // PUBLIC METHODS

  public async getCountries(): Promise<void> {
    if (this.list().length) {
      return;
    }
    const source: Observable<Country[]> = this.http.get<Country[]>(this.api);
    this.loading.set(true);
    this.errors.set([]);
    await lastValueFrom(source)
      .then(
        (response: Country[]) => this.handleSuccess(response)
      )
      .catch(
        (error: HttpErrorResponse) => this.handleError(error)
      );
    this.loading.set(false);
  }

  // PRIVATE METHODS

  private handleError(
    error: HttpErrorResponse
  ): void {
    const errors: string[] = this.errorService.handleError(error);
    this.errors.set(errors);
  }

  private handleSuccess(
    response: Country[]
  ): void {
    this._list = response;
    this.setDisplayName();
  }

  private setDisplayName(): void {
    this._list.forEach((country: Country) => {
      country.displayName = this.translationService.getDisplayName(country.name);
    });
    this.list.set(this._list);
  }

}
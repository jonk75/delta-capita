import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // API
  private api: string = `${environment.api}/Countries`;
  // Countries
  private readonly countries: WritableSignal<Country[]> = signal<Country[]>([]);
  public readonly $countries: Signal<Country[]> = this.countries.asReadonly();

  constructor(
    private readonly http: HttpClient
  ) { }

  // PUBLIC METHODS

  public async getCountries() {
    const source: Observable<Country[]> = this.http.get<Country[]>(this.api);
    lastValueFrom(source)
      .then(
        (response: Country[]) => this.handleSuccess(response)
      )
      .catch(
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  // PRIVATE METHODS

  private handleError(
    error: HttpErrorResponse
  ) {
    console.log(error);
  }

  private handleSuccess(
    response: Country[]
  ) {
    console.log(response);
  }
}

import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subdivision } from '../models/subdivision.model';
import { TranslationService } from './translation.service';
import { Country } from '../models/country.model';

export interface Subdivisions {
  error: Signal<string>;
  list: Signal<Subdivision[]>;
  loading: Signal<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {
  private api: string = `${environment.api}/Subdivisions`;
  private readonly _lists: {[key: string]: Subdivision[];} = {};
  private _list: Subdivision[] = [];
  private readonly list: WritableSignal<Subdivision[]> = signal<Subdivision[]>(this._list);
  private readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly error: WritableSignal<string> = signal<string>('');
  public readonly subvivisions: Subdivisions = {
    error: this.error.asReadonly(),
    list: this.list.asReadonly(),
    loading: this.loading.asReadonly()
  };

  constructor(
    private readonly http: HttpClient,
    private readonly translationService: TranslationService
  ) { }

  public async getSubdivisions(
    country: Country
  ) {
    const countryIsoCode: string = country.isoCode;
    if (!countryIsoCode) {
      this.list.set([]);
      return;
    }
    const subdivision: Subdivision[] | undefined = this._lists[countryIsoCode];
    if (subdivision) {
      this.list.set(subdivision);
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const source: Observable<Subdivision[]> = this.http.get<Subdivision[]>(this.api, {
      params: {
        countryIsoCode
      }
    });
    await lastValueFrom(source)
      .then(
        (response: Subdivision[]) => this.handleSuccess(
          countryIsoCode,
          response
        )
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
    countryIsoCode: string,
    response: Subdivision[]
  ) {
    this._lists[countryIsoCode] = response;
    this._list = response;
    this.setDisplayName();
  }

  private setDisplayName() {
    this._list.forEach((subdivision: Subdivision) => {
      subdivision.displayName = this.translationService.getDisplayName(subdivision.name);
    });
    this.list.set(this._list);
  }

}
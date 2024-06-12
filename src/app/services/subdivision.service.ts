import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subdivision } from '../models/subdivision.model';
import { TranslationService } from './translation.service';
import { ErrorService } from './error.service';

export interface Subdivisions {
  errors: Signal<string[]>;
  list: Signal<Subdivision[]>;
  loading: Signal<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {
  private _list: Subdivision[] = [];
  private readonly api: string = `${environment.api}/Subdivisions`;
  private readonly _lists: {[key: string]: Subdivision[];} = {};
  private readonly list: WritableSignal<Subdivision[]> = signal<Subdivision[]>(this._list);
  private readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  private readonly errors: WritableSignal<string[]> = signal<string[]>([]);
  public readonly subvivisions: Subdivisions = {
    errors: this.errors.asReadonly(),
    list: this.list.asReadonly(),
    loading: this.loading.asReadonly()
  };

  constructor(
    private readonly errorService: ErrorService,
    private readonly http: HttpClient,
    private readonly translationService: TranslationService
  ) { }

  public async getSubdivisions(
    countryIsoCode: string
  ): Promise<void> {
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
    this.errors.set([]);
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
  ): void {
    const errors: string[] = this.errorService.handleError(error);
    this.errors.set(errors);
  }

  private handleSuccess(
    countryIsoCode: string,
    response: Subdivision[]
  ): void {
    this._lists[countryIsoCode] = response;
    this._list = response;
    this.setDisplayName();
  }

  private setDisplayName(): void {
    this._list.forEach((subdivision: Subdivision) => {
      subdivision.displayName = this.translationService.getDisplayName(subdivision.name);
    });
    this.list.set(this._list);
  }

}
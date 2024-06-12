import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language: string = environment.lang;
  private _languages: Language[] = [];
  private readonly api: string = `${environment.api}/Languages`;

  constructor(
    private readonly http: HttpClient
  ) {}

  // PUBLIC METHODS

  public async init(): Promise<void> {
    const source: Observable<Language[]> = this.http.get<Language[]>(this.api);
    await lastValueFrom(source).then(
      (response: Language[]) => this.handleSuccess(response)
    );
  }

  get language(): string {
    return this._language;
  }

  set language(
    language: string
  ) {
    this._language = language;
  }

  // PRIVATE METHODS

  private handleSuccess(
    languages: Language[]
  ): void {
    this._languages = languages;
  }
}

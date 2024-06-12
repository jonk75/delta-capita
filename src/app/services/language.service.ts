import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _language: string = environment.lang;

  // PUBLIc METHODS

  get language(): string {
    return this._language;
  }

  set language(
    language: string
  ) {
    this._language = language;
  }
}

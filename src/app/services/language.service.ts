import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/language.model';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly api: string = `${environment.api}/Languages`;
  private readonly languages: WritableSignal<Language[]> = signal<Language[]>([]);
  public readonly $languages: Signal<Language[]> = this.languages.asReadonly();

  constructor(
    private readonly http: HttpClient,
    private readonly translationService: TranslationService
  ) {}

  // PUBLIC METHODS

  public async init(): Promise<void> {
    const source: Observable<Language[]> = this.http.get<Language[]>(this.api);
    await lastValueFrom(source).then(
      (response: Language[]) => this.handleSuccess(response)
    );
  }

  // PRIVATE METHODS

  private handleSuccess(
    languages: Language[]
  ): void {
    languages.forEach((language: Language) => {
      language.displayName = this.translationService.getDisplayName(language.name);
    });
    languages.sort(this.sortAlphabetic);
    this.languages.set(languages);
  }

  /**
   * Sort language drop down by display name
   * @param {Language} a
   * @param {Language} b
   */
  private sortAlphabetic(
    a: Language,
    b: Language
  ): number {
    if (a.displayName < b.displayName) {
      return -1;
    }
    if (a.displayName > b.displayName) {
      return 1;
    }
    return 0;
  }
}

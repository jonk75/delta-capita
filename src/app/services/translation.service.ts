import { Injectable } from '@angular/core';
import { Translation } from '../models/translation.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(
    private readonly languageService: LanguageService
  ) {}
  
  /**
   * Gets the display name for an item from language array options
   * Finds the name matching the provided lang or the first item on the name array
   * @param {Translation[]} items 
   * @returns {string}
   */
  getDisplayName(
    items: Translation[]
  ): string {
    const language: string = this.languageService.language;
    const item: Translation | undefined = items.find((name) => name.language === language);
    if (item) {
      return item.text;
    }
    return items[0].text;
  }
}

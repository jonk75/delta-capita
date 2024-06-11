import { Injectable } from '@angular/core';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  private language: string = 'EN';
  
  /**
   * Gets the display name for an item from language array options
   * Finds the name matching the provided lang or the first item on the name array
   * @param {Translation[]} items 
   * @returns {string}
   */
  getDisplayName(
    items: Translation[]
  ): string {
    const item: Translation | undefined = items.find((name) => name.language === this.language);
    if (item) {
      return item.text;
    }
    return items[0].text;
  }
}

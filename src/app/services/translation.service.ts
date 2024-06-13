import { Injectable } from '@angular/core';
import { Translation } from '../models/translation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  /**
   * Gets the display name for an item from language array options
   * Finds the name matching the environment lang or the first item on the name array
   * @param {Translation[]} items 
   * @returns {string}
   */
  public getDisplayName(
    items: Translation[]
  ): string {
    const item: Translation | undefined = items.find((name) => name.language === environment.lang);
    if (item) {
      return item.text;
    }
    return items[0].text;
  }
}

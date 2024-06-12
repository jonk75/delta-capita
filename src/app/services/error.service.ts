import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {
  // PUBLIC METHODS

  /**
   * Gets an array of error messages from an HTTP error response
   * @param {any} error 
   * @returns {string[]}
   */
  public handleError(
    error: any
  ): string[] {
    const errors: string[] = [
      error.error.title
    ]
    if (error.error.errors) {
      for (const [key, value] of Object.entries(error.error.errors)) {
        errors.push(`${key}: ${value}`);
      }
    }
    return errors;
  }
}
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidationErrors } from '../models/form-validation-errors.model';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { FormChanges } from '../models/form-changes.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FormValidationService {

  // PUBLIC METHODS

  /**
   * Subscribe to form changes and return values / errors
   * @param {FormGroup} form The form to monitor
   * @returns {Observable<FormChanges>}
   */
  public onFormChanges(
    form: FormGroup
  ): Observable<FormChanges> {
    const _changes: FormChanges = {
       errors: {},
       value: {}
    };
    const changesSubject: BehaviorSubject<FormChanges> = new BehaviorSubject<FormChanges>(_changes);
    const changes$: Observable<FormChanges> = changesSubject.asObservable();
    form.valueChanges
       .pipe(
          distinctUntilChanged()
       ).subscribe((value) => {
          _changes.errors = this.getErrors(
             form
          );
          _changes.value = value;
          changesSubject.next(_changes);
    });
    return changes$;
  }

  // PRIVATE METHODS

  /**
   * Gets errors for a form
   * @param {FormGroup} group 
   * @returns {FormValidationErrors}
   */
  private getErrors(
    group: FormGroup
  ): FormValidationErrors {
    let formErrors: FormValidationErrors = {
      form: []
    };
    for (const errorKey in group.errors) {
      if (errorKey) {
        formErrors['form'].push(
          this.getMessage(errorKey)
        )
      }
   }
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl: AbstractControl = group.get(key) as AbstractControl;
      formErrors[key] = [];
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty) && abstractControl.errors) {
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key].push(
              this.getMessage(errorKey)
            )
          }
        }
      }
    });
    return formErrors;
  }

  /**
   * Matches error by key and returns message
   * @param {string} errorKey 
   * @returns {string} Error message
   */
  private getMessage(
    errorKey: string
  ): string {
    switch(errorKey) {
      case 'datesOutOfRange':
        return 'Dates supplied are invalid';
      case 'invalid':
        return 'Value is invalid';
      case 'maxYears':
        return `Maximum years you can search is ${environment.maxYears}`;
      case 'minDate':
        return 'Date supplied is invalid';
      case 'required':
        return 'Field is required';
      default:
        return 'Error';
    }
  }

}
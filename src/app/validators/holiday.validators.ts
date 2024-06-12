import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class HolidayValidators {
    static date(
      date: string
    ): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null) {
          return null;
        }
        const controlDate: Date = new Date(control.value);
        if (controlDate.toString().toLowerCase() === 'invalid date') {
          return {
            invalidDate: true
          } 
        }
        const controlTimestamp: number = controlDate.getTime()
        const validationTimestamp: number = new Date(date).getTime();
        return controlTimestamp > validationTimestamp ? null : {
          minDate: true
        };
      };
    }
    static dateRange(
      max: number,
      controlNameFrom: string,
      controlNameTo: string
    ): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control) {
          return null;
        }
        const controlFrom: AbstractControl | null = control.get(controlNameFrom);
        const controlTo: AbstractControl | null = control.get(controlNameTo);
        if (controlFrom && controlTo && controlFrom.valid && controlTo.valid) {
          const fromDate: number = new Date(controlFrom.value).getTime();
          const toDate: number = new Date(controlTo.value).getTime();
          if (toDate < fromDate) {
            return {
              outOfRange: true
            }
          }
          const years: number = Number(((toDate - fromDate) / 31536000000).toFixed(0));
          return years < max ? null : {
            maxYears: true
          };
        }
        return null;
      };
    }
  }
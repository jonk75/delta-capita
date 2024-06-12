import { FormValidationErrors } from "./form-validation-errors.model";

export interface FormChanges {
    value: any;
    errors: FormValidationErrors;
}
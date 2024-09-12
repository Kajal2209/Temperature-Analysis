import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noFutureDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  // Set the time of the current date to 00:00:00 to compare only the date part
  currentDate.setHours(0, 0, 0, 0);

  if (selectedDate > currentDate) {
    return { futureDate: true };
  }
  return null;
}

export function temperatureRangeValidator(
  control: AbstractControl
): ValidationErrors | null {
  const temperature = control.value;
  if (temperature < -50 || temperature > 50) {
    return { temperatureRange: true };
  }
  return null;
}

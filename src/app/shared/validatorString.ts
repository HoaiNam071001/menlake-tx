import {
  FormControl,
  ValidationErrors,
} from '@angular/forms';

export function validateInput(control: FormControl): ValidationErrors | null {
  const value: string = control.value;
  if (!value) {
    return null;
  }

  const array = String(value).split(',');

  const invalidNumber = (element: string) => {
    let num = Number(element);
    return !Number.isSafeInteger(num) || num < 3 || num > 18;
  };

  let index = array.findIndex(invalidNumber);
  if (index !== -1) {
    let idx_String = 0;
    if (index == 0) return { invalidInput: 0, type: 1 };

    idx_String = value.indexOf(',');
    for (let i = 0; i < index - 1; i++) {
      idx_String = value.indexOf(',', idx_String + 1);
    }

    return { invalidInput: idx_String, type: 1 };
  } else if (array.length > 200) return { invalidInput: 200, type: 2 };
  else return null;
}

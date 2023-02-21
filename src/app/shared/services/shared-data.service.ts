import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

   }

   formData:FormArray<any> | undefined;
}


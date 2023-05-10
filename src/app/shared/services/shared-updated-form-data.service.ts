import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedUpdatedFormDataService {


  public updateInvoiceActivity=new BehaviorSubject<any>(undefined);
  public updateInvoiceActivityData=new BehaviorSubject<any>(undefined);

  getUpdateInvoiceCommand():Observable <any>{
    return this.updateInvoiceActivity.asObservable();
  }


  getUpdateInvoiceData():Observable <any>{
    return this.updateInvoiceActivityData.asObservable();
  }


}

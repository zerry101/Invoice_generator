import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(public http:HttpClient) {  }

  private baseUrl="http://localhost:8080/api/v1/employees";

  data():Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }
  // :Observable<any>=this.http.get('http://localhost:8080/api/v1/employees');
  // console.log();

}

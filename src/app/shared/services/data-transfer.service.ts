import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(public http:HttpClient) {  }

  private baseUrl="http://localhost:8080/api/v1/employees";

  getData():Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }
  // :Observable<any>=this.http.get('http://localhost:8080/api/v1/employees');
  // console.log();

  // eslint-disable-next-line @typescript-eslint/ban-types

  postData(em:any){
    return this.http.post("http://localhost:8080/api/v1/employees",em)
  }


  // postData():Observable<any>{
  //   return this.http.post(`${this.baseUrl}`);
  // }

}

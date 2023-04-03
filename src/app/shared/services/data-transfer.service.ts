import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(public http:HttpClient) {  }

  private baseUrl="http://localhost:8080/api/v1/employees";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableInstanceData:BehaviorSubject<any>= new BehaviorSubject<any>({});


  getData(pageNumber:number,papageSize:number):Observable<any>{
    return this.http.get(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${papageSize}`);
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

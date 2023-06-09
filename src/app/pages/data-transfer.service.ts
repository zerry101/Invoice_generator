/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor(public http: HttpClient) { }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableInstanceData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  baseURL = "http://localhost:8080";

  getData(pageNumber: number, papageSize: number): Observable<any> {
    return this.http.get(`${this.baseURL}/api/v1/employees?pageNumber=${pageNumber}&pageSize=${papageSize}`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types



  postData(data: any) {
    return this.http.post(`${this.baseURL}/api/v1/employees`, data);
  }

  deleteData(id:any){
    return this.http.delete(`${this.baseURL}/api/v1/employees/delete/${id}`);

  }

  updateData(id: any,data:any) {
    return this.http.put(`${this.baseURL}/api/v1/employees/update/${id}`,data);
  }

}

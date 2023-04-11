import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) { }

  searchURL = "http://localhost:8080/api/v1/search?query";

  searchData(input: any): Observable<any> {
    return this.http.get(`${this.searchURL}=${input}`);
  }
}

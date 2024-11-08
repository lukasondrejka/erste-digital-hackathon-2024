import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonDataServiceService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public getJsonData<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}

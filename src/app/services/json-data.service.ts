import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  constructor(
    private httpClient: HttpClient
  ) {}

  public getJsonData<T>(jsonFileName: string): Observable<T> {
    return this.httpClient.get<T>(`data/${jsonFileName}.json`);
  }
}

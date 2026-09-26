import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private readonly httpClient = inject(HttpClient);

  public getJsonData<T>(jsonFileName: string): Observable<T> {
    return this.httpClient.get<T>(`data/${jsonFileName}.json`);
  }
}

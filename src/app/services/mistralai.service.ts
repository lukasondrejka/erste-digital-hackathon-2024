import { Injectable } from '@angular/core';
import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionResponse } from "@mistralai/mistralai/models/components";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MistralaiService {
  private apiKey: string = 'Kd7LHVHCXMZHRuxcjQgz72F7UJikpo2W';
  private client: Mistral;

  constructor() {
    this.client = new Mistral({apiKey: this.apiKey});
  }

  sendMessage(message: string): Observable<string> {
    return new Observable<string>(observer => {
      this.client.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          {role: 'user', content: message}
        ],
      }).then((chatResponse: ChatCompletionResponse) => {
        const response = <string>chatResponse.choices?.[0]?.message?.content ?? '';
        observer.next(response);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { MistralCore } from '@mistralai/mistralai/core.js';
import { chatComplete } from '@mistralai/mistralai/funcs/chatComplete.js';
import type { Messages } from '@mistralai/mistralai/models/components';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class MistralaiService {
  private readonly client = new MistralCore({ apiKey: environment.mistralaiApiKey });

  public sendMessages(messages: Messages[]): Observable<string> {
    return new Observable<string>(subscriber => {
      const abortController = new AbortController();

      chatComplete(this.client, {
        model: environment.mistralaiModel,
        messages,
        responseFormat: { type: 'json_object' },
        temperature: 0.2,
      }, {
        signal: abortController.signal,
      }).then(result => {
        if (!result.ok) {
          throw result.error;
        }

        const content = result.value.choices[0]?.message.content;
        subscriber.next(typeof content === 'string' ? content : '');
        subscriber.complete();
      }).catch(error => subscriber.error(error));

      return () => abortController.abort();
    });
  }
}

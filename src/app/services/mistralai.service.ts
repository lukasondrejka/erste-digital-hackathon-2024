import { Injectable } from '@angular/core';
import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionResponse } from "@mistralai/mistralai/models/components";

@Injectable({
  providedIn: 'root'
})
export class MistralaiService {
  private apiKey: string = 'Kd7LHVHCXMZHRuxcjQgz72F7UJikpo2W';
  private client: Mistral;

  constructor() {
    this.client = new Mistral({apiKey: this.apiKey});
  }

  async sendMessage(message: string): Promise<string> {
    const chatResponse: ChatCompletionResponse = await this.client.chat.complete({
      model: 'mistral-large-latest',
      messages: [
        { role: 'user', content: message }
      ],
    });

    return <string>chatResponse.choices?.[0]?.message?.content ?? '';
  }
}

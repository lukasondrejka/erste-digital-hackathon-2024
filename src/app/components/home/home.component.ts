import { Component } from '@angular/core';
import { MistralaiService } from "../../services/mistralai.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  chatResponse: string = '';

  constructor(
    private mistrallaiService: MistralaiService,
  ) {}

  async sendMessage(message: string) {
    const response =
      await this.mistrallaiService.sendMessage(message);
    this.chatResponse = <string>response;
  }

  async onSendMessage(message: string) {
    await this.sendMessage(message);
  }
}

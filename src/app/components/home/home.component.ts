import { Component } from '@angular/core';
import { MistralaiService } from "../../services/mistralai.service";
import { JsonDataServiceService } from "../../services/json-data-service.service";
import { Material } from "../../models/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  chatResponse: string = '';
  materials: Array<Material> = [];

  constructor(
    private router: Router,
  ) {}


  viewItemOverview(searchInput: string) {
    if (!searchInput) {
      return;
    }

    this.router.navigate(['/item', searchInput]);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Material } from "../models/material";
import { Item } from "../models/item";
import { MistralaiService } from "./mistralai.service";
import { JsonDataService } from "./json-data.service";
import { generatePrompt } from "../utils/generate-prompt";
import { parseResponse } from "../utils/parse-response";

@Injectable({
  providedIn: 'root'
})
export class ItemOverviewService {
  constructor(
    private jsonDataService: JsonDataService,
    private mistralaiService: MistralaiService
  ) {}

  getItemOverview(itemName: string): Observable<Item | null> {
    return new Observable<Item>(observer => {
      this.jsonDataService.getJsonData<Array<Material>>('materials').subscribe(materials => {
        this.mistralaiService.sendMessage(generatePrompt(itemName, materials)).subscribe(response => {
          const item = parseResponse(response, itemName, materials) || undefined;

          observer.next(item);
          observer.complete();
        });
      });
    });
  }
}

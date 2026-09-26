import { Injectable, inject } from '@angular/core';
import type { Messages } from '@mistralai/mistralai/models/components';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { Material } from '../models/material';
import { Item } from '../models/item';
import { MistralaiService } from './mistralai.service';
import { JsonDataService } from './json-data.service';

@Injectable({
  providedIn: 'root',
})
export class ItemOverviewService {
  private readonly jsonDataService = inject(JsonDataService);
  private readonly mistralaiService = inject(MistralaiService);

  // Materials are static, so load them once and share between requests
  private readonly materials$ = this.jsonDataService.getJsonData<Material[]>('materials').pipe(
    shareReplay(1),
  );

  public getItemOverview(itemName: string): Observable<Item | null> {
    return this.materials$.pipe(
      switchMap(materials => this.mistralaiService.sendMessages(generateMessages(itemName, materials)).pipe(
        map(response => parseResponse(response, itemName, materials)),
      )),
    );
  }
}

function generateMessages(itemName: string, availableMaterials: Material[]): Messages[] {
  const materials = availableMaterials.map(material => material.name).join(', ');

  const instructions = `
You help people declutter responsibly. For the item provided by the user, list the materials it is made of and suggest how to reuse or dispose of it.

Respond only with a JSON object matching this schema: { "materials": string[], "reuse": string[], "recycle": string[], "valuable": boolean }. Adhere strictly to this format.

Instructions:
- "materials": up to 6 materials the item is most likely made of, starting with the most prominent one.
- Use only material names from the list below, written exactly as they appear in the list.
- Avoid materials unlikely to be part of the item; it is better to list fewer materials than irrelevant ones.
- "reuse": short ways or places to reuse the item (e.g. "donate to charity shop", "sell second-hand").
- "recycle": short ways or places to dispose of the item, relevant to the identified materials (e.g. "glass container", "recycling center").
- "valuable": true if the item may have resale or collector value.
- If the input is not a physical item, return empty arrays and "valuable": false.

Materials to choose from: ${materials}

Example:
Input: mobile phone
Output: { "materials": ["Aluminum", "Plastic", "Glass", "Copper"], "reuse": ["sell second-hand", "donate to reuse center"], "recycle": ["electronic waste collection point"], "valuable": true }
  `.trim();

  return [
    { role: 'system', content: instructions },
    { role: 'user', content: itemName },
  ];
}

function parseResponse(response: string, name: string, availableMaterials: Material[]): Item | null {
  // Remove all characters before the first '{' and after the last '}'
  const formattedResponse = response.replace(/.*?({.*}).*/s, '$1');

  try {
    const json = JSON.parse(formattedResponse);

    if (!Array.isArray(json.materials)
      || !Array.isArray(json.reuse)
      || !Array.isArray(json.recycle)
      || typeof json.valuable !== 'boolean') {
      return null;
    }

    // Match case-insensitively and keep the order returned by the model (most prominent first)
    const materials = json.materials
      .map((materialName: unknown) => availableMaterials.find(
        material => material.name.toLowerCase() === String(materialName).toLowerCase(),
      ))
      .filter((material: Material | undefined, index: number, array: (Material | undefined)[]) =>
        material !== undefined && array.indexOf(material) === index,
      );

    return {
      name,
      materials,
      reuse: json.reuse,
      recycle: json.recycle,
      valuable: json.valuable,
    };
  } catch {
    return null;
  }
}

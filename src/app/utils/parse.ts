import {Item} from "../models/item";
import {Material} from "../models/material";

// Expected response format:
// { materials: string[], reuse: string[], recycle: string[], valuable: boolean }

function parseResponse(response: string, name: string, availableMaterials: Material[]): Item | null {
  const materials = availableMaterials.map(material => material.name);

  // Remove all characters before the first '{' and after the last '}'
  const formatedResponse = response.replace(/.*?({.*}).*/s, '$1');

  console.log(formatedResponse);

  try {
    const json = JSON.parse(<string><unknown>formatedResponse);

    if (!Array.isArray(json.materials)
        || !Array.isArray(json.reuse)
        || !Array.isArray(json.recycle)
        || typeof json.valuable !== 'boolean') {
      return null;
    }

    const item: Item = {} as Item;
    item.name = name;
    item.materials = availableMaterials.filter((material: Material) => json.materials.includes(material.name));
    item.recycle = json.recycle;
    item.reuse = json.reuse;
    item.valuable = json.valuable;

    return item;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { parseResponse };

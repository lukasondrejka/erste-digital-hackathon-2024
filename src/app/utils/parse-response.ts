import { Material } from "../models/material";
import { Item } from "../models/item";

function parseResponse(response: string, name: string, availableMaterials: Material[]): Item | null {
  // Remove all characters before the first '{' and after the last '}'
  const formatedResponse = response.replace(/.*?({.*}).*/s, '$1');

  try {
    const json = JSON.parse(<string><unknown>formatedResponse);

    if (!Array.isArray(json.materials)
      || !Array.isArray(json.reuse)
      || !Array.isArray(json.recycle)
      || typeof json.valuable !== 'boolean') {
      return null;
    }

    return {
      name: name,
      materials: availableMaterials.filter((material: Material) => json.materials.includes(material.name)),
      recycle: json.recycle,
      reuse: json.reuse,
      valuable: json.valuable
    };
  } catch (error) {
    return null;
  }
}

export { parseResponse };

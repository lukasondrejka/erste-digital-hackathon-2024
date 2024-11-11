import { Material } from "../models/material";

function generatePrompt(itemName: string, availableMaterials: Array<Material>): string {
  const materials = availableMaterials.map(material => material.name).join(', ');

  return `
Create a structured response listing the materials that make up the user-provided item, along with locations for reusing or recycling them. Respond only in JSON format.

Use this JSON schema for your response: { "materials": string[], "reuse": string[], "recycle": string[], "valuable": boolean }. Adhere strictly to this format.

Instructions:
- List up to 6 materials likely to be in the item, starting with the most prominent.
- Only list materials commonly found in the item (e.g., if the item is a wood table, list wood first).
- Avoid listing materials unlikely to be part of the item; it’s better to list fewer materials than irrelevant ones.
- Choose recycling and reuse options relevant to the materials identified.

Materials to choose from: ${materials}

Examples:

Input: "mobile phone"
Output: { "materials": ["metal", "plastic", "glass"], "reuse": ["reuse center"], "recycle": ["recycling center", "landfill"], "valuable": true }

Input: ${itemName}
Output:
  `;
}

export { generatePrompt };

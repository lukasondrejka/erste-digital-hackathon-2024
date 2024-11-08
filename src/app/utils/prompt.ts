function generatePrompt(itemName: string): string {
  return `
Your task is write which materials consist of user chosen item. and then when write where the materials can be recycled or disposed of.
You must always response in JSON format.
Example of JSON response with schema: { materials: string[], places: string[] }
Examples:

Input: bicycle
Output: { materials: ["metal", "rubber", "plastic"], places: ["recycling center", "landfill"] }

Input: plastic coca-cola bottle
Output: { materials: ["plastic"], places: ["recycling center"] }

Input: lawn mower
Output: { materials: ["metal", "plastic", "rubber"], places: ["recycling center", "landfill"] }

Input: ${itemName}
Output:
  `;
}

export { generatePrompt };

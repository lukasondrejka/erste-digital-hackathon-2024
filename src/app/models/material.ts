export type Impact = 'low' | 'medium' | 'high';

export interface Material {
  name: string;
  description: string;
  impact: Impact;
}

interface Material {
  name: string,
  description: string,
  impact: Impact,
}

type Impact = 'low' | 'medium' | 'high';

export type { Material, Impact };

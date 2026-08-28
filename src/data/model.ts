export type Owner = 'vendor' | 'user';
export type ModelId = 'onprem' | 'iaas' | 'paas' | 'saas';

export interface LayerDef {
  id: string;
  label: string;
  emoji: string;
  desc: string;
}

export interface ModelDef {
  id: ModelId;
  label: string;
  title: string;
  emoji: string;
  tagline: string;
  analogy: string;
  /** Which layers the vendor manages; the rest are the user's. */
  vendorLayers: string[];
}

export const LAYERS: LayerDef[] = [
  { id: 'data', label: 'Data & Content', emoji: '💾', desc: 'Your files, databases, secrets and photos.' },
  { id: 'app', label: 'Applications', emoji: '🍳', desc: 'The software you run — your recipes and code.' },
  { id: 'os', label: 'Operating System', emoji: '🪟', desc: 'Windows, Linux — the kitchen rules of the house.' },
  { id: 'virt', label: 'Virtualization', emoji: '🧱', desc: 'Slicing one big machine into many little ones.' },
  { id: 'server', label: 'Physical Servers', emoji: '🖥️', desc: 'The actual computers doing the heavy lifting.' },
  { id: 'storage', label: 'Storage & Hard Drives', emoji: '📀', desc: 'Where everything gets tucked away for later.' },
  { id: 'network', label: 'Networking', emoji: '🔌', desc: 'Cables, switches, wifi — how everything chats.' },
  { id: 'building', label: 'Building & Power', emoji: '🏢', desc: 'The walls, the roof, and the electricity.' },
];

export const MODELS: ModelDef[] = [
  {
    id: 'onprem',
    label: 'Home Cooking',
    title: 'On-Prem',
    emoji: '🏡',
    tagline: 'You own the whole kitchen — every pot, pan and power bill.',
    analogy:
      'Imagine cooking ugali at home. You buy the maize flour, own the stove, pay the electricity, wash the dishes, and the kitchen is literally your house. Everything — absolutely everything — is on your plate.',
    vendorLayers: [],
  },
  {
    id: 'iaas',
    label: 'Renting the Stove',
    title: 'IaaS',
    emoji: '🔥',
    tagline: 'You rent the building and the stove — you still cook and clean.',
    analogy:
      'Like renting a kitchen space in a shared building. The landlord gives you the building, power, servers and networking — the stove itself. But you still bring the recipe, install the OS, and cook the ugali your way.',
    vendorLayers: ['virt', 'server', 'storage', 'network', 'building'],
  },
  {
    id: 'paas',
    label: 'Renting the Kitchen',
    title: 'PaaS',
    emoji: '🍞',
    tagline: 'The kitchen comes pre-stocked — you just bring the recipe.',
    analogy:
      'Like renting a fully-stocked kibanda kitchen. The building, stove, gas, pots and even the cooking platform are ready. You only bring your recipe (your code) and the ingredients (your data) — then start cooking.',
    vendorLayers: ['os', 'virt', 'server', 'storage', 'network', 'building'],
  },
  {
    id: 'saas',
    label: 'Dining Out',
    title: 'SaaS',
    emoji: '🍽️',
    tagline: 'Someone else cooks, serves and cleans. You just eat.',
    analogy:
      'Like eating at a restaurant or a kibanda. You do not cook, you do not clean, you do not own the stove. You just order, eat the ugali, and pay the bill. The vendor handles the entire kitchen behind the scenes.',
    vendorLayers: ['app', 'os', 'virt', 'server', 'storage', 'network', 'building'],
  },
];

export function ownerOf(model: ModelDef, layerId: string): Owner {
  return model.vendorLayers.includes(layerId) ? 'vendor' : 'user';
}

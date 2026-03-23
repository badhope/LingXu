import type { ModuleConfig } from './modules';

export interface NavItem {
  label: string;
  href: string;
  description: string;
  moduleId?: string;
}

export const getNavItems = (modules: ModuleConfig[]): NavItem[] => {
  return modules.map(m => ({
    label: m.name,
    href: m.href,
    description: m.description,
    moduleId: m.id,
  }));
};

export const NAV_ITEMS_V2: NavItem[] = [
  { label: '天时', href: '/tian', description: '天道运行，星辰变化', moduleId: 'tian' },
  { label: '地理', href: '/di', description: '山川地理，风水堪舆', moduleId: 'di' },
  { label: '玄学', href: '/xuan', description: '易经八卦，符箓命理', moduleId: 'xuan' },
  { label: '历史', href: '/huang', description: '千古兴亡，秘辛档案', moduleId: 'huang' },
  { label: '空间', href: '/yu', description: '万界苍茫，空间层次', moduleId: 'yu' },
  { label: '时间', href: '/zhou', description: '时间长河，轮回因果', moduleId: 'zhou' },
  { label: '洪荒', href: '/hong', description: '神怪异兽，洪荒神话', moduleId: 'hong' },
  { label: '失落', href: '/huang-lost', description: '失传秘术，失落文明', moduleId: 'huang-lost' },
];

export const SECTION_COLORS_V2 = {
  tian: {
    primary: '#f0c040',
    gradient: 'from-[#f0c040]/[0.08] to-amber-900/10',
    border: 'border-[#f0c040]/30',
    hover: 'hover:border-[#f0c040]/60',
    text: 'text-[#f0c040]',
  },
  di: {
    primary: '#40b040',
    gradient: 'from-[#40b040]/[0.08] to-green-900/10',
    border: 'border-[#40b040]/30',
    hover: 'hover:border-[#40b040]/60',
    text: 'text-[#40b040]',
  },
  xuan: {
    primary: '#8040f0',
    gradient: 'from-[#8040f0]/[0.08] to-purple-900/10',
    border: 'border-[#8040f0]/30',
    hover: 'hover:border-[#8040f0]/60',
    text: 'text-[#8040f0]',
  },
  huang: {
    primary: '#c08040',
    gradient: 'from-[#c08040]/[0.08] to-orange-900/10',
    border: 'border-[#c08040]/30',
    hover: 'hover:border-[#c08040]/60',
    text: 'text-[#c08040]',
  },
  yu: {
    primary: '#4080f0',
    gradient: 'from-[#4080f0]/[0.08] to-blue-900/10',
    border: 'border-[#4080f0]/30',
    hover: 'hover:border-[#4080f0]/60',
    text: 'text-[#4080f0]',
  },
  zhou: {
    primary: '#f04080',
    gradient: 'from-[#f04080]/[0.08] to-pink-900/10',
    border: 'border-[#f04080]/30',
    hover: 'hover:border-[#f04080]/60',
    text: 'text-[#f04080]',
  },
  hong: {
    primary: '#f06040',
    gradient: 'from-[#f06040]/[0.08] to-red-900/10',
    border: 'border-[#f06040]/30',
    hover: 'hover:border-[#f06040]/60',
    text: 'text-[#f06040]',
  },
  'huang-lost': {
    primary: '#806040',
    gradient: 'from-[#806040]/[0.08] to-yellow-900/10',
    border: 'border-[#806040]/30',
    hover: 'hover:border-[#806040]/60',
    text: 'text-[#806040]',
  },
};

export const LEGACY_NAV_ITEMS = [
  { label: '档案馆', href: '/archive', description: '末法时代的文明碎片' },
  { label: '典籍', href: '/medicine', description: '身心修炼的古老智慧' },
  { label: '神话', href: '/myth', description: '失落时代的神怪记载' },
  { label: '法门', href: '/dharma', description: '佛道两家的修行传承' },
  { label: '境界', href: '/realms', description: '从炼气到化神的阶梯' },
];

export const LEGACY_SECTION_COLORS = {
  archive: {
    primary: 'gold',
    gradient: 'from-[#c9a227]/[0.08] to-amber-900/10',
    border: 'border-[#c9a227]/30',
    hover: 'hover:border-[#d4af37]/60',
    text: 'text-[#d4af37]',
  },
  medicine: {
    primary: 'jade',
    gradient: 'from-[#2d8a8a]/[0.08] to-teal-900/10',
    border: 'border-[#2d8a8a]/30',
    hover: 'hover:border-[#5ababa]/60',
    text: 'text-[#5ababa]',
  },
  myth: {
    primary: 'amethyst',
    gradient: 'from-[#6b4a8a]/[0.08] to-purple-900/10',
    border: 'border-[#6b4a8a]/30',
    hover: 'hover:border-[#a878b8]/60',
    text: 'text-[#a878b8]',
  },
  dharma: {
    primary: 'sapphire',
    gradient: 'from-[#2d4a6b]/[0.08] to-blue-900/10',
    border: 'border-[#2d4a6b]/30',
    hover: 'hover:border-[#6b9ad4]/60',
    text: 'text-[#6b9ad4]',
  },
  realms: {
    primary: 'ochre',
    gradient: 'from-[#8a4a2d]/[0.08] to-orange-900/10',
    border: 'border-[#8a4a2d]/30',
    hover: 'hover:border-[#ba7a5a]/60',
    text: 'text-[#ba7a5a]',
  },
};

export const HERBS = [
  { id: 'renshen', name: '人参', tier: '上品', element: '土', effect: '大补元气', rarity: 5 },
  { id: 'fuling', name: '茯苓', tier: '上品', element: '土', effect: '安神健脾', rarity: 3 },
  { id: 'huangqi', name: '黄芪', tier: '上品', element: '土', effect: '补气升阳', rarity: 3 },
  { id: 'danggui', name: '当归', tier: '中品', element: '火', effect: '补血活血', rarity: 2 },
  { id: 'chuanxiong', name: '川芎', tier: '中品', element: '木', effect: '活血行气', rarity: 2 },
  { id: 'shudi', name: '地黄', tier: '上品', element: '水', effect: '滋阴补血', rarity: 4 },
  { id: 'tiandong', name: '天冬', tier: '上品', element: '水', effect: '滋阴润燥', rarity: 3 },
  { id: 'maidong', name: '麦冬', tier: '上品', element: '金', effect: '润肺清心', rarity: 3 },
  { id: 'wuzhizi', name: '五味子', tier: '上品', element: '金', effect: '收敛固涩', rarity: 4 },
  { id: 'rougui', name: '肉桂', tier: '中品', element: '火', effect: '补火助阳', rarity: 3 },
  { id: 'gancao', name: '甘草', tier: '上品', element: '土', effect: '调和诸药', rarity: 2 },
  { id: 'baizhu', name: '白术', tier: '上品', element: '土', effect: '健脾益气', rarity: 2 },
]

export const ELIXIRS = [
  {
    id: 'wuhou',
    name: '武侯行军散',
    tier: '凡丹',
    effect: '提神醒脑，行军不倦',
    requiredHerbs: ['fuling', 'gancao', 'baizhu'],
    fireTime: 30,
    fireLevel: '文火',
  },
  {
    id: 'buzhong',
    name: '补中益气丹',
    tier: '凡丹',
    effect: '大补元气，强身健体',
    requiredHerbs: ['renshen', 'huangqi', 'gancao', 'baizhu'],
    fireTime: 60,
    fireLevel: '文火',
  },
  {
    id: 'siwu',
    name: '四物汤丹',
    tier: '地丹',
    effect: '补血调经，滋养容颜',
    requiredHerbs: ['danggui', 'chuanxiong', 'shudi', 'baizhu'],
    fireTime: 90,
    fireLevel: '武火',
  },
  {
    id: 'ziyin',
    name: '滋阴补心丹',
    tier: '地丹',
    effect: '滋阴养血，补心安神',
    requiredHerbs: ['tiandong', 'maidong', 'wuzhizi', 'shudi'],
    fireTime: 120,
    fireLevel: '文武火',
  },
  {
    id: 'jiuzhuan',
    name: '九转还丹',
    tier: '天丹',
    effect: '脱胎换骨，延年益寿',
    requiredHerbs: ['renshen', 'shudi', 'tiandong', 'rougui', 'wuzhizi', 'fuling'],
    fireTime: 180,
    fireLevel: '三昧真火',
  },
  {
    id: 'jinye',
    name: '金液还丹',
    tier: '仙丹',
    effect: '形神俱妙，与道合真',
    requiredHerbs: ['renshen', 'shudi', 'tiandong', 'maidong', 'wuzhizi', 'fuling', 'rougui', 'huangqi'],
    fireTime: 300,
    fireLevel: '先天真火',
  },
]

export const FIRE_LEVELS = [
  { id: 'wen', name: '文火', temp: 80, color: '#fbbf24', note: '温和滋养' },
  { id: 'wu', name: '武火', temp: 150, color: '#f59e0b', note: '猛烈精炼' },
  { id: 'wenwu', name: '文武火', temp: 120, color: '#d97706', note: '刚柔并济' },
  { id: 'sanmei', name: '三昧真火', temp: 360, color: '#ef4444', note: '精气神合一' },
  { id: 'xiantian', name: '先天真火', temp: 999, color: '#b91c1c', note: '道生一，一生二' },
]

export const LIANDAN_MANUAL = {
  title: '周易参同契',
  history: '魏伯阳著《参同契》，为万古丹经王。以易象喻丹道，火候进退，药物老嫩，皆在其中。修仙之径，不外金丹大道',
  principles: [
    '药物为基，火候为要',
    '文火养性，武火炼命',
    '铅汞交媾，龙虎相吞',
    '百日筑基，十月怀胎',
  ],
  classics: [
    '一孔玄关窍，乾坤共合成',
    '圣人传药不传火，从来火候少人知',
    '气是添年药，心为使气神',
  ],
}

export const REFINEMENT_STAGES = [
  { stage: 0, name: '未启', note: '丹炉未启' },
  { stage: 1, name: '筑基', note: '安炉立鼎' },
  { stage: 2, name: '采药', note: '采药入炉' },
  { stage: 3, name: '起火', note: '巽风鼓橐' },
  { stage: 4, name: '炼己', note: '锻炼阴质' },
  { stage: 5, name: '结丹', note: '圣胎凝结' },
  { stage: 6, name: '温养', note: '乳哺三年' },
  { stage: 7, name: '脱胎', note: '丹成九转' },
]

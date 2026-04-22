export interface Position {
  x: number
  y: number
}

export interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  alpha: number
}

export type FiveElement = '金' | '木' | '水' | '火' | '土'

export const ELEMENT_COLORS: Record<FiveElement, string> = {
  '金': '#fbbf24',
  '木': '#22c55e',
  '水': '#3b82f6',
  '火': '#ef4444',
  '土': '#a855f7',
}

export const DIRECTIONS = ['正北', '东北', '正东', '东南', '正南', '西南', '正西', '西北']

export interface ShiChenBase {
  name: string
  alias: string
  startHour: number
  endHour: number
  baseAura: number
  fiveElement: FiveElement
  direction: string
  organ: string
  practiceTips: string
}

export const SHI_CHENS: ShiChenBase[] = [
  { name: '子时', alias: '夜半', startHour: 23, endHour: 1, baseAura: 100, fiveElement: '水', direction: '正北', organ: '胆', practiceTips: '一阳初生，静坐养神，阳气萌动之时，宜炼精化气' },
  { name: '丑时', alias: '鸡鸣', startHour: 1, endHour: 3, baseAura: 85, fiveElement: '土', direction: '东北', organ: '肝', practiceTips: '养肝血，宜熟睡，魂藏于肝，无梦最妙' },
  { name: '寅时', alias: '平旦', startHour: 3, endHour: 5, baseAura: 90, fiveElement: '木', direction: '东北', organ: '肺', practiceTips: '肺朝百脉，宜深度睡眠，精气运行之时' },
  { name: '卯时', alias: '日出', startHour: 5, endHour: 7, baseAura: 75, fiveElement: '木', direction: '正东', organ: '大肠', practiceTips: '宜起床排便，喝温水，阳气升发' },
  { name: '辰时', alias: '食时', startHour: 7, endHour: 9, baseAura: 70, fiveElement: '土', direction: '东南', organ: '胃', practiceTips: '吃早餐，养胃气，一日之计在于晨' },
  { name: '巳时', alias: '隅中', startHour: 9, endHour: 11, baseAura: 65, fiveElement: '火', direction: '东南', organ: '脾', practiceTips: '脾主运化，宜工作学习，效率最高' },
  { name: '午时', alias: '日中', startHour: 11, endHour: 13, baseAura: 95, fiveElement: '火', direction: '正南', organ: '心', practiceTips: '一阴初生，宜午休片刻，养心气' },
  { name: '未时', alias: '日昳', startHour: 13, endHour: 15, baseAura: 60, fiveElement: '土', direction: '西南', organ: '小肠', practiceTips: '小肠主吸收，营养运化之时' },
  { name: '申时', alias: '哺时', startHour: 15, endHour: 17, baseAura: 70, fiveElement: '金', direction: '西南', organ: '膀胱', practiceTips: '膀胱经旺，宜运动锻炼，排毒最好时机' },
  { name: '酉时', alias: '日入', startHour: 17, endHour: 19, baseAura: 80, fiveElement: '金', direction: '正西', organ: '肾', practiceTips: '肾经旺，宜静养，藏精气之时' },
  { name: '戌时', alias: '黄昏', startHour: 19, endHour: 21, baseAura: 85, fiveElement: '土', direction: '西北', organ: '心包', practiceTips: '心包经旺，宜放松娱乐，喜乐出焉' },
  { name: '亥时', alias: '人定', startHour: 21, endHour: 23, baseAura: 95, fiveElement: '水', direction: '西北', organ: '三焦', practiceTips: '三焦通百脉，宜入睡，百脉皆得休养' },
]

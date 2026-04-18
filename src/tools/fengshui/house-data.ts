export interface RoomPosition {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  type: 'bedroom' | 'living' | 'kitchen' | 'bathroom' | 'study' | 'door' | 'window'
  fengshuiScore: number
  remarks: string[]
}

export interface FengshuiRule {
  id: string
  name: string
  description: string
  severity: 'good' | 'bad' | 'neutral'
  points: number
}

export const HOUSE_TEMPLATES = [
  {
    id: 'studio',
    name: '一室一厅',
    description: '40-60㎡ 单身公寓',
    baseRooms: [
      { id: 'living', name: '客厅', x: 20, y: 20, width: 40, height: 35, type: 'living' as const },
      { id: 'bedroom', name: '卧室', x: 20, y: 60, width: 35, height: 35, type: 'bedroom' as const },
      { id: 'kitchen', name: '厨房', x: 65, y: 60, width: 15, height: 20, type: 'kitchen' as const },
      { id: 'bathroom', name: '卫生间', x: 65, y: 85, width: 15, height: 15, type: 'bathroom' as const },
    ]
  },
  {
    id: 'two_rooms',
    name: '两室一厅',
    description: '70-90㎡ 标准户型',
    baseRooms: [
      { id: 'living', name: '客厅', x: 15, y: 15, width: 45, height: 30, type: 'living' as const },
      { id: 'bedroom1', name: '主卧', x: 15, y: 50, width: 30, height: 30, type: 'bedroom' as const },
      { id: 'bedroom2', name: '次卧', x: 50, y: 50, width: 25, height: 30, type: 'bedroom' as const },
      { id: 'kitchen', name: '厨房', x: 15, y: 85, width: 25, height: 15, type: 'kitchen' as const },
      { id: 'bathroom', name: '卫生间', x: 45, y: 85, width: 15, height: 15, type: 'bathroom' as const },
      { id: 'study', name: '书房', x: 65, y: 15, width: 20, height: 30, type: 'study' as const },
    ]
  },
  {
    id: 'three_rooms',
    name: '三室两厅',
    description: '100-140㎡ 改善型',
    baseRooms: [
      { id: 'living', name: '客厅', x: 10, y: 10, width: 50, height: 35, type: 'living' as const },
      { id: 'bedroom1', name: '主卧', x: 10, y: 50, width: 28, height: 30, type: 'bedroom' as const },
      { id: 'bedroom2', name: '次卧', x: 42, y: 50, width: 20, height: 25, type: 'bedroom' as const },
      { id: 'study', name: '书房', x: 65, y: 50, width: 18, height: 25, type: 'study' as const },
      { id: 'kitchen', name: '厨房', x: 65, y: 10, width: 18, height: 25, type: 'kitchen' as const },
      { id: 'bathroom1', name: '主卫', x: 10, y: 85, width: 15, height: 15, type: 'bathroom' as const },
      { id: 'bathroom2', name: '客卫', x: 30, y: 85, width: 15, height: 15, type: 'bathroom' as const },
    ]
  }
]

export const FENGSHUI_RULES: FengshuiRule[] = [
  { id: 'door_direct', name: '门冲', description: '大门正对卧室门，财运外泄', severity: 'bad', points: -15 },
  { id: 'kitchen_door', name: '厨门相对', description: '厨房正对卫生间，水火相冲', severity: 'bad', points: -20 },
  { id: 'bed_location', name: '床头靠实', description: '床头靠墙，有靠山吉', severity: 'good', points: 10 },
  { id: 'window_location', name: '窗在南方', description: '南向开窗，采光充足', severity: 'good', points: 8 },
  { id: 'center_empty', name: '中宫宜空', description: '房屋中心不宜有卫生间', severity: 'bad', points: -25 },
  { id: 'living_size', name: '明堂开阔', description: '客厅方正宽敞为吉', severity: 'good', points: 12 },
  { id: 'study_light', name: '文昌位', description: '书房在东南位利学业', severity: 'good', points: 10 },
  { id: 'stove_direction', name: '灶坐吉方', description: '厨房炉灶坐东向西为吉', severity: 'good', points: 8 },
]

export const DIRECTIONS = [
  { id: 'north', name: '正北', angle: 0, element: '水', color: '#1e3a5f' },
  { id: 'northeast', name: '东北', angle: 45, element: '土', color: '#8b7355' },
  { id: 'east', name: '正东', angle: 90, element: '木', color: '#2d5a27' },
  { id: 'southeast', name: '东南', angle: 135, element: '木', color: '#3d7a37' },
  { id: 'south', name: '正南', angle: 180, element: '火', color: '#8b2500' },
  { id: 'southwest', name: '西南', angle: 225, element: '土', color: '#9b8365' },
  { id: 'west', name: '正西', angle: 270, element: '金', color: '#c0c0c0' },
  { id: 'northwest', name: '西北', angle: 315, element: '金', color: '#b0b0b0' },
]

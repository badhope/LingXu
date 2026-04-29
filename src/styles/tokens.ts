// ============================================
// 灵墟设计系统 - Design Tokens v3.0 企业级
// ============================================
// 完整企业级设计系统：色板/字体/间距/圆角/阴影/断点/层级/动画/渐变
// JS/TS/SCSS 同源，一处定义处处使用
// 参考：Ant Design + Tailwind CSS
// ============================================

// =============== 基础色板 (24色完整色板) ===============
export const COLORS = {
  // 主色系列 - 蓝紫色调
  purple50: '#faf5ff',
  purple100: '#f3e8ff',
  purple200: '#e9d5ff',
  purple300: '#d8b4fe',
  purple400: '#c084fc',
  purple500: '#a855f7',
  purple600: '#9333ea',
  purple700: '#7c3aed',
  purple800: '#6b21a8',
  purple900: '#581c87',
  purple: '#a855f7',
  purpleRgb: '168, 85, 247',
  
  // 金色系列
  gold50: '#fffbeb',
  gold100: '#fef3c7',
  gold200: '#fde68a',
  gold300: '#fcd34d',
  gold400: '#fbbf24',
  gold500: '#f59e0b',
  gold: '#fbbf24',
  goldRgb: '251, 191, 36',
  
  // 红色系列
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red: '#ef4444',
  redRgb: '239, 68, 68',
  
  // 绿色系列
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green: '#22c55e',
  greenRgb: '34, 197, 94',
  
  // 蓝色系列
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue: '#3b82f6',
  blueRgb: '59, 130, 246',
  
  // 青色系列
  cyan50: '#ecfeff',
  cyan100: '#cffafe',
  cyan200: '#a5f3fc',
  cyan300: '#67e8f9',
  cyan400: '#22d3ee',
  cyan500: '#06b6d4',
  cyan: '#06b6d4',
  cyanRgb: '6, 182, 212',
  
  // 橙色系列
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange: '#f97316',
  orangeRgb: '249, 115, 22',
  
  // 粉色系列
  pink50: '#fdf2f8',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink400: '#f472b6',
  pink500: '#ec4899',
  pink: '#ec4899',
  pinkRgb: '236, 72, 153',
  
  // 靛蓝系列
  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  indigo200: '#c7d2fe',
  indigo300: '#a5b4fc',
  indigo400: '#818cf8',
  indigo500: '#6366f1',
  indigo: '#6366f1',
  indigoRgb: '99, 102, 241',
  
  // 蓝绿系列
  teal50: '#f0fdfa',
  teal100: '#ccfbf1',
  teal200: '#99f6e4',
  teal300: '#5eead4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  teal: '#14b8a6',
  tealRgb: '20, 184, 166',

  lime: '#84cc16',
  limeRgb: '132, 204, 22',
  amber: '#d97706',
  amberRgb: '217, 119, 6',
  zhou: '#14b8a6',
  
  // 中性灰系列
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  bg: {
    card: 'rgba(255, 255, 255, 0.55)',
    dark: 'rgba(255, 255, 255, 0.7)',
    glass: 'rgba(255, 255, 255, 0.45)',
    overlay: 'rgba(248, 241, 229, 0.85)',
  },

  border: {
    light: 'rgba(139, 105, 20, 0.08)',
    medium: 'rgba(139, 105, 20, 0.12)',
    strong: 'rgba(139, 105, 20, 0.18)',
  },

  text: {
    primary: 'rgba(61, 53, 43, 0.95)',
    secondary: 'rgba(74, 64, 53, 0.75)',
    muted: 'rgba(92, 82, 69, 0.6)',
    disabled: 'rgba(92, 82, 69, 0.35)',
  }
} as const

// =============== 页面主题色映射 ===============
export const PAGE_THEMES = {
  hong: { color: COLORS.purple, rgb: COLORS.purpleRgb, name: '鸿蒙' },
  huang: { color: COLORS.gold, rgb: COLORS.goldRgb, name: '洪荒' },
  huang2: { color: COLORS.amber, rgb: '217, 119, 6', name: '荒古' },
  xuan: { color: COLORS.cyan, rgb: COLORS.cyanRgb, name: '玄学' },
  tian: { color: COLORS.blue, rgb: COLORS.blueRgb, name: '天机' },
  di: { color: COLORS.orange, rgb: COLORS.orangeRgb, name: '地理' },
  ren: { color: COLORS.green, rgb: COLORS.greenRgb, name: '人路' },
  yu: { color: COLORS.indigo, rgb: COLORS.indigoRgb, name: '宇宙' },
  zhou: { color: COLORS.zhou, rgb: '20, 184, 166', name: '周天' },
  ming: { color: COLORS.pink, rgb: COLORS.pinkRgb, name: '命运' },
  lishi: { color: COLORS.lime, rgb: '132, 204, 22', name: '历史' },
} as const

// =============== 五行专用色 ===============
export const WUXING_COLORS = {
  金: COLORS.gold,
  木: COLORS.green,
  水: COLORS.blue,
  火: COLORS.red,
  土: COLORS.orange,
} as const

// =============== 品阶颜色系统 ===============
export const TIER_COLORS = {
  凡: COLORS.gray400,
  灵: COLORS.green,
  仙: COLORS.blue,
  神: COLORS.purple,
  圣: COLORS.gold,
  天: COLORS.red,
  道: COLORS.pink,
} as const

// =============== 字体系统 ===============
export const FONT = {
  family: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: '"Noto Serif SC", "Songti SC", Georgia, serif',
    mono: '"Roboto Mono", "Fira Code", Consolas, monospace',
  },
  size: {
    xs: '0.9rem',
    sm: '1.05rem',
    base: '1.2rem',
    lg: '1.35rem',
    xl: '1.5rem',
    '2xl': '1.8rem',
    '3xl': '2.25rem',
    '4xl': '2.7rem',
    '5xl': '3.6rem',
    '6xl': '4.5rem',
  },
  weight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const

// =============== 间距系统 (13级) ===============
export const SPACING = {
  '0': '0',
  px: '1px',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  '6xl': '4rem',
  section: '4rem',
} as const

// =============== 圆角系统 (7级) ===============
export const RADIUS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const

// =============== 阴影系统 ===============
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  card: '0 4px 20px rgba(0, 0, 0, 0.3)',
  cardLg: '0 8px 30px rgba(0, 0, 0, 0.4)',
  glow: (color: string, intensity = 0.3) => 
    `0 0 30px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
  glowStrong: (color: string) => 
    `0 0 60px ${color}50, 0 0 120px ${color}25`,
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const

// =============== 断点系统 ===============
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// =============== Z-Index 层级系统 ===============
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  drawerBackdrop: 1040,
  drawer: 1050,
  modalBackdrop: 1060,
  modal: 1070,
  popover: 1080,
  tooltip: 1090,
  toast: 1100,
} as const

// =============== 动画系统 ===============
export const ANIMATION = {
  stagger: 0.07,
  duration: {
    instant: 0.075,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  hover: {
    scale: 1.015,
    y: -3,
    x: 4,
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
} as const

// =============== 预设渐变 ===============
export const GRADIENTS = {
  purple: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
  gold: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)',
  cyan: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const

// =============== 标准卡片样式 ===============
export const cardBaseStyle = (color = COLORS.purple) => ({
  padding: SPACING.xl,
  borderRadius: RADIUS.xl,
  background: `linear-gradient(135deg, ${color}10, ${COLORS.bg.card})`,
  border: `1px solid ${color}30`,
  backdropFilter: 'blur(10px)',
  boxShadow: SHADOWS.card,
})

// =============== 标准按钮样式 ===============
export const buttonBaseStyle = (color = COLORS.purple) => ({
  padding: `${SPACING.md} ${SPACING.lg}`,
  borderRadius: RADIUS.lg,
  background: `${color}20`,
  border: `1px solid ${color}40`,
  color: color,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    background: `${color}30`,
    transform: 'translateY(-2px)',
  },
})

// =============== 标准标题样式 ===============
export const titleStyle = {
  fontSize: FONT.size['2xl'],
  fontWeight: FONT.weight.bold,
  marginBottom: SPACING.lg,
} as const

// =============== 样式工具函数 ===============
export const alpha = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const a = Math.round(amount * 255).toString(16).padStart(2, '0')
  return `${color}${a}`
}

export const rgb = (r: number, g: number, b: number, a = 1) => 
  `rgba(${r}, ${g}, ${b}, ${a})`

export const px = (value: number) => `${value}px`
export const rem = (value: number) => `${value / 16}rem`

export const percent = (value: number) => `${value}%`

// =============== 媒体查询工具 ===============
export const media = {
  sm: `@media (min-width: ${BREAKPOINTS.sm})`,
  md: `@media (min-width: ${BREAKPOINTS.md})`,
  lg: `@media (min-width: ${BREAKPOINTS.lg})`,
  xl: `@media (min-width: ${BREAKPOINTS.xl})`,
  '2xl': `@media (min-width: ${BREAKPOINTS['2xl']})`,
} as const

// =============== SCSS 导出桥接 ===============
export const SCSS_TOKENS = `
$colors-purple: ${COLORS.purple};
$colors-gold: ${COLORS.gold};
$colors-red: ${COLORS.red};
$colors-green: ${COLORS.green};
$colors-blue: ${COLORS.blue};
$colors-cyan: ${COLORS.cyan};
$colors-orange: ${COLORS.orange};
$colors-pink: ${COLORS.pink};
$colors-indigo: ${COLORS.indigo};
$colors-teal: ${COLORS.teal};

$spacing-xs: ${SPACING.xs};
$spacing-sm: ${SPACING.sm};
$spacing-md: ${SPACING.md};
$spacing-lg: ${SPACING.lg};
$spacing-xl: ${SPACING.xl};
$spacing-2xl: ${SPACING['2xl']};
$spacing-3xl: ${SPACING['3xl']};

$radius-sm: ${RADIUS.sm};
$radius-md: ${RADIUS.md};
$radius-lg: ${RADIUS.lg};
$radius-xl: ${RADIUS.xl};
$radius-2xl: ${RADIUS['2xl']};

$breakpoint-sm: ${BREAKPOINTS.sm};
$breakpoint-md: ${BREAKPOINTS.md};
$breakpoint-lg: ${BREAKPOINTS.lg};
$breakpoint-xl: ${BREAKPOINTS.xl};

$z-dropdown: ${Z_INDEX.dropdown};
$z-sticky: ${Z_INDEX.sticky};
$z-fixed: ${Z_INDEX.fixed};
$z-modal: ${Z_INDEX.modal};
$z-tooltip: ${Z_INDEX.tooltip};
$z-toast: ${Z_INDEX.toast};

$animation-fast: ${ANIMATION.duration.fast}s;
$animation-normal: ${ANIMATION.duration.normal}s;
$animation-slow: ${ANIMATION.duration.slow}s;
`

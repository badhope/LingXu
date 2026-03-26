/**
 * 灵墟 - 统一动画配置系统
 * Unified Animation Configuration System
 * 
 * 本文件定义了全站动画的统一配置，确保视觉一致性和流畅体验
 * This file defines unified animation configurations for consistent visual experience
 */

// 动画时长配置 (毫秒)
export const DURATIONS = {
  // 快速交互 (按钮hover、点击反馈)
  fast: 150,
  // 标准过渡 (卡片悬浮、菜单展开)
  normal: 300,
  // 页面切换 (路由跳转)
  page: 600,
  // 入场动画 (元素首次显示)
  enter: 800,
  // 复杂动画 (粒子、流动效果)
  complex: 1200,
  // 史诗级动画 (传送门、全屏效果)
  epic: 2000,
} as const;

// 缓动函数配置
export const EASINGS = {
  // 标准缓动 - 大多数UI元素
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // 入场缓动 - 元素进入视野
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  // 出场缓动 - 元素离开视野
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  // 弹性缓动 - 强调交互
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  // 平滑缓动 - 流畅过渡
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  // 神秘缓动 - 特殊效果
  mystical: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// 页面过渡动画类型
export type TransitionType = 
  | 'fade'           // 淡入淡出
  | 'slide-up'       // 上滑
  | 'slide-down'     // 下滑
  | 'slide-left'     // 左滑
  | 'slide-right'    // 右滑
  | 'zoom'           // 缩放
  | 'portal'         // 传送门效果
  | 'dissolve'       // 溶解
  | 'shatter'        // 碎裂
  | 'ripple'         // 涟漪
  | 'vortex'         // 漩涡
  | 'revelation';    // 启示录

// 页面过渡配置
export interface PageTransitionConfig {
  type: TransitionType;
  duration: number;
  easing: string;
  delay?: number;
}

// 预设页面过渡
export const PAGE_TRANSITIONS: Record<string, PageTransitionConfig> = {
  // 默认淡入淡出
  default: {
    type: 'fade',
    duration: DURATIONS.page,
    easing: EASINGS.standard,
  },
  // 进入模块页面
  moduleEnter: {
    type: 'portal',
    duration: DURATIONS.epic,
    easing: EASINGS.mystical,
  },
  // 退出模块页面
  moduleExit: {
    type: 'dissolve',
    duration: DURATIONS.page,
    easing: EASINGS.exit,
  },
  // 子页面进入
  subPageEnter: {
    type: 'slide-up',
    duration: DURATIONS.normal,
    easing: EASINGS.enter,
  },
  // 返回上级
  backNavigate: {
    type: 'slide-right',
    duration: DURATIONS.normal,
    easing: EASINGS.exit,
  },
  // 首次加载
  initialLoad: {
    type: 'revelation',
    duration: DURATIONS.epic,
    easing: EASINGS.mystical,
    delay: 300,
  },
};

// 模块专属颜色主题
export const MODULE_THEMES = {
  tian: {
    primary: '#f0c040',
    gradient: 'radial-gradient(ellipse at top, rgba(240,192,64,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(240, 192, 64, 0.6)',
    glowColor: 'rgba(240, 192, 64, 0.4)',
  },
  di: {
    primary: '#40b040',
    gradient: 'radial-gradient(ellipse at bottom, rgba(64,176,64,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(64, 176, 64, 0.6)',
    glowColor: 'rgba(64, 176, 64, 0.4)',
  },
  xuan: {
    primary: '#8040f0',
    gradient: 'radial-gradient(ellipse at center, rgba(128,64,240,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(128, 64, 240, 0.6)',
    glowColor: 'rgba(128, 64, 240, 0.4)',
  },
  huang: {
    primary: '#c08040',
    gradient: 'radial-gradient(ellipse at center, rgba(192,128,64,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(192, 128, 64, 0.6)',
    glowColor: 'rgba(192, 128, 64, 0.4)',
  },
  yu: {
    primary: '#4080f0',
    gradient: 'radial-gradient(ellipse at center, rgba(64,128,240,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(64, 128, 240, 0.6)',
    glowColor: 'rgba(64, 128, 240, 0.4)',
  },
  zhou: {
    primary: '#f04080',
    gradient: 'radial-gradient(ellipse at center, rgba(240,64,128,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(240, 64, 128, 0.6)',
    glowColor: 'rgba(240, 64, 128, 0.4)',
  },
  hong: {
    primary: '#f06040',
    gradient: 'radial-gradient(ellipse at center, rgba(240,96,64,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(240, 96, 64, 0.6)',
    glowColor: 'rgba(240, 96, 64, 0.4)',
  },
  'huang-lost': {
    primary: '#806040',
    gradient: 'radial-gradient(ellipse at center, rgba(128,96,64,0.15) 0%, transparent 60%)',
    particleColor: 'rgba(128, 96, 64, 0.6)',
    glowColor: 'rgba(128, 96, 64, 0.4)',
  },
} as const;

// 元素入场动画序列
export interface StaggerConfig {
  // 每个元素的延迟增量
  increment: number;
  // 初始延迟
  initialDelay: number;
  // 动画时长
  duration: number;
  // 缓动函数
  easing: string;
  // 动画方向
  direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
}

export const STAGGER_CONFIGS: Record<string, StaggerConfig> = {
  // 卡片网格动画
  cardGrid: {
    increment: 80,
    initialDelay: 100,
    duration: DURATIONS.normal,
    easing: EASINGS.enter,
    direction: 'up',
  },
  // 列表项动画
  listItems: {
    increment: 50,
    initialDelay: 50,
    duration: DURATIONS.fast,
    easing: EASINGS.standard,
    direction: 'fade',
  },
  // 导航链接动画
  navLinks: {
    increment: 30,
    initialDelay: 0,
    duration: DURATIONS.fast,
    easing: EASINGS.standard,
    direction: 'left',
  },
  // 章节内容动画
  sectionContent: {
    increment: 100,
    initialDelay: 200,
    duration: DURATIONS.normal,
    easing: EASINGS.smooth,
    direction: 'up',
  },
};

// 悬浮效果配置
export interface HoverEffectConfig {
  // 位移量
  translateY: number;
  // 缩放比例
  scale: number;
  // 阴影扩散
  shadowSpread: number;
  // 发光强度
  glowIntensity: number;
}

export const HOVER_EFFECTS: Record<string, HoverEffectConfig> = {
  card: {
    translateY: -8,
    scale: 1.02,
    shadowSpread: 30,
    glowIntensity: 0.3,
  },
  button: {
    translateY: -2,
    scale: 1.05,
    shadowSpread: 15,
    glowIntensity: 0.4,
  },
  icon: {
    translateY: 0,
    scale: 1.15,
    shadowSpread: 10,
    glowIntensity: 0.5,
  },
};

// 减少动画偏好支持
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 获取适当的动画配置（考虑减少动画偏好）
export function getAnimationConfig<T>(config: T, reducedAlternative: T): T {
  return prefersReducedMotion() ? reducedAlternative : config;
}

// CSS 动画关键帧生成器
export function generateKeyframes(name: string, frames: Record<string, string>): string {
  const framesStr = Object.entries(frames)
    .map(([key, value]) => `${key} { ${value} }`)
    .join('\n  ');
  return `@keyframes ${name} {\n  ${framesStr}\n}`;
}

// 常用动画关键帧
export const KEYFRAMES = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
  `,
  slideDown: `
    @keyframes slideDown {
      from { 
        opacity: 0; 
        transform: translateY(-30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
  `,
  scaleIn: `
    @keyframes scaleIn {
      from { 
        opacity: 0; 
        transform: scale(0.9); 
      }
      to { 
        opacity: 1; 
        transform: scale(1); 
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { 
        opacity: 1; 
        transform: scale(1); 
      }
      50% { 
        opacity: 0.7; 
        transform: scale(1.05); 
      }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { 
        transform: translateY(0); 
      }
      50% { 
        transform: translateY(-10px); 
      }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { 
        background-position: -200% 0; 
      }
      100% { 
        background-position: 200% 0; 
      }
    }
  `,
  rotate: `
    @keyframes rotate {
      from { 
        transform: rotate(0deg); 
      }
      to { 
        transform: rotate(360deg); 
      }
    }
  `,
  portal: `
    @keyframes portal {
      0% {
        opacity: 0;
        transform: scale(0.5) rotate(-180deg);
        filter: blur(10px);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2) rotate(0deg);
        filter: blur(5px);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
        filter: blur(0);
      }
    }
  `,
  dissolve: `
    @keyframes dissolve {
      0% {
        opacity: 1;
        filter: blur(0);
      }
      50% {
        opacity: 0.5;
        filter: blur(2px);
      }
      100% {
        opacity: 0;
        filter: blur(10px);
      }
    }
  `,
  vortex: `
    @keyframes vortex {
      0% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.8) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
      }
    }
  `,
  revelation: `
    @keyframes revelation {
      0% {
        opacity: 0;
        clip-path: circle(0% at 50% 50%);
      }
      100% {
        opacity: 1;
        clip-path: circle(100% at 50% 50%);
      }
    }
  `,
};

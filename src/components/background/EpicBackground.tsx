/**
 * ============================================================================
 *                         灵墟档案馆 - 史诗级星空背景
 * ============================================================================
 * 
 * 【组件定位】
 * 这是整个网站最核心的视觉灵魂！
 * 纯手写 Canvas 实时渲染的史诗级星空
 * 每秒 60 帧，比 CSS 动画还丝滑！
 * 
 * 【技术揭秘 - 全是黑科技！
 * 
 * 1. 🌟 柏林噪声 (Perlin Noise)
 *    - 不是 random 那种乱糟糟的随机
 *    - 是"有机的随机"，像大自然的变化
 *    - 星云的流动、胶片颗粒感全靠它！
 * 
 * 2. 🌌 深度分层
 *    - 每颗星星都有 Z 轴深度
 *    - 鼠标移动时近的星动得快，远的动得慢
 *    - 这就是真正的 3D 视差效果！
 * 
 * 3. ✨ 分层光晕
 *    - 每颗星星画两层：外层柔光 + 内核实体
 *    - 这样才有真实的发光效果
 * 
 * 4. 🖱️ 缓动跟随
 *    - 鼠标移动不是瞬移，是 5% 增量缓动
 *    - 阻尼效果，手感巨好！
 * 
 * 【效果清单】
 * ✅ 400 颗带深度的 5 色星星
 * ✅ 独立闪烁动画（每颗星频率不一样）
 * ✅ 3 大片旋转彩色星云
 * ✅ 柏林噪声有机流动
 * ✅ 鼠标 3D 视差
 * ✅ 暗角晕影
 * ✅ 胶片颗粒质感
 */

'use client'

import { useEffect, useRef } from 'react'

/**
 * 🎵 柏林噪声生成器 - 这是整个动画的灵魂！
 * 
 * 什么是柏林噪声？
 * 普通 Math.random() 是电视机雪花那种杂乱
 * 柏林噪声是"连贯的随机"，像云彩流动、水面波纹
 * 自然界所有东西都是这样变化的！
 * 
 * Ken Perlin 因为发明了这个拿了奥斯卡技术奖！
 */
class PerlinNoise {
  // 256个数字的排列表 - 这是算法标准配置
  private permutation: number[] = []

  constructor(seed: number = Math.random() * 10000) {
    // 生成 0-255 的有序数组
    const p = Array.from({ length: 256 }, (_, i) => i)
    // 用种子打乱数组（确定性随机，每次运行一样）
    for (let i = p.length - 1; i > 0; i--) {
      const j = Math.floor((Math.sin(seed + i) * 43758.5453 % 1 + 1) * (i + 1))
      ;[p[i], p[j]] = [p[j], p[i]]
    }
    // 复制一份避免边界溢出计算
    this.permutation = [...p, ...p]
  }

  /**
   * 📈 淡入淡出曲线 - S型曲线
   * 让噪声过渡更自然，没有尖锐的拐点
   */
  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  /**
   * 📐 线性插值 - 在两个数之间平滑过渡
   */
  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a)
  }

  /**
   * 🧭 梯度向量 - 每个格点的方向
   */
  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3
    const u = h < 2 ? x : y
    const v = h < 2 ? y : x
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  /**
   * ✨ 生成二维噪声值 - 输入(x,y)，输出 [-1, 1]
   * 这个值随输入变化是平滑连续的！
   */
  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255

    x -= Math.floor(x)
    y -= Math.floor(y)

    const u = this.fade(x)
    const v = this.fade(y)

    const A = this.permutation[X] + Y
    const B = this.permutation[X + 1] + Y

    return this.lerp(
      this.lerp(this.grad(this.permutation[A], x, y), this.grad(this.permutation[B], x - 1, y), u),
      this.lerp(this.grad(this.permutation[A + 1], x, y - 1), this.grad(this.permutation[B + 1], x - 1, y - 1), u),
      v
    )
  }
}

/**
 * ⭐ 单颗星星的数据结构
 * 
 * 不是简单的 xy 坐标！
 * 我们模拟真实宇宙的深度感和闪烁
 */
interface Star {
  x: number           // X 坐标
  y: number           // Y 坐标
  z: number           // Z 轴深度！这个是 3D 视差的关键
  size: number        // 大小
  brightness: number  // 基础亮度
  twinkleSpeed: number     // 每颗星闪烁速度不同，更真实
  twinkleOffset: number    // 每颗星闪烁相位错开
  color: { r: number; g: number; b: number }  // 星星有 5 种颜色
}

/**
 * 🌌 星云数据结构
 */
interface Nebula {
  x: number
  y: number
  radius: number
  rotation: number            // 当前角度
  rotationSpeed: number       // 旋转速度，每个星云方向速度都不同！
  colors: { r: number; g: number; b: number; a: number }[]  // 多层颜色
}

export default function EpicBackground() {
  // 🎨 Canvas 引用，直接操作像素
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // 🖱️ 鼠标位置，用 useRef 避免 setState 卡帧
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 🎲 初始化柏林噪声，种子 42 保证每次打开效果一样
    const perlin = new PerlinNoise(42)
    let animationId: number
    let time = 0  // 全局时间线，所有动画都基于这个

    // ==================== 高清渲染 ====================
    
    /**
     * 🖥️ 高清屏适配
     * 苹果的 Retina 屏是 2x，不处理字会糊
     * 所以画布放大 DPR 倍，CSS 再缩回来显示
     */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // ==================== 鼠标视差 ====================
    
    /**
     * 🖱️ 鼠标移动事件
     * 只更新 target，实际位置缓动过去
     * 范围限制在 ±50px，不会太夸张
     */
    const handleMouseMove = (e: MouseEvent) => {
      // 把屏幕中心设为原点(0,0)
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 50
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 50
    }

    window.addEventListener('mousemove', handleMouseMove)

    // ==================== 初始化星星 ====================
    
    // ✨ 创建 400 颗星星
    const stars: Star[] = []
    // 真实宇宙星星不是纯白！有 5 种色温
    const starColors = [
      { r: 255, g: 255, b: 255 },    // 纯白
      { r: 201, g: 162, b: 39 },     // 金色 - 主题色
      { r: 150, g: 200, b: 255 },    // 蓝白 - 年轻恒星
      { r: 255, g: 200, b: 150 },    // 橙红 - 红巨星
      { r: 200, g: 150, b: 255 },    // 紫蓝 - 特殊星体
    ]

    // 生成 400 颗星星，均匀分布
    for (let i = 0; i < 400; i++) {
      stars.push({
        // 范围比屏幕大一圈，视差移动时不会出现黑边
        x: Math.random() * window.innerWidth * 2 - window.innerWidth * 0.5,
        y: Math.random() * window.innerHeight * 2 - window.innerHeight * 0.5,
        z: Math.random(),                    // Z 深度 0~1
        size: Math.random() * 2 + 0.5,       // 大小 0.5~2.5
        brightness: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 3 + 1,  // 每颗星闪烁速度不同
        twinkleOffset: Math.random() * Math.PI * 2,  // 相位错开，不会一起闪
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })
    }

    // ==================== 初始化星云 ====================
    
    /**
     * 🌌 三大星云，分布在屏幕三个角落
     * 每个星云独立旋转，有多层渐变
     * 金色、火红色、蓝紫色 - 对应修仙三色调
     */
    const nebulae: Nebula[] = [
      // 左上角 - 金木星云
      {
        x: window.innerWidth * 0.2,
        y: window.innerHeight * 0.3,
        radius: 400,
        rotation: 0,
        rotationSpeed: 0.0002,
        colors: [
          { r: 201, g: 162, b: 39, a: 0.08 },    // 金色
          { r: 100, g: 50, b: 150, a: 0.05 },     // 紫
          { r: 50, g: 100, b: 200, a: 0.04 },     // 蓝
        ],
      },
      // 右下角 - 火德星云
      {
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.7,
        radius: 350,
        rotation: Math.PI / 2,
        rotationSpeed: -0.00015,  // 反方向转
        colors: [
          { r: 255, g: 100, b: 50, a: 0.06 },     // 红
          { r: 150, g: 50, b: 100, a: 0.05 },     // 洋红
          { r: 50, g: 150, b: 150, a: 0.04 },     // 青
        ],
      },
      // 中心 - 紫微星云
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5,
        radius: 500,
        rotation: Math.PI,
        rotationSpeed: 0.0001,
        colors: [
          { r: 100, g: 150, b: 255, a: 0.05 },    // 蓝
          { r: 150, g: 100, b: 200, a: 0.04 },     // 紫
          { r: 200, g: 100, b: 100, a: 0.03 },     // 红
        ],
      },
    ]

    // ==================== 主渲染循环 60fps ====================
    
    const render = () => {
      time += 0.01

      // 🖱️ 阻尼缓动 - 每帧只动 5% 的距离
      // 这个手感！就像磁铁吸附一样丝滑
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      const { x: parallaxX, y: parallaxY } = mouseRef.current

      // 1. 🖤 清空画布 - 深空黑
      ctx.fillStyle = '#05050a'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // 2. 🌌 画星云 - 从后往前画
      nebulae.forEach((nebula, ni) => {
        nebula.rotation += nebula.rotationSpeed

        nebula.colors.forEach((color, ci) => {
          // 椭圆径向渐变
          const gradient = ctx.createRadialGradient(
            // 视差分层：远的星云动得慢
            nebula.x + parallaxX * (0.5 + ni * 0.1),
            nebula.y + parallaxY * (0.5 + ni * 0.1),
            0,
            nebula.x + parallaxX * (0.5 + ni * 0.1),
            nebula.y + parallaxY * (0.5 + ni * 0.1),
            nebula.radius * (0.6 + ci * 0.2)
          )

          // ✨ 柏林噪声让星云透明度自然波动
          const noiseAlpha = perlin.noise(
            nebula.x * 0.003 + time * 0.1,
            nebula.y * 0.003 + ni * 100 + time * 0.05
          )

          // 三层渐变：中心亮 -> 边缘暗
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * (0.5 + noiseAlpha * 0.5)})`)
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5 * (0.3 + noiseAlpha * 0.4)})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

          ctx.save()
          ctx.translate(nebula.x, nebula.y)
          ctx.rotate(nebula.rotation)
          ctx.translate(-nebula.x, -nebula.y)
          ctx.fillStyle = gradient
          ctx.beginPath()
          // 椭圆 = 压扁的圆，更像真实的星云
          ctx.ellipse(
            nebula.x + parallaxX * (0.5 + ni * 0.1),
            nebula.y + parallaxY * (0.5 + ni * 0.1),
            nebula.radius * (0.8 + ci * 0.15),
            nebula.radius * (0.5 + ci * 0.1),
            nebula.rotation + ci * 0.5,
            0,
            Math.PI * 2
          )
          ctx.fill()
          ctx.restore()
        })
      })

      // 3. ⭐ 画星星 - 每颗画两层光晕！
      stars.forEach((star) => {
        // 3D 视差：Z 值大（近的星星）动得快
        const depthFactor = 0.3 + star.z * 0.7
        // 正弦闪烁：每颗星频率相位都不同
        const twinkle = 0.5 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5

        const x = star.x + parallaxX * depthFactor * 0.5
        const y = star.y + parallaxY * depthFactor * 0.5

        // 第一层：大光晕
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * (1 + star.z * 2) * 3)
        gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.brightness * twinkle * depthFactor})`)
        gradient.addColorStop(0.3, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.brightness * twinkle * depthFactor * 0.3})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(x, y, star.size * (1 + star.z * 2) * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // 第二层：实体星核
        ctx.beginPath()
        ctx.arc(x, y, star.size * (1 + star.z), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${(0.8 + twinkle * 0.2) * depthFactor})`
        ctx.fill()
      })

      // 4. 🕶️ 暗角 - 模拟电影镜头
      // 边缘压暗，视觉焦点集中在中间
      const vignette = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.min(window.innerWidth, window.innerHeight) * 0.3,
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.max(window.innerWidth, window.innerHeight) * 0.8
      )
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignette.addColorStop(1, 'rgba(5, 5, 10, 0.8)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // 5. 🎞️ 胶片颗粒 - 复古质感
      // 极淡的柏林噪声，模拟老电影胶片颗粒
      const filmNoise = perlin.noise(time * 10, time * 7)
      ctx.fillStyle = `rgba(255, 255, 255, ${0.01 + filmNoise * 0.005})`
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      animationId = requestAnimationFrame(render)
    }

    // 🚀 启动！
    render()

    // 🧹 组件卸载时清理，防止内存泄漏
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // ==================== 渲染 Canvas ====================
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',  // 不挡住鼠标点击
      }}
    />
  )
}
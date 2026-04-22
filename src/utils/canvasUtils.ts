export function safeCanvasCleanup(canvasRef: React.RefObject<HTMLCanvasElement>, animationRef: React.MutableRefObject<number | undefined>) {
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const canvas = canvasRef.current
    if (canvas) {
      try {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.globalCompositeOperation = 'source-over'
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        canvas.width = 0
        canvas.height = 0
      } catch (e) {
        console.warn('Canvas cleanup error:', e)
      }
    }
  }
}

export function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1
  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
}

export function drawParticle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha = 1) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.shadowBlur = size * 2
  ctx.shadowColor = color
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function drawRipple(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha: number) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.shadowBlur = 10
  ctx.shadowColor = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

export class ParticlePool<T> {
  private pool: T[] = []
  private createFn: () => T
  private resetFn: (item: T) => void

  constructor(createFn: () => T, resetFn: (item: T) => void, initialSize = 100) {
    this.createFn = createFn
    this.resetFn = resetFn
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn())
    }
  }

  acquire(): T {
    if (this.pool.length > 0) {
      const item = this.pool.pop()!
      this.resetFn(item)
      return item
    }
    return this.createFn()
  }

  release(item: T) {
    this.pool.push(item)
  }

  clear() {
    this.pool = []
  }
}

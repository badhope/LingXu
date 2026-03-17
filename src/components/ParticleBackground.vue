<template>
  <div class="particle-container fixed inset-0 overflow-hidden pointer-events-none">
    <canvas 
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  intensity: {
    type: Number,
    default: 50
  }
})

const canvasRef = ref(null)
let animationId = null
let particles = []
let ctx = null

const particleColors = [
  'rgba(212, 175, 55, 0.3)',
  'rgba(184, 134, 11, 0.25)',
  'rgba(255, 215, 0, 0.2)',
  'rgba(139, 115, 85, 0.15)'
]

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5 + 0.1
    this.color = particleColors[Math.floor(Math.random() * particleColors.length)]
    this.life = Math.random() * 200 + 100
    this.maxLife = this.life
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.life--

    if (this.life <= 0 || this.x < 0 || this.x > this.canvas.width || 
        this.y < 0 || this.y > this.canvas.height) {
      this.reset()
    }
  }

  draw(ctx) {
    const lifeRatio = this.life / this.maxLife
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity * lifeRatio
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

const initParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  resizeCanvas()

  const particleCount = Math.floor((props.intensity / 100) * 80)
  particles = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const animate = () => {
  if (!ctx || !canvasRef.value) return

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  particles.forEach(particle => {
    particle.update()
    particle.draw(ctx)
  })

  animationId = requestAnimationFrame(animate)
}

watch(() => props.intensity, () => {
  initParticles()
})

onMounted(() => {
  initParticles()
  animate()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.particle-container {
  z-index: 1;
}
</style>

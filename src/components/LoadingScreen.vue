<template>
  <div class="loading-screen fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-abyss">
      <div class="absolute inset-0 bg-gradient-radial"></div>
    </div>

    <div class="particles-container absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="i in 30"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      />
    </div>

    <div class="relative z-10">
      <div
        class="bagua-container cursor-pointer"
        :class="{ 'animating': isAnimating }"
        @click="startAnimation"
      >
        <div class="outer-ring"></div>
        <div class="middle-ring"></div>
        
        <svg
          viewBox="0 0 200 200"
          class="bagua-svg"
          :class="{ 'rotating': isAnimating }"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#B8860B" />
              <stop offset="50%" style="stop-color:#FFD700" />
              <stop offset="100%" style="stop-color:#D4AF37" />
            </linearGradient>
            <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1A1A2E" />
              <stop offset="100%" style="stop-color:#0A0A0F" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g class="trigrams-outer" :class="{ 'visible': isAnimating }">
            <g v-for="(trigram, index) in trigrams" :key="index">
              <text
                :transform="`translate(${getTrigramPosition(index).x}, ${getTrigramPosition(index).y}) rotate(${index * 45 + 22.5})`"
                text-anchor="middle"
                dominant-baseline="middle"
                class="trigram-text"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                {{ trigram.symbol }}
              </text>
            </g>
          </g>

          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#goldGradient)"
            stroke-width="1.5"
            filter="url(#glow)"
            class="inner-circle"
          />

          <g transform="translate(100, 100)" class="yin-yang">
            <path
              d="M 0 -70 A 70 70 0 0 1 0 70 A 35 35 0 0 1 0 0 A 35 35 0 0 0 0 -70"
              fill="url(#goldGradient)"
              class="yang-half"
              :class="{ 'glowing': isAnimating }"
            />
            <path
              d="M 0 70 A 70 70 0 0 1 0 -70 A 35 35 0 0 1 0 0 A 35 35 0 0 0 0 70"
              fill="url(#darkGradient)"
              stroke="url(#goldGradient)"
              stroke-width="1"
              class="yin-half"
            />

            <circle cx="0" cy="-35" r="10" fill="#0A0A0F" class="yin-dot" />
            <circle cx="0" cy="35" r="10" fill="url(#goldGradient)" class="yang-dot" :class="{ 'glowing': isAnimating }" />
          </g>
        </svg>

        <div class="center-text" :class="{ 'hidden': isAnimating }">
          <p class="main-text">点击开启</p>
          <p class="sub-text">探索命运的奥秘</p>
        </div>
      </div>

      <Transition name="slide-up">
        <div v-if="showProgress" class="progress-container">
          <div class="progress-text">{{ progressText }}</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }">
              <div class="progress-glow"></div>
            </div>
          </div>
          <div class="progress-percent">{{ Math.round(progress) }}%</div>
        </div>
      </Transition>
    </div>

    <div class="absolute bottom-8 text-center z-10">
      <p class="footer-text">天机 · 玄机暗藏</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['complete'])

const isAnimating = ref(false)
const showProgress = ref(false)
const progress = ref(0)

const trigrams = [
  { name: '乾', symbol: '☰' },
  { name: '兑', symbol: '☱' },
  { name: '离', symbol: '☲' },
  { name: '震', symbol: '☳' },
  { name: '巽', symbol: '☴' },
  { name: '坎', symbol: '☵' },
  { name: '艮', symbol: '☶' },
  { name: '坤', symbol: '☷' }
]

const progressTexts = [
  '推演天机...',
  '测算命理...',
  '洞察玄机...',
  '揭示命运...',
  '天机已现...'
]

const progressText = computed(() => {
  const index = Math.min(Math.floor(progress.value / 20), progressTexts.length - 1)
  return progressTexts[index]
})

const getTrigramPosition = (index) => {
  const angle = (index * 45 - 90) * (Math.PI / 180)
  const radius = 62
  return {
    x: 100 + radius * Math.cos(angle),
    y: 100 + radius * Math.sin(angle)
  }
}

const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 10 + 10
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const startAnimation = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  showProgress.value = true
  
  const duration = 3500
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const rawProgress = (elapsed / duration) * 100
    progress.value = Math.min(rawProgress * (1 + Math.sin(rawProgress * Math.PI / 200) * 0.1), 100)
    
    if (progress.value < 100) {
      requestAnimationFrame(animate)
    } else {
      setTimeout(() => {
        emit('complete')
      }, 300)
    }
  }
  
  requestAnimationFrame(animate)
}
</script>

<style scoped>
.loading-screen {
  background: radial-gradient(ellipse at center, #1A1A2E 0%, #0A0A0F 100%);
}

.bg-gradient-radial {
  background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
}

.particles-container {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  bottom: -10px;
  background: linear-gradient(to top, #D4AF37, transparent);
  border-radius: 50%;
  opacity: 0;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) scale(0.5);
    opacity: 0;
  }
}

.bagua-container {
  position: relative;
  width: 280px;
  height: 280px;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.bagua-container:hover {
  transform: scale(1.02);
}

.bagua-container.animating {
  transform: scale(1);
}

.outer-ring {
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 50%;
  animation: pulse-ring 3s ease-in-out infinite;
}

.middle-ring {
  position: absolute;
  inset: -10px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  animation: pulse-ring 3s ease-in-out infinite 0.5s;
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
}

.bagua-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
  transition: filter 0.5s ease;
}

.bagua-svg.rotating {
  animation: rotate-bagua 8s linear infinite;
  filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.5));
}

@keyframes rotate-bagua {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.trigrams-outer {
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.trigrams-outer.visible {
  opacity: 1;
}

.trigram-text {
  font-size: 16px;
  font-family: 'Noto Serif SC', serif;
  fill: #D4AF37;
  filter: url(#glow);
  transition: all 0.3s ease;
}

.trigrams-outer.visible .trigram-text {
  animation: trigram-pulse 2s ease-in-out infinite;
}

@keyframes trigram-pulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.inner-circle {
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

.yin-yang {
  transition: transform 0.5s ease;
}

.animating .yin-yang {
  animation: pulse-yinyang 2s ease-in-out infinite;
}

@keyframes pulse-yinyang {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.yang-half,
.yang-dot {
  transition: filter 0.5s ease;
}

.yang-half.glowing,
.yang-dot.glowing {
  filter: url(#strongGlow);
}

.center-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease;
}

.center-text.hidden {
  opacity: 0;
  pointer-events: none;
}

.main-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  color: #D4AF37;
  animation: pulse-text 2s ease-in-out infinite;
}

.sub-text {
  font-size: 0.875rem;
  color: #6B7280;
  margin-top: 0.5rem;
}

@keyframes pulse-text {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.progress-container {
  margin-top: 3rem;
  text-align: center;
}

.progress-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  color: #D4AF37;
  margin-bottom: 1rem;
  animation: fade-pulse 1.5s ease-in-out infinite;
}

@keyframes fade-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.progress-bar {
  width: 280px;
  height: 4px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #B8860B, #FFD700, #D4AF37);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s ease;
}

.progress-glow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #FFD700 0%, transparent 70%);
  border-radius: 50%;
  animation: glow-pulse 0.5s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
  }
}

.progress-percent {
  font-size: 0.875rem;
  color: #6B7280;
  margin-top: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.footer-text {
  font-size: 0.875rem;
  color: #4B5563;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

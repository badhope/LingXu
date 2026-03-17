<template>
  <div class="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-abyss">
    <div class="relative">
      <div 
        class="bagua-container cursor-pointer"
        :class="{ 'animating': isAnimating }"
        @click="startAnimation"
      >
        <svg 
          viewBox="0 0 200 200" 
          class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          :class="{ 'animate-spin-slow': isAnimating }"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#B8860B" />
              <stop offset="50%" style="stop-color:#FFD700" />
              <stop offset="100%" style="stop-color:#D4AF37" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <circle 
            cx="100" 
            cy="100" 
            r="95" 
            fill="none" 
            stroke="url(#goldGradient)" 
            stroke-width="2"
            filter="url(#glow)"
          />
          
          <g transform="translate(100, 100)">
            <path
              d="M 0 -80 A 80 80 0 0 1 0 80 A 40 40 0 0 1 0 0 A 40 40 0 0 0 0 -80"
              fill="url(#goldGradient)"
              class="transition-opacity duration-500"
              :class="isAnimating ? 'opacity-100' : 'opacity-80'"
            />
            <path
              d="M 0 80 A 80 80 0 0 1 0 -80 A 40 40 0 0 1 0 0 A 40 40 0 0 0 0 80"
              fill="#0A0A0F"
              stroke="url(#goldGradient)"
              stroke-width="1"
            />
            
            <circle cx="0" cy="-40" r="12" fill="#0A0A0F" />
            <circle cx="0" cy="40" r="12" fill="url(#goldGradient)" />
          </g>
          
          <g class="trigrams" :class="{ 'opacity-100': isAnimating, 'opacity-50': !isAnimating }">
            <g v-for="(trigram, index) in trigrams" :key="index">
              <text
                :transform="`translate(${getTrigramPosition(index).x}, ${getTrigramPosition(index).y}) rotate(${index * 45 + 22.5})`"
                text-anchor="middle"
                dominant-baseline="middle"
                class="text-xs fill-gold font-serif"
                style="font-size: 14px"
              >
                {{ trigram.symbol }}
              </text>
            </g>
          </g>
        </svg>
        
        <div 
          v-if="!isAnimating"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="text-center animate-pulse-gold">
            <p class="text-gold font-title text-xl md:text-2xl">点击开启</p>
            <p class="text-text-muted text-sm mt-2">探索命运的奥秘</p>
          </div>
        </div>
      </div>
      
      <Transition name="fade">
        <div v-if="showProgress" class="mt-8 text-center">
          <p class="text-gold font-serif text-lg mb-4">{{ progressText }}</p>
          <div class="w-64 h-1 bg-jade rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-gold transition-all duration-300 ease-smooth"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </Transition>
    </div>
    
    <div class="absolute bottom-8 text-center">
      <p class="text-text-muted text-sm">天机 · 玄机暗藏</p>
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
  const radius = 70
  return {
    x: 100 + radius * Math.cos(angle),
    y: 100 + radius * Math.sin(angle)
  }
}

const startAnimation = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  showProgress.value = true
  
  const duration = 4000
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / duration) * 100, 100)
    
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

.bagua-container {
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.baga-container:hover {
  transform: scale(1.02);
}

.trigrams {
  transition: opacity 1s ease;
}

@keyframes pulse-gold {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-gold {
  animation: pulse-gold 2s ease-in-out infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

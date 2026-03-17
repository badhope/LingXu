<template>
  <div class="divination-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">抽签占卜</h1>
        <p class="text-text-secondary text-body-lg">诚心祈愿，随机得签</p>
      </header>

      <Transition name="fade" mode="out-in">
        <div v-if="currentStep === 'ready'" key="ready" class="text-center">
          <div class="card p-12 max-w-lg mx-auto">
            <div class="w-32 h-32 mx-auto mb-8 relative">
              <div class="absolute inset-0 rounded-full bg-gradient-conic from-gold via-abyss to-gold animate-spin-slow opacity-60" />
              <div class="absolute inset-4 rounded-full bg-jade flex items-center justify-center">
                <span class="font-title text-4xl text-gold">签</span>
              </div>
            </div>
            
            <h2 class="font-serif text-h3 text-text-primary mb-4">诚心祈愿</h2>
            <p class="text-text-muted text-body mb-8">
              在心中默念你的问题，<br>
              然后点击下方开始抽签
            </p>
            
            <button @click="startDivination" class="btn-primary">
              开始抽签
            </button>
          </div>
        </div>

        <div v-else-if="currentStep === 'shaking'" key="shaking" class="text-center">
          <div class="card p-12 max-w-lg mx-auto">
            <div class="relative h-64 mb-8">
              <div 
                class="absolute left-1/2 -translate-x-1/2 bottom-0 w-24"
                :class="{ 'animate-shake': isShaking }"
              >
                <div class="relative">
                  <div v-for="i in 5" :key="i" 
                    class="absolute w-6 h-32 bg-gradient-to-b from-gold/80 to-gold/40 rounded-t-full border border-gold/50"
                    :style="{ left: `${(i - 3) * 14}px`, transform: `rotate(${(i - 3) * 3}deg)` }"
                  />
                </div>
              </div>
            </div>
            
            <h2 class="font-serif text-h3 text-text-primary mb-4">正在摇签</h2>
            <p class="text-text-muted text-body mb-8">
              请在心中默念你的问题...
            </p>
            
            <button 
              @mousedown="startShaking" 
              @mouseup="stopShaking"
              @mouseleave="stopShaking"
              class="btn-secondary select-none"
            >
              按住摇签
            </button>
          </div>
        </div>

        <div v-else-if="currentStep === 'result'" key="result" class="space-y-6">
          <div class="card p-8 text-center">
            <div class="mb-6">
              <span class="inline-block px-6 py-2 bg-gold/10 border border-gold/30 rounded-full">
                <span class="font-title text-h2 text-gold">第{{ currentSign.number }}签</span>
              </span>
            </div>
            
            <h2 class="font-serif text-h3 text-text-primary mb-2">{{ currentSign.level }}</h2>
            <p class="text-gold text-body-lg mb-6">{{ currentSign.title }}</p>
            
            <div class="max-w-md mx-auto py-6 border-y border-gold/10">
              <p class="font-serif text-body-lg text-text-gold leading-loose whitespace-pre-line">
                {{ currentSign.poem }}
              </p>
            </div>
          </div>

          <div class="card p-8">
            <h3 class="font-serif text-h4 text-text-primary mb-4">签文解读</h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ currentSign.interpretation }}</p>
              
              <div class="pt-4 border-t border-gold/10">
                <h4 class="text-gold font-serif mb-2">事业</h4>
                <p>{{ currentSign.career }}</p>
              </div>
              
              <div class="pt-4 border-t border-gold/10">
                <h4 class="text-gold font-serif mb-2">感情</h4>
                <p>{{ currentSign.love }}</p>
              </div>
              
              <div class="pt-4 border-t border-gold/10">
                <h4 class="text-gold font-serif mb-2">财运</h4>
                <p>{{ currentSign.wealth }}</p>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="resetDivination" class="flex-1 btn-secondary">
              再求一签
            </button>
            <button @click="saveSign" class="flex-1 btn-primary">
              收藏签文
            </button>
          </div>

          <div v-if="savedSigns.length > 0" class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4">历史签文</h3>
            <div class="space-y-3">
              <div 
                v-for="(sign, index) in savedSigns" 
                :key="index"
                class="flex items-center justify-between py-2 border-b border-gold/10 last:border-0"
              >
                <div>
                  <span class="text-gold text-body-sm">第{{ sign.number }}签</span>
                  <span class="text-text-muted text-caption ml-2">{{ sign.time }}</span>
                </div>
                <span class="text-text-secondary text-body-sm">{{ sign.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signData } from '@/data/signs'

const currentStep = ref('ready')
const isShaking = ref(false)
const currentSign = ref(null)
const savedSigns = ref([])
let shakeTimer = null

const startDivination = () => {
  currentStep.value = 'shaking'
}

const startShaking = () => {
  isShaking.value = true
  
  shakeTimer = setTimeout(() => {
    stopShaking()
    drawSign()
  }, 3000)
}

const stopShaking = () => {
  isShaking.value = false
  if (shakeTimer) {
    clearTimeout(shakeTimer)
    shakeTimer = null
  }
}

const drawSign = () => {
  const randomIndex = Math.floor(Math.random() * signData.length)
  currentSign.value = signData[randomIndex]
  currentStep.value = 'result'
}

const resetDivination = () => {
  currentStep.value = 'ready'
  currentSign.value = null
}

const saveSign = () => {
  if (!currentSign.value) return
  
  const record = {
    number: currentSign.value.number,
    title: currentSign.value.title,
    time: new Date().toLocaleString('zh-CN')
  }
  
  savedSigns.value.unshift(record)
  if (savedSigns.value.length > 10) {
    savedSigns.value.pop()
  }
  
  localStorage.setItem('savedSigns', JSON.stringify(savedSigns.value))
  alert('签文已收藏')
}

onMounted(() => {
  const saved = localStorage.getItem('savedSigns')
  if (saved) {
    savedSigns.value = JSON.parse(saved)
  }
})
</script>

<style scoped>
.animate-shake {
  animation: shake 0.1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(-50%) rotate(-2deg); }
  25% { transform: translateX(-50%) rotate(2deg); }
  50% { transform: translateX(-50%) rotate(-1deg); }
  75% { transform: translateX(-50%) rotate(1deg); }
}
</style>

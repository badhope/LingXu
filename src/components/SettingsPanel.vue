<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="close"
      >
        <div class="absolute inset-0 bg-abyss/80 backdrop-blur-sm" />
        
        <div class="relative w-full max-w-md card p-6 animate-scale-in">
          <button 
            @click="close"
            class="absolute top-4 right-4 p-2 text-text-muted hover:text-gold transition-colors duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="font-title text-h3 text-text-primary mb-6">设置</h3>

          <div class="space-y-6">
            <div>
              <label class="block text-text-secondary text-body mb-3">
                粒子效果强度
              </label>
              <div class="flex items-center gap-4">
                <input 
                  type="range" 
                  v-model="localIntensity"
                  min="0" 
                  max="100"
                  class="flex-1 h-2 bg-jade rounded-lg appearance-none cursor-pointer accent-gold"
                >
                <span class="text-gold font-number text-body w-12 text-right">
                  {{ localIntensity }}%
                </span>
              </div>
            </div>

            <div>
              <label class="block text-text-secondary text-body mb-3">
                动画效果
              </label>
              <div class="flex items-center justify-between">
                <span class="text-text-muted text-body-sm">启用页面动画</span>
                <button 
                  @click="animationsEnabled = !animationsEnabled"
                  class="relative w-12 h-6 rounded-full transition-colors duration-300"
                  :class="animationsEnabled ? 'bg-gold' : 'bg-jade'"
                >
                  <span 
                    class="absolute top-1 w-4 h-4 rounded-full bg-text-primary transition-transform duration-300"
                    :class="animationsEnabled ? 'translate-x-7' : 'translate-x-1'"
                  />
                </button>
              </div>
            </div>

            <div>
              <label class="block text-text-secondary text-body mb-3">
                主题模式
              </label>
              <div class="flex gap-3">
                <button 
                  v-for="theme in themes" 
                  :key="theme.value"
                  @click="currentTheme = theme.value"
                  class="flex-1 py-2 px-4 rounded border transition-all duration-300 text-body-sm"
                  :class="currentTheme === theme.value 
                    ? 'border-gold bg-gold/10 text-gold' 
                    : 'border-gold/20 text-text-muted hover:border-gold/40'"
                >
                  {{ theme.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <button 
              @click="resetSettings"
              class="flex-1 btn-secondary text-body-sm"
            >
              恢复默认
            </button>
            <button 
              @click="saveSettings"
              class="flex-1 btn-primary text-body-sm"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:intensity'])

const localIntensity = ref(50)
const animationsEnabled = ref(true)
const currentTheme = ref('dark')

const themes = [
  { label: '暗金', value: 'dark' },
  { label: '朱砂', value: 'red' },
  { label: '青玉', value: 'green' }
]

watch(() => props.modelValue, (val) => {
  if (val) {
    const saved = localStorage.getItem('particleIntensity')
    if (saved) {
      localIntensity.value = parseInt(saved)
    }
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const saveSettings = () => {
  localStorage.setItem('particleIntensity', localIntensity.value.toString())
  localStorage.setItem('animationsEnabled', animationsEnabled.value.toString())
  localStorage.setItem('theme', currentTheme.value)
  
  emit('update:intensity', localIntensity.value)
  close()
}

const resetSettings = () => {
  localIntensity.value = 50
  animationsEnabled.value = true
  currentTheme.value = 'dark'
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .card,
.modal-leave-active .card {
  transition: transform 0.3s ease;
}

.modal-enter-from .card,
.modal-leave-to .card {
  transform: scale(0.95);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #D4AF37;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #D4AF37;
  cursor: pointer;
  border: none;
}
</style>

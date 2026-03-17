<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" :class="scrolled ? 'bg-abyss/90 backdrop-blur-md shadow-lg' : 'bg-transparent'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <RouterLink to="/" class="flex items-center gap-3 group">
          <div class="relative w-10 h-10 md:w-12 md:h-12">
            <div class="absolute inset-0 rounded-full bg-gradient-conic from-gold via-abyss to-gold animate-spin-slow opacity-80" />
            <div class="absolute inset-1 rounded-full bg-abyss flex items-center justify-center">
              <span class="text-gold font-title text-lg md:text-xl">天</span>
            </div>
          </div>
          <span class="font-title text-2xl md:text-3xl text-gradient-gold hidden sm:block">
            天机
          </span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link font-serif text-body"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <div class="flex items-center gap-4">
          <button 
            @click="toggleSettings"
            class="p-2 rounded-lg text-text-secondary hover:text-gold hover:bg-gold/5 transition-all duration-300"
            aria-label="设置"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-text-secondary hover:text-gold hover:bg-gold/5 transition-all duration-300"
            aria-label="菜单"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="md:hidden bg-abyss/95 backdrop-blur-md border-t border-gold/10">
        <div class="px-4 py-4 space-y-2">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="block px-4 py-3 rounded-lg font-serif text-body text-text-secondary hover:text-gold hover:bg-gold/5 transition-all duration-300"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const emit = defineEmits(['openSettings'])

const navItems = [
  { name: '黄历', path: '/calendar' },
  { name: '八字', path: '/bazi' },
  { name: '抽签', path: '/divination' },
  { name: '解梦', path: '/dream' },
  { name: '姓名', path: '/name' },
  { name: '配对', path: '/match' },
  { name: '知识', path: '/knowledge' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSettings = () => {
  emit('openSettings')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

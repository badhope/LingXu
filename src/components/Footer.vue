<template>
  <footer class="relative z-10 mt-20 border-t border-gold/10 bg-abyss/50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-conic from-gold via-abyss to-gold animate-spin-slow opacity-80" />
            <span class="font-title text-2xl text-gradient-gold">天机</span>
          </div>
          <p class="text-text-muted text-body-sm">
            玄机暗藏，命运可测<br>
            传承千年智慧，解读命运密码
          </p>
        </div>

        <div class="text-center">
          <h4 class="font-serif text-body-lg text-text-primary mb-4">功能导航</h4>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="text-text-muted text-body-sm hover:text-gold transition-colors duration-300"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>

        <div class="text-center md:text-right">
          <h4 class="font-serif text-body-lg text-text-primary mb-4">关于天机</h4>
          <p class="text-text-muted text-body-sm">
            基于传统命理学理论<br>
            结合现代科技呈现<br>
            仅供娱乐参考
          </p>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gold/10 text-center">
        <p class="text-text-muted text-caption">
          © {{ currentYear }} 天机 · 玄机暗藏 | 仅供娱乐参考，请勿迷信
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const navItems = [
  { name: '黄历查询', path: '/calendar' },
  { name: '八字排盘', path: '/bazi' },
  { name: '抽签占卜', path: '/divination' },
  { name: '运势测算', path: '/fortune' },
  { name: '命理分析', path: '/analysis' }
]
</script>

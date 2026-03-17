<template>
  <div class="home-page min-h-screen pt-20">
    <section class="hero relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Transition name="fade-up" appear>
          <div>
            <h1 class="font-title text-hero md:text-[96px] text-text-primary mb-6 glow-text">
              天机
            </h1>
            <p class="font-serif text-h3 md:text-h2 text-text-gold mb-4">
              玄机暗藏，命运可测
            </p>
            <p class="text-body-lg text-text-secondary mb-12 max-w-2xl mx-auto">
              传承千年命理智慧，以现代科技解读命运密码。<br>
              探索八字命理、黄历宜忌、抽签占卜，揭示人生玄机。
            </p>
          </div>
        </Transition>

        <Transition name="fade-up" appear :style="{ animationDelay: '200ms' }">
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink to="/calendar" class="btn-primary">
              查看今日黄历
            </RouterLink>
            <RouterLink to="/bazi" class="btn-secondary">
              八字排盘
            </RouterLink>
          </div>
        </Transition>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <section class="features py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <Transition name="fade-up" appear>
          <div class="text-center mb-16">
            <h2 class="section-title">核心功能</h2>
            <p class="section-subtitle">探索命运的多种方式</p>
          </div>
        </Transition>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="fade-up">
            <RouterLink 
              v-for="(feature, index) in features" 
              :key="feature.path"
              :to="feature.path"
              class="card p-6 group cursor-pointer"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <span class="text-3xl">{{ feature.icon }}</span>
              </div>
              <h3 class="font-serif text-h4 text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
                {{ feature.title }}
              </h3>
              <p class="text-body-sm text-text-muted">
                {{ feature.description }}
              </p>
            </RouterLink>
          </TransitionGroup>
        </div>
      </div>
    </section>

    <section class="today-info py-20 px-4 bg-jade/20">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Transition name="fade-up" appear>
            <div>
              <h2 class="section-title">今日黄历</h2>
              <p class="section-subtitle mb-8">{{ todayInfo.dateStr }}</p>
              
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <span class="text-fortune-lucky text-body-lg">宜</span>
                  <p class="text-text-secondary text-body">{{ todayInfo.yi }}</p>
                </div>
                <div class="flex items-start gap-4">
                  <span class="text-text-muted text-body-lg">忌</span>
                  <p class="text-text-secondary text-body">{{ todayInfo.ji }}</p>
                </div>
                <div class="flex items-center gap-4 pt-4 border-t border-gold/10">
                  <span class="text-gold text-body-lg">值神</span>
                  <p class="text-text-secondary text-body">{{ todayInfo.zhiShen }}</p>
                </div>
              </div>

              <RouterLink to="/calendar" class="inline-block mt-8 btn-ghost">
                查看完整黄历 →
              </RouterLink>
            </div>
          </Transition>

          <Transition name="fade-up" appear :style="{ animationDelay: '200ms' }">
            <div class="card p-8 text-center">
              <div class="mb-4">
                <span class="font-number text-date text-gold">{{ todayInfo.day }}</span>
              </div>
              <p class="font-serif text-h3 text-text-primary mb-2">{{ todayInfo.lunarDate }}</p>
              <p class="text-text-muted text-body">{{ todayInfo.ganZhi }}</p>
              <div class="mt-6 pt-6 border-t border-gold/10">
                <p class="text-text-secondary text-body-sm">
                  {{ todayInfo.jieQi }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <section class="quote py-20 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <Transition name="fade-up" appear>
          <div>
            <svg class="w-12 h-12 mx-auto mb-6 text-gold/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p class="font-serif text-h3 text-text-gold mb-4">
              {{ dailyQuote.content }}
            </p>
            <p class="text-text-muted text-body">—— {{ dailyQuote.author }}</p>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Solar, Lunar } from 'lunar-javascript'

const features = [
  {
    icon: '📅',
    title: '黄历查询',
    description: '公历农历转换、宜忌事项、节气干支，传统黄历一应俱全',
    path: '/calendar'
  },
  {
    icon: '☯️',
    title: '八字排盘',
    description: '输入出生时间，自动排盘分析，解读命理玄机',
    path: '/bazi'
  },
  {
    icon: '🎋',
    title: '抽签占卜',
    description: '模拟传统抽签体验，百支签文详尽解读',
    path: '/divination'
  },
  {
    icon: '🌙',
    title: '周公解梦',
    description: '梦境解析，探寻潜意识，五十种常见梦境详解',
    path: '/dream'
  },
  {
    icon: '✍️',
    title: '姓名测试',
    description: '五行数理分析，天地人三才配置，姓名评分',
    path: '/name'
  },
  {
    icon: '💕',
    title: '生肖星座配对',
    description: '生肖星座缘分测试，感情事业全方位分析',
    path: '/match'
  },
  {
    icon: '📚',
    title: '玄学知识库',
    description: '天干地支、五行八卦、命理术语，系统学习玄学知识',
    path: '/knowledge'
  }
]

const dailyQuote = ref({
  content: '天行健，君子以自强不息',
  author: '《周易》'
})

const todayInfo = computed(() => {
  const today = Solar.fromDate(new Date())
  const lunar = today.getLunar()
  
  return {
    dateStr: today.toFullString(),
    day: today.getDay(),
    lunarDate: lunar.toString(),
    ganZhi: lunar.getYearInGanZhi() + '年 ' + lunar.getMonthInGanZhi() + '月 ' + lunar.getDayInGanZhi() + '日',
    yi: lunar.getDayYi().slice(0, 6).join('、') || '诸事皆宜',
    ji: lunar.getDayJi().slice(0, 6).join('、') || '无',
    zhiShen: lunar.getDayZhiXing(),
    jieQi: lunar.getJieQi() || '当前节气已过'
  }
})

onMounted(() => {
  const quotes = [
    { content: '天行健，君子以自强不息', author: '《周易》' },
    { content: '地势坤，君子以厚德载物', author: '《周易》' },
    { content: '知命者不怨天，知己者不怨人', author: '《孟子》' },
    { content: '命里有时终须有，命里无时莫强求', author: '《增广贤文》' },
    { content: '一命二运三风水，四积阴德五读书', author: '古谚' }
  ]
  dailyQuote.value = quotes[Math.floor(Math.random() * quotes.length)]
})
</script>

<style scoped>
.hero {
  background: radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
}

.fade-up-enter-active {
  animation: fadeUp 0.6s ease-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

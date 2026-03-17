<template>
  <div class="fortune-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">运势测算</h1>
        <p class="text-text-secondary text-body-lg">今日运势 · 生肖运势 · 星座运势</p>
      </header>

      <div class="flex justify-center gap-4 mb-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="currentTab = tab.value"
          class="px-6 py-2 rounded-lg font-serif text-body transition-all duration-300"
          :class="currentTab === tab.value 
            ? 'bg-gold text-abyss' 
            : 'bg-jade/50 text-text-secondary hover:bg-gold/10'"
        >
          {{ tab.label }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="currentTab">
          <div v-if="currentTab === 'today'" class="space-y-6">
            <div class="card p-8">
              <div class="text-center mb-8">
                <p class="text-text-muted text-body-sm mb-2">{{ todayStr }}</p>
                <h2 class="font-title text-h2 text-gold mb-2">今日运势</h2>
                <p class="text-text-secondary text-body">综合运势指数</p>
              </div>

              <div class="flex justify-center mb-8">
                <div class="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#1A1A2E" 
                      stroke-width="8"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="url(#goldGradient)" 
                      stroke-width="8"
                      stroke-linecap="round"
                      :stroke-dasharray="circumference"
                      :stroke-dashoffset="dashOffset"
                      class="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#B8860B" />
                        <stop offset="100%" stop-color="#FFD700" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="font-number text-4xl text-gold">{{ todayFortune.overall }}</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="item in fortuneItems" :key="item.name" class="text-center p-4 rounded-lg bg-jade/30">
                  <span class="text-2xl mb-2 block">{{ item.icon }}</span>
                  <p class="text-text-muted text-body-sm mb-1">{{ item.name }}</p>
                  <div class="flex justify-center gap-1">
                    <span 
                      v-for="i in 5" 
                      :key="i"
                      class="text-lg"
                      :class="i <= todayFortune[item.key] ? 'text-gold' : 'text-jade'"
                    >
                      ★
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="font-serif text-h4 text-text-primary mb-4">今日提示</h3>
              <div class="space-y-3 text-text-secondary text-body">
                <p><span class="text-fortune-lucky">幸运颜色：</span>{{ todayFortune.luckyColor }}</p>
                <p><span class="text-fortune-lucky">幸运数字：</span>{{ todayFortune.luckyNumber }}</p>
                <p><span class="text-fortune-lucky">幸运方位：</span>{{ todayFortune.luckyDirection }}</p>
                <p><span class="text-gold">宜：</span>{{ todayFortune.yi }}</p>
                <p><span class="text-text-muted">忌：</span>{{ todayFortune.ji }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="currentTab === 'zodiac'" class="space-y-6">
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button 
                v-for="zodiac in zodiacs" 
                :key="zodiac.value"
                @click="selectedZodiac = zodiac.value"
                class="card p-4 text-center transition-all duration-300"
                :class="selectedZodiac === zodiac.value ? 'border-gold ring-2 ring-gold/30' : ''"
              >
                <span class="text-3xl block mb-2">{{ zodiac.icon }}</span>
                <p class="text-text-secondary text-body-sm">{{ zodiac.name }}</p>
              </button>
            </div>

            <Transition name="fade">
              <div v-if="zodiacFortune" class="card p-6">
                <div class="text-center mb-6">
                  <span class="text-4xl block mb-2">{{ getZodiacIcon(selectedZodiac) }}</span>
                  <h3 class="font-serif text-h3 text-text-primary">{{ selectedZodiac }}年运势</h3>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div v-for="item in zodiacItems" :key="item.key" class="text-center p-3 rounded bg-jade/30">
                    <p class="text-text-muted text-caption mb-1">{{ item.name }}</p>
                    <p class="font-number text-h4 text-gold">{{ zodiacFortune[item.key] }}</p>
                  </div>
                </div>

                <div class="space-y-4 text-text-secondary text-body">
                  <p>{{ zodiacFortune.description }}</p>
                </div>
              </div>
            </Transition>
          </div>

          <div v-else-if="currentTab === 'constellation'" class="space-y-6">
            <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
              <button 
                v-for="constellation in constellations" 
                :key="constellation.value"
                @click="selectedConstellation = constellation.value"
                class="card p-4 text-center transition-all duration-300"
                :class="selectedConstellation === constellation.value ? 'border-gold ring-2 ring-gold/30' : ''"
              >
                <span class="text-2xl block mb-2">{{ constellation.symbol }}</span>
                <p class="text-text-secondary text-body-sm">{{ constellation.name }}</p>
              </button>
            </div>

            <Transition name="fade">
              <div v-if="constellationFortune" class="card p-6">
                <div class="text-center mb-6">
                  <span class="text-4xl block mb-2">{{ getConstellationSymbol(selectedConstellation) }}</span>
                  <h3 class="font-serif text-h3 text-text-primary">{{ selectedConstellation }}座运势</h3>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div v-for="item in fortuneItems" :key="item.name" class="text-center p-3 rounded bg-jade/30">
                    <span class="text-xl block mb-1">{{ item.icon }}</span>
                    <p class="text-text-muted text-caption mb-1">{{ item.name }}</p>
                    <div class="flex justify-center gap-0.5">
                      <span 
                        v-for="i in 5" 
                        :key="i"
                        class="text-sm"
                        :class="i <= constellationFortune[item.key] ? 'text-gold' : 'text-jade'"
                      >
                        ★
                      </span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4 text-text-secondary text-body">
                  <p>{{ constellationFortune.description }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tabs = [
  { label: '今日运势', value: 'today' },
  { label: '生肖运势', value: 'zodiac' },
  { label: '星座运势', value: 'constellation' }
]

const currentTab = ref('today')

const fortuneItems = [
  { name: '财运', key: 'wealth', icon: '💰' },
  { name: '事业', key: 'career', icon: '📈' },
  { name: '感情', key: 'love', icon: '❤️' },
  { name: '健康', key: 'health', icon: '💪' }
]

const zodiacItems = [
  { name: '综合运势', key: 'overall' },
  { name: '财运指数', key: 'wealth' },
  { name: '事业指数', key: 'career' },
  { name: '感情指数', key: 'love' },
  { name: '健康指数', key: 'health' },
  { name: '贵人运势', key: 'noble' }
]

const zodiacs = [
  { name: '鼠', value: '鼠', icon: '🐭' },
  { name: '牛', value: '牛', icon: '🐮' },
  { name: '虎', value: '虎', icon: '🐯' },
  { name: '兔', value: '兔', icon: '🐰' },
  { name: '龙', value: '龙', icon: '🐲' },
  { name: '蛇', value: '蛇', icon: '🐍' },
  { name: '马', value: '马', icon: '🐴' },
  { name: '羊', value: '羊', icon: '🐑' },
  { name: '猴', value: '猴', icon: '🐵' },
  { name: '鸡', value: '鸡', icon: '🐔' },
  { name: '狗', value: '狗', icon: '🐶' },
  { name: '猪', value: '猪', icon: '🐷' }
]

const constellations = [
  { name: '白羊', value: '白羊', symbol: '♈' },
  { name: '金牛', value: '金牛', symbol: '♉' },
  { name: '双子', value: '双子', symbol: '♊' },
  { name: '巨蟹', value: '巨蟹', symbol: '♋' },
  { name: '狮子', value: '狮子', symbol: '♌' },
  { name: '处女', value: '处女', symbol: '♍' },
  { name: '天秤', value: '天秤', symbol: '♎' },
  { name: '天蝎', value: '天蝎', symbol: '♏' },
  { name: '射手', value: '射手', symbol: '♐' },
  { name: '摩羯', value: '摩羯', symbol: '♑' },
  { name: '水瓶', value: '水瓶', symbol: '♒' },
  { name: '双鱼', value: '双鱼', symbol: '♓' }
]

const selectedZodiac = ref('鼠')
const selectedConstellation = ref('白羊')

const todayStr = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

const circumference = 2 * Math.PI * 45

const todayFortune = ref({
  overall: 85,
  wealth: 4,
  career: 4,
  love: 3,
  health: 4,
  luckyColor: '金色、红色',
  luckyNumber: '3、8',
  luckyDirection: '东南方',
  yi: '签约、求职、开业',
  ji: '远行、动土、诉讼'
})

const dashOffset = computed(() => {
  return circumference - (todayFortune.value.overall / 100) * circumference
})

const zodiacFortune = computed(() => {
  const fortunes = {
    '鼠': { overall: 88, wealth: 90, career: 85, love: 82, health: 80, noble: 86, description: '鼠年运势整体较好，事业财运皆有突破。贵人相助，逢凶化吉。感情方面需要主动出击，有望遇到良缘。' },
    '牛': { overall: 82, wealth: 85, career: 88, love: 78, health: 82, noble: 80, description: '牛年运势平稳向好，事业发展顺利。财运稳定增长，感情需要耐心经营。健康方面注意休息。' },
    '虎': { overall: 90, wealth: 88, career: 92, love: 85, health: 84, noble: 88, description: '虎年运势旺盛，事业大有作为。财运亨通，贵人运佳。感情方面桃花旺盛，有望修成正果。' },
    '兔': { overall: 85, wealth: 82, career: 86, love: 88, health: 80, noble: 84, description: '兔年运势平稳，事业稳步发展。感情运势较好，有望遇到真爱。财运平稳，需要稳健理财。' },
    '龙': { overall: 92, wealth: 90, career: 94, love: 86, health: 85, noble: 90, description: '龙年运势极佳，事业腾飞。财运亨通，有意外之财。感情方面需要主动，有望开花结果。' },
    '蛇': { overall: 84, wealth: 86, career: 82, love: 85, health: 82, noble: 82, description: '蛇年运势平稳向好，事业发展顺利。财运稳定，感情方面有贵人牵线。健康需要注意饮食。' },
    '马': { overall: 88, wealth: 85, career: 90, love: 84, health: 86, noble: 86, description: '马年运势较好，事业发展迅速。财运亨通，有升职加薪机会。感情方面需要主动出击。' },
    '羊': { overall: 80, wealth: 82, career: 78, love: 82, health: 80, noble: 78, description: '羊年运势平稳，需要稳扎稳打。事业方面需要耐心，财运稳定。感情方面需要真诚相待。' },
    '猴': { overall: 86, wealth: 88, career: 85, love: 86, health: 82, noble: 88, description: '猴年运势较好，事业有贵人相助。财运亨通，投资可获收益。感情方面桃花旺盛。' },
    '鸡': { overall: 82, wealth: 84, career: 86, love: 80, health: 84, noble: 82, description: '鸡年运势平稳向好，事业发展顺利。财运稳定增长，感情需要时间培养。健康方面注意休息。' },
    '狗': { overall: 84, wealth: 82, career: 85, love: 84, health: 86, noble: 80, description: '狗年运势平稳，事业稳步发展。财运稳定，感情方面有贵人牵线。健康运势较好。' },
    '猪': { overall: 86, wealth: 88, career: 84, love: 88, health: 82, noble: 86, description: '猪年运势较好，事业有发展机会。财运亨通，有意外收获。感情方面有望修成正果。' }
  }
  return fortunes[selectedZodiac.value]
})

const constellationFortune = computed(() => {
  const fortunes = {
    '白羊': { wealth: 4, career: 5, love: 4, health: 4, description: '白羊座本周运势旺盛，事业方面大有作为，有望获得上级赏识。财运稳定增长，投资可获收益。感情方面需要主动出击。' },
    '金牛': { wealth: 5, career: 4, love: 3, health: 4, description: '金牛座本周财运亨通，有意外之财。事业方面稳步发展，不宜冒险。感情方面需要耐心经营。' },
    '双子': { wealth: 3, career: 4, love: 5, health: 3, description: '双子座本周感情运势极佳，有望遇到心仪对象。事业方面有贵人相助，财运平稳。' },
    '巨蟹': { wealth: 4, career: 3, love: 4, health: 5, description: '巨蟹座本周健康运势较好，精力充沛。事业方面需要稳扎稳打，财运稳定。感情方面需要多沟通。' },
    '狮子': { wealth: 4, career: 5, love: 4, health: 4, description: '狮子座本周事业运势旺盛，有望升职加薪。财运稳定增长，感情方面需要主动。' },
    '处女': { wealth: 3, career: 4, love: 3, health: 4, description: '处女座本周运势平稳，事业方面需要耐心。财运稳定，不宜冒险投资。感情方面需要真诚相待。' },
    '天秤': { wealth: 4, career: 4, love: 5, health: 3, description: '天秤座本周感情运势极佳，有望修成正果。事业方面有贵人相助，财运稳定。' },
    '天蝎': { wealth: 5, career: 4, love: 4, health: 4, description: '天蝎座本周财运亨通，有意外收获。事业方面稳步发展，感情方面需要主动出击。' },
    '射手': { wealth: 3, career: 5, love: 4, health: 4, description: '射手座本周事业运势旺盛，大有作为。财运平稳，感情方面有望遇到真爱。' },
    '摩羯': { wealth: 4, career: 4, love: 3, health: 5, description: '摩羯座本周健康运势较好，精力充沛。事业方面稳步发展，财运稳定。感情方面需要耐心。' },
    '水瓶': { wealth: 4, career: 4, love: 4, health: 4, description: '水瓶座本周运势平稳向好，事业有发展机会。财运稳定增长，感情方面有贵人牵线。' },
    '双鱼': { wealth: 3, career: 4, love: 5, health: 3, description: '双鱼座本周感情运势极佳，有望开花结果。事业方面有贵人相助，财运平稳。' }
  }
  return fortunes[selectedConstellation.value]
})

const getZodiacIcon = (zodiac) => {
  return zodiacs.find(z => z.value === zodiac)?.icon || '🐭'
}

const getConstellationSymbol = (constellation) => {
  return constellations.find(c => c.value === constellation)?.symbol || '♈'
}

onMounted(() => {
  todayFortune.value.overall = Math.floor(Math.random() * 30) + 70
})
</script>

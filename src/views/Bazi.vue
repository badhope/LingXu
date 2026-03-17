<template>
  <div class="bazi-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">八字排盘</h1>
        <p class="text-text-secondary text-body-lg">输入出生时间，解读命理玄机</p>
      </header>

      <Transition name="fade" mode="out-in">
        <div v-if="!showResult" key="form" class="card p-8">
          <form @submit.prevent="calculateBazi" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-text-secondary text-body mb-2">出生年</label>
                <select v-model="birthYear" class="input-field" required>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}年
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生月</label>
                <select v-model="birthMonth" class="input-field" required>
                  <option v-for="month in 12" :key="month" :value="month">
                    {{ month }}月
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生日</label>
                <select v-model="birthDay" class="input-field" required>
                  <option v-for="day in 31" :key="day" :value="day">
                    {{ day }}日
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生时辰</label>
                <select v-model="birthHour" class="input-field" required>
                  <option v-for="hour in hours" :key="hour.value" :value="hour.value">
                    {{ hour.label }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-text-secondary text-body mb-2">性别</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="gender" value="male" class="accent-gold" />
                  <span class="text-text-secondary">男</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="gender" value="female" class="accent-gold" />
                  <span class="text-text-secondary">女</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-text-secondary text-body mb-2">历法类型</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="calendarType" value="solar" class="accent-gold" />
                  <span class="text-text-secondary">公历</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="calendarType" value="lunar" class="accent-gold" />
                  <span class="text-text-secondary">农历</span>
                </label>
              </div>
            </div>

            <div class="pt-4">
              <button type="submit" class="btn-primary w-full">
                开始排盘
              </button>
            </div>
          </form>
        </div>

        <div v-else key="result" class="space-y-6">
          <div class="card p-6">
            <div class="text-center mb-6">
              <h2 class="font-title text-h2 text-gold mb-2">八字命盘</h2>
              <p class="text-text-muted text-body-sm">{{ birthYear }}年{{ birthMonth }}月{{ birthDay }}日 {{ getHourLabel(birthHour) }}</p>
            </div>

            <div class="grid grid-cols-4 gap-4 mb-8">
              <div v-for="(pillar, index) in baziResult.fourPillars" :key="index" class="text-center">
                <p class="text-text-muted text-body-sm mb-2">{{ pillarNames[index] }}</p>
                <div class="py-4 px-2 rounded bg-gold/10 border border-gold/20">
                  <p class="font-title text-h3 text-gold mb-1">{{ pillar.gan }}</p>
                  <p class="font-title text-h3 text-text-primary">{{ pillar.zhi }}</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div v-for="(pillar, index) in baziResult.fourPillars" :key="index" class="text-center">
                <p class="text-text-muted text-caption mb-1">五行</p>
                <p class="text-text-secondary text-body-sm">{{ pillar.wuXing }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4">五行分析</h3>
            <div class="space-y-3">
              <div v-for="wx in baziResult.wuXingCount" :key="wx.name" class="flex items-center gap-4">
                <span class="w-12 text-body text-text-secondary">{{ wx.name }}</span>
                <div class="flex-1 h-2 bg-jade rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :class="wx.color"
                    :style="{ width: `${wx.percent}%` }"
                  />
                </div>
                <span class="w-12 text-right text-body-sm text-text-muted">{{ wx.count }}个</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4">命理解读</h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ baziResult.analysis.personality }}</p>
              <p>{{ baziResult.analysis.career }}</p>
              <p>{{ baziResult.analysis.relationship }}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="resetForm" class="flex-1 btn-secondary">
              重新测算
            </button>
            <button @click="shareResult" class="flex-1 btn-primary">
              分享结果
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Solar, Lunar, LunarUtil } from 'lunar-javascript'

const pillarNames = ['年柱', '月柱', '日柱', '时柱']

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

const hours = [
  { value: 0, label: '子时 (23:00-01:00)' },
  { value: 1, label: '丑时 (01:00-03:00)' },
  { value: 2, label: '寅时 (03:00-05:00)' },
  { value: 3, label: '卯时 (05:00-07:00)' },
  { value: 4, label: '辰时 (07:00-09:00)' },
  { value: 5, label: '巳时 (09:00-11:00)' },
  { value: 6, label: '午时 (11:00-13:00)' },
  { value: 7, label: '未时 (13:00-15:00)' },
  { value: 8, label: '申时 (15:00-17:00)' },
  { value: 9, label: '酉时 (17:00-19:00)' },
  { value: 10, label: '戌时 (19:00-21:00)' },
  { value: 11, label: '亥时 (21:00-23:00)' }
]

const birthYear = ref(currentYear - 30)
const birthMonth = ref(1)
const birthDay = ref(1)
const birthHour = ref(0)
const gender = ref('male')
const calendarType = ref('solar')
const showResult = ref(false)
const baziResult = ref(null)

const getHourLabel = (hour) => {
  return hours.find(h => h.value === hour)?.label || ''
}

const wuXingColors = {
  '金': 'bg-yellow-500',
  '木': 'bg-green-500',
  '水': 'bg-blue-500',
  '火': 'bg-red-500',
  '土': 'bg-amber-700'
}

const getWuXing = (char) => {
  const wxMap = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
    '戌': '土', '亥': '水'
  }
  return wxMap[char] || ''
}

const calculateBazi = () => {
  let lunar
  
  if (calendarType.value === 'solar') {
    const solar = Solar.fromYmdHms(birthYear.value, birthMonth.value, birthDay.value, (birthHour.value + 23) % 24, 0, 0)
    lunar = solar.getLunar()
  } else {
    lunar = Lunar.fromYmd(birthYear.value, birthMonth.value, birthDay.value)
  }

  const bazi = lunar.getEightChar()
  
  const fourPillars = [
    { gan: bazi.getYearGan(), zhi: bazi.getYearZhi(), wuXing: getWuXing(bazi.getYearGan()) + getWuXing(bazi.getYearZhi()) },
    { gan: bazi.getMonthGan(), zhi: bazi.getMonthZhi(), wuXing: getWuXing(bazi.getMonthGan()) + getWuXing(bazi.getMonthZhi()) },
    { gan: bazi.getDayGan(), zhi: bazi.getDayZhi(), wuXing: getWuXing(bazi.getDayGan()) + getWuXing(bazi.getDayZhi()) },
    { gan: bazi.getTimeGan(), zhi: bazi.getTimeZhi(), wuXing: getWuXing(bazi.getTimeGan()) + getWuXing(bazi.getTimeZhi()) }
  ]

  const allChars = fourPillars.flatMap(p => [p.gan, p.zhi])
  const wuXingCount = ['金', '木', '水', '火', '土'].map(name => {
    const count = allChars.filter(c => getWuXing(c) === name).length
    return {
      name,
      count,
      percent: (count / 8) * 100,
      color: wuXingColors[name]
    }
  })

  const dayGan = bazi.getDayGan()
  const dayGanWuXing = getWuXing(dayGan)
  
  const analysis = generateAnalysis(dayGanWuXing, gender.value)

  baziResult.value = {
    fourPillars,
    wuXingCount,
    analysis
  }
  
  showResult.value = true
}

const generateAnalysis = (dayGanWuXing, gender) => {
  const templates = {
    '木': {
      personality: '日主属木，性格仁慈温和，富有同情心，善于思考，有创造力。为人正直，有理想抱负，但有时过于固执己见。',
      career: '适合从事教育、文化、艺术、医疗等行业。事业发展需要耐心积累，不宜急功近利。中年运势较好，晚年安稳。',
      relationship: '感情方面较为细腻敏感，重视精神层面的交流。婚姻需要找到志同道合的伴侣，相互理解支持。'
    },
    '火': {
      personality: '日主属火，性格热情开朗，积极向上，有领导才能。做事果断，有魄力，但有时过于急躁冲动。',
      career: '适合从事管理、销售、传媒、科技等行业。事业发展迅速，但需注意控制风险。年轻时运势较旺，需把握机会。',
      relationship: '感情方面热情主动，容易吸引异性。婚姻需要学会包容和理解，避免过于强势。'
    },
    '土': {
      personality: '日主属土，性格稳重踏实，诚实守信，有责任心。做事有条理，有耐心，但有时过于保守固执。',
      career: '适合从事金融、房地产、建筑、农业等行业。事业发展稳定，循序渐进。中年运势最佳，晚年享福。',
      relationship: '感情方面忠诚可靠，重视家庭。婚姻稳定，需要找到欣赏自己稳重性格的伴侣。'
    },
    '金': {
      personality: '日主属金，性格刚毅果断，有正义感，讲原则。做事干脆利落，有执行力，但有时过于刚硬。',
      career: '适合从事法律、军警、金融、机械等行业。事业发展需要贵人相助，善于把握机会。中年后运势渐佳。',
      relationship: '感情方面专一认真，但表达方式可能过于直接。婚姻需要学会温柔体贴，增进感情。'
    },
    '水': {
      personality: '日主属水，性格聪明灵活，善于变通，有智慧。思维敏捷，有洞察力，但有时过于圆滑世故。',
      career: '适合从事商业、贸易、咨询、科研等行业。事业发展起伏较大，需要把握时机。早年运势较好。',
      relationship: '感情方面浪漫多情，善于表达。婚姻需要专一，避免感情纠葛影响家庭。'
    }
  }
  
  return templates[dayGanWuXing] || templates['木']
}

const resetForm = () => {
  showResult.value = false
  baziResult.value = null
}

const shareResult = () => {
  alert('分享功能开发中...')
}
</script>

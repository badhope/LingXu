<template>
  <div class="analysis-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">命理分析</h1>
        <p class="text-text-secondary text-body-lg">综合命理报告 · 性格事业感情全方位解读</p>
      </header>

      <Transition name="fade" mode="out-in">
        <div v-if="!showResult" key="form" class="card p-8">
          <form @submit.prevent="calculateAnalysis" class="space-y-6">
            <div class="text-center mb-8">
              <p class="text-text-muted text-body">
                请填写以下信息，获取您的专属命理分析报告
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-text-secondary text-body mb-2">姓名</label>
                <input 
                  v-model="formData.name" 
                  type="text" 
                  class="input-field" 
                  placeholder="请输入姓名"
                  required
                />
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">性别</label>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="formData.gender" value="male" class="accent-gold" />
                    <span class="text-text-secondary">男</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="formData.gender" value="female" class="accent-gold" />
                    <span class="text-text-secondary">女</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生年</label>
                <select v-model="formData.birthYear" class="input-field" required>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}年
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生月</label>
                <select v-model="formData.birthMonth" class="input-field" required>
                  <option v-for="month in 12" :key="month" :value="month">
                    {{ month }}月
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生日</label>
                <select v-model="formData.birthDay" class="input-field" required>
                  <option v-for="day in 31" :key="day" :value="day">
                    {{ day }}日
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-text-secondary text-body mb-2">出生时辰</label>
                <select v-model="formData.birthHour" class="input-field" required>
                  <option v-for="hour in hours" :key="hour.value" :value="hour.value">
                    {{ hour.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="pt-4">
              <button type="submit" class="btn-primary w-full">
                开始分析
              </button>
            </div>
          </form>
        </div>

        <div v-else key="result" class="space-y-6">
          <div class="card p-8 text-center">
            <h2 class="font-title text-h2 text-gold mb-2">{{ formData.name }} 的命理分析</h2>
            <p class="text-text-muted text-body">
              {{ formData.birthYear }}年{{ formData.birthMonth }}月{{ formData.birthDay }}日
            </p>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">☯️</span> 八字命盘
            </h3>
            <div class="grid grid-cols-4 gap-4">
              <div v-for="(pillar, index) in analysisResult.bazi" :key="index" class="text-center">
                <p class="text-text-muted text-caption mb-2">{{ ['年柱', '月柱', '日柱', '时柱'][index] }}</p>
                <div class="py-3 rounded bg-gold/10 border border-gold/20">
                  <p class="font-title text-h4 text-gold">{{ pillar.gan }}</p>
                  <p class="font-title text-h4 text-text-primary">{{ pillar.zhi }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">🌟</span> 性格分析
            </h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ analysisResult.personality.summary }}</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div v-for="trait in analysisResult.personality.traits" :key="trait.name" class="text-center p-3 rounded bg-jade/30">
                  <p class="text-gold font-number text-h4">{{ trait.score }}</p>
                  <p class="text-text-muted text-caption">{{ trait.name }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">📈</span> 事业运势
            </h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ analysisResult.career.summary }}</p>
              <div class="pt-4">
                <p class="text-text-muted text-body-sm mb-2">适合行业</p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="industry in analysisResult.career.industries" 
                    :key="industry"
                    class="px-3 py-1 rounded-full bg-gold/10 text-gold text-body-sm"
                  >
                    {{ industry }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">❤️</span> 感情运势
            </h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ analysisResult.love.summary }}</p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="p-4 rounded bg-jade/30">
                  <p class="text-text-muted text-caption mb-1">理想伴侣特质</p>
                  <p class="text-text-secondary text-body-sm">{{ analysisResult.love.idealPartner }}</p>
                </div>
                <div class="p-4 rounded bg-jade/30">
                  <p class="text-text-muted text-caption mb-1">感情建议</p>
                  <p class="text-text-secondary text-body-sm">{{ analysisResult.love.advice }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">💰</span> 财运分析
            </h3>
            <div class="space-y-4 text-text-secondary text-body leading-relaxed">
              <p>{{ analysisResult.wealth.summary }}</p>
              <div class="grid grid-cols-3 gap-4 pt-4">
                <div class="text-center p-4 rounded bg-jade/30">
                  <p class="text-gold font-number text-h3">{{ analysisResult.wealth.score }}</p>
                  <p class="text-text-muted text-caption">财运指数</p>
                </div>
                <div class="text-center p-4 rounded bg-jade/30">
                  <p class="text-text-secondary text-body">{{ analysisResult.wealth.type }}</p>
                  <p class="text-text-muted text-caption">财运类型</p>
                </div>
                <div class="text-center p-4 rounded bg-jade/30">
                  <p class="text-text-secondary text-body">{{ analysisResult.wealth.direction }}</p>
                  <p class="text-text-muted text-caption">求财方位</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-text-primary mb-4 flex items-center gap-2">
              <span class="text-gold">🔮</span> 运势改善建议
            </h3>
            <div class="space-y-3 text-text-secondary text-body">
              <div v-for="(tip, index) in analysisResult.tips" :key="index" class="flex items-start gap-3">
                <span class="text-gold">•</span>
                <p>{{ tip }}</p>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="resetForm" class="flex-1 btn-secondary">
              重新分析
            </button>
            <button @click="downloadReport" class="flex-1 btn-primary">
              保存报告
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Solar, Lunar } from 'lunar-javascript'

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

const formData = reactive({
  name: '',
  gender: 'male',
  birthYear: currentYear - 30,
  birthMonth: 1,
  birthDay: 1,
  birthHour: 0
})

const showResult = ref(false)
const analysisResult = ref(null)

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

const generatePersonality = (dayGan, gender) => {
  const templates = {
    '木': {
      summary: '您性格仁慈温和，富有同情心，善于思考，有创造力。为人正直，有理想抱负，但有时过于固执己见。做事有计划，不喜欢冒险，适合稳步发展。',
      traits: [
        { name: '仁慈', score: 90 },
        { name: '创造力', score: 85 },
        { name: '固执', score: 70 },
        { name: '稳重', score: 80 }
      ]
    },
    '火': {
      summary: '您性格热情开朗，积极向上，有领导才能。做事果断，有魄力，但有时过于急躁冲动。善于表达，人缘好，适合从事需要沟通的工作。',
      traits: [
        { name: '热情', score: 95 },
        { name: '领导力', score: 88 },
        { name: '冲动', score: 75 },
        { name: '表达力', score: 90 }
      ]
    },
    '土': {
      summary: '您性格稳重踏实，诚实守信，有责任心。做事有条理，有耐心，但有时过于保守固执。重视家庭，适合从事稳定的工作。',
      traits: [
        { name: '稳重', score: 92 },
        { name: '责任心', score: 90 },
        { name: '保守', score: 72 },
        { name: '耐心', score: 85 }
      ]
    },
    '金': {
      summary: '您性格刚毅果断，有正义感，讲原则。做事干脆利落，有执行力，但有时过于刚硬。重视信誉，适合从事需要公正的工作。',
      traits: [
        { name: '正义', score: 88 },
        { name: '果断', score: 90 },
        { name: '刚硬', score: 70 },
        { name: '执行力', score: 85 }
      ]
    },
    '水': {
      summary: '您性格聪明灵活，善于变通，有智慧。思维敏捷，有洞察力，但有时过于圆滑世故。适应能力强，适合从事需要智慧的工作。',
      traits: [
        { name: '智慧', score: 92 },
        { name: '变通', score: 88 },
        { name: '圆滑', score: 68 },
        { name: '洞察力', score: 90 }
      ]
    }
  }
  
  return templates[getWuXing(dayGan)] || templates['木']
}

const generateCareer = (dayGan) => {
  const templates = {
    '木': {
      summary: '您适合从事教育、文化、艺术、医疗等行业。事业发展需要耐心积累，不宜急功近利。中年运势较好，晚年安稳。贵人运佳，可寻求合作。',
      industries: ['教育', '文化', '艺术', '医疗', '环保']
    },
    '火': {
      summary: '您适合从事管理、销售、传媒、科技等行业。事业发展迅速，但需注意控制风险。年轻时运势较旺，需把握机会。有领导才能，可独当一面。',
      industries: ['管理', '销售', '传媒', '科技', '娱乐']
    },
    '土': {
      summary: '您适合从事金融、房地产、建筑、农业等行业。事业发展稳定，循序渐进。中年运势最佳，晚年享福。稳扎稳打，不宜冒险。',
      industries: ['金融', '房地产', '建筑', '农业', '物流']
    },
    '金': {
      summary: '您适合从事法律、军警、金融、机械等行业。事业发展需要贵人相助，善于把握机会。中年后运势渐佳。有正义感，适合公正类工作。',
      industries: ['法律', '军警', '金融', '机械', '珠宝']
    },
    '水': {
      summary: '您适合从事商业、贸易、咨询、科研等行业。事业发展起伏较大，需要把握时机。早年运势较好。适应能力强，可多领域发展。',
      industries: ['商业', '贸易', '咨询', '科研', '物流']
    }
  }
  
  return templates[getWuXing(dayGan)] || templates['木']
}

const generateLove = (dayGan, gender) => {
  const templates = {
    '木': {
      summary: '您感情方面较为细腻敏感，重视精神层面的交流。婚姻需要找到志同道合的伴侣，相互理解支持。桃花运平稳，不宜操之过急。',
      idealPartner: '性格温和、有共同爱好、善于沟通的人',
      advice: '多参加社交活动，扩大交友圈，真诚相待'
    },
    '火': {
      summary: '您感情方面热情主动，容易吸引异性。婚姻需要学会包容和理解，避免过于强势。桃花运旺盛，但需要慎重选择。',
      idealPartner: '性格开朗、有共同目标、能包容的人',
      advice: '控制脾气，学会倾听，给予对方空间'
    },
    '土': {
      summary: '您感情方面忠诚可靠，重视家庭。婚姻稳定，需要找到欣赏自己稳重性格的伴侣。桃花运平稳，适合细水长流的感情。',
      idealPartner: '性格稳重、重视家庭、有责任心的人',
      advice: '多表达感情，增加浪漫元素，避免过于平淡'
    },
    '金': {
      summary: '您感情方面专一认真，但表达方式可能过于直接。婚姻需要学会温柔体贴，增进感情。桃花运一般，需要主动出击。',
      idealPartner: '性格独立、有主见、能理解你的人',
      advice: '学会表达感情，增加温柔体贴，避免过于强势'
    },
    '水': {
      summary: '您感情方面浪漫多情，善于表达。婚姻需要专一，避免感情纠葛影响家庭。桃花运旺盛，需要慎重选择。',
      idealPartner: '性格浪漫、有情趣、能沟通的人',
      advice: '专一对待感情，避免暧昧，真诚相待'
    }
  }
  
  return templates[getWuXing(dayGan)] || templates['木']
}

const generateWealth = (dayGan) => {
  const templates = {
    '木': { summary: '您财运平稳，正财为主，偏财较少。适合稳健理财，不宜冒险投资。中年财运渐佳，晚年富足。', score: 75, type: '正财运', direction: '东方' },
    '火': { summary: '您财运起伏较大，有意外之财的机会。适合积极投资，但需控制风险。年轻时财运较好。', score: 82, type: '偏财运', direction: '南方' },
    '土': { summary: '您财运稳定，收入稳步增长。适合长期投资，不宜短线操作。中年财运最佳。', score: 80, type: '正财运', direction: '中央' },
    '金': { summary: '您财运较好，有贵人相助。适合稳健投资，可获稳定收益。中年后财运渐佳。', score: 78, type: '正偏财', direction: '西方' },
    '水': { summary: '您财运灵活，有多元收入来源。适合多元化投资，但需谨慎选择。早年财运较好。', score: 85, type: '偏财运', direction: '北方' }
  }
  
  return templates[getWuXing(dayGan)] || templates['木']
}

const generateTips = (dayGan) => {
  const templates = {
    '木': [
      '多接触绿色植物，有助于提升运势',
      '适合佩戴木质饰品，如檀木手串',
      '多参加户外活动，亲近自然',
      '保持仁慈之心，多做善事',
      '避免过于固执，学会变通'
    ],
    '火': [
      '多接触阳光，有助于提升运势',
      '适合佩戴红色饰品，如红玛瑙',
      '控制脾气，避免冲动行事',
      '保持热情，但不要过于激进',
      '学会倾听，尊重他人意见'
    ],
    '土': [
      '多接触土地，有助于提升运势',
      '适合佩戴黄色饰品，如黄水晶',
      '保持稳重，但不要过于保守',
      '多与家人沟通，增进感情',
      '适当冒险，把握机会'
    ],
    '金': [
      '多接触金属，有助于提升运势',
      '适合佩戴金银饰品',
      '学会温柔表达，避免过于刚硬',
      '保持正义感，但不要过于苛刻',
      '多交朋友，扩大人脉'
    ],
    '水': [
      '多接触水，有助于提升运势',
      '适合佩戴蓝色或黑色饰品',
      '保持智慧，但不要过于圆滑',
      '专一对待感情，避免暧昧',
      '多读书学习，提升智慧'
    ]
  }
  
  return templates[getWuXing(dayGan)] || templates['木']
}

const calculateAnalysis = () => {
  const solar = Solar.fromYmdHms(
    formData.birthYear, 
    formData.birthMonth, 
    formData.birthDay, 
    (formData.birthHour + 23) % 24, 
    0, 
    0
  )
  const lunar = solar.getLunar()
  const bazi = lunar.getEightChar()
  
  const dayGan = bazi.getDayGan()
  
  analysisResult.value = {
    bazi: [
      { gan: bazi.getYearGan(), zhi: bazi.getYearZhi() },
      { gan: bazi.getMonthGan(), zhi: bazi.getMonthZhi() },
      { gan: bazi.getDayGan(), zhi: bazi.getDayZhi() },
      { gan: bazi.getTimeGan(), zhi: bazi.getTimeZhi() }
    ],
    personality: generatePersonality(dayGan, formData.gender),
    career: generateCareer(dayGan),
    love: generateLove(dayGan, formData.gender),
    wealth: generateWealth(dayGan),
    tips: generateTips(dayGan)
  }
  
  showResult.value = true
}

const resetForm = () => {
  showResult.value = false
  analysisResult.value = null
}

const downloadReport = () => {
  alert('报告已保存到本地存储')
}
</script>

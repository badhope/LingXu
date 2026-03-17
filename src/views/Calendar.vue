<template>
  <div class="calendar-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">黄历查询</h1>
        <p class="text-text-secondary text-body-lg">公历农历转换 · 宜忌事项 · 节气干支</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card p-6 mb-6">
            <div class="flex items-center justify-between mb-6">
              <button @click="prevMonth" class="btn-ghost p-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div class="text-center">
                <h2 class="font-serif text-h3 text-text-primary">{{ currentYear }}年{{ currentMonth }}月</h2>
                <p class="text-text-muted text-body-sm">{{ lunarMonthStr }}</p>
              </div>
              <button @click="nextMonth" class="btn-ghost p-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in weekDays" :key="day" class="text-center text-text-muted text-body-sm py-2">
                {{ day }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="(date, index) in calendarDays"
                :key="index"
                @click="selectDate(date)"
                class="aspect-square p-1 rounded text-center transition-all duration-200"
                :class="getDateClass(date)"
                :disabled="!date"
              >
                <template v-if="date">
                  <span class="block font-number text-body">{{ date.solar.getDay() }}</span>
                  <span class="block text-caption text-text-muted truncate">{{ date.lunarDay }}</span>
                </template>
              </button>
            </div>
          </div>

          <div class="flex gap-4 justify-center">
            <button @click="goToToday" class="btn-secondary text-body-sm">
              返回今日
            </button>
          </div>
        </div>

        <div class="lg:col-span-1">
          <Transition name="fade" mode="out-in">
            <div v-if="selectedDate" class="space-y-4" :key="selectedDate.solar.toFullString()">
              <div class="card p-6">
                <div class="text-center mb-6">
                  <div class="mb-2">
                    <span class="font-number text-date text-gold">{{ selectedDate.solar.getDay() }}</span>
                  </div>
                  <p class="font-serif text-h3 text-text-primary">{{ selectedDate.solar.getMonth() }}月</p>
                  <p class="text-text-muted text-body-sm">{{ selectedDate.solar.toFullString() }}</p>
                </div>

                <div class="text-center py-3 border-y border-gold/10">
                  <p class="text-gold font-serif text-body-lg">{{ selectedDate.lunar.toString() }}</p>
                  <p class="text-text-muted text-body-sm mt-1">{{ selectedDate.ganZhi }}</p>
                </div>

                <div class="mt-4 space-y-3">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-fortune-lucky font-serif">宜</span>
                    </div>
                    <p class="text-text-secondary text-body-sm leading-relaxed">
                      {{ selectedDate.yi || '诸事皆宜' }}
                    </p>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-text-muted font-serif">忌</span>
                    </div>
                    <p class="text-text-secondary text-body-sm leading-relaxed">
                      {{ selectedDate.ji || '无' }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="card p-6">
                <h3 class="font-serif text-h4 text-gold mb-4">干支信息</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">年柱</span>
                    <span class="text-text-secondary">{{ selectedDate.yearGanZhi }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">月柱</span>
                    <span class="text-text-secondary">{{ selectedDate.monthGanZhi }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">日柱</span>
                    <span class="text-text-secondary">{{ selectedDate.dayGanZhi }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">纳音</span>
                    <span class="text-text-secondary">{{ selectedDate.naYin }}</span>
                  </div>
                </div>
              </div>

              <div class="card p-6">
                <h3 class="font-serif text-h4 text-gold mb-4">神煞方位</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">值神</span>
                    <span class="text-text-secondary">{{ selectedDate.zhiShen }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">冲煞</span>
                    <span class="text-text-secondary">{{ selectedDate.chongSha }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">喜神</span>
                    <span class="text-jade">{{ selectedDate.xiShen }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">财神</span>
                    <span class="text-gold">{{ selectedDate.caiShen }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">福神</span>
                    <span class="text-text-secondary">{{ selectedDate.fuShen }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">阳贵</span>
                    <span class="text-text-secondary">{{ selectedDate.yangGui }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">阴贵</span>
                    <span class="text-text-secondary">{{ selectedDate.yinGui }}</span>
                  </div>
                </div>
              </div>

              <div class="card p-6">
                <h3 class="font-serif text-h4 text-gold mb-4">吉凶神煞</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-text-muted text-xs mb-1">吉神宜趋</p>
                    <p class="text-jade text-body-sm">{{ selectedDate.jiShen || '无' }}</p>
                  </div>
                  <div>
                    <p class="text-text-muted text-xs mb-1">凶神宜忌</p>
                    <p class="text-fortune-unlucky text-body-sm">{{ selectedDate.xiongShen || '无' }}</p>
                  </div>
                </div>
              </div>

              <div class="card p-6">
                <h3 class="font-serif text-h4 text-gold mb-4">星宿物候</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">二十八宿</span>
                    <span class="text-text-secondary">{{ selectedDate.xiu }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">月相</span>
                    <span class="text-text-secondary">{{ selectedDate.yueXiang }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">物候</span>
                    <span class="text-text-secondary">{{ selectedDate.wuHou || '无' }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">节气</span>
                    <span class="text-jade">{{ selectedDate.jieQi || '无' }}</span>
                  </div>
                </div>
              </div>

              <div class="card p-6">
                <h3 class="font-serif text-h4 text-gold mb-4">其他信息</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">建除</span>
                    <span class="text-text-secondary">{{ selectedDate.jianChu }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">五行</span>
                    <span class="text-text-secondary">{{ selectedDate.wuXing }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">星座</span>
                    <span class="text-text-secondary">{{ selectedDate.xingZuo }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">星期</span>
                    <span class="text-text-secondary">{{ selectedDate.weekDay }}</span>
                  </div>
                </div>
              </div>

              <div class="card p-6 bg-gold/5 border-gold/20">
                <h3 class="font-serif text-h4 text-gold mb-3">彭祖百忌</h3>
                <p class="text-text-secondary text-body-sm leading-relaxed">
                  {{ selectedDate.pengZu }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Solar, Lunar } from 'lunar-javascript'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const weekDayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const selectedDate = ref(null)

const lunarMonthStr = computed(() => {
  const solar = Solar.fromYmd(currentYear.value, currentMonth.value, 1)
  const lunar = solar.getLunar()
  return lunar.getMonthInChinese() + '月'
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value, 0)
  const startDay = firstDay.getDay()

  for (let i = 0; i < startDay; i++) {
    days.push(null)
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const solar = Solar.fromYmd(currentYear.value, currentMonth.value, d)
    const lunar = solar.getLunar()
    
    days.push({
      solar,
      lunar,
      lunarDay: lunar.getDayInChinese(),
      isToday: isToday(solar),
      isCurrentMonth: true
    })
  }

  return days
})

const isToday = (solar) => {
  const today = new Date()
  return solar.getYear() === today.getFullYear() &&
         solar.getMonth() === today.getMonth() + 1 &&
         solar.getDay() === today.getDate()
}

const getDateClass = (date) => {
  if (!date) return 'invisible'
  
  const classes = ['hover:bg-gold/10']
  
  if (date.isToday) {
    classes.push('bg-gold/20', 'text-gold')
  }
  
  if (selectedDate.value && 
      date.solar.toFullString() === selectedDate.value.solar.toFullString()) {
    classes.push('ring-2', 'ring-gold')
  }
  
  return classes.join(' ')
}

const selectDate = (date) => {
  if (!date) return
  
  const lunar = date.lunar
  const solar = date.solar
  
  const yearGanZhi = lunar.getYearInGanZhi()
  const monthGanZhi = lunar.getMonthInGanZhi()
  const dayGanZhi = lunar.getDayInGanZhi()
  
  selectedDate.value = {
    solar,
    lunar,
    lunarDay: date.lunarDay,
    ganZhi: yearGanZhi + '年' + monthGanZhi + '月' + dayGanZhi + '日',
    yearGanZhi,
    monthGanZhi,
    dayGanZhi,
    yi: lunar.getDayYi().join('、'),
    ji: lunar.getDayJi().join('、'),
    zhiShen: lunar.getDayZhiXing(),
    chongSha: lunar.getDayChong() + ' ' + lunar.getDaySha(),
    wuXing: lunar.getDayWuXing(),
    jieQi: lunar.getJieQi(),
    xingZuo: solar.getXingZuo().getName() + '座',
    naYin: lunar.getDayNaYin(),
    xiShen: lunar.getDayPositionXiDesc(),
    caiShen: lunar.getDayPositionCaiDesc(),
    fuShen: lunar.getDayPositionFuDesc(),
    yangGui: lunar.getDayPositionYangGuiDesc(),
    yinGui: lunar.getDayPositionYinGuiDesc(),
    jiShen: lunar.getDayJiShen().join('、') || '无',
    xiongShen: lunar.getDayXiongShen().join('、') || '无',
    xiu: lunar.getXiu().getName() + ' ' + lunar.getXiu().getLuck().getName(),
    yueXiang: lunar.getYueXiang(),
    wuHou: lunar.getWuHou(),
    jianChu: lunar.getDayJianChu(),
    pengZu: lunar.getDayPengZuGan() + ' ' + lunar.getDayPengZuZhi(),
    weekDay: weekDayNames[solar.getWeek()]
  }
}

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const goToToday = () => {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
  
  const solar = Solar.fromDate(today)
  const lunar = solar.getLunar()
  selectDate({ solar, lunar, lunarDay: lunar.getDayInChinese() })
}

onMounted(() => {
  goToToday()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

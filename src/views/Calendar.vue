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
            <div v-if="selectedDate" class="card p-6" :key="selectedDate.solar.toFullString()">
              <div class="text-center mb-6">
                <div class="mb-2">
                  <span class="font-number text-date text-gold">{{ selectedDate.solar.getDay() }}</span>
                </div>
                <p class="font-serif text-h3 text-text-primary">{{ selectedDate.solar.getMonth() }}月</p>
                <p class="text-text-muted text-body-sm">{{ selectedDate.solar.toFullString() }}</p>
              </div>

              <div class="space-y-4">
                <div class="text-center py-3 border-y border-gold/10">
                  <p class="text-gold font-serif text-body-lg">{{ selectedDate.lunar.toString() }}</p>
                  <p class="text-text-muted text-body-sm mt-1">{{ selectedDate.ganZhi }}</p>
                </div>

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

                <div class="pt-4 border-t border-gold/10 space-y-2">
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">值神</span>
                    <span class="text-text-secondary">{{ selectedDate.zhiShen }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">冲煞</span>
                    <span class="text-text-secondary">{{ selectedDate.chongSha }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">五行</span>
                    <span class="text-text-secondary">{{ selectedDate.wuXing }}</span>
                  </div>
                  <div class="flex justify-between text-body-sm">
                    <span class="text-text-muted">节气</span>
                    <span class="text-text-secondary">{{ selectedDate.jieQi || '无' }}</span>
                  </div>
                </div>

                <div class="pt-4 border-t border-gold/10">
                  <p class="text-text-muted text-caption">
                    {{ selectedDate.xingZuo }}
                  </p>
                </div>
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
  
  selectedDate.value = {
    solar: date.solar,
    lunar: date.lunar,
    lunarDay: date.lunarDay,
    ganZhi: date.lunar.getYearInGanZhi() + '年' + date.lunar.getMonthInGanZhi() + '月' + date.lunar.getDayInGanZhi() + '日',
    yi: date.lunar.getDayYi().join('、'),
    ji: date.lunar.getDayJi().join('、'),
    zhiShen: date.lunar.getDayZhiXing(),
    chongSha: date.lunar.getDayChong() + ' ' + date.lunar.getDaySha(),
    wuXing: date.lunar.getDayWuXing(),
    jieQi: date.lunar.getJieQi(),
    xingZuo: date.solar.getXingZuo().getName() + '座'
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

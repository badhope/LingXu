<template>
  <div class="name-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">姓名测试</h1>
        <p class="text-text-secondary text-body-lg">五行数理，解析姓名玄机</p>
      </header>

      <div class="card p-8 mb-8">
        <form @submit.prevent="analyzeNameSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-text-secondary text-body mb-2">姓氏</label>
              <input
                v-model="xing"
                type="text"
                placeholder="请输入姓氏"
                maxlength="4"
                class="w-full px-4 py-3 bg-abyss/50 border border-gold/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div>
              <label class="block text-text-secondary text-body mb-2">名字</label>
              <input
                v-model="ming"
                type="text"
                placeholder="请输入名字"
                maxlength="4"
                class="w-full px-4 py-3 bg-abyss/50 border border-gold/20 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn-primary" :disabled="!xing || !ming">
              开始测试
            </button>
          </div>
        </form>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="result" key="result" class="space-y-6">
          <div class="card p-8 text-center">
            <div class="mb-6">
              <span class="font-title text-hero text-gold">{{ result.fullName }}</span>
            </div>
            
            <div class="flex items-center justify-center gap-4 mb-6">
              <div class="text-center">
                <div class="text-6xl font-number text-jade">{{ result.totalScore }}</div>
                <div class="text-text-muted text-sm">综合评分</div>
              </div>
              <div class="w-px h-16 bg-gold/20" />
              <div class="text-center">
                <div class="text-3xl font-serif" :class="getScoreColor(result.assessment)">
                  {{ result.assessment }}
                </div>
                <div class="text-text-muted text-sm">姓名评级</div>
              </div>
            </div>

            <div class="inline-block px-4 py-2 bg-gold/10 rounded-lg">
              <span class="text-gold">五行主属：</span>
              <span class="font-serif text-text-primary">{{ result.dominantWuxing }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card p-6">
              <h3 class="font-serif text-h4 text-gold mb-4">天格 {{ result.tiange.number }}</h3>
              <div class="space-y-2 text-text-secondary text-body">
                <p><span class="text-text-muted">阴阳：</span>{{ result.tiange.yinyang }}</p>
                <p><span class="text-text-muted">吉凶：</span>{{ result.tiange.score }}</p>
                <p>{{ result.tiange.desc }}</p>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="font-serif text-h4 text-gold mb-4">人格 {{ result.renge.number }}</h3>
              <div class="space-y-2 text-text-secondary text-body">
                <p><span class="text-text-muted">阴阳：</span>{{ result.renge.yinyang }}</p>
                <p><span class="text-text-muted">五行：</span>{{ result.renge.wuxing }}</p>
                <p>{{ result.renge.desc }}</p>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="font-serif text-h4 text-gold mb-4">地格 {{ result.dige.number }}</h3>
              <div class="space-y-2 text-text-secondary text-body">
                <p><span class="text-text-muted">阴阳：</span>{{ result.dige.yinyang }}</p>
                <p><span class="text-text-muted">五行：</span>{{ result.dige.wuxing }}</p>
                <p>{{ result.dige.desc }}</p>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="font-serif text-h4 text-gold mb-4">总格 {{ result.zongge.number }}</h3>
              <div class="space-y-2 text-text-secondary text-body">
                <p><span class="text-text-muted">阴阳：</span>{{ result.zongge.yinyang }}</p>
                <p><span class="text-text-muted">吉凶：</span>{{ result.zongge.score }}</p>
                <p>{{ result.zongge.desc }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-gold mb-4">五行分析</h3>
            <div class="grid grid-cols-5 gap-4 mb-4">
              <div
                v-for="(count, wuxing) in result.wuxingCount"
                :key="wuxing"
                class="text-center p-3 rounded-lg"
                :class="wuxing === result.dominantWuxing ? 'bg-gold/10 border border-gold/30' : 'bg-abyss/50'"
              >
                <div class="text-2xl mb-1">{{ getWuxingIcon(wuxing) }}</div>
                <div class="text-text-primary font-serif">{{ wuxing }}</div>
                <div class="text-text-muted text-sm">{{ count }}</div>
              </div>
            </div>
            
            <div class="p-4 bg-jade/10 rounded-lg border border-jade/20">
              <p class="text-text-secondary text-body leading-relaxed">
                {{ getWuxingDescription(result.dominantWuxing).characteristic }}
              </p>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-serif text-h4 text-gold mb-4">人生建议</h3>
            <div class="space-y-4 text-text-secondary text-body">
              <div class="flex items-start gap-3">
                <span class="text-gold">事业：</span>
                <p>{{ getWuxingDescription(result.dominantWuxing).suitable }}</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-gold">性格：</span>
                <p>{{ getWuxingDescription(result.dominantWuxing).advice }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6 bg-gold/5 border-gold/20">
            <h3 class="font-serif text-h4 text-gold mb-4">温馨提示</h3>
            <p class="text-text-muted text-body leading-relaxed">
              姓名测试仅供参考，人生的命运掌握在自己手中。姓名只是人生的一个符号，
              真正决定命运的是个人的努力、选择和机遇。请以积极的心态面对生活，
              用自己的双手创造美好的未来。
            </p>
          </div>
        </div>

        <div v-else key="empty" class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <p class="text-text-muted text-body-lg">输入姓名开始测试</p>
        </div>
      </Transition>

      <div class="mt-12 text-center">
        <div class="card p-8 max-w-lg mx-auto">
          <h3 class="font-serif text-h4 text-text-primary mb-4">关于姓名学</h3>
          <p class="text-text-muted text-body leading-relaxed">
            姓名学是中国传统文化的一部分，通过分析姓名的笔画数、五行属性、
            天地人三才配置等，来推测姓名对人生的影响。姓名学认为，
            一个好的姓名应该五行平衡、数理吉祥、寓意美好。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { analyzeName, getWuxingDescription } from '@/data/names.js'

const xing = ref('')
const ming = ref('')
const result = ref(null)

const analyzeNameSubmit = () => {
  if (!xing.value || !ming.value) return
  
  result.value = analyzeName(xing.value, ming.value)
}

const getScoreColor = (assessment) => {
  const colors = {
    '大吉': 'text-fortune-lucky',
    '吉': 'text-jade',
    '平': 'text-gold',
    '凶': 'text-fortune-unlucky'
  }
  return colors[assessment] || 'text-text-primary'
}

const getWuxingIcon = (wuxing) => {
  const icons = {
    '金': '🪙',
    '木': '🌳',
    '水': '💧',
    '火': '🔥',
    '土': '🏔️'
  }
  return icons[wuxing] || '❓'
}
</script>

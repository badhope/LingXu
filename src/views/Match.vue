<template>
  <div class="match-page min-h-screen pt-24 pb-20 px-3 sm:px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-8 sm:mb-12">
        <h1 class="font-title text-2xl sm:text-h1 text-text-primary mb-2 sm:mb-4">生肖星座配对</h1>
        <p class="text-text-secondary text-body sm:text-body-lg">缘分天定，姻缘可测</p>
      </header>

      <div class="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <button
          @click="activeTab = 'zodiac'"
          class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-serif text-sm sm:text-base transition-all duration-300"
          :class="activeTab === 'zodiac' ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-abyss/50 text-text-secondary hover:text-gold'"
        >
          🐲 生肖
        </button>
        <button
          @click="activeTab = 'constellation'"
          class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-serif text-sm sm:text-base transition-all duration-300"
          :class="activeTab === 'constellation' ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-abyss/50 text-text-secondary hover:text-gold'"
        >
          ⭐ 星座
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === 'zodiac'" key="zodiac">
          <div class="card p-4 sm:p-8 mb-6 sm:mb-8">
            <h3 class="font-serif text-lg sm:text-h4 text-text-primary mb-4 sm:mb-6 text-center">选择生肖</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div>
                <p class="text-text-muted text-xs sm:text-sm mb-2 sm:mb-4 text-center">第一人</p>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button
                    v-for="zodiac in zodiacList"
                    :key="zodiac.id"
                    @click="zodiac1 = zodiac.id"
                    class="p-2 sm:p-3 rounded-lg text-center transition-all duration-300"
                    :class="zodiac1 === zodiac.id ? 'bg-gold/20 border border-gold/30 text-gold' : 'bg-abyss/50 text-text-secondary hover:text-gold hover:bg-gold/10'"
                  >
                    <div class="text-lg sm:text-2xl mb-1">{{ zodiac.icon }}</div>
                    <div class="text-xs">{{ zodiac.name }}</div>
                  </button>
                </div>
              </div>
              
              <div>
                <p class="text-text-muted text-xs sm:text-sm mb-2 sm:mb-4 text-center">第二人</p>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button
                    v-for="zodiac in zodiacList"
                    :key="zodiac.id"
                    @click="zodiac2 = zodiac.id"
                    class="p-2 sm:p-3 rounded-lg text-center transition-all duration-300"
                    :class="zodiac2 === zodiac.id ? 'bg-gold/20 border border-gold/30 text-gold' : 'bg-abyss/50 text-text-secondary hover:text-gold hover:bg-gold/10'"
                  >
                    <div class="text-lg sm:text-2xl mb-1">{{ zodiac.icon }}</div>
                    <div class="text-xs">{{ zodiac.name }}</div>
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-4 sm:mt-8">
              <button
                @click="calculateZodiacMatch"
                class="btn-primary text-sm sm:text-base"
                :disabled="!zodiac1 || !zodiac2"
              >
                开始配对
              </button>
            </div>
          </div>

          <Transition name="fade" mode="out-in">
            <div v-if="zodiacResult" key="result" class="space-y-4 sm:space-y-6">
              <div class="card p-4 sm:p-8 text-center">
                <div class="flex items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
                  <div class="text-center">
                    <div class="text-3xl sm:text-5xl mb-1 sm:mb-2">{{ getZodiacInfo(zodiac1).icon }}</div>
                    <div class="font-serif text-sm sm:text-base text-text-primary">{{ getZodiacInfo(zodiac1).name }}</div>
                  </div>
                  <div class="text-2xl sm:text-4xl text-gold">💕</div>
                  <div class="text-center">
                    <div class="text-3xl sm:text-5xl mb-1 sm:mb-2">{{ getZodiacInfo(zodiac2).icon }}</div>
                    <div class="font-serif text-sm sm:text-base text-text-primary">{{ getZodiacInfo(zodiac2).name }}</div>
                  </div>
                </div>

                <div class="mb-4 sm:mb-6">
                  <div class="text-4xl sm:text-6xl font-number" :class="getScoreColor(zodiacResult.level)">
                    {{ zodiacResult.score }}
                  </div>
                  <div class="text-text-muted text-xs sm:text-sm">匹配分数</div>
                </div>

                <div class="inline-block px-4 sm:px-6 py-1 sm:py-2 rounded-full" :class="getLevelBg(zodiacResult.level)">
                  <span class="font-serif text-sm sm:text-lg" :class="getScoreColor(zodiacResult.level)">
                    {{ zodiacResult.level }}
                  </span>
                </div>

                <p class="text-text-secondary text-sm sm:text-body mt-4 sm:mt-6">{{ zodiacResult.summary }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div class="card p-4 sm:p-6">
                  <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💕 感情运势</h3>
                  <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ zodiacResult.love }}</p>
                </div>

                <div class="card p-4 sm:p-6">
                  <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💼 事业合作</h3>
                  <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ zodiacResult.career }}</p>
                </div>
              </div>

              <div class="card p-4 sm:p-6 bg-gold/5 border-gold/20">
                <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💝 相处建议</h3>
                <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ zodiacResult.advice }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <div v-else key="constellation">
          <div class="card p-4 sm:p-8 mb-6 sm:mb-8">
            <h3 class="font-serif text-lg sm:text-h4 text-text-primary mb-4 sm:mb-6 text-center">选择星座</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div>
                <p class="text-text-muted text-xs sm:text-sm mb-2 sm:mb-4 text-center">第一人</p>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button
                    v-for="constellation in constellationList"
                    :key="constellation.id"
                    @click="constellation1 = constellation.id"
                    class="p-2 sm:p-3 rounded-lg text-center transition-all duration-300"
                    :class="constellation1 === constellation.id ? 'bg-gold/20 border border-gold/30 text-gold' : 'bg-abyss/50 text-text-secondary hover:text-gold hover:bg-gold/10'"
                  >
                    <div class="text-lg sm:text-2xl mb-1">{{ constellation.icon }}</div>
                    <div class="text-xs">{{ constellation.name }}</div>
                  </button>
                </div>
              </div>
              
              <div>
                <p class="text-text-muted text-xs sm:text-sm mb-2 sm:mb-4 text-center">第二人</p>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  <button
                    v-for="constellation in constellationList"
                    :key="constellation.id"
                    @click="constellation2 = constellation.id"
                    class="p-2 sm:p-3 rounded-lg text-center transition-all duration-300"
                    :class="constellation2 === constellation.id ? 'bg-gold/20 border border-gold/30 text-gold' : 'bg-abyss/50 text-text-secondary hover:text-gold hover:bg-gold/10'"
                  >
                    <div class="text-lg sm:text-2xl mb-1">{{ constellation.icon }}</div>
                    <div class="text-xs">{{ constellation.name }}</div>
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-4 sm:mt-8">
              <button
                @click="calculateConstellationMatch"
                class="btn-primary text-sm sm:text-base"
                :disabled="!constellation1 || !constellation2"
              >
                开始配对
              </button>
            </div>
          </div>

          <Transition name="fade" mode="out-in">
            <div v-if="constellationResult" key="result" class="space-y-4 sm:space-y-6">
              <div class="card p-4 sm:p-8 text-center">
                <div class="flex items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
                  <div class="text-center">
                    <div class="text-3xl sm:text-5xl mb-1 sm:mb-2">{{ getConstellationInfo(constellation1).icon }}</div>
                    <div class="font-serif text-sm sm:text-base text-text-primary">{{ getConstellationInfo(constellation1).name }}</div>
                  </div>
                  <div class="text-2xl sm:text-4xl text-gold">💕</div>
                  <div class="text-center">
                    <div class="text-3xl sm:text-5xl mb-1 sm:mb-2">{{ getConstellationInfo(constellation2).icon }}</div>
                    <div class="font-serif text-sm sm:text-base text-text-primary">{{ getConstellationInfo(constellation2).name }}</div>
                  </div>
                </div>

                <div class="mb-4 sm:mb-6">
                  <div class="text-4xl sm:text-6xl font-number" :class="getScoreColor(constellationResult.level)">
                    {{ constellationResult.score }}
                  </div>
                  <div class="text-text-muted text-xs sm:text-sm">匹配分数</div>
                </div>

                <div class="inline-block px-4 sm:px-6 py-1 sm:py-2 rounded-full" :class="getLevelBg(constellationResult.level)">
                  <span class="font-serif text-sm sm:text-lg" :class="getScoreColor(constellationResult.level)">
                    {{ constellationResult.level }}
                  </span>
                </div>

                <p class="text-text-secondary text-sm sm:text-body mt-4 sm:mt-6">{{ constellationResult.summary }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div class="card p-4 sm:p-6">
                  <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💕 感情运势</h3>
                  <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ constellationResult.love }}</p>
                </div>

                <div class="card p-4 sm:p-6">
                  <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💼 事业合作</h3>
                  <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ constellationResult.career }}</p>
                </div>
              </div>

              <div class="card p-4 sm:p-6 bg-gold/5 border-gold/20">
                <h3 class="font-serif text-base sm:text-lg text-gold mb-2 sm:mb-4">💝 相处建议</h3>
                <p class="text-text-secondary text-sm sm:text-base leading-relaxed">{{ constellationResult.advice }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>

      <div class="mt-12 text-center">
        <div class="card p-8 max-w-lg mx-auto">
          <h3 class="font-serif text-h4 text-text-primary mb-4">温馨提示</h3>
          <p class="text-text-muted text-body leading-relaxed">
            生肖星座配对仅供参考娱乐，真正的感情需要双方共同经营。
            相互理解、包容和尊重才是维系感情的关键。愿天下有情人终成眷属！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { zodiacList, getZodiacMatch, getZodiacById } from '@/data/zodiac.js'

const activeTab = ref('zodiac')

const zodiac1 = ref(null)
const zodiac2 = ref(null)
const zodiacResult = ref(null)

const constellation1 = ref(null)
const constellation2 = ref(null)
const constellationResult = ref(null)

const constellationList = [
  { id: 'aries', name: '白羊', icon: '♈', order: 1 },
  { id: 'taurus', name: '金牛', icon: '♉', order: 2 },
  { id: 'gemini', name: '双子', icon: '♊', order: 3 },
  { id: 'cancer', name: '巨蟹', icon: '♋', order: 4 },
  { id: 'leo', name: '狮子', icon: '♌', order: 5 },
  { id: 'virgo', name: '处女', icon: '♍', order: 6 },
  { id: 'libra', name: '天秤', icon: '♎', order: 7 },
  { id: 'scorpio', name: '天蝎', icon: '♏', order: 8 },
  { id: 'sagittarius', name: '射手', icon: '♐', order: 9 },
  { id: 'capricorn', name: '摩羯', icon: '♑', order: 10 },
  { id: 'aquarius', name: '水瓶', icon: '♒', order: 11 },
  { id: 'pisces', name: '双鱼', icon: '♓', order: 12 }
]

const constellationMatchData = {
  'aries-aries': { score: 75, level: '中吉', summary: '热情相撞，火花四溅', love: '两人都热情奔放，相处充满激情，但也容易产生竞争和冲突。', career: '合作有冲劲，但需要明确分工。', advice: '学会互相退让，不要争强好胜。' },
  'aries-taurus': { score: 55, level: '中平', summary: '一动一静，需要磨合', love: '白羊的冲动与金牛的稳重形成对比，需要互相适应。', career: '合作需要找到平衡点。', advice: '多沟通，少争执。' },
  'aries-gemini': { score: 85, level: '大吉', summary: '志同道合，趣味相投', love: '两人都充满活力，相处充满乐趣。', career: '合作默契，创意无限。', advice: '保持新鲜感，共同探索。' },
  'aries-cancer': { score: 60, level: '中平', summary: '性格差异，需要理解', love: '白羊的直接与巨蟹的敏感需要互相包容。', career: '合作需要建立信任。', advice: '多关心对方的感受。' },
  'aries-leo': { score: 90, level: '大吉', summary: '火象相合，激情四射', love: '两人都热情如火，感情热烈。', career: '合作有魄力，事业容易成功。', advice: '互相欣赏，共同进步。' },
  'aries-virgo': { score: 50, level: '凶', summary: '性格迥异，需要磨合', love: '白羊的随意与处女的完美主义容易产生冲突。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'aries-libra': { score: 70, level: '中吉', summary: '互补性强，相处和谐', love: '白羊的果断与天秤的优雅形成互补。', career: '合作顺畅，互相补充。', advice: '保持平衡，互相尊重。' },
  'aries-scorpio': { score: 65, level: '中平', summary: '性格强烈，需要磨合', love: '两人都性格强烈，容易产生碰撞。', career: '合作需要建立信任。', advice: '多沟通，少猜忌。' },
  'aries-sagittarius': { score: 95, level: '大吉', summary: '火象相合，天作之合', love: '两人都热爱自由，相处充满乐趣。', career: '合作默契，事业蒸蒸日上。', advice: '珍惜这份难得的缘分。' },
  'aries-capricorn': { score: 55, level: '中平', summary: '一动一静，需要适应', love: '白羊的冲动与摩羯的稳重需要互相适应。', career: '合作需要明确分工。', advice: '互相学习，取长补短。' },
  'aries-aquarius': { score: 80, level: '大吉', summary: '志同道合，互相欣赏', love: '两人都追求自由，相处轻松愉快。', career: '合作有创意，互相支持。', advice: '保持独立，共同成长。' },
  'aries-pisces': { score: 60, level: '中平', summary: '性格差异，需要理解', love: '白羊的直接与双鱼的浪漫需要互相包容。', career: '合作需要找到共同点。', advice: '多关心对方的感受。' },
  'taurus-taurus': { score: 80, level: '大吉', summary: '稳重相投，感情稳定', love: '两人都踏实稳重，感情稳定长久。', career: '合作稳健，互相信任。', advice: '适当增加生活的情趣。' },
  'taurus-gemini': { score: 50, level: '凶', summary: '性格迥异，需要磨合', love: '金牛的稳重与双子善变容易产生冲突。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'taurus-cancer': { score: 90, level: '大吉', summary: '土象水象，天作之合', love: '金牛的稳重与巨蟹的温柔完美搭配。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'taurus-leo': { score: 55, level: '中平', summary: '固执相遇，需要磨合', love: '金牛的固执与狮子的强势需要互相退让。', career: '合作需要明确分工。', advice: '多沟通，少固执。' },
  'taurus-virgo': { score: 95, level: '大吉', summary: '土象相合，珠联璧合', love: '金牛的稳重与处女的完美主义完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'taurus-libra': { score: 65, level: '中平', summary: '金星守护，审美相投', love: '两人都追求美好，但方式不同。', career: '合作需要协调。', advice: '互相欣赏，取长补短。' },
  'taurus-scorpio': { score: 85, level: '大吉', summary: '对宫相吸，深情厚意', love: '金牛的稳重与天蝎的深情完美结合。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'taurus-sagittarius': { score: 50, level: '凶', summary: '一动一静，难以协调', love: '金牛的稳重与射手的奔放难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'taurus-capricorn': { score: 95, level: '大吉', summary: '土象相合，珠联璧合', love: '金牛的稳重与摩羯的踏实完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'taurus-aquarius': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '金牛的稳重与水瓶的叛逆需要互相适应。', career: '合作需要找到共同点。', advice: '多沟通，互相理解。' },
  'taurus-pisces': { score: 85, level: '大吉', summary: '土象水象，天作之合', love: '金牛的稳重与双鱼的浪漫完美搭配。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'gemini-gemini': { score: 70, level: '中吉', summary: '聪明相投，趣味盎然', love: '两人都聪明活泼，相处充满乐趣。', career: '合作有创意，但可能缺乏稳定性。', advice: '学会坚持，不要过于善变。' },
  'gemini-cancer': { score: 55, level: '中平', summary: '性格差异，需要理解', love: '双子的善变与巨蟹的敏感需要互相包容。', career: '合作需要建立信任。', advice: '多关心对方的感受。' },
  'gemini-leo': { score: 80, level: '大吉', summary: '风火相生，志同道合', love: '双子的聪明与狮子的热情完美结合。', career: '合作默契，事业顺利。', advice: '互相欣赏，共同进步。' },
  'gemini-virgo': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '双子的随意与处女的完美主义需要互相适应。', career: '合作需要找到平衡点。', advice: '互相学习，取长补短。' },
  'gemini-libra': { score: 90, level: '大吉', summary: '风象相合，珠联璧合', love: '双子的聪明与天秤的优雅完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'gemini-scorpio': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '双子的善变与天蝎的深沉难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'gemini-sagittarius': { score: 85, level: '大吉', summary: '对宫相吸，志同道合', love: '双子的聪明与射手的奔放完美结合。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'gemini-capricorn': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '双子的善变与摩羯的稳重难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'gemini-aquarius': { score: 95, level: '大吉', summary: '风象相合，天作之合', love: '两人都追求自由和智慧，相处轻松愉快。', career: '合作默契，创意无限。', advice: '珍惜这份难得的缘分。' },
  'gemini-pisces': { score: 55, level: '中平', summary: '性格差异，需要理解', love: '双子的理性与双鱼的感性需要互相包容。', career: '合作需要找到共同点。', advice: '多关心对方的感受。' },
  'cancer-cancer': { score: 75, level: '中吉', summary: '温柔相投，感情深厚', love: '两人都温柔体贴，感情深厚。', career: '合作稳定，互相支持。', advice: '适当增加决断力。' },
  'cancer-leo': { score: 60, level: '中平', summary: '一柔一刚，需要磨合', love: '巨蟹的温柔与狮子的强势需要互相适应。', career: '合作需要明确分工。', advice: '互相尊重，取长补短。' },
  'cancer-virgo': { score: 85, level: '大吉', summary: '水土相合，天作之合', love: '巨蟹的温柔与处女的细心完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'cancer-libra': { score: 60, level: '中平', summary: '性格差异，需要磨合', love: '巨蟹的敏感与天秤的优雅需要互相适应。', career: '合作需要建立信任。', advice: '多沟通，互相理解。' },
  'cancer-scorpio': { score: 95, level: '大吉', summary: '水象相合，珠联璧合', love: '巨蟹的温柔与天蝎的深情完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'cancer-sagittarius': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '巨蟹的敏感与射手的奔放难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'cancer-capricorn': { score: 85, level: '大吉', summary: '对宫相吸，互补性强', love: '巨蟹的温柔与摩羯的稳重完美结合。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'cancer-aquarius': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '巨蟹的敏感与水瓶的叛逆难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'cancer-pisces': { score: 95, level: '大吉', summary: '水象相合，天作之合', love: '巨蟹的温柔与双鱼的浪漫完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'leo-leo': { score: 75, level: '中吉', summary: '王者相遇，互相欣赏', love: '两人都热情大方，互相欣赏。', career: '合作有魄力，但需要明确分工。', advice: '学会互相退让，不要争强好胜。' },
  'leo-virgo': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '狮子的强势与处女的完美主义需要互相适应。', career: '合作需要找到平衡点。', advice: '互相学习，取长补短。' },
  'leo-libra': { score: 80, level: '大吉', summary: '风火相生，珠联璧合', love: '狮子的热情与天秤的优雅完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'leo-scorpio': { score: 60, level: '中平', summary: '性格强烈，需要磨合', love: '狮子的强势与天蝎的深沉需要互相适应。', career: '合作需要建立信任。', advice: '多沟通，少争执。' },
  'leo-sagittarius': { score: 90, level: '大吉', summary: '火象相合，天作之合', love: '狮子的热情与射手的奔放完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'leo-capricorn': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '狮子的强势与摩羯的稳重需要互相适应。', career: '合作需要明确分工。', advice: '互相尊重，取长补短。' },
  'leo-aquarius': { score: 70, level: '中吉', summary: '对宫相吸，互相欣赏', love: '狮子的热情与水瓶的叛逆形成吸引力。', career: '合作有创意，互相支持。', advice: '保持独立，共同成长。' },
  'leo-pisces': { score: 60, level: '中平', summary: '性格差异，需要理解', love: '狮子的强势与双鱼的浪漫需要互相包容。', career: '合作需要找到共同点。', advice: '多关心对方的感受。' },
  'virgo-virgo': { score: 75, level: '中吉', summary: '完美相投，互相理解', love: '两人都追求完美，互相理解。', career: '合作严谨，但可能过于挑剔。', advice: '学会包容，不要过于苛求。' },
  'virgo-libra': { score: 70, level: '中吉', summary: '互补性强，相处和谐', love: '处女的细心与天秤的优雅形成互补。', career: '合作顺畅，互相补充。', advice: '保持平衡，互相尊重。' },
  'virgo-scorpio': { score: 85, level: '大吉', summary: '水土相合，珠联璧合', love: '处女的细心与天蝎的深情完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'virgo-sagittarius': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '处女的完美主义与射手的奔放难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'virgo-capricorn': { score: 95, level: '大吉', summary: '土象相合，天作之合', love: '处女的细心与摩羯的踏实完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'virgo-aquarius': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '处女的完美主义与水瓶的叛逆需要互相适应。', career: '合作需要找到共同点。', advice: '多沟通，互相理解。' },
  'virgo-pisces': { score: 85, level: '大吉', summary: '对宫相吸，互补性强', love: '处女的细心与双鱼的浪漫完美结合。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'libra-libra': { score: 80, level: '大吉', summary: '优雅相投，和谐美满', love: '两人都追求和谐美好，感情稳定。', career: '合作顺畅，互相支持。', advice: '适当增加决断力。' },
  'libra-scorpio': { score: 60, level: '中平', summary: '性格差异，需要磨合', love: '天秤的优雅与天蝎的深沉需要互相适应。', career: '合作需要建立信任。', advice: '多沟通，少猜忌。' },
  'libra-sagittarius': { score: 80, level: '大吉', summary: '风火相生，志同道合', love: '天秤的优雅与射手的奔放完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'libra-capricorn': { score: 60, level: '中平', summary: '性格差异，需要磨合', love: '天秤的优雅与摩羯的稳重需要互相适应。', career: '合作需要明确分工。', advice: '互相尊重，取长补短。' },
  'libra-aquarius': { score: 90, level: '大吉', summary: '风象相合，珠联璧合', love: '天秤的优雅与水瓶的叛逆完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'libra-pisces': { score: 70, level: '中吉', summary: '互补性强，相处和谐', love: '天秤的优雅与双鱼的浪漫形成互补。', career: '合作顺畅，互相补充。', advice: '保持平衡，互相尊重。' },
  'scorpio-scorpio': { score: 70, level: '中吉', summary: '深情相投，感情深厚', love: '两人都深情专一，感情深厚。', career: '合作稳定，但可能过于敏感。', advice: '适当增加信任，少猜忌。' },
  'scorpio-sagittarius': { score: 50, level: '凶', summary: '性格迥异，难以协调', love: '天蝎的深沉与射手的奔放难以协调。', career: '合作需要大量磨合。', advice: '学会欣赏对方的不同。' },
  'scorpio-capricorn': { score: 85, level: '大吉', summary: '水土相合，珠联璧合', love: '天蝎的深情与摩羯的稳重完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'scorpio-aquarius': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '天蝎的深沉与水瓶的叛逆需要互相适应。', career: '合作需要建立信任。', advice: '多沟通，互相理解。' },
  'scorpio-pisces': { score: 95, level: '大吉', summary: '水象相合，天作之合', love: '天蝎的深情与双鱼的浪漫完美结合。', career: '合作默契，事业必定成功。', advice: '珍惜这份难得的缘分。' },
  'sagittarius-sagittarius': { score: 75, level: '中吉', summary: '自由相投，志同道合', love: '两人都热爱自由，相处轻松愉快。', career: '合作有激情，但可能缺乏持久性。', advice: '学会坚持，不要三分钟热度。' },
  'sagittarius-capricorn': { score: 55, level: '中平', summary: '一动一静，需要磨合', love: '射手的奔放与摩羯的稳重需要互相适应。', career: '合作需要明确分工。', advice: '互相学习，取长补短。' },
  'sagittarius-aquarius': { score: 85, level: '大吉', summary: '风火相生，志同道合', love: '射手的奔放与水瓶的叛逆完美结合。', career: '合作默契，事业顺利。', advice: '珍惜这份难得的缘分。' },
  'sagittarius-pisces': { score: 60, level: '中平', summary: '性格差异，需要理解', love: '射手的奔放与双鱼的浪漫需要互相包容。', career: '合作需要找到共同点。', advice: '多关心对方的感受。' },
  'capricorn-capricorn': { score: 80, level: '大吉', summary: '稳重相投，事业有成', love: '两人都踏实稳重，感情稳定。', career: '合作稳健，事业必定成功。', advice: '适当增加生活的情趣。' },
  'capricorn-aquarius': { score: 55, level: '中平', summary: '性格差异，需要磨合', love: '摩羯的稳重与水瓶的叛逆需要互相适应。', career: '合作需要找到共同点。', advice: '多沟通，互相理解。' },
  'capricorn-pisces': { score: 80, level: '大吉', summary: '水土相合，互补性强', love: '摩羯的稳重与双鱼的浪漫完美结合。', career: '合作默契，互相支持。', advice: '珍惜这份难得的缘分。' },
  'aquarius-aquarius': { score: 75, level: '中吉', summary: '自由相投，志同道合', love: '两人都追求自由，相处轻松愉快。', career: '合作有创意，但可能缺乏稳定性。', advice: '学会坚持，不要过于叛逆。' },
  'aquarius-pisces': { score: 65, level: '中平', summary: '性格差异，需要理解', love: '水瓶的叛逆与双鱼的浪漫需要互相包容。', career: '合作需要找到共同点。', advice: '多关心对方的感受。' },
  'pisces-pisces': { score: 75, level: '中吉', summary: '浪漫相投，感情深厚', love: '两人都浪漫温柔，感情深厚。', career: '合作稳定，但可能缺乏魄力。', advice: '适当增加决断力，不要过于优柔。' }
}

const getZodiacInfo = (id) => {
  return getZodiacById(id) || { name: '', icon: '' }
}

const getConstellationInfo = (id) => {
  return constellationList.find(c => c.id === id) || { name: '', icon: '' }
}

const calculateZodiacMatch = () => {
  if (!zodiac1.value || !zodiac2.value) return
  zodiacResult.value = getZodiacMatch(zodiac1.value, zodiac2.value)
}

const calculateConstellationMatch = () => {
  if (!constellation1.value || !constellation2.value) return
  
  const key1 = `${constellation1.value}-${constellation2.value}`
  const key2 = `${constellation2.value}-${constellation1.value}`
  
  if (constellationMatchData[key1]) {
    constellationResult.value = constellationMatchData[key1]
  } else if (constellationMatchData[key2]) {
    constellationResult.value = constellationMatchData[key2]
  } else {
    constellationResult.value = {
      score: 70,
      level: '中吉',
      summary: '需要更多了解',
      love: '任何星座组合都有可能幸福，关键在于互相理解和包容。',
      career: '合作需要建立信任和默契。',
      advice: '真诚相待，互相珍惜。'
    }
  }
}

const getScoreColor = (level) => {
  const colors = {
    '大吉': 'text-fortune-lucky',
    '中吉': 'text-jade',
    '中平': 'text-gold',
    '凶': 'text-fortune-unlucky'
  }
  return colors[level] || 'text-text-primary'
}

const getLevelBg = (level) => {
  const bgs = {
    '大吉': 'bg-jade/20',
    '中吉': 'bg-jade/10',
    '中平': 'bg-gold/10',
    '凶': 'bg-red-500/10'
  }
  return bgs[level] || 'bg-abyss/50'
}
</script>

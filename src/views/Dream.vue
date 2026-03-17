<template>
  <div class="dream-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">周公解梦</h1>
        <p class="text-text-secondary text-body-lg">梦境解析，探寻潜意识</p>
      </header>

      <div class="card p-6 mb-8">
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="输入梦境关键词，如：水、蛇、飞..."
            class="w-full px-5 py-4 pl-12 bg-abyss/50 border border-gold/20 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors"
            @input="handleSearch"
          />
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            v-if="searchKeyword"
            @click="clearSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="!searchKeyword" class="mb-8">
        <h2 class="font-serif text-h4 text-text-primary mb-4">梦境分类</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            class="card p-4 text-center hover:border-gold/50 transition-all duration-300 group"
            :class="{ 'border-gold/50 bg-gold/5': selectedCategory === category.id }"
          >
            <div class="text-3xl mb-2">{{ category.icon }}</div>
            <div class="font-serif text-text-secondary group-hover:text-gold transition-colors">
              {{ category.name }}
            </div>
          </button>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="searchResults.length > 0" key="results">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-serif text-h4 text-text-primary">
              {{ searchKeyword ? '搜索结果' : selectedCategory ? getCategoryName(selectedCategory) : '全部解梦' }}
            </h2>
            <span class="text-text-muted text-sm">共 {{ searchResults.length }} 条</span>
          </div>

          <div class="space-y-4">
            <TransitionGroup name="list">
              <div
                v-for="dream in searchResults"
                :key="dream.id"
                class="card p-6 cursor-pointer hover:border-gold/50 transition-all duration-300"
                @click="showDreamDetail(dream)"
              >
                <div class="flex items-start justify-between mb-3">
                  <h3 class="font-serif text-h4 text-gold">{{ dream.title }}</h3>
                  <span class="text-xs text-text-muted px-2 py-1 bg-abyss/50 rounded">
                    {{ getCategoryName(dream.category) }}
                  </span>
                </div>
                <p class="text-text-secondary text-body mb-3">{{ dream.content }}</p>
                <p class="text-text-muted text-sm line-clamp-2">{{ dream.interpretation }}</p>
                
                <div class="mt-4 pt-4 border-t border-gold/10">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="keyword in dream.keywords"
                      :key="keyword"
                      class="text-xs px-2 py-1 bg-gold/10 text-gold rounded"
                    >
                      {{ keyword }}
                    </span>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>

        <div v-else-if="searchKeyword" key="empty" class="text-center py-12">
          <div class="text-6xl mb-4">🌙</div>
          <p class="text-text-muted text-body-lg">未找到相关解梦</p>
          <p class="text-text-muted text-sm mt-2">试试其他关键词</p>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="showDetail && selectedDream"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss/90 backdrop-blur-sm"
          @click.self="closeDetail"
        >
          <div class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h2 class="font-serif text-h3 text-gold mb-2">{{ selectedDream.title }}</h2>
                <span class="text-sm text-text-muted">
                  {{ getCategoryName(selectedDream.category) }}
                </span>
              </div>
              <button
                @click="closeDetail"
                class="p-2 text-text-muted hover:text-gold transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-6">
              <div class="p-4 bg-jade/10 rounded-lg border border-jade/20">
                <p class="font-serif text-text-primary text-body-lg text-center">
                  {{ selectedDream.content }}
                </p>
              </div>

              <div>
                <h3 class="font-serif text-h4 text-text-primary mb-3">解梦详解</h3>
                <p class="text-text-secondary text-body leading-relaxed">
                  {{ selectedDream.interpretation }}
                </p>
              </div>

              <div class="space-y-3">
                <h3 class="font-serif text-h4 text-text-primary mb-3">具体情境</h3>
                <div
                  v-for="(meaning, index) in selectedDream.meanings"
                  :key="index"
                  class="p-4 bg-abyss/50 rounded-lg border border-gold/10"
                >
                  <p class="text-gold text-sm mb-1">{{ meaning.condition }}</p>
                  <p class="text-text-secondary text-body">{{ meaning.meaning }}</p>
                </div>
              </div>

              <div class="p-4 bg-gold/10 rounded-lg border border-gold/20">
                <h3 class="font-serif text-h4 text-gold mb-2">温馨提示</h3>
                <p class="text-text-secondary text-body">{{ selectedDream.advice }}</p>
              </div>

              <div class="flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                <span class="text-sm text-text-muted">相关关键词：</span>
                <span
                  v-for="keyword in selectedDream.keywords"
                  :key="keyword"
                  class="text-xs px-2 py-1 bg-gold/10 text-gold rounded"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="mt-12 text-center">
        <div class="card p-8 max-w-lg mx-auto">
          <h3 class="font-serif text-h4 text-text-primary mb-4">关于解梦</h3>
          <p class="text-text-muted text-body leading-relaxed">
            周公解梦是中国古代流传下来的解梦方法，通过分析梦境中的元素来预测吉凶祸福。
            梦境往往反映人的潜意识，解梦可以帮助我们更好地了解自己的内心世界。
            但解梦仅供参考，人生还需自己把握。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { dreamCategories, dreamData, searchDreams, getDreamsByCategory } from '@/data/dreams.js'

const searchKeyword = ref('')
const selectedCategory = ref(null)
const showDetail = ref(false)
const selectedDream = ref(null)

const categories = dreamCategories

const searchResults = computed(() => {
  if (searchKeyword.value.trim()) {
    return searchDreams(searchKeyword.value)
  }
  
  if (selectedCategory.value) {
    return getDreamsByCategory(selectedCategory.value)
  }
  
  return dreamData
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    selectedCategory.value = null
  }
}

const clearSearch = () => {
  searchKeyword.value = ''
}

const selectCategory = (categoryId) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
  searchKeyword.value = ''
}

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : ''
}

const showDreamDetail = (dream) => {
  selectedDream.value = dream
  showDetail.value = true
  document.body.style.overflow = 'hidden'
}

const closeDetail = () => {
  showDetail.value = false
  selectedDream.value = null
  document.body.style.overflow = ''
}

onMounted(() => {
  const savedDreams = localStorage.getItem('tianji_saved_dreams')
  if (!savedDreams) {
    localStorage.setItem('tianji_saved_dreams', JSON.stringify([]))
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

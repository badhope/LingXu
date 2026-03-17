<template>
  <div class="knowledge-page min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="font-title text-h1 text-text-primary mb-4">玄学知识库</h1>
        <p class="text-text-secondary text-body-lg">传承千年智慧，探索命理奥秘</p>
      </header>

      <div class="mb-8">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            class="px-5 py-3 rounded-lg font-serif transition-all duration-300"
            :class="selectedCategory === category.id ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-abyss/50 text-text-secondary hover:text-gold'"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </button>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="currentKnowledge" :key="selectedCategory">
          <div class="card p-8 mb-8">
            <div class="text-center mb-6">
              <h2 class="font-title text-h2 text-gold mb-4">{{ currentKnowledge.title }}</h2>
              <p class="text-text-secondary text-body max-w-2xl mx-auto">{{ currentKnowledge.description }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <TransitionGroup name="list">
              <div
                v-for="(item, index) in currentKnowledge.items"
                :key="index"
                class="card p-6"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <span class="text-xl font-title text-gold">{{ item.name }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <h3 class="font-serif text-h4 text-text-primary">{{ item.name }}</h3>
                      <span v-if="item.alias" class="text-xs px-2 py-1 bg-jade/10 text-jade rounded">
                        {{ item.alias }}
                      </span>
                    </div>

                    <div v-if="item.property" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div v-if="item.property" class="text-center p-3 bg-abyss/50 rounded-lg">
                        <div class="text-text-muted text-xs mb-1">五行属性</div>
                        <div class="text-text-primary text-sm">{{ item.property }}</div>
                      </div>
                      <div v-if="item.direction" class="text-center p-3 bg-abyss/50 rounded-lg">
                        <div class="text-text-muted text-xs mb-1">方位</div>
                        <div class="text-text-primary text-sm">{{ item.direction }}</div>
                      </div>
                      <div v-if="item.season" class="text-center p-3 bg-abyss/50 rounded-lg">
                        <div class="text-text-muted text-xs mb-1">季节</div>
                        <div class="text-text-primary text-sm">{{ item.season }}</div>
                      </div>
                      <div v-if="item.time" class="text-center p-3 bg-abyss/50 rounded-lg">
                        <div class="text-text-muted text-xs mb-1">时辰</div>
                        <div class="text-text-primary text-sm">{{ item.time }}</div>
                      </div>
                    </div>

                    <p v-if="item.description" class="text-text-secondary text-body leading-relaxed mb-4">
                      {{ item.description }}
                    </p>

                    <div v-if="item.characteristics" class="p-4 bg-gold/5 rounded-lg border border-gold/10 mb-4">
                      <div class="text-gold text-sm mb-2">性格特点</div>
                      <p class="text-text-secondary text-body">{{ item.characteristics }}</p>
                    </div>

                    <div v-if="item.relations" class="p-4 bg-jade/5 rounded-lg border border-jade/10">
                      <div class="text-jade text-sm mb-2">生克关系</div>
                      <p class="text-text-secondary text-body">{{ item.relations }}</p>
                    </div>

                    <div v-if="item.meaning" class="p-4 bg-gold/5 rounded-lg border border-gold/10">
                      <div class="text-gold text-sm mb-2">卦象寓意</div>
                      <p class="text-text-secondary text-body">{{ item.meaning }}</p>
                    </div>

                    <div v-if="item.element" class="p-4 bg-jade/5 rounded-lg border border-jade/10">
                      <div class="text-jade text-sm mb-2">五行属性</div>
                      <p class="text-text-secondary text-body">{{ item.element }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </Transition>

      <div class="mt-12 text-center">
        <div class="card p-8 max-w-lg mx-auto">
          <h3 class="font-serif text-h4 text-text-primary mb-4">学习建议</h3>
          <p class="text-text-muted text-body leading-relaxed">
            命理学博大精深，需要长期学习和实践。建议从基础的天干地支、五行生克开始，
            逐步深入理解十神、格局、用神等概念。同时要保持理性态度，
            将命理学作为认识自我、规划人生的参考工具。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { knowledgeCategories, getKnowledgeByCategory } from '@/data/knowledge.js'

const categories = knowledgeCategories
const selectedCategory = ref('tiangan')

const currentKnowledge = computed(() => {
  return getKnowledgeByCategory(selectedCategory.value)
})
</script>

<style scoped>
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

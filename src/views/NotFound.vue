<template>
  <div class="not-found-page min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="mb-8">
        <div class="relative inline-block">
          <div class="w-32 h-32 md:w-40 md:h-40 mx-auto">
            <div class="absolute inset-0 rounded-full bg-gradient-conic from-gold via-abyss to-gold animate-spin-slow opacity-60" />
            <div class="absolute inset-4 rounded-full bg-abyss flex items-center justify-center">
              <span class="font-title text-5xl md:text-6xl text-gold">迷</span>
            </div>
          </div>
        </div>
      </div>
      
      <h1 class="font-title text-h1 text-text-primary mb-4">迷途未返</h1>
      <p class="text-text-secondary text-body-lg mb-8">
        天机未明，此路不通<br>
        请循正道，重返归途
      </p>
      
      <RouterLink to="/" class="btn-primary inline-block">
        返回首页
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-page {
  background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
}
</style>

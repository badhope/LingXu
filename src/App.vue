<template>
  <div id="app-container" class="relative min-h-screen">
    <LoadingScreen v-if="!isLoaded" @complete="handleLoadComplete" />
    
    <Transition name="fade">
      <div v-if="isLoaded" class="relative min-h-screen">
        <ParticleBackground :intensity="particleIntensity" />
        <Navigation />
        
        <main class="relative z-10">
          <RouterView v-slot="{ Component, route }">
            <Transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </main>
        
        <Footer />
        
        <SettingsPanel 
          v-if="showSettings" 
          @close="showSettings = false"
          @update:intensity="particleIntensity = $event"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import SettingsPanel from '@/components/SettingsPanel.vue'

const isLoaded = ref(false)
const showSettings = ref(false)
const particleIntensity = ref(50)

const handleLoadComplete = () => {
  isLoaded.value = true
}

onMounted(() => {
  const savedIntensity = localStorage.getItem('particleIntensity')
  if (savedIntensity) {
    particleIntensity.value = parseInt(savedIntensity)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

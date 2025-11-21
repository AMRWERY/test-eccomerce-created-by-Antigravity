<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoginModal from './components/common/LoginModal.vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import BottomNav from './components/layout/BottomNav.vue'
import { useUserStore } from '@/stores/user'
import ToastNotification from './components/common/ToastNotification.vue'

const userStore = useUserStore()
</script>

<template>
  <div id="app" class="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col">
    <Navbar />
    <main class="flex-1 pb-16 md:pb-0">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <BottomNav />

    <LoginModal :is-open="userStore.isLoginModalOpen" @close="userStore.closeLoginModal"
      @login-success="userStore.closeLoginModal" />
    <ToastNotification />
  </div>
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
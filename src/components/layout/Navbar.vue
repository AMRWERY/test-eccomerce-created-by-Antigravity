<template>
    <nav
        class="sticky top-0 z-40 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-800 transition-colors duration-300">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
            <!-- Logo -->
            <RouterLink to="/"
                class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                LuxeStore
            </RouterLink>

            <!-- Desktop Links -->
            <div class="hidden md:flex items-center gap-8">
                <RouterLink to="/"
                    class="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 font-medium transition-colors">
                    Home</RouterLink>
                <RouterLink to="/products"
                    class="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 font-medium transition-colors">
                    Products</RouterLink>
                <RouterLink to="/compare"
                    class="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 font-medium transition-colors">
                    Compare</RouterLink>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4">
                <!-- Dark Mode Toggle -->
                <button @click="toggleDark()"
                    class="p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                    <component :is="isDark ? Sun : Moon" class="w-5 h-5" />
                </button>

                <!-- Wishlist -->
                <RouterLink to="/wishlist"
                    class="p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors relative">
                    <Heart class="w-5 h-5" />
                    <!-- Badge placeholder -->
                </RouterLink>

                <!-- Cart -->
                <RouterLink to="/cart"
                    class="p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors relative">
                    <ShoppingBag class="w-5 h-5" />
                    <!-- Badge placeholder -->
                </RouterLink>

                <!-- User Profile / Login -->
                <div v-if="userStore.isAuthenticated" class="relative">
                    <button @click="showDropdown = !showDropdown"
                        class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img :src="userStore.user?.picture || `https://ui-avatars.com/api/?name=${userStore.user?.name}`"
                            class="w-8 h-8 rounded-full border border-secondary-200 dark:border-secondary-700"
                            :alt="userStore.user?.name">
                        <span class="hidden md:block text-sm font-medium text-secondary-900 dark:text-white">
                            {{ userStore.user?.name }}
                        </span>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="showDropdown" @click="showDropdown = false"
                        class="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50">
                        <RouterLink to="/profile"
                            class="flex items-center gap-2 px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                            <User class="w-4 h-4" />
                            Profile
                        </RouterLink>
                        <button @click="handleLogout"
                            class="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <LogOut class="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
                <button v-else @click="userStore.openLoginModal"
                    class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Login
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon, ShoppingBag, Heart, User, LogOut } from 'lucide-vue-next'

const userStore = useUserStore()
const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const showDropdown = ref(false)

const handleLogout = () => {
    userStore.logout()
    showDropdown.value = false
    router.push('/')
}
</script>

<template>
    <!-- Mobile Bottom Navigation - Only visible on small screens -->
    <nav
        class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 z-40 safe-area-pb">
        <div class="grid grid-cols-4 h-16">
            <!-- Home -->
            <RouterLink to="/"
                class="flex flex-col items-center justify-center gap-1 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                active-class="text-primary-600 dark:text-primary-400">
                <Home class="w-5 h-5" />
                <span class="text-xs font-medium">Home</span>
            </RouterLink>

            <!-- Products -->
            <RouterLink to="/products"
                class="flex flex-col items-center justify-center gap-1 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                active-class="text-primary-600 dark:text-primary-400">
                <ShoppingBag class="w-5 h-5" />
                <span class="text-xs font-medium">Products</span>
            </RouterLink>

            <!-- Cart -->
            <RouterLink to="/cart"
                class="flex flex-col items-center justify-center gap-1 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative"
                active-class="text-primary-600 dark:text-primary-400">
                <div class="relative">
                    <ShoppingCart class="w-5 h-5" />
                    <span v-if="cartStore.cartItemCount > 0"
                        class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {{ cartStore.cartItemCount > 9 ? '9+' : cartStore.cartItemCount }}
                    </span>
                </div>
                <span class="text-xs font-medium">Cart</span>
            </RouterLink>

            <!-- Compare -->
            <RouterLink to="/compare"
                class="flex flex-col items-center justify-center gap-1 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative"
                active-class="text-primary-600 dark:text-primary-400">
                <div class="relative">
                    <GitCompare class="w-5 h-5" />
                    <span v-if="cartStore.compareItems.length > 0"
                        class="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {{ cartStore.compareItems.length }}
                    </span>
                </div>
                <span class="text-xs font-medium">Compare</span>
            </RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home, ShoppingBag, ShoppingCart, GitCompare } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
/* Safe area for devices with notches */
.safe-area-pb {
    padding-bottom: env(safe-area-inset-bottom);
}
</style>

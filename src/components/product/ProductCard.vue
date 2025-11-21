<template>
    <div
        class="group bg-white dark:bg-secondary-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary-100 dark:border-secondary-700 flex flex-col h-full">
        <!-- Image -->
        <div class="relative pt-[100%] overflow-hidden bg-white p-4">
            <img :src="product.image" :alt="product.title"
                class="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500">

            <!-- Quick Actions Overlay -->
            <div
                class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                <button @click.prevent="toggleWishlist"
                    class="p-2 bg-white dark:bg-secondary-700 rounded-full shadow-md hover:bg-primary-50 dark:hover:bg-secondary-600 transition-colors"
                    :class="cartStore.isInWishlist(product.id) ? 'text-red-500' : 'text-secondary-600 dark:text-secondary-200'">
                    <Heart class="w-4 h-4" :class="{ 'fill-current': cartStore.isInWishlist(product.id) }" />
                </button>
                <button @click.prevent="toggleCompare"
                    class="p-2 bg-white dark:bg-secondary-700 rounded-full shadow-md hover:bg-primary-50 dark:hover:bg-secondary-600 transition-colors"
                    :class="cartStore.isInCompare(product.id) ? 'text-primary-600' : 'text-secondary-600 dark:text-secondary-200'">
                    <ArrowLeftRight class="w-4 h-4" />
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="p-4 flex flex-col flex-grow">
            <div class="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1 uppercase tracking-wider">{{
                product.category }}</div>
            <RouterLink :to="`/product/${product.id}`"
                class="text-secondary-900 dark:text-white font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                {{ product.title }}
            </RouterLink>

            <div class="mt-auto flex items-center justify-between">
                <span class="text-lg font-bold text-secondary-900 dark:text-white">${{ product.price }}</span>
                <button @click="addToCart"
                    class="p-2 bg-secondary-100 dark:bg-secondary-700 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 rounded-lg text-secondary-900 dark:text-white transition-all">
                    <Plus class="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Heart, ArrowLeftRight, Plus } from 'lucide-vue-next'
import type { Product } from '@/types/products'

const props = defineProps<{
    product: Product
}>()

const userStore = useUserStore()
const cartStore = useCartStore()

const addToCart = () => {
    if (userStore.isGuest) {
        userStore.openLoginModal()
        return
    }
    cartStore.addToCart(props.product)
}

const toggleWishlist = () => {
    if (userStore.isGuest) {
        userStore.openLoginModal()
        return
    }
    if (cartStore.isInWishlist(props.product.id)) {
        cartStore.removeFromWishlist(props.product.id)
    } else {
        cartStore.addToWishlist(props.product)
    }
}

const toggleCompare = () => {
    if (cartStore.isInCompare(props.product.id)) {
        cartStore.removeFromCompare(props.product.id)
    } else {
        cartStore.addToCompare(props.product)
    }
}
</script>

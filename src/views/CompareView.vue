<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-8">Compare Products</h1>

        <div v-if="cartStore.compareItems.length > 0" class="overflow-x-auto">
            <table class="w-full border-collapse min-w-[800px]">
                <thead>
                    <tr>
                        <th class="p-4 text-left w-48"></th>
                        <th v-for="product in cartStore.compareItems" :key="product.id" class="p-4 w-64">
                            <div class="relative">
                                <button @click="cartStore.removeFromCompare(product.id)"
                                    class="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200">
                                    <X class="w-4 h-4" />
                                </button>
                                <img :src="product.image" :alt="product.title"
                                    class="w-32 h-32 object-contain mx-auto mb-4">
                                <h3 class="font-bold text-secondary-900 dark:text-white text-center line-clamp-2">{{
                                    product.title }}</h3>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-secondary-200 dark:divide-secondary-700">
                    <tr>
                        <td class="p-4 font-bold text-secondary-900 dark:text-white">Price</td>
                        <td v-for="product in cartStore.compareItems" :key="product.id"
                            class="p-4 text-center text-lg font-bold text-primary-600">
                            ${{ product.price }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-4 font-bold text-secondary-900 dark:text-white">Category</td>
                        <td v-for="product in cartStore.compareItems" :key="product.id"
                            class="p-4 text-center capitalize">
                            {{ product.category }}
                        </td>
                    </tr>
                    <tr>
                        <td class="p-4 font-bold text-secondary-900 dark:text-white">Rating</td>
                        <td v-for="product in cartStore.compareItems" :key="product.id" class="p-4 text-center">
                            <div class="flex items-center justify-center gap-1 text-yellow-400">
                                <Star class="w-4 h-4 fill-current" />
                                <span class="text-secondary-900 dark:text-white font-medium">{{ product.rating.rate
                                }}</span>
                                <span class="text-secondary-500 text-sm">({{ product.rating.count }})</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-4 font-bold text-secondary-900 dark:text-white">Action</td>
                        <td v-for="product in cartStore.compareItems" :key="product.id" class="p-4 text-center">
                            <button @click="addToCart(product)"
                                class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                Add to Cart
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <EmptyState v-else :icon="ArrowLeftRight" title="No products to compare"
            description="Add products to compare list to see differences." action-text="Browse Products"
            action-link="/products" />
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftRight, X, Star } from 'lucide-vue-next'
import type { Product } from '@/types/products'

const cartStore = useCartStore()
const userStore = useUserStore()

const addToCart = (product: Product) => {
    if (userStore.isGuest) {
        userStore.openLoginModal()
        return
    }
    cartStore.addToCart(product)
}
</script>

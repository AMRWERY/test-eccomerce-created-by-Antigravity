<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-8">My Wishlist</h1>

        <div v-if="cartStore.wishlistItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in cartStore.wishlistItems" :key="product.id" :product="product" />
        </div>

        <EmptyState v-else :icon="Heart" title="Your wishlist is empty"
            description="Save your favorite items to your wishlist and shop them later." action-text="Browse Products"
            action-link="/products" />
    </div>
</template>

<script lang="ts" setup>
import { Heart } from 'lucide-vue-next'

const cartStore = useCartStore()
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-8">Shopping Cart</h1>

        <div v-if="cartStore.cartItems.length > 0" class="flex flex-col lg:flex-row gap-8">
            <!-- Cart Items List -->
            <div class="flex-grow space-y-6">
                <div v-for="item in cartStore.cartItems" :key="item.product.id"
                    class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700 flex gap-6 items-center">
                    <img :src="item.product.image" :alt="item.product.title"
                        class="w-24 h-24 object-contain bg-white rounded-lg p-2">

                    <div class="flex-grow">
                        <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-1">{{ item.product.title }}
                        </h3>
                        <p class="text-primary-600 dark:text-primary-400 font-medium">${{ item.product.price }}</p>
                    </div>

                    <div class="flex items-center gap-6">
                        <div class="flex items-center border border-secondary-300 dark:border-secondary-600 rounded-lg">
                            <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                                class="px-3 py-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">-</button>
                            <span class="px-3 py-1 font-medium w-8 text-center">{{ item.quantity }}</span>
                            <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                                class="px-3 py-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors">+</button>
                        </div>

                        <button @click="cartStore.removeFromCart(item.product.id)"
                            class="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="w-full lg:w-96 flex-shrink-0">
                <div
                    class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700 sticky top-24">
                    <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-6">Order Summary</h2>

                    <div class="space-y-4 mb-6">
                        <div class="flex justify-between text-secondary-600 dark:text-secondary-300">
                            <span>Subtotal</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-secondary-600 dark:text-secondary-300">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div
                            class="border-t border-secondary-200 dark:border-secondary-700 pt-4 flex justify-between font-bold text-lg text-secondary-900 dark:text-white">
                            <span>Total</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                    </div>

                    <RouterLink to="/checkout"
                        class="block w-full py-4 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-1">
                        Proceed to Checkout
                    </RouterLink>
                </div>
            </div>
        </div>

        <EmptyState v-else :icon="ShoppingBag" title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet." action-text="Start Shopping"
            action-link="/products" />
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { Trash2, ShoppingBag } from 'lucide-vue-next'
import EmptyState from '@/components/common/EmptyState.vue'

const cartStore = useCartStore()
</script>

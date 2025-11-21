<template>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-8">Checkout</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Checkout Form -->
            <div class="md:col-span-2 space-y-8">
                <!-- Shipping Address -->
                <div
                    class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                    <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Shipping Address</h2>
                    <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Full
                                Name</label>
                            <input type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div class="col-span-2">
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Street
                                Address</label>
                            <input type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">City</label>
                            <input type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">ZIP
                                Code</label>
                            <input type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                    </form>
                </div>

                <!-- Payment Method -->
                <div
                    class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                    <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Payment Method</h2>
                    <div class="space-y-4">
                        <label
                            class="flex items-center gap-3 p-4 border border-secondary-200 dark:border-secondary-700 rounded-xl cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                            <input type="radio" name="payment" class="text-primary-600 focus:ring-primary-500" checked>
                            <span class="font-medium text-secondary-900 dark:text-white">Credit Card</span>
                        </label>
                        <label
                            class="flex items-center gap-3 p-4 border border-secondary-200 dark:border-secondary-700 rounded-xl cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                            <input type="radio" name="payment" class="text-primary-600 focus:ring-primary-500">
                            <span class="font-medium text-secondary-900 dark:text-white">PayPal</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="md:col-span-1">
                <div
                    class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700 sticky top-24">
                    <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-6">Order Summary</h2>

                    <div class="space-y-4 mb-6">
                        <div v-for="item in cartStore.cartItems" :key="item.product.id"
                            class="flex justify-between text-sm">
                            <span class="text-secondary-600 dark:text-secondary-300 truncate w-2/3">{{ item.quantity }}x
                                {{ item.product.title }}</span>
                            <span class="text-secondary-900 dark:text-white font-medium">${{ (item.product.price *
                                item.quantity).toFixed(2) }}</span>
                        </div>
                        <div
                            class="border-t border-secondary-200 dark:border-secondary-700 pt-4 flex justify-between font-bold text-lg text-secondary-900 dark:text-white">
                            <span>Total</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                    </div>

                    <button @click="placeOrder" :disabled="loading"
                        class="block w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white text-center rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                        <LoadingSpinner v-if="loading" size="sm" />
                        <span>{{ loading ? 'Processing...' : 'Place Order' }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composables/useToast'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const cartStore = useCartStore()
const { showSuccess } = useToast()
const loading = ref(false)

const placeOrder = async () => {
    loading.value = true

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Create order before clearing cart
    cartStore.createOrder()
    cartStore.clearCart()

    loading.value = false
    showSuccess('Order placed successfully!')
    router.push('/')
}
</script>

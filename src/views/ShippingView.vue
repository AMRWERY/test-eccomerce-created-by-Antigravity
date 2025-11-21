<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-4xl font-bold text-secondary-900 dark:text-white mb-8">Shipping Information</h1>

        <div class="space-y-6">
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Shipping Options</h2>
                <div class="space-y-4">
                    <div class="flex items-start gap-4 p-4 bg-secondary-50 dark:bg-secondary-900/50 rounded-lg">
                        <Truck class="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white">Standard Shipping</h3>
                            <p class="text-secondary-600 dark:text-secondary-400">5-7 business days - FREE on orders
                                over $50</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-secondary-50 dark:bg-secondary-900/50 rounded-lg">
                        <Zap class="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white">Express Shipping</h3>
                            <p class="text-secondary-600 dark:text-secondary-400">2-3 business days - $15.99</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-secondary-50 dark:bg-secondary-900/50 rounded-lg">
                        <Plane class="w-6 h-6 text-primary-600 mt-1" />
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white">International Shipping</h3>
                            <p class="text-secondary-600 dark:text-secondary-400">10-15 business days - Varies by
                                location</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Tracking Your Order</h2>
                <p class="text-secondary-600 dark:text-secondary-400 mb-4">
                    Once your order has been shipped, you will receive a confirmation email with a tracking number. You
                    can use this number to track your package on our website or the carrier's website.
                </p>
                <ul class="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400">
                    <li>Check your email for shipping confirmation</li>
                    <li>Visit "My Account" to view order status</li>
                    <li>Contact customer service for assistance</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Truck, Zap, Plane } from 'lucide-vue-next'
</script>

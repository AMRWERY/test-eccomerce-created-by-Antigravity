<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-4xl font-bold text-secondary-900 dark:text-white mb-8">About LuxeStore</h1>

        <div class="space-y-8">
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Our Story</h2>
                <p class="text-secondary-600 dark:text-secondary-400 mb-4">
                    Founded in 2020, LuxeStore has grown from a small startup to one of the most trusted online shopping
                    destinations. Our mission is to provide high-quality products at competitive prices while delivering
                    exceptional customer service.
                </p>
                <p class="text-secondary-600 dark:text-secondary-400">
                    We believe that shopping should be easy, enjoyable, and accessible to everyone. That's why we've
                    built a platform that combines cutting-edge technology with a user-friendly interface to create the
                    best possible shopping experience.
                </p>
            </div>

            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Our Values</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex gap-4">
                        <div
                            class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield class="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white mb-1">Quality</h3>
                            <p class="text-sm text-secondary-600 dark:text-secondary-400">We only offer products that
                                meet our high standards</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div
                            class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Heart class="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white mb-1">Customer First</h3>
                            <p class="text-sm text-secondary-600 dark:text-secondary-400">Your satisfaction is our top
                                priority</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div
                            class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Leaf class="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white mb-1">Sustainability</h3>
                            <p class="text-sm text-secondary-600 dark:text-secondary-400">We're committed to
                                eco-friendly practices</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div
                            class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap class="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 class="font-bold text-secondary-900 dark:text-white mb-1">Innovation</h3>
                            <p class="text-sm text-secondary-600 dark:text-secondary-400">Always improving and evolving
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Why Choose Us?</h2>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                        <Check class="w-5 h-5 text-green-600 mt-0.5" />
                        <span class="text-secondary-600 dark:text-secondary-400">Wide selection of authentic
                            products</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <Check class="w-5 h-5 text-green-600 mt-0.5" />
                        <span class="text-secondary-600 dark:text-secondary-400">Competitive prices and regular
                            discounts</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <Check class="w-5 h-5 text-green-600 mt-0.5" />
                        <span class="text-secondary-600 dark:text-secondary-400">Fast and reliable shipping</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <Check class="w-5 h-5 text-green-600 mt-0.5" />
                        <span class="text-secondary-600 dark:text-secondary-400">30-day hassle-free returns</span>
                    </li>
                    <li class="flex items-start gap-3">
                        <Check class="w-5 h-5 text-green-600 mt-0.5" />
                        <span class="text-secondary-600 dark:text-secondary-400">24/7 customer support</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Shield, Heart, Leaf, Zap, Check } from 'lucide-vue-next'
</script>

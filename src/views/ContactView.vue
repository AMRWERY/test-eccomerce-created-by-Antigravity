<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-4xl font-bold text-secondary-900 dark:text-white mb-8">Contact Us</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <!-- Contact Info -->
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Get in Touch</h2>
                <div class="space-y-4">
                    <div class="flex items-start gap-3">
                        <Mail class="w-5 h-5 text-primary-600 mt-1" />
                        <div>
                            <p class="font-medium text-secondary-900 dark:text-white">Email</p>
                            <a href="mailto:support@luxestore.com"
                                class="text-primary-600 hover:underline">support@luxestore.com</a>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <Phone class="w-5 h-5 text-primary-600 mt-1" />
                        <div>
                            <p class="font-medium text-secondary-900 dark:text-white">Phone</p>
                            <a href="tel:+1234567890" class="text-primary-600 hover:underline">+1 (234) 567-890</a>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <MapPin class="w-5 h-5 text-primary-600 mt-1" />
                        <div>
                            <p class="font-medium text-secondary-900 dark:text-white">Address</p>
                            <p class="text-secondary-600 dark:text-secondary-400">123 Shopping Street<br>New York, NY
                                10001</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Send us a Message</h2>
                <form class="space-y-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Name</label>
                        <input type="text"
                            class="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Email</label>
                        <input type="email"
                            class="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Message</label>
                        <textarea rows="4"
                            class="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500"></textarea>
                    </div>
                    <button type="submit"
                        class="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">Send
                        Message</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-4xl font-bold text-secondary-900 dark:text-white mb-8">Frequently Asked Questions</h1>

        <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index"
                class="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-100 dark:border-secondary-700 overflow-hidden">
                <button @click="toggleFaq(index)"
                    class="w-full px-6 py-4 flex justify-between items-center hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                    <h3 class="font-bold text-left text-secondary-900 dark:text-white">{{ faq.question }}</h3>
                    <ChevronDown
                        :class="['w-5 h-5 text-secondary-500 transition-transform', { 'rotate-180': openFaq === index }]" />
                </button>
                <div v-show="openFaq === index" class="px-6 pb-4 text-secondary-600 dark:text-secondary-400">
                    {{ faq.answer }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const openFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
    openFaq.value = openFaq.value === index ? null : index
}

const faqs = [
    {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days.'
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for all items. Products must be unused and in original packaging.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a tracking number via email. You can also view your order status in your account.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and other secure payment methods.'
    },
    {
        question: 'Can I change or cancel my order?',
        answer: 'Orders can be modified or cancelled within 24 hours of placement. Please contact customer service immediately.'
    },
    {
        question: 'Are the products authentic?',
        answer: 'Yes, all products sold on LuxeStore are 100% authentic and sourced directly from manufacturers.'
    },
    {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes, gift wrapping is available for a small additional fee at checkout.'
    }
]
</script>

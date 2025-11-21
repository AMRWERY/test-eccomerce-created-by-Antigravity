<template>
    <div class="text-center py-12 px-4">
        <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-800 mb-4">
            <component :is="icon" class="w-8 h-8 text-secondary-400" />
        </div>
        <h3 class="text-xl font-bold text-secondary-900 dark:text-white mb-2">{{ title }}</h3>
        <p class="text-secondary-600 dark:text-secondary-400 mb-6 max-w-sm mx-auto">{{ description }}</p>
        <slot name="action">
            <RouterLink v-if="actionLink" :to="actionLink"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors">
                {{ actionText }}
            </RouterLink>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { type Component } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
    icon: Component
    title: string
    description: string
    actionText?: string
    actionLink?: string
}

withDefaults(defineProps<Props>(), {
    actionText: 'Browse Products',
    actionLink: '/products'
})
</script>

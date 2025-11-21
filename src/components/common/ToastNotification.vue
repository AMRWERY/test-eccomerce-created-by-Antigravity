<template>
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <TransitionGroup name="toast">
            <div v-for="toast in toasts" :key="toast.id" :class="[
                'flex items-start gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm border',
                'transform transition-all duration-300',
                toastClasses[toast.type]
            ]">
                <component :is="toastIcons[toast.type]" :class="['w-5 h-5 flex-shrink-0', iconClasses[toast.type]]" />
                <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>
                <button @click="removeToast(toast.id)"
                    class="text-current opacity-50 hover:opacity-100 transition-opacity">
                    <X class="w-4 h-4" />
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const toastClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
}

const iconClasses = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400'
}

const toastIcons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
}
</style>

<template>
    <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            @click.self="close">
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 max-w-md w-full shadow-xl transform transition-all relative">
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-secondary-900 dark:text-white">
                        {{ isRegistering ? 'Create Account' : 'Welcome Back' }}
                    </h2>
                    <p class="text-secondary-500 dark:text-secondary-400 mt-2">
                        {{ isRegistering ? 'Register to start shopping' : 'Login to continue your shopping journey' }}
                    </p>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage"
                    class="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {{ errorMessage }}
                </div>

                <!-- Success Message -->
                <div v-if="successMessage"
                    class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm">
                    {{ successMessage }}
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- Name (Register only) -->
                    <div v-if="isRegistering">
                        <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Full
                            Name</label>
                        <input v-model="formData.name" type="text" required
                            class="w-full px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="John Doe" />
                    </div>

                    <!-- Email -->
                    <div>
                        <label
                            class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Email</label>
                        <input v-model="formData.email" type="email" required
                            class="w-full px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="you@example.com" />
                    </div>

                    <!-- Password -->
                    <div>
                        <label
                            class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Password</label>
                        <input v-model="formData.password" type="password" required minlength="6"
                            class="w-full px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="••••••••" />
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="loading"
                        class="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2">
                        <LoadingSpinner v-if="loading" size="sm" />
                        <span>{{ loading ? 'Please wait...' : (isRegistering ? 'Create Account' : 'Login') }}</span>
                    </button>
                </form>

                <!-- Toggle Register/Login -->
                <div class="mt-6 text-center">
                    <button @click="toggleMode"
                        class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
                        {{ isRegistering ? 'Already have an account? Login' : "Don't have an account? Register" }}
                    </button>
                </div>

                <!-- Close Button -->
                <button @click="close"
                    class="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits(['close', 'login-success'])

const userStore = useUserStore()
const isRegistering = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const formData = ref({
    name: '',
    email: '',
    password: ''
})

// Reset form when modal opens/closes
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        resetForm()
    }
})

const resetForm = () => {
    formData.value = { name: '', email: '', password: '' }
    errorMessage.value = ''
    successMessage.value = ''
    loading.value = false
}

const toggleMode = () => {
    isRegistering.value = !isRegistering.value
    resetForm()
}

const close = () => {
    emit('close')
    resetForm()
}

const handleSubmit = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        if (isRegistering.value) {
            const result = await userStore.register(
                formData.value.email,
                formData.value.password,
                formData.value.name
            )

            if (result.success) {
                successMessage.value = result.message
                setTimeout(() => {
                    emit('login-success')
                    close()
                }, 1000)
            } else {
                errorMessage.value = result.message
            }
        } else {
            const result = await userStore.login(
                formData.value.email,
                formData.value.password
            )

            if (result.success) {
                successMessage.value = result.message
                setTimeout(() => {
                    emit('login-success')
                    close()
                }, 500)
            } else {
                errorMessage.value = result.message
            }
        }
    } catch (error) {
        errorMessage.value = 'An error occurred. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white,
.modal-enter-active .dark\:bg-secondary-800,
.modal-leave-active .dark\:bg-secondary-800 {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .bg-white,
.modal-enter-from .dark\:bg-secondary-800 {
    transform: scale(0.95) translateY(-20px);
    opacity: 0;
}

.modal-leave-to .bg-white,
.modal-leave-to .dark\:bg-secondary-800 {
    transform: scale(0.95) translateY(20px);
    opacity: 0;
}
</style>

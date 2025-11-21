<template>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <h1 class="text-3xl font-bold mb-8 text-secondary-900 dark:text-white">My Profile</h1>

        <div v-if="userStore.user" class="bg-white dark:bg-secondary-800 rounded-2xl shadow-sm overflow-hidden">
            <!-- Tabs Header -->
            <div class="flex border-b border-secondary-200 dark:border-secondary-700">
                <button v-for="tab in tabs" :key="tab.id" @click="currentTab = tab.id"
                    class="px-6 py-4 text-sm font-medium transition-colors relative" :class="[
                        currentTab === tab.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200'
                    ]">
                    {{ tab.label }}
                    <div v-if="currentTab === tab.id"
                        class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"></div>
                </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6">
                <!-- Personal Info -->
                <div v-if="currentTab === 'info'" class="space-y-6">
                    <div class="flex items-center gap-6">
                        <img :src="userStore.user.picture || `https://ui-avatars.com/api/?name=${userStore.user.name}`"
                            alt="Profile"
                            class="w-24 h-24 rounded-full object-cover border-4 border-secondary-100 dark:border-secondary-700">
                        <div>
                            <h3 class="text-xl font-bold text-secondary-900 dark:text-white">{{ userStore.user.name }}
                            </h3>
                            <p class="text-secondary-500 dark:text-secondary-400">{{ userStore.user.email }}</p>
                        </div>
                    </div>
                </div>

                <!-- Address -->
                <div v-else-if="currentTab === 'address'" class="space-y-4">
                    <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Shipping Address</h3>
                    <form @submit.prevent="saveAddress" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Street
                                Address</label>
                            <input v-model="addressForm.street" type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">City</label>
                            <input v-model="addressForm.city" type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">ZIP
                                Code</label>
                            <input v-model="addressForm.zip" type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">Country</label>
                            <input v-model="addressForm.country" type="text"
                                class="w-full rounded-lg border-secondary-300 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        </div>
                        <div class="col-span-2 pt-4">
                            <button type="submit"
                                class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                                Save Address
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Orders -->
                <div v-else-if="currentTab === 'orders'" class="space-y-4">
                    <div v-if="mockOrders.length === 0" class="text-center py-8 text-secondary-500">
                        No orders yet.
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="order in mockOrders" :key="order.id"
                            class="border border-secondary-200 dark:border-secondary-700 rounded-xl p-4">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <p class="font-semibold text-secondary-900 dark:text-white">Order #{{ order.id }}
                                    </p>
                                    <p class="text-sm text-secondary-500">{{ order.date }}</p>
                                </div>
                                <span :class="{
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': order.status === 'Delivered',
                                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': order.status === 'Processing',
                                }" class="px-3 py-1 rounded-full text-xs font-medium">
                                    {{ order.status }}
                                </span>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-secondary-600 dark:text-secondary-300">{{ order.items }} items</span>
                                <span class="font-bold text-secondary-900 dark:text-white">${{ order.total }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <p class="text-secondary-500 mb-4">Please login to view your profile.</p>
            <button @click="userStore.openLoginModal"
                class="px-6 py-2 bg-primary-600 text-white rounded-lg">Login</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const { showSuccess } = useToast()
const currentTab = ref('info')

const tabs = [
    { id: 'info', label: 'Personal Info' },
    { id: 'address', label: 'Address' },
    { id: 'orders', label: 'Order History' }
]

const addressForm = reactive({
    street: '',
    city: '',
    zip: '',
    country: ''
})

// Sync address form with store
watch(() => userStore.user, (newUser) => {
    if (newUser?.address) {
        Object.assign(addressForm, newUser.address)
    }
}, { immediate: true })

const saveAddress = () => {
    userStore.updateAddress({ ...addressForm })
    showSuccess('Address saved successfully!')
}

const mockOrders = [
    { id: 'ORD-001', date: '2025-03-15', status: 'Delivered', items: 3, total: 129.99 },
    { id: 'ORD-002', date: '2025-03-20', status: 'Processing', items: 1, total: 49.99 }
]
</script>

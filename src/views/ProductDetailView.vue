<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="bg-secondary-200 dark:bg-secondary-800 h-[500px] rounded-2xl"></div>
            <div class="space-y-4">
                <div class="h-8 bg-secondary-200 dark:bg-secondary-800 w-3/4 rounded"></div>
                <div class="h-4 bg-secondary-200 dark:bg-secondary-800 w-1/2 rounded"></div>
                <div class="h-32 bg-secondary-200 dark:bg-secondary-800 rounded"></div>
            </div>
        </div>

        <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Image Gallery (Mocked as single image for now) -->
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 flex items-center justify-center border border-secondary-100 dark:border-secondary-700">
                <img :src="product.image" :alt="product.title" class="max-h-[500px] object-contain">
            </div>

            <!-- Product Info -->
            <div class="space-y-6">
                <div>
                    <span class="text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wider text-sm">
                        {{ product.category }}
                    </span>
                    <h1 class="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mt-2">
                        {{ product.title }}
                    </h1>

                    <div class="flex items-center gap-4 mt-4">
                        <div class="flex items-center text-yellow-400">
                            <Star v-for="n in 5" :key="n"
                                :class="n <= Math.round(product.rating.rate) ? 'fill-current' : 'text-secondary-300'"
                                class="w-5 h-5" />
                            <span class="ml-2 text-secondary-500 text-sm">({{ product.rating.count }} reviews)</span>
                        </div>
                    </div>
                </div>

                <div class="text-4xl font-bold text-secondary-900 dark:text-white">
                    ${{ product.price }}
                </div>

                <p class="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {{ product.description }}
                </p>

                <div class="border-t border-b border-secondary-200 dark:border-secondary-700 py-6 space-y-4">
                    <!-- Quantity -->
                    <div class="flex items-center gap-4">
                        <span class="font-medium text-secondary-900 dark:text-white">Quantity</span>
                        <div class="flex items-center border border-secondary-300 dark:border-secondary-600 rounded-lg">
                            <button @click="quantity = Math.max(1, quantity - 1)"
                                class="px-3 py-1 hover:bg-secondary-100 dark:hover:bg-secondary-700">-</button>
                            <span class="px-3 py-1 font-medium">{{ quantity }}</span>
                            <button @click="quantity++"
                                class="px-3 py-1 hover:bg-secondary-100 dark:hover:bg-secondary-700">+</button>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button @click="addToCart"
                        class="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-600/20 transition-all transform hover:-translate-y-1">
                        Add to Cart
                    </button>
                    <button @click="toggleWishlist"
                        class="px-6 py-4 border border-secondary-300 dark:border-secondary-600 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                        :class="{ 'text-red-500 border-red-200 bg-red-50': product && cartStore.isInWishlist(product.id) }">
                        <Heart class="w-6 h-6"
                            :class="{ 'fill-current': product && cartStore.isInWishlist(product.id) }" />
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <h2 class="text-2xl font-bold text-secondary-900 dark:text-white">Product not found</h2>
            <RouterLink to="/products" class="text-primary-600 hover:underline mt-4 inline-block">Back to Products
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Star, Heart } from 'lucide-vue-next'

const route = useRoute()
const productStore = useProductStore()
const userStore = useUserStore()
const cartStore = useCartStore()

const loading = ref(true)
const product = computed(() => productStore.getProductById(Number(route.params.id)))
const quantity = ref(1)

onMounted(async () => {
    if (productStore.products.length === 0) {
        await productStore.fetchProducts()
    }
    loading.value = false
})

const addToCart = () => {
    if (userStore.isGuest) {
        userStore.openLoginModal()
        return
    }
    if (product.value) {
        cartStore.addToCart(product.value, quantity.value)
    }
}

const toggleWishlist = () => {
    if (userStore.isGuest) {
        userStore.openLoginModal()
        return
    }
    if (product.value) {
        if (cartStore.isInWishlist(product.value.id)) {
            cartStore.removeFromWishlist(product.value.id)
        } else {
            cartStore.addToWishlist(product.value)
        }
    }
}
</script>

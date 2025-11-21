<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Sidebar Filters -->
            <aside class="w-full md:w-64 flex-shrink-0 space-y-8">
                <div>
                    <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">Categories</h3>
                    <div class="space-y-2">
                        <label v-for="category in productStore.categories" :key="category"
                            class="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" :value="category" v-model="selectedCategory"
                                class="text-primary-600 focus:ring-primary-500 border-secondary-300">
                            <span
                                class="text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors capitalize">
                                {{ category }}
                            </span>
                        </label>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">Sort By</h3>
                    <select v-model="sortBy"
                        class="w-full rounded-lg border-secondary-300 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                        <option value="default">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </aside>

            <!-- Product Grid -->
            <div class="flex-grow">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-2xl font-bold text-secondary-900 dark:text-white capitalize">
                        {{ selectedCategory === 'All' ? 'All Products' : selectedCategory }}
                    </h1>
                    <span class="text-secondary-500">{{ filteredProducts.length }} products</span>
                </div>

                <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="n in 6" :key="n"
                        class="bg-secondary-100 dark:bg-secondary-800 rounded-2xl h-[350px] animate-pulse"></div>
                </div>

                <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
                    <p class="text-secondary-500 text-lg">No products found.</p>
                </div>

                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/product/ProductCard.vue'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

const selectedCategory = ref('All')
const sortBy = ref('default')

onMounted(() => {
    productStore.fetchProducts()
    if (route.query.category) {
        selectedCategory.value = route.query.category as string
    }
})

watch(() => route.query.category, (newVal) => {
    if (newVal) {
        selectedCategory.value = newVal as string
    } else {
        selectedCategory.value = 'All'
    }
})

watch(selectedCategory, (newVal) => {
    if (newVal === 'All') {
        router.push({ query: {} })
    } else {
        router.push({ query: { category: newVal } })
    }
})

const filteredProducts = computed(() => {
    let products = productStore.getProductsByCategory(selectedCategory.value)

    // Clone to avoid mutating store
    products = [...products]

    switch (sortBy.value) {
        case 'price-asc':
            products.sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            products.sort((a, b) => b.price - a.price)
            break
        case 'rating':
            products.sort((a, b) => b.rating.rate - a.rating.rate)
            break
    }

    return products
})
</script>

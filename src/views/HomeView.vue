<template>
  <div class="space-y-12 pb-12">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 pt-6">
      <Carousel :slides="slides" />
    </section>

    <!-- Categories -->
    <section class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Shop by Category</h2>
      <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        <button v-for="category in productStore.categories" :key="category" @click="filterByCategory(category)"
          class="flex-shrink-0 px-6 py-3 rounded-full border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-primary-50 hover:border-primary-200 dark:hover:bg-secondary-700 transition-all whitespace-nowrap">
          {{ category }}
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-secondary-900 dark:text-white">Featured Products</h2>
        <RouterLink to="/products" class="text-primary-600 hover:text-primary-700 font-medium">View All</RouterLink>
      </div>

      <div v-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="n in 4" :key="n" class="bg-secondary-100 dark:bg-secondary-800 rounded-2xl h-[300px] animate-pulse">
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Sponsors -->
    <section class="bg-secondary-50 dark:bg-secondary-900 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-xl font-semibold text-secondary-500 mb-8 uppercase tracking-widest">Trusted By</h2>
        <div
          class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <img v-for="n in 5" :key="n" :src="`https://picsum.photos/seed/sponsor${n}/150/60`" alt="Sponsor"
            class="h-12 object-contain mix-blend-multiply dark:mix-blend-screen">
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const productStore = useProductStore()
const router = useRouter()

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    title: 'New Collection 2024',
    description: 'Discover the latest trends in fashion and accessories.'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items. Limited time only.'
  }
]

onMounted(() => {
  productStore.fetchProducts()
})

const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4)
})

const filterByCategory = (category: string) => {
  router.push({ path: '/products', query: { category } })
}
</script>
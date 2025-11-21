import type { Product } from "@/types/products"
import { env } from '@/config/env'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Mock data initialization
  async function fetchProducts() {
    if (products.value.length > 0) return

    loading.value = true
    try {
      // Using API endpoint from environment variables
      const res = await fetch(env.productsUrl)
      const data = await res.json()
      products.value = data

      // Extract categories
      const cats = new Set(data.map((p: Product) => p.category))
      categories.value = ['All', ...Array.from(cats) as string[]]
    } catch (e) {
      error.value = 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

  const getProductsByCategory = (category: string) => {
    if (category === 'All') return products.value
    return products.value.filter(p => p.category === category)
  }

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    getProductById,
    getProductsByCategory
  }
})

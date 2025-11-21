import type { Product } from "@/types/products"
import type { CartItem } from "@/types/cart"
import type { Order } from "@/types/orders"

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])
  const wishlistItems = ref<Product[]>([])
  const compareItems = ref<Product[]>([])
  const lastOrder = ref<Order | null>(null)
  const { showSuccess, showInfo, showError, showWarning } = useToast()

  // Cart Computed
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })

  const cartItemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })

  // Cart Actions
  function addToCart(product: Product, quantity = 1) {
    const existingItem = cartItems.value.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
      showSuccess(`Updated ${product.title} quantity in cart`)
    } else {
      cartItems.value.push({ product, quantity })
      showSuccess(`${product.title} added to cart`)
    }
  }

  function removeFromCart(productId: number) {
    const index = cartItems.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      const item = cartItems.value[index]
      if (item && item.product) {
        const product = item.product
        cartItems.value.splice(index, 1)
        showInfo(`${product.title} removed from cart`)
      }
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  function createOrder(): Order {
    const order: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...cartItems.value],
      total: cartTotal.value,
      date: Date.now(),
      status: 'completed'
    }
    lastOrder.value = order
    return order
  }

  function clearCart() {
    cartItems.value = []
    showInfo('Cart cleared')
  }

  // Wishlist Actions
  function addToWishlist(product: Product) {
    if (!wishlistItems.value.find(p => p.id === product.id)) {
      wishlistItems.value.push(product)
      showSuccess(`${product.title} added to wishlist`)
    } else {
      showInfo('Product already in wishlist')
    }
  }

  function removeFromWishlist(productId: number) {
    const index = wishlistItems.value.findIndex(p => p.id === productId)
    if (index > -1) {
      const product = wishlistItems.value[index]
      if (product) {
        wishlistItems.value.splice(index, 1)
        showInfo(`${product.title} removed from wishlist`)
      }
    }
  }

  function isInWishlist(productId: number) {
    return wishlistItems.value.some(p => p.id === productId)
  }

  // Compare Actions
  function addToCompare(product: Product) {
    if (compareItems.value.length >= 3) {
      showWarning('You can only compare up to 3 products')
      return false
    }
    if (!compareItems.value.find(p => p.id === product.id)) {
      compareItems.value.push(product)
      showSuccess(`${product.title} added to compare`)
      return true
    } else {
      showInfo('Product already in compare list')
      return false
    }
  }


  function removeFromCompare(productId: number) {
    const index = compareItems.value.findIndex(p => p.id === productId)
    if (index > -1) {
      const product = compareItems.value[index]
      if (product) {
        compareItems.value.splice(index, 1)
        showInfo(`${product.title} removed from compare`)
      }
    }
  }

  function isInCompare(productId: number) {
    return compareItems.value.some(p => p.id === productId)
  }

  return {
    cartItems,
    wishlistItems,
    compareItems,
    lastOrder,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    createOrder,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare
  }
})

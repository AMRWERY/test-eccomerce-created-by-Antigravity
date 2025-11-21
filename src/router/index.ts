import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // If navigating to a hash, scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Otherwise, scroll to top
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishlistView.vue')
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/CompareView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue')
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: () => import('../views/ShippingView.vue')
    },
    {
      path: '/returns',
      name: 'returns',
      component: () => import('../views/ReturnsView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/cookie-policy',
      name: 'cookie-policy',
      component: () => import('../views/CookieView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

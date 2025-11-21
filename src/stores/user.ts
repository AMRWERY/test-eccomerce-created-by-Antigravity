import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authDB } from './plugins/authDB'

export interface User {
  id: string
  name: string
  email: string
  picture?: string
  address?: {
    street: string
    city: string
    zip: string
    country: string
  }
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isGuest = computed(() => !user.value)
  const isLoginModalOpen = ref(false)

  function setUser(userData: User) {
    user.value = userData
  }

  function updateAddress(address: User['address']) {
    if (user.value) {
      user.value.address = address
    }
  }

  async function register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
    const success = await authDB.registerUser(email, password, name)
    
    if (success) {
      user.value = {
        id: email,
        name,
        email,
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      }
      return { success: true, message: 'Registration successful!' }
    }
    
    return { success: false, message: 'Email already registered' }
  }

  async function login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const userData = await authDB.loginUser(email, password)
    
    if (userData) {
      user.value = {
        id: userData.email,
        name: userData.name,
        email: userData.email,
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
      }
      return { success: true, message: 'Login successful!' }
    }
    
    return { success: false, message: 'Invalid email or password' }
  }

  function logout() {
    user.value = null
  }

  function openLoginModal() {
    isLoginModalOpen.value = true
  }

  function closeLoginModal() {
    isLoginModalOpen.value = false
  }

  return {
    user,
    isAuthenticated,
    isGuest,
    isLoginModalOpen,
    setUser,
    updateAddress,
    register,
    login,
    logout,
    openLoginModal,
    closeLoginModal
  }
})

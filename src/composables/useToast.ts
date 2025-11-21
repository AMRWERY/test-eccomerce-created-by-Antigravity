import type { ToastType, Toast } from '@/types/toast'

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
  const addToast = (message: string, type: ToastType = 'info', duration = 5000) => {
    const id = nextId++
    const toast: Toast = { id, message, type, duration }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const showSuccess = (message: string, duration?: number) => {
    return addToast(message, 'success', duration)
  }

  const showError = (message: string, duration?: number) => {
    return addToast(message, 'error', duration)
  }

  const showInfo = (message: string, duration?: number) => {
    return addToast(message, 'info', duration)
  }

  const showWarning = (message: string, duration?: number) => {
    return addToast(message, 'warning', duration)
  }

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast
  }
}

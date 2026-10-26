import { ref } from 'vue'

export interface ToastItem {
  id: number
  title?: string
  description?: string
  duration?: number
}

const toasts = ref<ToastItem[]>([])
let nextId = 1

export function useToast() {
  function push(input: Omit<ToastItem, 'id'>): number {
    const id = nextId++
    toasts.value.push({ duration: 4000, ...input, id })
    const duration = input.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }
  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }
  function clear() {
    toasts.value = []
  }
  return { toasts, push, dismiss, clear }
}

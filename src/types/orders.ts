import type { CartItem } from './cart'

export interface Order {
    id: string
    items: CartItem[]
    total: number
    date: number
    status: 'completed' | 'processing' | 'shipped'
}
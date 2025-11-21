<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <div v-if="order" class="space-y-6">
            <!-- Success Header -->
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm border border-secondary-100 dark:border-secondary-700 text-center">
                <div
                    class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check class="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>

                <h1 class="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Order Placed Successfully!</h1>
                <p class="text-secondary-500 dark:text-secondary-400 mb-4">Thank you for your purchase. Your order has
                    been confirmed.</p>
                <p class="text-sm text-secondary-600 dark:text-secondary-400">Order ID: <span
                        class="font-mono font-bold">{{ order.id }}</span></p>
            </div>

            <!-- Order Details -->
            <div
                class="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-sm border border-secondary-100 dark:border-secondary-700">
                <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-6">Order Details</h2>

                <!-- Order Items -->
                <div class="space-y-4 mb-6">
                    <div v-for="item in order.items" :key="item.product.id"
                        class="flex gap-4 pb-4 border-b border-secondary-200 dark:border-secondary-700 last:border-0">
                        <img :src="item.product.image" :alt="item.product.title"
                            class="w-20 h-20 object-contain bg-white rounded-lg">
                        <div class="flex-1">
                            <h3 class="font-medium text-secondary-900 dark:text-white line-clamp-2">{{
                                item.product.title }}</h3>
                            <p class="text-sm text-secondary-500 dark:text-secondary-400">Quantity: {{ item.quantity }}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-secondary-900 dark:text-white">${{ (item.product.price *
                                item.quantity).toFixed(2) }}</p>
                            <p class="text-sm text-secondary-500 dark:text-secondary-400">${{ item.product.price }} each
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="border-t border-secondary-200 dark:border-secondary-700 pt-4 space-y-2">
                    <div class="flex justify-between text-secondary-600 dark:text-secondary-400">
                        <span>Subtotal</span>
                        <span>${{ order.total.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between text-secondary-600 dark:text-secondary-400">
                        <span>Shipping</span>
                        <span class="text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div class="flex justify-between text-secondary-600 dark:text-secondary-400">
                        <span>Tax</span>
                        <span>${{ (order.total * 0.1).toFixed(2) }}</span>
                    </div>
                    <div
                        class="flex justify-between text-xl font-bold text-secondary-900 dark:text-white pt-2 border-t border-secondary-200 dark:border-secondary-700">
                        <span>Total</span>
                        <span>${{ (order.total * 1.1).toFixed(2) }}</span>
                    </div>
                </div>

                <!-- Order Info -->
                <div class="mt-6 p-4 bg-secondary-50 dark:bg-secondary-900/50 rounded-lg">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-secondary-500 dark:text-secondary-400">Order Date</p>
                            <p class="font-medium text-secondary-900 dark:text-white">{{ formatDate(order.date) }}</p>
                        </div>
                        <div>
                            <p class="text-secondary-500 dark:text-secondary-400">Status</p>
                            <p class="font-medium text-green-600 dark:text-green-400 capitalize">{{ order.status }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4">
                <button @click="downloadPDF"
                    class="flex-1 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20">
                    <Download class="w-5 h-5" />
                    Download Receipt (PDF)
                </button>

                <RouterLink to="/"
                    class="flex-1 px-8 py-4 border border-secondary-300 dark:border-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-200 rounded-xl font-medium transition-colors text-center">
                    Continue Shopping
                </RouterLink>
            </div>
        </div>

        <!-- No Order Found -->
        <div v-else class="text-center py-12">
            <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">No order found</h2>
            <RouterLink to="/" class="text-primary-600 hover:underline">Return to home</RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { Check, Download } from 'lucide-vue-next'
import jsPDF from 'jspdf'

const cartStore = useCartStore()
const order = computed(() => cartStore.lastOrder)

const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const downloadPDF = () => {
    if (!order.value) return

    const doc = new jsPDF()

    // Header
    doc.setFontSize(24)
    doc.setTextColor(99, 102, 241) // Primary color
    doc.text('LuxeStore', 20, 20)

    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('Order Receipt', 20, 35)

    // Order Info
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Order ID: ${order.value.id}`, 20, 45)
    doc.text(`Date: ${formatDate(order.value.date)}`, 20, 52)
    doc.text(`Status: ${order.value.status.toUpperCase()}`, 20, 59)

    // Line
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 65, 190, 65)

    // Items Header
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text('Items', 20, 75)

    // Items
    let yPos = 85
    doc.setFontSize(10)
    order.value.items.forEach((item) => {
        const title = item.product.title.length > 50
            ? item.product.title.substring(0, 50) + '...'
            : item.product.title

        doc.text(title, 20, yPos)
        doc.text(`Qty: ${item.quantity}`, 20, yPos + 5)
        doc.text(`$${(item.product.price * item.quantity).toFixed(2)}`, 160, yPos, { align: 'right' })
        yPos += 15
    })

    // Totals
    yPos += 10
    doc.line(20, yPos, 190, yPos)
    yPos += 10

    doc.text('Subtotal:', 120, yPos)
    doc.text(`$${order.value.total.toFixed(2)}`, 180, yPos, { align: 'right' })

    yPos += 7
    doc.text('Shipping:', 120, yPos)
    doc.setTextColor(34, 197, 94) // Green
    doc.text('FREE', 180, yPos, { align: 'right' })

    yPos += 7
    doc.setTextColor(0, 0, 0)
    doc.text('Tax (10%):', 120, yPos)
    doc.text(`$${(order.value.total * 0.1).toFixed(2)}`, 180, yPos, { align: 'right' })

    yPos += 10
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Total:', 120, yPos)
    doc.text(`$${(order.value.total * 1.1).toFixed(2)}`, 180, yPos, { align: 'right' })

    // Footer
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150, 150, 150)
    doc.text('Thank you for shopping with LuxeStore!', 105, 280, { align: 'center' })
    doc.text('For support, contact us at support@luxestore.com', 105, 285, { align: 'center' })

    // Save
    doc.save(`LuxeStore-Receipt-${order.value.id}.pdf`)
}
</script>

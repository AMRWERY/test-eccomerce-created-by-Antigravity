<template>
    <div class="container mx-auto px-4 py-12 max-w-6xl">
        <h1 class="text-4xl font-bold text-secondary-900 dark:text-white mb-8">Blog</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="post in blogPosts" :key="post.id"
                class="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-sm border border-secondary-100 dark:border-secondary-700 hover:shadow-lg transition-shadow">
                <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400 mb-2">
                        <Calendar class="w-4 h-4" />
                        <span>{{ post.date }}</span>
                    </div>
                    <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-2">{{ post.title }}</h2>
                    <p class="text-secondary-600 dark:text-secondary-400 mb-4">{{ post.excerpt }}</p>
                    <button class="text-primary-600 hover:text-primary-700 font-medium">Read More →</button>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Calendar } from 'lucide-vue-next'

const blogPosts = [
    {
        id: 1,
        title: '2025 Fashion Trends You Need to Know',
        excerpt: 'Discover the hottest fashion trends that will dominate this year...',
        date: 'Nov 15, 2025',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'How to Style Your Winter Wardrobe',
        excerpt: 'Expert tips on creating the perfect winter looks...',
        date: 'Nov 10, 2025',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Sustainable Shopping Guide',
        excerpt: 'Make eco-friendly choices without compromising on style...',
        date: 'Nov 5, 2025',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Gift Ideas for Every Occasion',
        excerpt: 'Find the perfect gift for your loved ones...',
        date: 'Oct 28, 2025',
        image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        title: 'Jewelry Care Tips',
        excerpt: 'Keep your precious pieces looking brand new...',
        date: 'Oct 20, 2025',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        title: 'Tech Gadgets Worth Investing In',
        excerpt: 'The latest electronics that will make your life easier...',
        date: 'Oct 15, 2025',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
    }
]
</script>

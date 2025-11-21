<template>
    <div class="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
        <div class="flex transition-transform duration-500 ease-out h-full"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 h-full relative">
                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/30 flex items-center justify-center text-center">
                    <div class="max-w-2xl px-4">
                        <h2 class="text-4xl md:text-6xl font-bold text-white mb-4">{{ slide.title }}</h2>
                        <p class="text-lg md:text-xl text-white/90 mb-8">{{ slide.description }}</p>
                        <button
                            class="px-8 py-3 bg-white text-secondary-900 rounded-full font-bold hover:bg-primary-50 transition-colors">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Controls -->
        <button @click="prev"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
            <ChevronLeft class="w-6 h-6" />
        </button>
        <button @click="next"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
            <ChevronRight class="w-6 h-6" />
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button v-for="(_, index) in slides" :key="index" @click="currentIndex = index"
                class="w-3 h-3 rounded-full transition-all"
                :class="currentIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
    slides: Array<{
        image: string
        title: string
        description: string
    }>
}>()

const currentIndex = ref(0)
let interval: number

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

onMounted(() => {
    interval = setInterval(next, 5000)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

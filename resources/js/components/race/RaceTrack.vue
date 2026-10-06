<script setup lang="ts">
import type { Car } from '@/types/car';

const props = defineProps<{
    carA: Car | null;
    carB: Car | null;
    progressA: number;
    progressB: number;
    durationA: number;
    durationB: number;
    distance: 402 | 804;
}>();

function normalizedProgress(progress: number): number {
    return Math.min(100, Math.max(0, progress));
}
</script>

<template>
    <section class="overflow-hidden rounded-xl bg-gray-900 p-6 text-white">
        <div class="mb-5 flex items-center justify-between">
            <h2 class="text-xl font-bold">Tor wyścigowy</h2>
            <span class="text-sm text-gray-300">Meta: {{ distance }} m</span>
        </div>

        <div class="space-y-5">
            <div>
                <p class="mb-2 text-sm font-medium">
                    {{ carA ? `${carA.brand} ${carA.model}` : 'Samochód A' }}
                </p>
                <div class="relative h-16 overflow-hidden rounded-lg bg-gray-700">
                    <div class="absolute inset-x-0 bottom-2 border-b-2 border-dashed border-gray-500" />
                    <div
                        class="absolute bottom-3 -scale-x-100 text-3xl transition-[left] ease-linear"
                        :style="{
                            left: `calc(${normalizedProgress(props.progressA)}% - 2rem)`,
                            transitionDuration: `${props.durationA}ms`,
                        }"
                    >
                        🚗
                    </div>
                    <div class="absolute right-2 top-1 text-2xl">🏁</div>
                </div>
            </div>

            <div>
                <p class="mb-2 text-sm font-medium">
                    {{ carB ? `${carB.brand} ${carB.model}` : 'Samochód B' }}
                </p>
                <div class="relative h-16 overflow-hidden rounded-lg bg-gray-700">
                    <div class="absolute inset-x-0 bottom-2 border-b-2 border-dashed border-gray-500" />
                    <div
                        class="absolute bottom-3 -scale-x-100 text-3xl transition-[left] ease-linear"
                        :style="{
                            left: `calc(${normalizedProgress(props.progressB)}% - 2rem)`,
                            transitionDuration: `${props.durationB}ms`,
                        }"
                    >
                        🏎️
                    </div>
                    <div class="absolute right-2 top-1 text-2xl">🏁</div>
                </div>
            </div>
        </div>
    </section>
</template>

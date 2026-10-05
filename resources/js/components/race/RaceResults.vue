<script setup lang="ts">
import type { RaceResult } from '@/types/race';
import { computed } from 'vue';

const props = defineProps<{
    result: RaceResult | null;
}>();

const winner = computed(() => {
    if (!props.result) {
        return null;
    }

    return props.result.winnerId === props.result.carA.car.id
        ? props.result.carA.car
        : props.result.carB.car;
});
</script>

<template>
    <section
        v-if="result && winner"
        class="rounded-xl border border-yellow-300 bg-yellow-50 p-6 text-gray-900"
    >
        <div class="mb-6 text-center">
            <p class="text-4xl">🏆</p>
            <p class="mt-2 text-sm font-semibold uppercase tracking-wide text-yellow-700">
                Zwycięzca
            </p>
            <h2 class="text-2xl font-bold">
                {{ winner.brand }} {{ winner.model }}
            </h2>
            <p class="mt-1 text-sm text-gray-600">
                Dystans: {{ result.distance }} m
            </p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-yellow-300">
                        <th class="px-3 py-2">Pomiar</th>
                        <th class="px-3 py-2">
                            {{ result.carA.car.brand }} {{ result.carA.car.model }}
                        </th>
                        <th class="px-3 py-2">
                            {{ result.carB.car.brand }} {{ result.carB.car.model }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-yellow-200">
                        <th class="px-3 py-3 font-medium">0–100 km/h</th>
                        <td class="px-3 py-3">{{ result.carA.zeroTo100.toFixed(2) }} s</td>
                        <td class="px-3 py-3">{{ result.carB.zeroTo100.toFixed(2) }} s</td>
                    </tr>
                    <tr class="border-b border-yellow-200">
                        <th class="px-3 py-3 font-medium">100–200 km/h</th>
                        <td class="px-3 py-3">{{ result.carA.hundredTo200.toFixed(2) }} s</td>
                        <td class="px-3 py-3">{{ result.carB.hundredTo200.toFixed(2) }} s</td>
                    </tr>
                    <tr class="border-b border-yellow-200">
                        <th class="px-3 py-3 font-medium">Czas na mecie</th>
                        <td
                            class="px-3 py-3"
                            :class="{ 'font-bold text-green-700': result.winnerId === result.carA.car.id }"
                        >
                            {{ result.carA.finishTime.toFixed(2) }} s
                        </td>
                        <td
                            class="px-3 py-3"
                            :class="{ 'font-bold text-green-700': result.winnerId === result.carB.car.id }"
                        >
                            {{ result.carB.finishTime.toFixed(2) }} s
                        </td>
                    </tr>
                    <tr>
                        <th class="px-3 py-3 font-medium">Prędkość na mecie</th>
                        <td class="px-3 py-3">{{ Math.round(result.carA.finishSpeed) }} km/h</td>
                        <td class="px-3 py-3">{{ Math.round(result.carB.finishSpeed) }} km/h</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>


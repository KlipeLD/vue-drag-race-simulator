<script setup lang="ts">
import type { Car } from '@/types/car';

defineProps<{
    title: string;
    car: Car | null;
}>();
</script>

<template>
    <article class="rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
        <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-red-600">
            {{ title }}
        </p>

        <template v-if="car">
            <h2 class="mb-5 text-2xl font-bold">
                {{ car.brand }} {{ car.model }}
            </h2>
            <dl class="space-y-3">
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">Moc</dt>
                    <dd class="font-semibold">{{ car.powerHp }} KM</dd>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">Moment obrotowy</dt>
                    <dd class="font-semibold">{{ car.torqueNm }} Nm</dd>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">Masa</dt>
                    <dd class="font-semibold">{{ car.weightKg }} kg</dd>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">Napęd</dt>
                    <dd class="font-semibold">{{ car.driveType }}</dd>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">Skrzynia</dt>
                    <dd class="font-semibold">{{ car.transmission }}</dd>
                </div>
                <div class="flex justify-between border-b border-gray-100 pb-2">
                    <dt class="text-gray-600">0–100 km/h</dt>
                    <dd class="font-semibold">{{ car.zeroTo100.toFixed(1) }} s</dd>
                </div>
                <div class="flex justify-between">
                    <dt class="text-gray-600">Prędkość maksymalna</dt>
                    <dd class="font-semibold">{{ car.topSpeed }} km/h</dd>
                </div>
            </dl>
        </template>

        <p v-else class="py-10 text-center text-gray-500">
            Nie wybrano samochodu
        </p>
    </article>
</template>


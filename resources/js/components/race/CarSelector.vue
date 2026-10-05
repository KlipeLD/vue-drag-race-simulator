<script setup lang="ts">
import type { Car } from '@/types/car';

const props = defineProps<{
    label: string;
    cars: Car[];
    modelValue: number | null;
    excludedCarId?: number | null;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: number | null];
}>();

function handleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    emit('update:modelValue', select.value ? Number(select.value) : null);
}
</script>

<template>
    <div>
        <label class="mb-2 block text-sm font-semibold text-gray-700">
            {{ label }}
        </label>
        <select
            :value="modelValue ?? ''"
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500"
            @change="handleChange"
        >
            <option value="" disabled>Wybierz samochód</option>
            <option
                v-for="car in props.cars"
                :key="car.id"
                :value="car.id"
                :disabled="car.id === excludedCarId"
            >
                {{ car.brand }} {{ car.model }}
            </option>
        </select>
    </div>
</template>


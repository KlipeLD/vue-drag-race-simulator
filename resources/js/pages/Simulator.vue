<script setup lang="ts">
import CarCard from '@/components/race/CarCard.vue';
import CarSelector from '@/components/race/CarSelector.vue';
import RaceResults from '@/components/race/RaceResults.vue';
import RaceTrack from '@/components/race/RaceTrack.vue';
import { cars } from '@/data/cars';
import type { Car } from '@/types/car';
import type { CarRaceResult, RaceResult } from '@/types/race';
import { Head } from '@inertiajs/vue3';
import { computed, nextTick, ref } from 'vue';

const selectedCarAId = ref<number | null>(null);
const selectedCarBId = ref<number | null>(null);
const distance = ref<402 | 804>(402);
const progressA = ref(0);
const progressB = ref(0);
const durationA = ref(0);
const durationB = ref(0);
const isRacing = ref(false);
const result = ref<RaceResult | null>(null);

const selectedCarA = computed<Car | null>(() =>
    cars.find((car) => car.id === selectedCarAId.value) ?? null,
);

const selectedCarB = computed<Car | null>(() =>
    cars.find((car) => car.id === selectedCarBId.value) ?? null,
);

const canStartRace = computed(() =>
    selectedCarA.value !== null &&
    selectedCarB.value !== null &&
    selectedCarA.value.id !== selectedCarB.value.id,
);

function calculateCarResult(car: Car): CarRaceResult {
    const powerToWeight = car.powerHp / car.weightKg;
    const distanceModifier = distance.value === 804 ? 1.75 : 1;
    const finishTime =
        (14.5 + car.zeroTo100 * 0.5 - powerToWeight * 15) *
        distanceModifier;
    const hundredTo200 = Math.max(
        4.5,
        (car.weightKg / car.powerHp) * 2.3,
    );
    const finishSpeed = Math.min(
        car.topSpeed,
        170 + powerToWeight * 160,
    );

    return {
        car,
        zeroTo100: car.zeroTo100,
        hundredTo200,
        finishTime,
        finishSpeed,
    };
}

function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function waitForAnimationFrame(): Promise<void> {
    return new Promise((resolve) => {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => resolve());
        });
    });
}

async function startRace(): Promise<void> {
    if (!selectedCarA.value || !selectedCarB.value || isRacing.value) {
        return;
    }

    const carAResult = calculateCarResult(selectedCarA.value);
    const carBResult = calculateCarResult(selectedCarB.value);

    isRacing.value = true;
    result.value = null;
    progressA.value = 0;
    progressB.value = 0;
    durationA.value = 0;
    durationB.value = 0;

    // Najpierw renderujemy auta ponownie na linii startu.
    await nextTick();
    await waitForAnimationFrame();

    durationA.value = Math.round(carAResult.finishTime * 1000);
    durationB.value = Math.round(carBResult.finishTime * 1000);
    progressA.value = 100;
    progressB.value = 100;

    await wait(Math.max(durationA.value, durationB.value));

    result.value = {
        distance: distance.value,
        carA: carAResult,
        carB: carBResult,
        winnerId:
            carAResult.finishTime <= carBResult.finishTime
                ? carAResult.car.id
                : carBResult.car.id,
    };

    isRacing.value = false;
}
</script>

<template>
    <Head title="Drag Race Simulator" />

    <main class="min-h-screen bg-gray-100 px-4 py-10 text-gray-900">
        <div class="mx-auto max-w-6xl space-y-8">
            <header class="text-center">
                <p class="text-sm font-semibold uppercase tracking-widest text-red-600">
                    Vue.js
                </p>
                <h1 class="mt-2 text-4xl font-bold">Drag Race Simulator</h1>
                <p class="mt-3 text-gray-600">
                    Wybierz dwa samochody i sprawdź wynik wyścigu.
                </p>
            </header>

            <section class="grid gap-6 md:grid-cols-2">
                <CarSelector
                    v-model="selectedCarAId"
                    label="Samochód A"
                    :cars="cars"
                    :excluded-car-id="selectedCarBId"
                />
                <CarSelector
                    v-model="selectedCarBId"
                    label="Samochód B"
                    :cars="cars"
                    :excluded-car-id="selectedCarAId"
                />
            </section>

            <section class="grid gap-6 md:grid-cols-2">
                <CarCard title="Samochód A" :car="selectedCarA" />
                <CarCard title="Samochód B" :car="selectedCarB" />
            </section>

            <section class="rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
                <label for="distance" class="mb-2 block text-sm font-semibold text-gray-700">
                    Dystans
                </label>
                <select
                    id="distance"
                    v-model="distance"
                    :disabled="isRacing"
                    class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 md:w-64"
                >
                    <option :value="402">1/4 mili — 402 m</option>
                    <option :value="804">1/2 mili — 804 m</option>
                </select>
            </section>

            <RaceTrack
                :car-a="selectedCarA"
                :car-b="selectedCarB"
                :progress-a="progressA"
                :progress-b="progressB"
                :duration-a="durationA"
                :duration-b="durationB"
                :distance="distance"
            />

            <div class="text-center">
                <button
                    type="button"
                    :disabled="!canStartRace || isRacing"
                    class="rounded-lg bg-red-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    @click="startRace"
                >
                    {{ isRacing ? 'WYŚCIG TRWA…' : 'START 🏁' }}
                </button>
                <p v-if="!canStartRace" class="mt-3 text-sm text-gray-600">
                    Wybierz dwa różne samochody.
                </p>
            </div>

            <RaceResults :result="result" />
        </div>
    </main>
</template>

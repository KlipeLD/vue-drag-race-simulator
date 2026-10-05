import type { Car } from '@/types/car';

export interface CarRaceResult {
    car: Car;
    zeroTo100: number;
    hundredTo200: number;
    finishTime: number;
    finishSpeed: number;
}

export interface RaceResult {
    distance: 402 | 804;
    carA: CarRaceResult;
    carB: CarRaceResult;
    winnerId: number;
}
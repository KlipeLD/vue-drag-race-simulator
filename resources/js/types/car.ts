export interface Car {
    id: number;
    brand: string;
    model: string;
    powerHp: number;
    torqueNm: number;
    weightKg: number;
    driveType: 'FWD' | 'RWD' | 'AWD';
    transmission: 'manual' | 'automatic' | 'DCT';
    zeroTo100: number;
    topSpeed: number;
}
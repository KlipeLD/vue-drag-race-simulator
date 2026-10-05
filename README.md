# Drag Race Simulator

Drag Race Simulator to testowy projekt stworzony w celu nauki Vue.js i jego integracji z Laravelem.

Aplikacja pozwala wybrać dwa samochody, porównać ich parametry i przeprowadzić animowany wyścig na dystansie 1/4 lub 1/2 mili.

## Cel projektu

Głównym celem projektu jest praktyczna nauka:

- Vue 3 i Composition API,
- reaktywności z użyciem `ref()` i `computed()`,
- budowania komponentów,
- przekazywania danych przez props,
- emitowania zdarzeń,
- TypeScriptu,
- animacji CSS,
- zarządzania stanem interfejsu,
- integracji Vue z Laravelem i Inertia.js,
- budowania aplikacji za pomocą Vite.

Projekt ma charakter edukacyjny. Nie jest profesjonalnym symulatorem osiągów samochodowych.

## Technologie

- Laravel 12
- Vue 3
- TypeScript
- Inertia.js
- Tailwind CSS
- Vite

Laravel odpowiada za uruchomienie aplikacji, routing oraz — w przyszłości — bazę danych i zapisywanie wyników. Vue obsługuje interfejs, wybór samochodów, obliczenia, animację wyścigu i prezentację rezultatów.

## Aktualne funkcje

- wybór dwóch różnych samochodów,
- prezentacja parametrów wybranych aut,
- wybór dystansu 1/4 mili (402 m) lub 1/2 mili (804 m),
- animowany przebieg wyścigu,
- różny czas przejazdu zależny od parametrów auta,
- określenie zwycięzcy,
- tabela czasów i prędkości na mecie,
- możliwość wielokrotnego uruchamiania wyścigu.

## Dane samochodów

Każdy samochód posiada:

- markę i model,
- moc w KM,
- moment obrotowy w Nm,
- masę,
- rodzaj napędu,
- rodzaj skrzyni biegów,
- czas przyspieszenia 0–100 km/h,
- prędkość maksymalną.

Na obecnym etapie dane są przechowywane lokalnie w pliku:

```text
resources/js/data/cars.ts
```

W kolejnych wersjach mogą zostać przeniesione do bazy danych i udostępniane przez Laravel.

## Sposób działania symulacji

Wynik wyścigu jest szacowany na podstawie mocy, masy, stosunku mocy do masy, czasu 0–100 km/h oraz wybranego dystansu.

Obliczone wyniki są wartościami orientacyjnymi. Symulacja nie uwzględnia jeszcze wszystkich czynników występujących w rzeczywistym wyścigu, takich jak:

- opór aerodynamiczny,
- przyczepność i rodzaj opon,
- przełożenia skrzyni biegów,
- czas zmiany biegów,
- warunki nawierzchni i pogody,
- czas reakcji kierowcy.

## Struktura aplikacji

```text
resources/js/
├── components/race/
│   ├── CarSelector.vue
│   ├── CarCard.vue
│   ├── RaceTrack.vue
│   └── RaceResults.vue
├── data/
│   └── cars.ts
├── pages/
│   └── Simulator.vue
└── types/
    ├── car.ts
    └── race.ts
```

### Komponenty

- `CarSelector.vue` — wybór samochodu.
- `CarCard.vue` — prezentacja parametrów samochodu.
- `RaceTrack.vue` — tor i animacja samochodów.
- `RaceResults.vue` — prezentacja zwycięzcy i wyników.
- `Simulator.vue` — stan aplikacji, obliczenia i sterowanie przebiegiem wyścigu.

## Wymagania

- PHP 8.2 lub nowszy
- Composer
- Node.js
- npm

## Instalacja

Zainstaluj zależności PHP i JavaScript:

```bash
composer install
npm install
```

Utwórz plik środowiskowy.

Linux lub macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Wygeneruj klucz aplikacji:

```bash
php artisan key:generate
```

Uruchom środowisko deweloperskie:

```bash
composer run dev
```

Aplikacja będzie domyślnie dostępna pod adresem:

```text
http://localhost:8000
```

## Planowany rozwój

- baza danych samochodów,
- modele, migracje i seedery Laravel,
- pobieranie samochodów z backendu,
- zapisywanie historii wyścigów,
- odliczanie 3, 2, 1, GO,
- czas reakcji kierowcy,
- modyfikacje Stock, Stage 1 i Stage 2,
- wybór rodzaju opon,
- dokładniejszy model fizyczny,
- historia i porównywanie wyników,
- testy jednostkowe i integracyjne.

## Status

Projekt jest w trakcie rozwoju i służy przede wszystkim do nauki Vue.js, TypeScriptu oraz integracji frontendu z Laravelem.

# Pixie Card Game (WIP)

Браузерная карточная игра на Pixi.js. Архитектура строится вокруг сцен (меню/игра), системы сетки игрового поля и модульной структуры с алиасами.

## Скрипты
- `npm run dev` — запуск Vite dev server (порт 8080)
- `npm run build` — линт + проверка типов + прод-сборка
- `npm run lint` — линтер (ESLint + Prettier)

## Технологии
- Pixi.js v8 — рендеринг
- Vite — сборка/dev server
- TypeScript — типы
- ESLint + Prettier — стиль и контроль качества


## Структура проекта (план)
```
src/
  core/
    AppFactory.ts        # фабрика Pixi Application (инициализация и монтирование)
    index.ts             # реэкспорт core-пакета
  scenes/
    MenuScene.ts         # главное меню (кнопка "Начать игру")
    GameScene.ts         # игровая сцена (поле-сетка и логика партии)
    # LoadingScene.ts    # (опционально) прелоадер ассетов
  system/
    GridSystem/
      GridConfig.ts      # конфигурация сетки (размер клетки, зазоры, цвета)
      Grid.ts            # модель сетки (индексы/координаты)
      GridView.ts        # отрисовка ячеек, события указателя
    # InputSystem/, AnimationSystem/ ... по мере роста проекта
  ui/
    components/          # UI-компоненты на Pixi (Button, Label, Panel)
    layouts/             # компоновка/центрирование/адаптив
    styles/              # палитры/темы/шрифты
  config/
    assets.ts            # манифест ассетов/алиасы
    game.ts              # глобальные настройки (фон, FPS, масштаб)
  types/
    # общие типы (события, координаты клетки и пр.)
  utils/
    # утилиты (математика, таймеры, рандом)
  main.ts               # входная точка: создание app, запуск менеджера сцен
```

## Поток сцен
- Старт: `MenuScene` → кнопка «Начать игру» → сигнал менеджеру сцен → `replace(GameScene)`
- `GameScene` создаёт `Grid` и `GridView`, вешает обработчики ввода/ховера, управляет состоянием партии.

## Сетка (поле)
- `GridConfig` — размеры ячейки, зазоры, отступы, цвета/стили.
- `Grid` — логическая модель: индексы ↔ координаты, размеры, полезные хелперы.
- `GridView` — `Container`/`Graphics`-отрисовка ячеек, события (hover/click), подсветка.

## Менеджер сцен (план)
- `SceneManager` управляет жизненным циклом сцен: `push/replace/pop`, вызовы `init/destroy`, подписки.
- Сцена — объект с ссылкой на `app`, реализует методы жизненного цикла и имеет свой корневой `Container`.

## Ближайшие шаги
1. Реализовать `SceneManager` и `MenuScene` с кнопкой «Начать игру».
2. Добавить `GameScene` с минимальной сеткой (визуальные ячейки, hover).
3. Вынести `GridSystem` (модель/представление/конфиг) и связать с `GameScene`.
4. Подключить манифест ассетов и, при необходимости, `LoadingScene`.
# Pixie Card Game (WIP)\n\nБраузерная карточная игра на Pixi.js. Проект строится вокруг сцен (меню/игра), системы сетки для игрового поля и модульной структуры с алиасами.\n\n## Скрипты\n- `npm run dev` — запуск Vite dev server (порт 8080)\n- `npm run build` — линт + компиляция типов + прод-сборка\n- `npm run lint` — линтер (ESLint + Prettier)\n\n## Технологии\n- Pixi.js v8 — рендеринг\n- Vite — сборка/dev server\n- TypeScript — типы\n- ESLint + Prettier — стиль и контроль качества\n\n## Алиасы\nНастроены в `vite.config.ts` и `tsconfig.json`:\n- `@core` → `src/core`\n- `@config` → `src/config`\n- `@scenes` → `src/scenes`\n- `@system` → `src/system`\n- `@types` → `src/types`\n- `@utils` → `src/utils`\n- `@ui` → `src/ui`\n\nПример импорта:\n```ts\nimport { createPixiApp } from \"@core/AppFactory\";\n// или через индекс: import { createPixiApp } from \"@core\";\n```\n\n## Структура проекта (план)\n```\nsrc/\n  core/\n    AppFactory.ts        # фабрика Pixi Application (инициализация и монтирование)\n    index.ts             # реэкспорт core-пакета\n  scenes/\n    MenuScene.ts         # главное меню (кнопка \"Начать игру\")\n    GameScene.ts         # игровая сцена (поле-сетка и логика партии)\n    # LoadingScene.ts    # (опционально) прелоадер ассетов\n  system/\n    GridSystem/\n      GridConfig.ts      # конфигурация сетки (размер клетки, зазоры, цвета)\n      Grid.ts            # модель сетки (индексы/координаты)\n      GridView.ts        # отрисовка ячеек, события указателя\n    # InputSystem/, AnimationSystem/ ... по мере роста проекта\n  ui/\n    components/          # простые UI-компоненты на Pixi (Button, Label, Panel)\n    layouts/             # компоновка/центрирование/адаптив\n    styles/              # палитры/темы/шрифты\n  config/\n    assets.ts            # манифест ассетов/алиасы\n    game.ts              # глобальные настройки (фон, FPS, масштаб)\n  types/\n    # общие типы (события, координаты клетки и пр.)\n  utils/\n    # утилиты (математика, таймеры, рандом)\n  main.ts               # входная точка: создание app, запуск менеджера сцен\n```\n\n## Поток сцен\n- Старт: `MenuScene` → кнопка «Начать игру» → сигнал менеджеру сцен → `replace(GameScene)`\n- `GameScene` создаёт `Grid` и `GridView`, вешает обработчики ввода/ховера, управляет состоянием партии.\n\n## Сетка (поле)\n- `GridConfig` — размеры ячейки, зазоры, отступы, цвета/стили.\n- `Grid` — логическая модель: индексы ↔ координаты, размеры, полезные хелперы.\n- `GridView` — `Container`/`Graphics`-отрисовка ячеек, события (hover/click), подсветка.\n\n## Менеджер сцен (план)\n- `SceneManager` управляет жизненным циклом сцен: `push/replace/pop`, вызовы `init/destroy`, подписки.\n- Сцена — объект с ссылкой на `app`, реализует методы жизненного цикла и имеет свой корневой `Container`.\n\n## Ближайшие шаги\n1. Реализовать `SceneManager` и `MenuScene` с кнопкой «Начать игру».\n2. Добавить `GameScene` с минимальной сеткой (визуальные ячейки, hover).\n3. Вынести `GridSystem` (модель/представление/конфиг) и связать с `GameScene`.\n4. Подключить манифест ассетов и, при необходимости, `LoadingScene`.\n*** End Patch


# 3D-конфигуратор светильника

Интерактивный 3D-конфигуратор декоративного светильника в форме панельного многоквартирного дома. Позволяет менять цвет фасада, настраивать цвет и яркость оконного освещения и рассматривать модель со всех сторон.

**Демо:** https://sorkan176.github.io/3dconfigurator/

[//]: # (## Демонстрация)

[//]: # ()
[//]: # (<!-- Скриншот в docs/screenshots/main.png -->)

[//]: # (<!-- ![Главный экран конфигуратора]&#40;docs/screenshots/main.png&#41; -->)

[//]: # ()
[//]: # (<!-- GIF-демонстрация в docs/screenshots/demo.gif -->)

[//]: # (<!-- ![Демонстрация работы конфигуратора]&#40;docs/screenshots/demo.gif&#41; -->)

## Установка и запуск

Требуется Node.js версии LTS и npm.

```bash
git clone https://github.com/Sorkan176/3dconfigurator.git
cd 3dconfigurator
npm install
npm run dev
```

После запуска Vite выведет адрес локального сайта в терминале.

## Технологии

- React, TypeScript, Vite
- Three.js, React Three Fiber, React Three Drei
- Zustand - управление состоянием конфигуратора
- i18next, react-i18next - русский и английский языки
- CSS Modules, clsx - стилизация интерфейса
- Vitest, React Testing Library, jest-dom, user-event - тестирование

## Тестирование

Для запуска автоматических тестов:

```bash
 npm run test:run
```

Тесты проверяют компоненты интерфейса и работу хранилища настроек конфигуратора.

Для сборки проекта:

```bash
npm run build
```

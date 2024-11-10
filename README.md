This is a [Next.js](https://nextjs.org) project.

Для запуска требуется node.js ,рекомендуется версия не меньше 20.11.1

```bash
# установка зависимостей
npm install
# сборка проекта
npm run build
# запуск сборки
npm run start
# запуска в режиме разработчика
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Для изменений url адресов backend модуля вам необходимо внести изменения в файл ```next.config.mjs``` или создать env файл или описать зависимости в docker-compose.

### Стек:
- Next.js - фреймворк
- React - библиотека
- TypeScript - яп
- Prismane - готовые UI компоненты
- TypeScript библиотеки - дополнительные библиотеки, например работа с zip

### Папки/Структура:
- app - маршруты для Next.js
- api - функции запросов (get/post)
  - get_package - запрос, получение результата по сессии
  - list_packages - запрос, получение всех списков сессий
  - sessions - запрос, генерация сессии
  - upload_image - запрос, загрузка изображения
- env - импорт зависимостей
- components - компоненты
  - addFolderGrid - компонент кнопки, добавить ещё одну папку
  - addImageGrid - компонент кнопки, добавить ещё изображений или архивов
  - API - отменено
  - archiveImageGrid - компонент обработанного изображения на странице архива -> определённой сессии
  - csvSend - компонент кнопки, скачать CSV файл
  - Editor - редактор на странице обработки (Файловая система, панель управления)
  - FormDownload - первая загрузка (папка или файлы/архивы)
  - imageGrid - компонент изображения на странице обработки
  - sendImage - компонент кнопки, начать обработку
- pagesClient - описание страниц на клиентской части (браузер)
  - app - главная страница
  - archive - архив
  - download - обработка
  - sessionPage - шаблон определённой сессии
- provider - контекст темы
- public - папка с медиафайлами
- template - шаблонная обёртка (бокове меню и фон страницы)
- utils - функции с бизнес-логикой
  - buildFileTree - построение файлового дерева
  - getImageDimensions - получение ширины и высоты изображения

### Маршруты:
1. App: - ```'/'``` - основная страница, она является первой страницей, хабом, с которого осуществляется переход на другие разделы.
2. download - ```'/download'``` - страница для загрузки и обработки, страница ,где осуществляется загрузка файлов, архивов, папок и запуск их обработки, а также вывод предварительных результатов
3. archive - ```'/archive'``` - страница с архивом обработанных изображений, страница, где указан список всех сессий обработки и переход к более подробной информации
4. [package] - ```'/archive/[package]'``` - страницы конкретных сессии с обработанными изображениями, страницы где указаны результаты обработки изображений по даннам сессиям

### Переменные окружения
Cодержатся в next.config.mjs файле, не можно задать и через другие средства (docker, переменные окружения Vercel)

1. GET_PACKAGE - получение результата по сессии ```https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_package?packageId=```, get, url параметр ```packageId``` - id сессии
2. LIST_PACKAGE - получение всех списков сессий ```https://crisply-protected-ribbonfish.cloudpub.ru/archive/list_packages```, get
3. SESSIONS - генерация сессии ```https://crisply-protected-ribbonfish.cloudpub.ru/images/create_package```, post, body пустой
4. UPLOAD_IMAGE - загрузка изображения ```https://crisply-protected-ribbonfish.cloudpub.ru/images/upload_image```, post, body (json) ```{packageId: id сесси,imageTitle: название файла,imagePath: путь файла (если в папке/в архиве, если загружено как просто изображение то "")",imageBase64: изображение в формате Base64}```
5. CSV_FILE - получение CSV файла ```https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_report?packageId=```, get, url параметр ```packageId``` - id сессии


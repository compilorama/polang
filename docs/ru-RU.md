# Polang

## Что такое Polang

Polang — это компактная библиотека i18n для веб-приложений на React. Она даёт компонент-провайдер, хук перевода и опциональный селектор локали — три части, необходимые для того, чтобы добавить мультиязычность в любое React-приложение с минимальными усилиями.

## Зачем Polang

Большинство библиотек i18n **очень тяжёлые**: сложная (иногда асинхронная) настройка, большие бандлы и API с большим количеством шаблонного кода, чем оправдано самой задачей. Polang создан для проектов, которым нужна простая интернационализация без лишнего. Вы приносите файлы переводов; Polang берёт на себя остальное.

## Установка

```bash
npm install @compilorama/polang
```

Polang требует React 18 или новее.

## Использование

### 1. Оберните приложение в `I18nProvider`

Передайте список поддерживаемых локалей в `I18nProvider`. **Первая локаль** в массиве используется **по умолчанию**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'ru-RU', name: 'Русский (Россия)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Определите переводы

В Polang переводы ориентированы на компоненты. Каждый компонент «владеет» своими переводами так же, как стилями или юнит-тестами — в виде соседнего файла в той же папке.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← рядом с компонентом
```

Файл переводов — это простой объект с ключами-кодами локалей; для каждой локали ключи переводов сопоставляются со строками.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'ru-RU': {
    'hello': 'Добро пожаловать!',
    'description': 'Polang — компактная библиотека i18n.',
  }
};

export default translations;
```

### 3. Переводите строки через `useTranslation`

Вызовите `useTranslation` с объектом переводов в любом компоненте внутри `I18nProvider`. Он возвращает функцию `t`, которая подставляет нужную строку для активной локали.

```jsx
import { useTranslation } from '@compilorama/polang';
import translations from './hero.t.js';

export default function Hero() {
  const { t } = useTranslation(translations);
  return (
    <>
      <h1>{t('hello')}</h1>
      <p>{t('description')}</p>
    </>
  );
}
```

### 4. Добавьте выбор локали через `LocaleSelect`

`LocaleSelect` рендерит `<select>` с локалями из `I18nProvider`. Выбор опции сразу меняет активную локаль. Поддерживаются стандартные пропсы `<select>`.

```jsx
import { useTranslation, LocaleSelect } from '@compilorama/polang';
import translations from './header.t.js';

export default function Header() {
  const { t } = useTranslation(translations);
  return (
    <header>
      <LocaleSelect aria-label={t('locale')} />
    </header>
  );
}
```

## Расширенное использование

### Интерполяция переменных

Используйте плейсхолдеры `{{ variableName }}` в строках перевода и передавайте значения вторым аргументом `t`.

**Одна переменная:**

```js
// translations.js
'en-US': {
  'greeting': 'Hello, {{ name }}!'
}
```

```jsx
<p>{t('greeting', { name: 'Rafael' })}</p>
// → Hello, Rafael!
```

**Несколько переменных:**

```js
// translations.js
'en-US': {
  'inbox_greeting': 'Hello {{ name }}, you have {{ count }} messages'
}
```

```jsx
<p>{t('inbox_greeting', { name: 'Rafael', count: 5 })}</p>
// → Hello Rafael, you have 5 messages
```

### JSX в качестве значений переменных

Значениями могут быть элементы React — так можно вставлять ссылки и другие компоненты внутрь переведённых строк.

```js
// translations.js
'en-US': {
  'learn_more': '{{ link }} to learn more',
  'click_here': 'Click here'
}
```

```jsx
const { t } = useTranslation(translations);
<p>
  {t('learn_more', {
    link: <a href="/learn">{t('click_here')}</a>
  })}
</p>
// → <a href="/learn">Click here</a> to learn more
```

## Предпочитаемый язык

Polang автоматически сохраняет выбранную локаль двумя способами, чтобы пользователи **видели предпочитаемый язык между сессиями и при открытии общих ссылок**:

- **Параметр запроса в URL** — код активной локали хранится в параметре `?locale=`.
- **`localStorage`** — код активной локали сохраняется под ключом `plocale`.

При инициализации Polang определяет предпочитаемую локаль в таком порядке:
1. Параметр URL
2. Local Storage
3. Язык браузера
4. Если ничего не подошло, используется первая локаль, переданная в `I18nProvider`.

Можно заранее выбрать локаль, задав параметр запроса до загрузки страницы:

```
https://yourapp.ru/?locale=ru-RU
```

## Участие в проекте

Для участия нужен [Node.js](https://nodejs.org/) 22.x или новее.

### Настройка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите тесты:

   ```bash
   npm test
   ```

4. Проверьте форматирование кода:

   ```bash
   npm run format
   ```

5. Соберите библиотеку:

   ```bash
   npm run build
   ```

## Примечания

1. Весь исходный код находится в `src/`.
2. Тесты следуют соглашению об именах `*.test.js`.

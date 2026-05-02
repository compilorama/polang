# Polang

## What is Polang

Polang is a tiny i18n library for React web apps. It offers a provider component, a translation hook, and an optional locale selector component — the three necessary pieces to add multi-language support to any React application with minimal effort.

## Why Polang

Most i18n libraries **carry a lot of weight**: complex (and sometimes asynchronous) configuration, large bundles, and APIs that require more boilerplate than the feature itself warrants. Polang was built for projects that need straightforward internationalization without the overhead. You bring your translation files, Polang handles the rest.

## Installation

```bash
npm install @compilorama/polang
```

Polang requires React 18 or later.

## Usage

### 1. Wrap your app with `I18nProvider`

Pass the list of supported locales to `I18nProvider`. The **first locale** in the array is used as the **default**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'pt-BR', name: 'Português BR' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Define your translations

Translations in Polang are component-oriented. Each component owns its translations the same way it owns its styles or unit tests — as a sibling file in the same directory.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← lives right next to the component
```

A translations file is a plain object keyed by locale code, where each locale maps translation keys to their translated strings.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'pt-BR': {
    'hello': 'Bem vindo!',
    'description': 'Polang é uma mini biblioteca i18n.',
  }
};

export default translations;
```

### 3. Translate strings with `useTranslation`

Call `useTranslation` with your translations object inside any component wrapped by `I18nProvider`. It returns a `t` function that resolves the correct string for the active locale.

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

### 4. Add a locale selector with `LocaleSelect`

`LocaleSelect` renders a `<select>` element pre-populated with the locales defined in `I18nProvider`. Choosing an option immediately switches the active locale. It accepts any standard `<select>` props.

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

## Advanced Usage

### Interpolate variables

Use `{{ variableName }}` placeholders in your translation strings and pass the values as the second argument to `t`.

**Single variable:**

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

**Multiple variables:**

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

### Use JSX as variable values

Variable values can be React elements, which lets you embed links or other components inside translated strings.

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

## Preferred Language

Polang automatically persists the selected locale in two ways so users **see their preferred language across sessions and when opening shared URLs**:

- **URL search param** — the active locale code is kept in the `?locale=` query parameter.
- **`localStorage`** — the active locale code is stored under the key `plocale`.

On initialization, Polang detects the preferred locale in the following order:
1. URL param
2. Local Storage
3. Navigator language
4. If none of the above apply, Polang falls back to the first locale passed to `I18nProvider`.

You can pre-select a locale by setting the search param before the page loads:

```
https://yourapp.com/?locale=pt-BR
```

## Contributions

You need [Node.js](https://nodejs.org/) 22.x or later to contribute to this project.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the test suite:

   ```bash
   npm test
   ```

4. Check code formatting:

   ```bash
   npm run format
   ```

5. Build the library:

   ```bash
   npm run build
   ```

NOTES:
1. All source files live under `src/`.
2. Tests follow the `*.test.js` naming convention.

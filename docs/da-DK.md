# Polang

## Hvad er Polang?

Polang er et lille i18n-bibliotek til React-webapps. Det giver en provider-komponent, en oversættelses-hook og en valgfri locale-vælger — de tre dele, du skal bruge for at gøre enhver React-app flersproget med minimalt besvær.

## Hvorfor Polang?

De fleste i18n-biblioteker **vejer tungt**: kompleks (og nogle gange asynkron) konfiguration, store bundles og API’er, der kræver mere boilerplate, end funktionen retfærdiggør. Polang er lavet til projekter, der vil have enkel internationalisering uden overhead. Du leverer oversættelsesfilerne; Polang klarer resten.

## Installation

```bash
npm install @compilorama/polang
```

Polang kræver React 18 eller nyere.

## Brug

### 1. Pak appen ind i `I18nProvider`

Send listen over understøttede locales til `I18nProvider`. Det **første locale** i arrayet bruges som **standard**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'da-DK', name: 'Dansk (Danmark)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Definér dine oversættelser

I Polang er oversættelser komponentorienterede. Hver komponent ejer sine oversættelser ligesom styles eller unit tests — som søskendefil i samme mappe.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← ved siden af komponenten
```

En oversættelsesfil er et simpelt objekt nøglet på locale-kode; for hvert locale mapper oversættelsesnøgler til strenge.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'da-DK': {
    'hello': 'Velkommen!',
    'description': 'Polang er et lille i18n-bibliotek.',
  }
};

export default translations;
```

### 3. Oversæt strenge med `useTranslation`

Kald `useTranslation` med dit oversættelsesobjekt inde i enhver komponent, der er pakket ind i `I18nProvider`. Det returnerer en funktion `t`, der giver den rigtige streng for det aktive locale.

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

### 4. Tilføj en locale-vælger med `LocaleSelect`

`LocaleSelect` renderer et `<select>` forudfyldt med de locales, der er defineret i `I18nProvider`. Valg af en mulighed skifter det aktive locale med det samme. Den accepterer almindelige `<select>`-props.

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

## Avanceret brug

### Interpolér variabler

Brug pladsholdere `{{ variableName }}` i oversættelsesstrengene og send værdierne som andet argument til `t`.

**Én variabel:**

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

**Flere variabler:**

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

### Brug JSX som variabelværdier

Værdier kan være React-elementer, så du kan indlejre links eller andre komponenter i oversatte strenge.

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

## Foretrukket sprog

Polang gemmer automatisk det valgte locale på to måder, så brugerne **ser deres foretrukne sprog på tværs af sessioner og når de åbner delte URL’er**:

- **URL-søgeparameter** — den aktive locale-kode ligger i query-parameteren `?locale=`.
- **`localStorage`** — den aktive locale-kode gemmes under nøglen `plocale`.

Ved start finder Polang det foretrukne locale i denne rækkefølge:
1. URL-parameter
2. Local Storage
3. Browsersprog
4. Hvis intet passer, falder Polang tilbage til det første locale, der er givet til `I18nProvider`.

Du kan forvælge et locale ved at sætte søgeparameteren, før siden indlæses:

```
https://dinapp.dk/?locale=da-DK
```

## Bidrag

Du skal bruge [Node.js](https://nodejs.org/) 22.x eller nyere for at bidrage til dette projekt.

### Opsætning

1. Klon repository:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installer afhængigheder:

   ```bash
   npm install
   ```

3. Kør tests:

   ```bash
   npm test
   ```

4. Tjek kodeformatering:

   ```bash
   npm run format
   ```

5. Byg biblioteket:

   ```bash
   npm run build
   ```

## Bemærkninger

1. Al kildekode ligger under `src/`.
2. Tests følger navnekonventionen `*.test.js`.

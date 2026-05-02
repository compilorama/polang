# Polang

## Hva er Polang?

Polang er et lite i18n-bibliotek for React-webapper. Det tilbyr en provider-komponent, en oversettelses-hook og en valgfri locale-velger — de tre delene du trenger for å legge til flerspråklig støtte i enhver React-app med minimal innsats.

## Hvorfor Polang?

De fleste i18n-biblioteker **veier mye**: kompleks (og noen ganger asynkron) konfigurasjon, store bundles og API-er som krever mer boilerplate enn funksjonen fortjener. Polang er laget for prosjekter som vil ha enkel internasjonalisering uten overhead. Du leverer oversettelsesfilene; Polang tar seg av resten.

## Installasjon

```bash
npm install @compilorama/polang
```

Polang krever React 18 eller nyere.

## Bruk

### 1. Pakk inn appen med `I18nProvider`

Send listen over støttede locales til `I18nProvider`. Den **første locale** i arrayet brukes som **standard**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'nb-NO', name: 'Norsk bokmål (Norge)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Definer oversettelsene dine

I Polang er oversettelser komponentorienterte. Hver komponent eier oversettelsene sine på samme måte som stiler eller enhetstester — som søskenfil i samme mappe.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← ved siden av komponenten
```

En oversettelsesfil er et enkelt objekt indeksert med locale-kode; for hver locale mapper nøkler til oversatte strenger.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'nb-NO': {
    'hello': 'Velkommen!',
    'description': 'Polang er et lite i18n-bibliotek.',
  }
};

export default translations;
```

### 3. Oversett strenger med `useTranslation`

Kall `useTranslation` med oversettelsesobjektet ditt inne i enhver komponent som er pakket inn i `I18nProvider`. Det returnerer en funksjon `t` som gir riktig streng for aktiv locale.

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

### 4. Legg til locale-velger med `LocaleSelect`

`LocaleSelect` rendrer et `<select>` forhåndsutfylt med locales definert i `I18nProvider`. Valg av et alternativ bytter aktiv locale med én gang. Den godtar vanlige `<select>`-props.

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

## Avansert bruk

### Interpoler variabler

Bruk plassholdere `{{ variableName }}` i oversettelsesstrengene og send verdiene som andre argument til `t`.

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

### Bruk JSX som variabelverdier

Verdier kan være React-elementer, slik at du kan bygge inn lenker eller andre komponenter i oversatte strenger.

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

## Foretrukket språk

Polang lagrer automatisk valgt locale på to måter slik at brukere **ser foretrukket språk på tvers av økter og når de åpner delte URL-er**:

- **URL-spørreparameter** — aktiv locale-kode ligger i spørreparameteren `?locale=`.
- **`localStorage`** — aktiv locale-kode lagres under nøkkelen `plocale`.

Ved oppstart finner Polang foretrukket locale i denne rekkefølgen:
1. URL-parameter
2. Local Storage
3. Nettleserspråk
4. Hvis ingenting passer, faller Polang tilbake til første locale som er gitt til `I18nProvider`.

Du kan forhåndsvelge en locale ved å sette spørreparameteren før siden lastes:

```
https://dinapp.no/?locale=nb-NO
```

## Bidra

Du trenger [Node.js](https://nodejs.org/) 22.x eller nyere for å bidra til dette prosjektet.

### Oppsett

1. Klon repository:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installer avhengigheter:

   ```bash
   npm install
   ```

3. Kjør testene:

   ```bash
   npm test
   ```

4. Sjekk kodeformatering:

   ```bash
   npm run format
   ```

5. Bygg biblioteket:

   ```bash
   npm run build
   ```

## Merknader

1. All kildekode ligger under `src/`.
2. Tester følger navnekonvensjonen `*.test.js`.

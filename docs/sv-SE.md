# Polang

## Vad är Polang?

Polang är ett litet i18n-bibliotek för React-webbappar. Det erbjuder en provider-komponent, en översättnings-hook och en valfri locale-väljare — de tre delar som behövs för att lägga till flerspråksstöd i vilken React-applikation som helst med minimal ansträngning.

## Varför Polang?

De flesta i18n-bibliotek **väger tungt**: komplex (ibland asynkron) konfiguration, stora bundles och API:er som kräver mer boilerplate än funktionen motiverar. Polang är byggt för projekt som vill ha rak internationalisering utan onödig overhead. Du tar med översättningsfilerna; Polang sköter resten.

## Installation

```bash
npm install @compilorama/polang
```

Polang kräver React 18 eller senare.

## Användning

### 1. Omslut appen med `I18nProvider`

Skicka listan över språkversioner (locales) till `I18nProvider`. Den **första locale** i arrayen används som **standard**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'sv-SE', name: 'Svenska (Sverige)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Definiera dina översättningar

I Polang är översättningar komponentorienterade. Varje komponent äger sina översättningar på samma sätt som stilar eller enhetstester — som syskonfil i samma katalog.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← bredvid komponenten
```

En översättningsfil är ett enkelt objekt indexerat med locale-kod; för varje locale mappar nycklar till översatta strängar.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'sv-SE': {
    'hello': 'Välkommen!',
    'description': 'Polang är ett litet i18n-bibliotek.',
  }
};

export default translations;
```

### 3. Översätt strängar med `useTranslation`

Anropa `useTranslation` med ditt översättningsobjekt i valfri komponent som omges av `I18nProvider`. Det returnerar en funktion `t` som ger rätt sträng för aktiv locale.

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

### 4. Lägg till en locale-väljare med `LocaleSelect`

`LocaleSelect` renderar ett `<select>` förifyllt med de locales som definierats i `I18nProvider`. Val av ett alternativ byter aktiv locale direkt. Den accepterar vanliga `<select>`-props.

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

## Avancerad användning

### Interpolera variabler

Använd platshållare `{{ variableName }}` i översättningssträngarna och skicka värdena som andra argumentet till `t`.

**En variabel:**

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

**Flera variabler:**

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

### Använd JSX som variabelvärden

Värden kan vara React-element, så att du kan bädda in länkar eller andra komponenter i översatta strängar.

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

## Föredraget språk

Polang sparar automatiskt vald locale på två sätt så att användare **ser sitt föredragna språk mellan sessioner och när de öppnar delade URL:er**:

- **URL-frågeparameter** — den aktiva locale-koden finns i query-parametern `?locale=`.
- **`localStorage`** — den aktiva locale-koden lagras under nyckeln `plocale`.

Vid initiering avgör Polang föredragen locale i denna ordning:
1. URL-parameter
2. Local Storage
3. Webbläsarens språk
4. Om inget av ovanstämmer faller Polang tillbaka på första locale som skickats till `I18nProvider`.

Du kan förhandsvälja en locale genom att sätta frågeparametern innan sidan laddas:

```
https://dinapp.se/?locale=sv-SE
```

## Bidra

Du behöver [Node.js](https://nodejs.org/) 22.x eller senare för att bidra till detta projekt.

### Kom igång

1. Klona repot:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installera beroenden:

   ```bash
   npm install
   ```

3. Kör testsviten:

   ```bash
   npm test
   ```

4. Kontrollera kodformatering:

   ```bash
   npm run format
   ```

5. Bygg biblioteket:

   ```bash
   npm run build
   ```

## Anmärkningar

1. All källkod ligger under `src/`.
2. Tester följer namnkonventionen `*.test.js`.

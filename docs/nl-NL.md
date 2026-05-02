# Polang

## Wat is Polang?

Polang is een kleine i18n-bibliotheek voor React-webapps. Het levert een providercomponent, een vertaal-hook en een optionele locale-kiezer — de drie onderdelen die je nodig hebt om elke React-applicatie met minimale moeite meertalig te maken.

## Waarom Polang?

De meeste i18n-bibliotheken **wegen zwaar**: complexe (soms asynchrone) configuratie, grote bundles en API’s die meer boilerplate vragen dan de feature waard is. Polang is bedoeld voor projecten die rechttoe-rechtaan internationalisering willen zonder overhead. Jij levert de vertaalbestanden; Polang regelt de rest.

## Installatie

```bash
npm install @compilorama/polang
```

Polang vereist React 18 of nieuwer.

## Gebruik

### 1. Wikkel je app in met `I18nProvider`

Geef de lijst met ondersteunde locales door aan `I18nProvider`. De **eerste locale** in de array is de **standaard**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'nl-NL', name: 'Nederlands (Nederland)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Definieer je vertalingen

In Polang zijn vertalingen componentgericht. Elke component beheert zijn vertalingen zoals styles of unittests — als broerbestand in dezelfde map.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← naast de component
```

Een vertaalbestand is een plat object met locale-codes als sleutels; per locale mappen vertaalsleutels op strings.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'nl-NL': {
    'hello': 'Welkom!',
    'description': 'Polang is een kleine i18n-bibliotheek.',
  }
};

export default translations;
```

### 3. Vertaal strings met `useTranslation`

Roep `useTranslation` aan met je vertalingsobject in elke component binnen `I18nProvider`. Je krijgt een functie `t` die de juiste string voor de actieve locale teruggeeft.

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

### 4. Voeg een locale-kiezer toe met `LocaleSelect`

`LocaleSelect` rendert een `<select>` dat vooraf is gevuld met de locales uit `I18nProvider`. Een optie kiezen wisselt direct de actieve locale. Standaard `<select>`-props worden ondersteund.

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

## Geavanceerd gebruik

### Variabelen interpoleren

Gebruik placeholders `{{ variableName }}` in vertaalstrings en geef de waarden door als tweede argument van `t`.

**Eén variabele:**

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

**Meerdere variabelen:**

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

### JSX als variabelewaarden gebruiken

Waarden mogen React-elementen zijn, zodat je links of andere componenten in vertaalde strings kunt opnemen.

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

## Voorkeurstaal

Polang bewaart de gekozen locale automatisch op twee manieren, zodat gebruikers **hun voorkeurstaal tussen sessies en bij gedeelde URL’s zien**:

- **URL-queryparameter** — de actieve locale-code staat in `?locale=`.
- **`localStorage`** — de actieve locale-code wordt opgeslagen onder de sleutel `plocale`.

Bij initialisatie bepaalt Polang de voorkeurslocale in deze volgorde:
1. URL-parameter
2. Local Storage
3. Browsertaal
4. Als niets hiervan geldt, valt Polang terug op de eerste locale die aan `I18nProvider` is doorgegeven.

Je kunt een locale vooraf kiezen door de queryparameter te zetten voordat de pagina laadt:

```
https://jouwapp.nl/?locale=nl-NL
```

## Bijdragen

Je hebt [Node.js](https://nodejs.org/) 22.x of nieuwer nodig om aan dit project bij te dragen.

### Setup

1. Clone de repository:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installeer afhankelijkheden:

   ```bash
   npm install
   ```

3. Voer de tests uit:

   ```bash
   npm test
   ```

4. Controleer code-opmaak:

   ```bash
   npm run format
   ```

5. Bouw de bibliotheek:

   ```bash
   npm run build
   ```

## Opmerkingen

1. Alle broncode staat onder `src/`.
2. Tests volgen de naamgevingsconventie `*.test.js`.

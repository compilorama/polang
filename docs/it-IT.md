# Polang

## Cos’è Polang

Polang è una libreria i18n molto leggera per applicazioni web React. Offre un componente provider, un hook per le traduzioni e un selettore di locale opzionale — i tre pezzi necessari per aggiungere il multilingua a qualsiasi app React con il minimo sforzo.

## Perché Polang

La maggior parte delle librerie i18n **pesa molto**: configurazione complessa (a volte asincrona), bundle grandi e API che richiedono più boilerplate di quanto la funzionalità meriti. Polang è pensato per progetti che vogliono internazionalizzazione lineare, senza overhead. Tu porti i file di traduzione; Polang gestisce il resto.

## Installazione

```bash
npm install @compilorama/polang
```

Polang richiede React 18 o successivo.

## Utilizzo

### 1. Avvolgi l’app con `I18nProvider`

Passa l’elenco delle lingue supportate a `I18nProvider`. Il **primo locale** nell’array è usato come **predefinito**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'it-IT', name: 'Italiano (Italia)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Definisci le traduzioni

In Polang le traduzioni sono orientate al componente. Ogni componente possiede le sue traduzioni come stili o test unitari — in un file gemello nella stessa cartella.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← accanto al componente
```

Un file di traduzioni è un oggetto semplice indicizzato per codice locale; per ogni locale le chiavi mappano alle stringhe tradotte.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'it-IT': {
    'hello': 'Benvenuto!',
    'description': 'Polang è una libreria i18n molto leggera.',
  }
};

export default translations;
```

### 3. Traduci le stringhe con `useTranslation`

Chiama `useTranslation` con il tuo oggetto traduzioni in qualsiasi componente avvolto da `I18nProvider`. Restituisce una funzione `t` che risolve la stringa corretta per il locale attivo.

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

### 4. Aggiungi un selettore di locale con `LocaleSelect`

`LocaleSelect` renderizza un `<select>` precompilato con i locale definiti in `I18nProvider`. Scegliere un’opzione cambia subito il locale attivo. Accetta le props standard di `<select>`.

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

## Utilizzo avanzato

### Interpolare variabili

Usa segnaposto `{{ variableName }}` nelle stringhe di traduzione e passa i valori come secondo argomento di `t`.

**Una variabile:**

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

**Più variabili:**

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

### Usare JSX come valori di variabile

I valori possono essere elementi React, così puoi incorporare link o altri componenti nelle stringhe tradotte.

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

## Lingua preferita

Polang salva automaticamente il locale scelto in due modi, così gli utenti **vedono la lingua preferita tra le sessioni e aprendo URL condivisi**:

- **Parametro di query nell’URL** — il codice del locale attivo è nel parametro `?locale=`.
- **`localStorage`** — il codice del locale attivo è memorizzato con la chiave `plocale`.

All’avvio, Polang rileva il locale preferito in questo ordine:
1. Parametro URL
2. Local Storage
3. Lingua del browser
4. Se nulla si applica, Polang usa il primo locale passato a `I18nProvider`.

Puoi preselezionare un locale impostando il parametro di query prima del caricamento della pagina:

```
https://tuaapp.it/?locale=it-IT
```

## Contribuire

Serve [Node.js](https://nodejs.org/) 22.x o successivo per contribuire a questo progetto.

### Configurazione

1. Clona il repository:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installa le dipendenze:

   ```bash
   npm install
   ```

3. Esegui i test:

   ```bash
   npm test
   ```

4. Controlla la formattazione del codice:

   ```bash
   npm run format
   ```

5. Compila la libreria:

   ```bash
   npm run build
   ```

## Note

1. Tutto il codice sorgente è in `src/`.
2. I test seguono la convenzione sui nomi `*.test.js`.

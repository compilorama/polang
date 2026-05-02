# Polang

## Was ist Polang?

Polang ist eine sehr kleine i18n-Bibliothek für React-Webanwendungen. Sie stellt eine Provider-Komponente, einen Übersetzungs-Hook und eine optionale Locale-Auswahl bereit — die drei Teile, die du brauchst, um jede React-App mit minimalem Aufwand mehrsprachig zu machen.

## Warum Polang?

Die meisten i18n-Bibliotheken **wiegen schwer**: komplexe (manchmal asynchrone) Konfiguration, große Bundles und APIs mit mehr Boilerplate, als das Feature rechtfertigt. Polang ist für Projekte gedacht, die schlanke Internationalisierung ohne Overhead wollen. Du lieferst die Übersetzungsdateien; Polang erledigt den Rest.

## Installation

```bash
npm install @compilorama/polang
```

Polang setzt React 18 oder höher voraus.

## Verwendung

### 1. App mit `I18nProvider` umschließen

Übergib die Liste der unterstützten Locales an `I18nProvider`. Das **erste Locale** im Array ist der **Standard**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Übersetzungen definieren

In Polang sind Übersetzungen komponentenorientiert. Jede Komponente besitzt ihre Übersetzungen wie Styles oder Unit-Tests — als Geschwisterdatei im selben Ordner.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← direkt neben der Komponente
```

Eine Übersetzungsdatei ist ein einfaches Objekt, das nach Locale-Code indiziert ist; pro Locale mappen Schlüssel auf übersetzte Strings.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'de-DE': {
    'hello': 'Willkommen!',
    'description': 'Polang ist eine sehr kleine i18n-Bibliothek.',
  }
};

export default translations;
```

### 3. Strings mit `useTranslation` übersetzen

Rufe `useTranslation` mit deinem Übersetzungsobjekt in jeder von `I18nProvider` umschlossenen Komponente auf. Es liefert eine Funktion `t`, die den passenden String für das aktive Locale zurückgibt.

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

### 4. Locale-Auswahl mit `LocaleSelect` hinzufügen

`LocaleSelect` rendert ein `<select>`, vorbefüllt mit den in `I18nProvider` definierten Locales. Die Auswahl wechselt sofort das aktive Locale. Alle üblichen `<select>`-Props werden unterstützt.

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

## Erweiterte Verwendung

### Variablen interpolieren

Nutze Platzhalter `{{ variableName }}` in den Übersetzungsstrings und übergib die Werte als zweites Argument an `t`.

**Eine Variable:**

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

**Mehrere Variablen:**

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

### JSX als Variablenwerte verwenden

Werte können React-Elemente sein — so lassen sich Links oder andere Komponenten in übersetzte Strings einbetten.

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

## Bevorzugte Sprache

Polang speichert das gewählte Locale automatisch auf zwei Arten, damit Nutzer **ihre bevorzugte Sprache über Sitzungen hinweg und beim Öffnen geteilter URLs sehen**:

- **URL-Suchparameter** — der aktive Locale-Code steht im Query-Parameter `?locale=`.
- **`localStorage`** — der aktive Locale-Code wird unter dem Schlüssel `plocale` abgelegt.

Beim Start ermittelt Polang das bevorzugte Locale in dieser Reihenfolge:
1. URL-Parameter
2. Local Storage
3. Browsersprache
4. Wenn nichts zutrifft, fällt Polang auf das erste an `I18nProvider` übergebene Locale zurück.

Du kannst ein Locale vorab setzen, indem du den Suchparameter lädst, bevor die Seite geladen wird:

```
https://deineapp.de/?locale=de-DE
```

## Mitwirken

Du benötigst [Node.js](https://nodejs.org/) 22.x oder höher, um an diesem Projekt mitzuwirken.

### Einrichtung

1. Repository klonen:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Tests ausführen:

   ```bash
   npm test
   ```

4. Code-Formatierung prüfen:

   ```bash
   npm run format
   ```

5. Bibliothek bauen:

   ```bash
   npm run build
   ```

## Hinweise

1. Der gesamte Quellcode liegt unter `src/`.
2. Tests folgen der Namenskonvention `*.test.js`.

# Polang

## Qu’est-ce que Polang ?

Polang est une bibliothèque i18n très légère pour les applications web React. Elle fournit un composant provider, un hook de traduction et un sélecteur de locale optionnel — les trois éléments nécessaires pour ajouter le multilinguisme à une application React avec un minimum d’effort.

## Pourquoi Polang ?

La plupart des bibliothèques i18n **coûtent cher** : configuration complexe (parfois asynchrone), bundles volumineux et APIs qui demandent plus de code répétitif que la fonctionnalité ne le justifie. Polang s’adresse aux projets qui veulent une internationalisation simple, sans surcharge. Vous fournissez les fichiers de traduction ; Polang gère le reste.

## Installation

```bash
npm install @compilorama/polang
```

Polang nécessite React 18 ou supérieur.

## Utilisation

### 1. Envelopper l’application avec `I18nProvider`

Passez la liste des locales prises en charge à `I18nProvider`. Le **premier locale** du tableau sert de **valeur par défaut**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'fr-FR', name: 'Français (France)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Définir les traductions

Dans Polang, les traductions sont orientées composant. Chaque composant possède ses traductions comme ses styles ou ses tests unitaires : dans un fichier frère du même dossier.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← à côté du composant
```

Un fichier de traductions est un objet simple indexé par code de locale ; pour chaque locale, les clés pointent vers les chaînes traduites.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'fr-FR': {
    'hello': 'Bienvenue !',
    'description': 'Polang est une bibliothèque i18n très légère.',
  }
};

export default translations;
```

### 3. Traduire les chaînes avec `useTranslation`

Appelez `useTranslation` avec votre objet de traductions dans tout composant enveloppé par `I18nProvider`. Il renvoie une fonction `t` qui renvoie la bonne chaîne pour le locale actif.

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

### 4. Ajouter un sélecteur de locale avec `LocaleSelect`

`LocaleSelect` rend un élément `<select>` prérempli avec les locales définies dans `I18nProvider`. Choisir une option change immédiatement le locale actif. Il accepte les props standard de `<select>`.

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

## Utilisation avancée

### Interpoler des variables

Utilisez des espaces réservés `{{ variableName }}` dans les chaînes de traduction et passez les valeurs en second argument de `t`.

**Une seule variable :**

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

**Plusieurs variables :**

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

### Utiliser du JSX comme valeurs de variables

Les valeurs peuvent être des éléments React, ce qui permet d’insérer des liens ou d’autres composants dans les chaînes traduites.

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

## Langue préférée

Polang enregistre automatiquement le locale choisi de deux façons pour que les utilisateurs **voient leur langue préférée d’une session à l’autre et en ouvrant des URL partagées** :

- **Paramètre de requête dans l’URL** — le code du locale actif est conservé dans le paramètre `?locale=`.
- **`localStorage`** — le code du locale actif est stocké sous la clé `plocale`.

À l’initialisation, Polang détecte le locale préféré dans l’ordre suivant :
1. Paramètre d’URL
2. Local Storage
3. Langue du navigateur
4. Si rien ne s’applique, Polang revient au premier locale passé à `I18nProvider`.

Vous pouvez présélectionner un locale en définissant le paramètre de requête avant le chargement de la page :

```
https://votreapp.com/?locale=fr-FR
```

## Contribuer

Vous avez besoin de [Node.js](https://nodejs.org/) 22.x ou supérieur pour contribuer à ce projet.

### Mise en place

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Lancer les tests :

   ```bash
   npm test
   ```

4. Vérifier le formatage du code :

   ```bash
   npm run format
   ```

5. Construire la bibliothèque :

   ```bash
   npm run build
   ```

## Notes

1. Tout le code source se trouve sous `src/`.
2. Les tests suivent la convention de nommage `*.test.js`.

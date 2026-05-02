# Polang

## Qué es Polang

Polang es una biblioteca i18n muy pequeña para aplicaciones web con React. Ofrece un componente provider, un hook de traducción y un selector de locale opcional: las tres piezas necesarias para añadir soporte multilingüe a cualquier aplicación React con un esfuerzo mínimo.

## Por qué Polang

La mayoría de las bibliotecas i18n **pesan mucho**: configuración compleja (y a veces asíncrona), bundles grandes y APIs que exigen más código repetitivo de lo que el propio recurso merece. Polang está pensado para proyectos que necesitan internacionalización directa, sin la sobrecarga. Tú aportas los archivos de traducción; Polang se encarga del resto.

## Instalación

```bash
npm install @compilorama/polang
```

Polang requiere React 18 o superior.

## Uso

### 1. Envuelve la app con `I18nProvider`

Pasa la lista de locales admitidos a `I18nProvider`. El **primer locale** del array se usa como **predeterminado**.

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'es-ES', name: 'Español (España)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. Define tus traducciones

En Polang las traducciones están orientadas al componente. Cada componente es dueño de sus traducciones igual que de sus estilos o pruebas unitarias: como archivo hermano en el mismo directorio.

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← junto al componente
```

Un archivo de traducciones es un objeto plano indexado por código de locale; en cada locale, las claves se mapean a las cadenas traducidas.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'es-ES': {
    'hello': '¡Bienvenido!',
    'description': 'Polang es una biblioteca i18n muy pequeña.',
  }
};

export default translations;
```

### 3. Traduce cadenas con `useTranslation`

Llama a `useTranslation` con tu objeto de traducciones dentro de cualquier componente envuelto por `I18nProvider`. Devuelve una función `t` que resuelve la cadena correcta para el locale activo.

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

### 4. Añade un selector de locale con `LocaleSelect`

`LocaleSelect` renderiza un `<select>` rellenado con los locales definidos en `I18nProvider`. Al elegir una opción, el locale activo cambia al instante. Acepta las props estándar de `<select>`.

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

## Uso avanzado

### Interpolar variables

Usa marcadores `{{ variableName }}` en las cadenas de traducción y pasa los valores como segundo argumento de `t`.

**Una variable:**

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

**Varias variables:**

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

### Usar JSX como valores de variables

Los valores pueden ser elementos de React, lo que permite incrustar enlaces u otros componentes dentro de cadenas traducidas.

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

## Idioma preferido

Polang persiste automáticamente el locale seleccionado de dos formas para que los usuarios **vean su idioma preferido entre sesiones y al abrir URLs compartidas**:

- **Parámetro de búsqueda en la URL** — el código del locale activo se guarda en el parámetro de consulta `?locale=`.
- **`localStorage`** — el código del locale activo se guarda bajo la clave `plocale`.

Al iniciar, Polang detecta el locale preferido en este orden:
1. Parámetro de la URL
2. Local Storage
3. Idioma del navegador
4. Si no aplica ninguno, Polang usa el primer locale pasado a `I18nProvider`.

Puedes preseleccionar un locale estableciendo el parámetro de búsqueda antes de que cargue la página:

```
https://tuapp.com/?locale=es-ES
```

## Contribuciones

Necesitas [Node.js](https://nodejs.org/) 22.x o superior para contribuir a este proyecto.

### Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la suite de pruebas:

   ```bash
   npm test
   ```

4. Comprueba el formato del código:

   ```bash
   npm run format
   ```

5. Compila la biblioteca:

   ```bash
   npm run build
   ```

## Notas

1. Todo el código fuente está en `src/`.
2. Las pruebas siguen la convención de nombres `*.test.js`.

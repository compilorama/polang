# Polang

## O que é o Polang

Polang é uma biblioteca i18n mínima para aplicações web em React. Ela oferece um provider, um hook de tradução e um seletor de idioma — três componentes mínimos que te ajudam a internacionalizar sua aplicação React quase sem nenhum esforço.

## Por que Polang

A maioria das bibliotecas i18n **pesa bastante**: configuração complexa (e às vezes assíncrona), bundles grandes e APIs que exigem mais boilerplate do que o recurso em si justifica. O Polang foi feito para projetos que precisam de internacionalização direta, sem o excesso. Você define as traduções, Polang se preocupa com o resto.

## Instalação

```bash
npm install @compilorama/polang
```

Polang exige React 18 ou superior.

## Uso

### 1. Embrulhe o app no `I18nProvider`

Passe a lista de locales suportados para o `I18nProvider`. O **primeiro locale** do array é usado como **padrão**.

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

### 2. Defina suas traduções

No Polang, as traduções são orientadas a componente. Cada componente "possui" suas traduções do mesmo modo que possui estilos ou testes unitários:

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← fica junto ao componente
```

Um arquivo de traduções é um objeto simples indexado por código de locale; em cada locale, as chaves mapeiam a respectiva tradução.

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'pt-BR': {
    'hello': 'Bem-vindo!',
    'description': 'Polang é uma biblioteca i18n mínima.',
  }
};

export default translations;
```

### 3. Traduza strings com `useTranslation`

Chame `useTranslation` com o objeto de traduções dentro de qualquer componente envolvido por `I18nProvider`. Ele retorna uma função `t` que recebe a chave de tradução e retorna o texto correto para o locale selecionado.

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

### 4. Adicione um seletor de locale com `LocaleSelect`

O `LocaleSelect` renderiza um `<select>` pré-preenchido com os locales definidos no `I18nProvider`. Ao escolher uma opção, o locale ativo muda instantaneamente. O `LocaleSelect` aceita qualquer prop padrão de `<select>`.

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

## Uso avançado

### Interpolar variáveis

Use placeholders `{{ variableName }}` nas strings de tradução e passe os valores como segundo argumento de `t`.

**Uma variável:**

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

**Múltiplas variáveis:**

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

### Usar JSX como valores de variáveis

Os valores das variáveis podem ser elementos React, o que permite embutir links ou outros componentes dentro de strings traduzidas.

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

Polang persiste automaticamente o locale selecionado de duas formas para que os usuários sempre **vejam o idioma preferido entre sessões e ao abrir URLs compartilhadas**:

- **Parâmetro de busca na URL** — o código do locale ativo fica no parâmetro de query `?locale=`.
- **`localStorage`** — o código do locale ativo é armazenado na chave `plocale`.

Na inicialização, Polang detecta o locale preferido nesta ordem:
1. Parâmetro da URL
2. Local Storage
3. Idioma do navegador
4. Se nada disso se aplicar, o Polang usa o primeiro locale passado para o `I18nProvider`.

É possível pré-selecionar um locale definindo o parâmetro de busca antes da página carregar:

```
https://seuapp.com/?locale=pt-BR
```

## Contribuindo

É necessário [Node.js](https://nodejs.org/) 22.x ou superior para contribuir com este projeto.

### Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute a suíte de testes:

   ```bash
   npm test
   ```

4. Verifique a formatação do código:

   ```bash
   npm run format
   ```

5. Faça o build da biblioteca:

   ```bash
   npm run build
   ```

## Notas

1. Todo o código-fonte fica em `src/`.
2. Os testes seguem a convenção de nomes `*.test.js`.

# Polang

## 什么是 Polang

Polang 是一个面向 React Web 应用的轻量 i18n 库。它提供 Provider 组件、翻译 Hook，以及可选的区域（locale）选择器——用最小的成本为任意 React 应用加上多语言支持所需的三个部分。

## 为什么选择 Polang

大多数 i18n 库**负担很重**：复杂（有时还是异步）的配置、较大的包体积，以及比功能本身更值得商榷的样板代码。Polang 面向需要直接、轻量国际化的项目。你提供翻译文件；其余交给 Polang。

## 安装

```bash
npm install @compilorama/polang
```

Polang 需要 React 18 或更高版本。

## 使用

### 1. 用 `I18nProvider` 包裹应用

将支持的 locale 列表传给 `I18nProvider`。数组中的**第一个 locale**会作为**默认**语言。

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'zh-CN', name: '简体中文（中国）' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. 定义翻译

在 Polang 中，翻译以组件为中心。每个组件像拥有样式或单元测试一样拥有翻译——作为同目录下的兄弟文件。

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← 与组件并排
```

翻译文件是一个以 locale 代码为键的普通对象；在每个 locale 下，翻译键映射到已翻译的字符串。

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'zh-CN': {
    'hello': '欢迎！',
    'description': 'Polang 是一个轻量 i18n 库。',
  }
};

export default translations;
```

### 3. 使用 `useTranslation` 翻译字符串

在任意由 `I18nProvider` 包裹的组件中，用翻译对象调用 `useTranslation`。它返回 `t` 函数，用于根据当前 locale 解析正确的字符串。

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

### 4. 使用 `LocaleSelect` 添加区域选择器

`LocaleSelect` 会渲染一个 `<select>`，其中选项来自 `I18nProvider` 中定义的 locale。选择某项会立即切换当前 locale。它接受标准的 `<select>` 属性。

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

## 进阶用法

### 插值变量

在翻译字符串中使用 `{{ variableName }}` 占位符，并将值作为 `t` 的第二个参数传入。

**单个变量：**

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

**多个变量：**

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

### 将 JSX 用作变量值

变量值可以是 React 元素，从而把链接或其他组件嵌入到已翻译的字符串中。

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

## 首选语言

Polang 会以两种方式自动持久化所选 locale，让用户**在多次访问以及打开分享链接时都能看到首选语言**：

- **URL 查询参数** — 当前 locale 代码保存在 `?locale=` 查询参数中。
- **`localStorage`** — 当前 locale 代码保存在键 `plocale` 下。

初始化时，Polang 按以下顺序检测首选 locale：
1. URL 参数
2. Local Storage
3. 浏览器语言
4. 若以上皆不适用，则回退到传给 `I18nProvider` 的第一个 locale。

你可以在页面加载前设置查询参数来预选 locale：

```
https://yourapp.cn/?locale=zh-CN
```

## 参与贡献

参与本项目需要 [Node.js](https://nodejs.org/) 22.x 或更高版本。

### 环境设置

1. 克隆仓库：

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 运行测试：

   ```bash
   npm test
   ```

4. 检查代码格式：

   ```bash
   npm run format
   ```

5. 构建库：

   ```bash
   npm run build
   ```

## 说明

1. 所有源代码位于 `src/` 下。
2. 测试文件遵循 `*.test.js` 命名约定。

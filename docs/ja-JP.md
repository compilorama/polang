# Polang

## Polang とは

Polang は React 向けの小さな i18n ライブラリです。プロバイダーコンポーネント、翻訳用フック、任意のロケール選択コンポーネントを提供し、最小の手間で React アプリに多言語対応を足すための 3 点セットです。

## Polang を使う理由

多くの i18n ライブラリは**重い**です。複雑（ときには非同期）な設定、大きなバンドル、機能に見合わないほどのボイラープレートを要する API など。Polang は、オーバーヘッドのないシンプルな国際化を求めるプロジェクト向けです。翻訳ファイルを用意すれば、あとは Polang が扱います。

## インストール

```bash
npm install @compilorama/polang
```

Polang には React 18 以降が必要です。

## 使い方

### 1. アプリを `I18nProvider` で包む

サポートするロケールの一覧を `I18nProvider` に渡します。配列の**最初のロケール**が**デフォルト**になります。

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'ja-JP', name: '日本語（日本）' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. 翻訳を定義する

Polang では翻訳はコンポーネント指向です。各コンポーネントはスタイルやユニットテストと同様に、同じディレクトリの兄弟ファイルとして翻訳を持ちます。

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← コンポーネントの隣
```

翻訳ファイルはロケールコードをキーにしたプレーンなオブジェクトで、各ロケールでは翻訳キーが文字列にマップされます。

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'ja-JP': {
    'hello': 'ようこそ！',
    'description': 'Polang は小さな i18n ライブラリです。',
  }
};

export default translations;
```

### 3. `useTranslation` で文字列を翻訳する

`I18nProvider` で包まれたコンポーネント内で、翻訳オブジェクトを渡して `useTranslation` を呼び出します。アクティブなロケールに合った文字列を返す関数 `t` が得られます。

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

### 4. `LocaleSelect` でロケール選択を追加する

`LocaleSelect` は `I18nProvider` で定義したロケールが入った `<select>` を描画します。選択するとすぐにアクティブなロケールが切り替わります。通常の `<select>` の props を渡せます。

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

## 応用的な使い方

### 変数を補間する

翻訳文字列に `{{ variableName }}` プレースホルダーを使い、値は `t` の第 2 引数で渡します。

**変数が 1 つ:**

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

**複数の変数:**

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

### 変数の値として JSX を使う

値に React 要素を渡せば、翻訳済み文字列の中にリンクや別コンポーネントを埋め込めます。

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

## 優先言語

Polang は選択したロケールを 2 通りで自動的に保持し、ユーザーが**セッションをまたいだり共有 URL を開いたときにも希望の言語を見られる**ようにします。

- **URL のクエリパラメータ** — アクティブなロケールコードは `?locale=` に保持されます。
- **`localStorage`** — アクティブなロケールコードはキー `plocale` に保存されます。

初期化時、Polang は次の順で優先ロケールを決めます。
1. URL パラメータ
2. Local Storage
3. ブラウザの言語
4. どれも当てはまらない場合は、`I18nProvider` に渡した最初のロケールにフォールバックします。

ページ読み込み前にクエリパラメータを設定すれば、ロケールを事前に選べます。

```
https://yourapp.jp/?locale=ja-JP
```

## コントリビューション

このプロジェクトに参加するには [Node.js](https://nodejs.org/) 22.x 以降が必要です。

### セットアップ

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

3. テストを実行します。

   ```bash
   npm test
   ```

4. コードフォーマットを確認します。

   ```bash
   npm run format
   ```

5. ライブラリをビルドします。

   ```bash
   npm run build
   ```

## メモ

1. ソースはすべて `src/` 以下にあります。
2. テストは命名規則 `*.test.js` に従います。

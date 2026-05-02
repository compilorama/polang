# Polang

## Polang क्या है?

Polang React वेब ऐप्स के लिए एक छोटी i18n लाइब्रेरी है। इसमें एक प्रोवाइडर कंपोनेंट, एक अनुवाद हुक और वैकल्पिक लोकेल चयनकर्ता शामिल है — ये तीनों चीज़ें किसी भी React ऐप में कम मेहनत से बहुभाषी समर्थन जोड़ने के लिए ज़रूरी हैं।

## Polang क्यों?

ज़्यादातर i18n लाइब्रेरी **बहुत भारी** होती हैं: जटिल (और कभी-कभी असिंक्रोनस) कॉन्फ़िगरेशन, बड़े बंडल और ऐसी API जिनमें फ़ीचर से ज़्यादा बॉयलरप्लेट लगता है। Polang उन प्रोजेक्ट्स के लिए बनाया गया है जिन्हें सीधा अंतर्राष्ट्रीयकरण चाहिए, बिना अतिरिक्त ओवरहेड के। आप अपनी अनुवाद फ़ाइलें लाते हैं; बाकी Polang संभालता है।

## स्थापना

```bash
npm install @compilorama/polang
```

Polang के लिए React 18 या उससे नया संस्करण ज़रूरी है।

## उपयोग

### 1. ऐप को `I18nProvider` से लपेटें

`I18nProvider` को समर्थित लोकेलों की सूची दें। ऐरे में **पहला लोकेल** **डिफ़ॉल्ट** के रूप में उपयोग होता है।

```jsx
import { I18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English US' },
  { code: 'hi-IN', name: 'हिन्दी (भारत)' },
];

export default function App() {
  return (
    <I18nProvider locales={locales}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 2. अपने अनुवाद परिभाषित करें

Polang में अनुवाद कंपोनेंट-केंद्रित होते हैं। हर कंपोनेंट अपने अनुवादों का मालिक उसी तरह होता है जैसे स्टाइल या यूनिट टेस्ट — उसी फ़ोल्डर में सहोदर फ़ाइल के रूप में।

```
src/
└── components/
  └── hero/
    ├── hero.js
    ├── hero.test.js
    └── hero.t.js  ← कंपोनेंट के बगल में
```

अनुवाद फ़ाइल एक सादा ऑब्जेक्ट होता है जिसकी कुंजियाँ लोकेल कोड होती हैं; प्रत्येक लोकेल में अनुवाद कुंजियाँ अनुवादित स्ट्रिंग पर मैप होती हैं।

```js
// hero.t.js
const translations = {
  'en-US': {
    'hello': 'Welcome!',
    'description': 'Polang is a tiny i18n library.',
  },
  'hi-IN': {
    'hello': 'स्वागत है!',
    'description': 'Polang एक छोटी i18n लाइब्रेरी है।',
  }
};

export default translations;
```

### 3. `useTranslation` से स्ट्रिंग अनुवादित करें

`I18nProvider` से लिपटे किसी भी कंपोनेंट में अपने अनुवाद ऑब्जेक्ट के साथ `useTranslation` कॉल करें। यह एक `t` फ़ंक्शन देता है जो सक्रिय लोकेल के लिए सही स्ट्रिंग देता है।

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

### 4. `LocaleSelect` से लोकेल चयनकर्ता जोड़ें

`LocaleSelect` एक `<select>` रेंडर करता है जो `I18nProvider` में परिभाषित लोकेलों से भरा होता है। विकल्प चुनते ही सक्रिय लोकेल बदल जाता है। यह मानक `<select>` प्रॉप्स स्वीकार करता है।

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

## उन्नत उपयोग

### चर इंटरपोलेट करें

अनुवाद स्ट्रिंग में `{{ variableName }}` प्लेसहोल्डर का उपयोग करें और मानों को `t` के दूसरे तर्क के रूप में पास करें।

**एक चर:**

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

**कई चर:**

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

### चर मानों के रूप में JSX का उपयोग

मान React एलिमेंट हो सकते हैं, जिससे अनुवादित स्ट्रिंग के अंदर लिंक या अन्य कंपोनेंट एम्बेड किए जा सकते हैं।

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

## पसंदीदा भाषा

Polang चयनित लोकेल को दो तरीकों से स्वचालित रूप से सहेजता है ताकि उपयोगकर्ता **सत्रों के बीच और साझा URL खोलने पर अपनी पसंदीदा भाषा देखें**:

- **URL क्वेरी पैरामीटर** — सक्रिय लोकेल कोड `?locale=` क्वेरी पैरामीटर में रखा जाता है।
- **`localStorage`** — सक्रिय लोकेल कोड `plocale` कुंजी के तहत संग्रहीत होता है।

आरंभीकरण पर Polang इस क्रम में पसंदीदा लोकेल का पता लगाता है:
1. URL पैरामीटर
2. Local Storage
3. ब्राउज़र भाषा
4. यदि कुछ लागू नहीं होता, तो Polang `I18nProvider` को दिए गए पहले लोकेल पर वापस आ जाता है।

पृष्ठ लोड होने से पहले क्वेरी पैरामीटर सेट करके आप लोकेल पहले से चुन सकते हैं:

```
https://yourapp.in/?locale=hi-IN
```

## योगदान

इस प्रोजेक्ट में योगदान के लिए [Node.js](https://nodejs.org/) 22.x या नया संस्करण चाहिए।

### सेटअप

1. रिपॉज़िटरी क्लोन करें:

   ```bash
   git clone https://github.com/compilorama/polang.git
   cd polang
   ```

2. निर्भरताएँ इंस्टॉल करें:

   ```bash
   npm install
   ```

3. टेस्ट सूट चलाएँ:

   ```bash
   npm test
   ```

4. कोड फ़ॉर्मेटिंग जाँचें:

   ```bash
   npm run format
   ```

5. लाइब्रेरी बिल्ड करें:

   ```bash
   npm run build
   ```

## नोट्स

1. सारा स्रोत कोड `src/` के अंतर्गत है।
2. टेस्ट नामकरण सम्मेलन `*.test.js` का पालन करते हैं।

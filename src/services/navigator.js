const _public = {};

_public.getLanguage = () => window.navigator.language;

_public.normalizeLanguage = lang => {
  if(isLanguageValid(lang)) {
    const parts = splitLanguage(lang);
    const [langCode] = parts;
    const countryCode = getCountryCode(parts);
    return [
      langCode.toLowerCase(),
      countryCode?.toUpperCase()
    ].filter(Boolean).join('-');
  }
};

function isLanguageValid(lang){
  return lang && typeof lang == 'string';
}

function splitLanguage(lang){
  const separator = lang.includes('_') ? '_' : '-';
  return lang.split(separator);
}

function getCountryCode(langParts){
  if(langParts.length === 1) return null;
  const code = langParts.at(-1);
  return code.length == 2 ? code : '';
}

export default _public;

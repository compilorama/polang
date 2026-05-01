import { useState } from 'react';

export const useLocale = (locales) => {
  const [locale, setLocale] = useState(getInitialLocale(locales));
  const handleLocaleChange = newLocaleCode => {
    setLocale(findLocaleByCode(newLocaleCode, locales));
    storeLocale(newLocaleCode);
    setLocaleSearchParam(newLocaleCode);
    setHTMLDocumentLanguage(newLocaleCode);
  };
  return { locale, locales, handleLocaleChange };
};

function getInitialLocale(locales){
  const [defaultLocale] = locales;
  const initialLocaleCode = getLocaleSearchParam() || getLocalStoredLocale() || defaultLocale.code;
  const locale = findLocaleByCode(initialLocaleCode, locales);
  setHTMLDocumentLanguage(initialLocaleCode);
  return locale;
}

function findLocaleByCode(code, locales){
  return locales.find(locale => locale.code === code);
}

function setLocaleSearchParam(locale){
  const params = getCurrentSearchParams();
  params.set(getLocaleSearchParamKey(), locale);
  const { origin, pathname } = window.location;
  window.history.replaceState({}, '', `${origin}${pathname}?${params.toString()}`);
}

function setHTMLDocumentLanguage(localeCode){
  document.documentElement.lang = localeCode;
}

function getLocaleSearchParam(){
  return getCurrentSearchParams().get(getLocaleSearchParamKey());
}

function getCurrentSearchParams(){
  return new URLSearchParams(window.location.search);
}

function getLocalStoredLocale(){
  return localStorage.getItem(getLocaleStorageKey());
}

function storeLocale(locale){
  localStorage.setItem(getLocaleStorageKey(), locale);
}

function getLocaleSearchParamKey(){
  return 'locale';
}

function getLocaleStorageKey(){
  return 'plocale';
}

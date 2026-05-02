import { useState } from 'react';
import navigatorService from '@src/services/navigator';

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
  const initialLocaleCode = getPreferredLocaleCode(locales) || locales[0].code;
  const locale = findLocaleByCode(initialLocaleCode, locales);
  setHTMLDocumentLanguage(locale.code);
  return locale;
}

function getPreferredLocaleCode(locales){
  return getLocaleSearchParam() || getLocalStoredLocale() || getNavigatorLocaleCode(locales);
}

function getNavigatorLocaleCode(locales){
  const navigatorLanguage = navigatorService.normalizeLanguage(navigatorService.getLanguage()).toLowerCase();
  const availableLocaleCodes = locales.map(({ code }) => code.toLowerCase());
  return findExactLocaleCode(availableLocaleCodes, navigatorLanguage) || findClosestLocaleCode(availableLocaleCodes, navigatorLanguage);
}

function findExactLocaleCode(availableLocaleCodes, localeCode){
  return availableLocaleCodes.find(code => code === localeCode);
}

function findClosestLocaleCode(availableLocaleCodes, localeCode){
  const [languageCode] = localeCode.split('-');
  return availableLocaleCodes.find(code => code.startsWith(languageCode));
}

function findLocaleByCode(code, locales){
  return locales.find(locale => locale.code.toLowerCase() === code.toLowerCase());
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

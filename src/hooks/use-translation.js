import React, { useContext } from 'react';
import i18nContext from '@src/contexts/i18n';

export const useTranslation = translations => {
  const { locale } = useContext(i18nContext);
  const translate = (key, variables) => {
    const translation = translations[locale.code]?.[key];
    return translation ? parseTranslation(translation, variables) : key;
  };
  return { t: translate, locale };
};

function parseTranslation(translation, variables){
  return variables ? interpolateTranslation(translation, variables) : translation;
}

function interpolateTranslation(translation, variables){
  const translationParts = splitTranslationByVariables(translation);
  const parsedTranslationParts = parseTranslationParts(translationParts, variables);
  return containsOnlyPrimitives(parsedTranslationParts) ?
    parsedTranslationParts.join('') :
    addReactKeyForEachPart(parsedTranslationParts);
}

function parseTranslationParts(translationParts, variables){
  return translationParts.reduce((result, part) => {
    const parsedPart = isTranslationVariable(part) ? getVariableValue(variables, part) : part;
    return [...result, parsedPart];
  }, []);
}

function splitTranslationByVariables(translation) {
  return translation.match(/{{\s*[\w]+\s*}}|[^{}]+/g);
}

function isTranslationVariable(text){
  return getTranslationVariableRegex().test(text);
}

function getVariableName(text){
  return text.match(getTranslationVariableRegex())[1];
}

function getVariableValue(variables, translationPart){
  return variables[getVariableName(translationPart)] || translationPart;
}

function getTranslationVariableRegex(){
  return /{{\s*(\w+)\s*}}/;
}

function containsOnlyPrimitives(list){
  return list.every(item => ['string', 'number'].includes(typeof item));
}

function addReactKeyForEachPart(parsedTranslationParts){
  return parsedTranslationParts.map((part, index) => {
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export * from '@testing-library/react';

export function customRender(component) {
  const user = userEvent.setup();
  const result = render(component);
  return { user, ...result };
}

export function mockSearchParams(params) {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  window.history.pushState({}, '', url);
}

export function clearSearchParams() {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.pushState({}, '', url);
}

export const translationsMock = {
  'en-US': {
    'hello': 'Welcome!',
    'polang_is_a_tiny_i18n_library': 'Polang is a tiny i18n library.',
    'locale': 'Locale'
  },
  'pt-BR': {
    'hello': 'Bem vindo!',
    'polang_is_a_tiny_i18n_library': 'Polang é uma mini biblioteca i18n.',
    'locale': 'Localização'
  }
};

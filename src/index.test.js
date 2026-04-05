import { render, screen, translationsMock } from '@src/services/testing';
import { I18nProvider, useTranslation } from '@src/';

describe('Polang', () => {
  function mount({ Component, initialLocale }){
    return render(
      <I18nProvider initialLocale={initialLocale}>
        <Component />
      </I18nProvider>
    );
  }

  it('should show translations according initial locale', () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return (
        <>
          <h1>{t('hello')}</h1>
          <p>{t('polang_is_a_tiny_i18n_library')}</p>
        </>
      );
    };
    mount({ Component, initialLocale: 'en-US' });
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    expect(screen.getByText('Polang is a tiny i18n library.')).toBeInTheDocument();
  });
});

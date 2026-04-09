import { customRender, clearSearchParams, mockSearchParams, screen, translationsMock } from '@src/services/testing';
import { I18nProvider, useTranslation, LocaleSelect } from '@src/';

describe('Polang', () => {
  function mount({ Component }){
    const locales = [
      { code: 'en-US', name: 'English US' },
      { code: 'pt-BR', name: 'Português BR' }
    ];

    return customRender(
      <I18nProvider locales={locales}>
        <Component />
      </I18nProvider>
    );
  }

  afterEach(() => {
    window.localStorage.removeItem('plocale');
    clearSearchParams();
  });

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
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    expect(screen.getByText('Polang is a tiny i18n library.')).toBeInTheDocument();
  });

  it('should optionally change locale via locale select', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return (
        <>
          <h1>{t('hello')}</h1>
          <p>{t('polang_is_a_tiny_i18n_library')}</p>
          <LocaleSelect aria-label={t('locale')} />
        </>
      );
    };
    const { user } = mount({ Component });
    await user.selectOptions(screen.getByLabelText('Locale'), 'Português BR');
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
    expect(screen.getByText('Polang é uma mini biblioteca i18n.')).toBeInTheDocument();
  });

  it('should set translations according locale search param', async () => {
    mockSearchParams({ locale: 'pt-BR' });
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
  });

  it('should set translations according stored locale', async () => {
    window.localStorage.setItem('plocale', 'pt-BR');
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
  });
});

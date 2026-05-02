import { customRender, clearSearchParams, mockSearchParams, screen, translationsMock } from '@src/services/testing';
import navigatorService from '@src/services/navigator';
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
    const defaultLocale = 'en-US';
    window.localStorage.removeItem('plocale');
    document.documentElement.lang = defaultLocale;
    navigatorService.getLanguage = jest.fn(() => defaultLocale);
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
    expect(document.documentElement.lang).toEqual('pt-BR');
  });

  it('should set translations according locale search param', async () => {
    mockSearchParams({ locale: 'pt-BR' });
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
    expect(document.documentElement.lang).toEqual('pt-BR');
  });

  it('should set translations according stored locale', async () => {
    window.localStorage.setItem('plocale', 'pt-BR');
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
    expect(document.documentElement.lang).toEqual('pt-BR');
  });

  it('should set translations according navigator language', async () => {
    navigatorService.getLanguage = jest.fn(() => 'pt-BR');
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
    expect(document.documentElement.lang).toEqual('pt-BR');
  });

  it('should fallback to default locale when navigator language is not included in available locales', async () => {
    navigatorService.getLanguage = jest.fn(() => 'es-ES');
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Welcome!' })).toBeInTheDocument();
    expect(document.documentElement.lang).toEqual('en-US');
  });

  it('should use closest locale when navigator locale partially matches available locales', async () => {
    navigatorService.getLanguage = jest.fn(() => 'pt-PT');
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <h1>{t('hello')}</h1>;
    };
    mount({ Component });
    expect(screen.getByRole('heading', { name: 'Bem vindo!' })).toBeInTheDocument();
    expect(document.documentElement.lang).toEqual('pt-BR');
  });

  it('should handle translations with a single variable', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('with_single_variable', { name: 'Rafael' })}</p>;
    };
    mount({ Component });
    expect(screen.getByText('Hello, Rafael!')).toBeInTheDocument();
  });

  it('should handle translations with multiple variables', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('with_multiple_variables', { name: 'Rafael', count: 5 })}</p>;
    };
    mount({ Component });
    expect(screen.getByText('Hello Rafael, you have 5 messages')).toBeInTheDocument();
  });

  it('should handle translations with multiple variables', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('with_multiple_variables', { name: 'Rafael', count: 5 })}</p>;
    };
    mount({ Component });
    expect(screen.getByText('Hello Rafael, you have 5 messages')).toBeInTheDocument();
  });

  it('should handle translations with React nodes as variables', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('with_html', { link: <a href="/learn">{t('link_text')}</a> })}</p>;
    };
    mount({ Component });
    const link = screen.getByRole('link', { name: 'Click here' });
    expect(link.getAttribute('href')).toEqual('/learn');
    expect(screen.getByText('to learn more')).toBeInTheDocument();
  });

  it('should return translation key if translation is missing', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('missing_translation')}</p>;
    };
    mount({ Component });
    expect(screen.getByText('missing_translation')).toBeInTheDocument();
  });

  it('should return translation variable if variable value is missing', async () => {
    const Component = () => {
      const { t } = useTranslation(translationsMock);
      return <p>{t('variable_value_missing', {})}</p>;
    };
    mount({ Component });
    expect(screen.getByText('Well done, {{ nickname }}!')).toBeInTheDocument();
  });
});

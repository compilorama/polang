import navigatorService from './navigator';

describe('Navigator Service', () => {
  it('should return navigator language', () => {
    expect(navigatorService.getLanguage()).toEqual(window.navigator.language);
  });

  it('should normalize locale language', () => {
    expect(navigatorService.normalizeLanguage('en_US')).toEqual('en-US');
    expect(navigatorService.normalizeLanguage('en-US')).toEqual('en-US');
    expect(navigatorService.normalizeLanguage('en-us')).toEqual('en-US');
    expect(navigatorService.normalizeLanguage('en')).toEqual('en');
    expect(navigatorService.normalizeLanguage('zh-Hans-CN')).toEqual('zh-CN');
    expect(navigatorService.normalizeLanguage('zh-Hans')).toEqual('zh');
  });

  it('should return undefined if no language is given to normalize method', () => {
    expect(navigatorService.normalizeLanguage()).toEqual();
  });
});

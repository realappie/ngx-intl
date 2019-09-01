import { TestBed } from '@angular/core/testing';
import { NGX_INTL_DEFAULT_LOCALE } from './default-locale.token';
import { IntlService } from '../public-api';

describe('intl service', () => {
  const defaultLocale = 'nl-NL';

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: NGX_INTL_DEFAULT_LOCALE,
      useValue: defaultLocale
    }]
  }));

  it('should be created', () => {
    const service: IntlService = TestBed.get(IntlService);
    expect(service).toBeTruthy();
  });

  it('should change value', () => {
    const service: IntlService = TestBed.get(IntlService);

    const newLocale = 'en-US';

    service.updateLocale(newLocale);

    expect(service.getLocale$().value).toEqual(newLocale);
  });

  it('NGX_INTL_DEFAULT_LOCALE should be created', () => {
    const token: string = TestBed.get(NGX_INTL_DEFAULT_LOCALE);

    expect(token).toBe(defaultLocale);
  });
});

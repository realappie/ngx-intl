import { TestBed } from '@angular/core/testing';
import { NGX_INTL_DEFAULT_LOCALE } from '../default-locale.token';
import { IntlService } from '../intl.service';
import { IntlNumberPipe } from './intl-number.pipe';
import { ChangeDetectorRef } from '@angular/core';

describe('number pipe', () => {

  let numberPipe: IntlNumberPipe;

  let $internationalisation: IntlService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NGX_INTL_DEFAULT_LOCALE,
        useValue: 'nl-NL'
      }, IntlService]
    });

    $internationalisation = TestBed.get(IntlService);

    const cdMock: ChangeDetectorRef = {
      markForCheck: () => {},
      checkNoChanges: null,
      detach: null,
      detectChanges: null,
      reattach: null
    };
    numberPipe = new IntlNumberPipe(cdMock, $internationalisation);
  });

  it('should show currency with comma', () => {
    const output: string = numberPipe.transform(1.501, {
      maximumFractionDigits: 2,
      currency: 'EUR',
      style: 'currency',
      currencyDisplay: 'symbol'
    });
    expect(output).toEqual(`€${String.fromCharCode(160)}1,50`);
  });

  it('should show currency dot separated', () => {
    $internationalisation.updateLocale('en-US');

    const output: string = numberPipe.transform(1.501, {
      maximumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
      currencyDisplay: 'symbol'
    });

    expect(output).toEqual(`$1.50`);
  });

  it('should show a currency update', () => {
    const output: string = numberPipe.transform(1.501, {
      maximumFractionDigits: 2,
      currency: 'EUR',
      style: 'currency',
      currencyDisplay: 'symbol'
    });

    expect(output).toEqual(`€${String.fromCharCode(160)}1,50`);

    $internationalisation.updateLocale('en-US');

    const englishOutput: string = numberPipe.transform(1.501, {
      maximumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
      currencyDisplay: 'symbol'
    });

    expect(englishOutput).toEqual(`$1.50`);
  });

  it('should show a separator change', () => {
    const pipeOptions = {
      maximumFractionDigits: 2,
      currency: 'EUR',
      style: 'currency',
      currencyDisplay: 'symbol'
    };

    const output: string = numberPipe.transform(1.501, pipeOptions);

    expect(output).toEqual(`€${String.fromCharCode(160)}1,50`);

    $internationalisation.updateLocale('en-US');

    const englishOutput: string = numberPipe.transform(1.501, pipeOptions);

    expect(englishOutput).toEqual(`€1.50`);
  });
});

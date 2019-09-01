import { TestBed } from '@angular/core/testing';
import { NGX_INTL_DEFAULT_LOCALE } from '../default-locale.token';
import { IntlService } from '../intl.service';
import { IntlDatePipe } from './intl-date.pipe';
import { ChangeDetectorRef } from '@angular/core';

describe('date pipe', () => {

  let datePipe: IntlDatePipe;

  let $internationalisation: IntlService;

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
    datePipe = new IntlDatePipe(cdMock, $internationalisation);
  });

  it('should transform date object', () => {
    const output: string = datePipe.transform(new Date('01-15-1997'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    expect(output).toBe('15 januari 1997');
  });

  it('should transform string date', () => {
    const output: string = datePipe.transform('01-15-1997', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    expect(output).toBe('15 januari 1997');
  });

  it('should respect pipe options', () => {
    const output: string = datePipe.transform(new Date('01-15-1997'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    expect(output).toBe('15 januari 1997 00:00');
  });

  it('should update date output after locale change', () => {
    const output: string = datePipe.transform(new Date('01-15-1997'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    expect(output).toBe('15 januari 1997 00:00');

    $internationalisation.updateLocale('ar-EG');

    const newOutput: string = datePipe.transform(new Date('09-10-2019'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    expect(newOutput).toBe('١٠ سبتمبر ٢٠١٩');
  });
});

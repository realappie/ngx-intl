import { ChangeDetectorRef, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { isEqual, isString } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
import { IntlService } from '../intl.service';

/**
 * @author Abdel El-medny
 *
 * Shows dates based on the Intl API
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
 */
@Pipe({
  name: 'intlDate',
  pure: false,
})
export class IntlDatePipe implements PipeTransform, OnDestroy {

  private lastOutput: string = null;

  private lastInput: [Date|string, Intl.DateTimeFormatOptions] = null;

  private stop$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private $internationalisation: IntlService,
  ) {
    // If the locale changes, we will take the last inputs we were given, will re-calc the output and trigger CD
    //
    this.$internationalisation.getLocale$().pipe(
      takeUntil(this.stop$),
      skip(1),
    )
    .subscribe((locale) => {
      const [lastValue, lastOpts] = this.lastInput;

      const dateObject = isString(lastValue) ? new Date(lastValue as string) : lastValue as Date;

      this.lastOutput = new Intl.DateTimeFormat(locale, lastOpts).format(dateObject);

      this.changeDetectorRef.markForCheck();
    });
  }

  transform(value: Date|string, opts?: Intl.DateTimeFormatOptions): string {
    // If the input hasn't changed, we will send back the last calculated value
    //
    if (isEqual(this.lastInput, value)) {
      return this.lastOutput;
    }

    // Storing this for later usage incase locale changes
    //
    this.lastInput = [arguments[0] as Date|string, arguments[1] as Intl.DateTimeFormatOptions];

    const currentLocale = this.$internationalisation.getLocale$().value;

    const dateObject = isString(value) ? new Date(value as string) : value as Date;

    this.lastOutput = new Intl.DateTimeFormat(currentLocale, opts).format(dateObject);

    return this.lastOutput;
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}

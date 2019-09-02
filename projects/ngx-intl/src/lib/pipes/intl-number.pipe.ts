import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
import { IntlService } from '../intl.service';

/**
 * @author Abdel El-medny
 *
 * Shows numbers based on the Intl API
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 */
@Pipe({
  name: 'intlNumber',
  pure: false,
})
export class IntlNumberPipe implements PipeTransform, OnDestroy {

  private lastOutput: string = null;

  private lastInput: [number, Intl.NumberFormatOptions] = [null, null];

  private stop$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private $intl: IntlService,
  ) {
    // If the locale changes, we will take the last inputs we were given, will re-calc the output and trigger CD
    //
    this.$intl.getLocale$().pipe(
      takeUntil(this.stop$),
      skip(1),
    )
    .subscribe((locale) => {
      const [lastDate, lastOpts] = this.lastInput;

      this.lastOutput = new Intl.NumberFormat(locale, lastOpts).format(lastDate);

      this.changeDetectorRef.markForCheck();
    });
  }

  transform(value: number, opts?: Intl.NumberFormatOptions): string {
    // If the input hasn't changed, we will send back the last calculated value
    //
    if (this.lastInput.toString() === value.toString()) {
      return this.lastOutput;
    }

    // Storing this for later usage incase locale changes
    //
    this.lastInput = [arguments[0] as number, arguments[1] as Intl.NumberFormatOptions];

    const currentLocale = this.$intl.getLocale$().value;

    this.lastOutput = new Intl.NumberFormat(currentLocale, opts).format(value);

    return this.lastOutput;
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}

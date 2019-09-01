import { NgModule, ValueProvider } from '@angular/core';
import { NGX_INTL_DEFAULT_LOCALE } from './default-locale.token';
import { NgxIntlModuleOpts } from './interfaces';
import { IntlDatePipe } from './pipes/intl-date.pipe';
import { IntlNumberPipe } from './pipes/intl-number.pipe';

@NgModule({
  declarations: [IntlDatePipe, IntlNumberPipe],
  imports: [
  ],
  exports: [IntlDatePipe, IntlNumberPipe]
})
export class NgxIntlModule {
  static forRoot(options: NgxIntlModuleOpts) {
    return {
      ngModule: NgxIntlModule,
      providers: [
        { provide: NGX_INTL_DEFAULT_LOCALE, useValue: options.defaultLocale } as ValueProvider,
      ]
    };
  }
 }

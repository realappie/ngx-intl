import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NGX_INTL_DEFAULT_LOCALE } from './default-locale.token';

/**
 * @author Abdel El-medny
 *
 * This service will be the backbone of the intl number and date pipe
 */

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  private locale$: BehaviorSubject<string>;

  constructor(@Inject(NGX_INTL_DEFAULT_LOCALE) private defaultLocale: string) {
    this.locale$ = new BehaviorSubject<string>(this.defaultLocale);
  }

  public updateLocale(locale: string) {
    this.locale$.next(locale);
  }

  public getLocale$(): BehaviorSubject<string> {
    return this.locale$;
  }
}

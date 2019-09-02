# ngx-intl 


This project will serve as a wrapper for the [intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) api. It will provide you a set of pipes for both date formatting (`Intl.DateTimeFormat`) and number formatting (`Intl.NumberFormat`)

The benefit of using this over angular's out of the box `number` and `date` pipes is that the localization files are provided by the browser. You will not only will you have some savings in terms of bundle size, but this also means you can have runtime switching of locales. Without worrying about things like having multiple bundles for your app or hacks that change the `LOCALE_ID` with one bundle.

There is one catch though! Browser support, as of today there is support for [95%](https://caniuse.com/#feat=internationalization) of the browsers. But there are polyfills that you can load yourself [Intl.js](https://github.com/andyearnshaw/Intl.js/).


You can check out the demo [here](https://stackblitz.com/edit/ngx-intl)

### Usage

Import the `NgxIntlModule` into `app.module` or any other module. You can only have one locale at a given time right now, and you will be passing it on the highest module via `.forRoot`

```typescript
@NgModule({
  imports:      [  
    NgxIntlModule.forRoot({
      defaultLocale: 'nl-NL'
    })
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

After adding the module, you can use the `intlDate` and `intlNumber` pipes as followed.


#### Example `intlNumber`

```html
<span>
  {{ 12.4 | intlNumber: { style: 'currency', currency: 'EUR' } }}
</span>
```

#### Example `intlDate`

```html
<time [attr.datetime]="date">
  {{ date | intlDate: { 
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
  }}
</time>
```

### Future iterations

Ideally the number and date pipe take in the `date` and `number` pipe options of angular. This would turn this project into a drop-in replacement for the angular pipes. But I first want to see how this lands in the angular community.

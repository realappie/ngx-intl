# NgxIntl

This project will serve as a wrapper for the [intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) api. It will provide you a set of pipes for both date formatting (`Intl.DateTimeFormat`) and number formatting (`Intl.NumberFormat`)

The benefit of using this over angular's out of the box `number` and `date` pipes is that the localization files are provided by the browser. You will not only will you have some savings in terms of bundle size, but this also means you can have runtime switching of locales. Without worrying about things like having multiple bundles for your app or hacks that change the `LOCALE_ID` with one bundle.

There is one catch though! Browser support, as of today there is support for [95%](https://caniuse.com/#feat=internationalization) of the browsers. But there are polyfills that you can load yourself [Intl.js](https://github.com/andyearnshaw/Intl.js/).


You can check out the demo [here](https://stackblitz.com/edit/ngx-intl)

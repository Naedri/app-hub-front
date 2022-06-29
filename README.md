<p align="center">
<a href="#">
    <img alt="React" src="https://avatars.githubusercontent.com/u/6412038?raw=true" width="60" />
  </a>
  <a href="#">
    <img alt="Ionic" src="https://github.com/ionic-team/ionic-framework/blob/main/.github/assets/logo.png?raw=true" width="60" />
  </a>
</p>

<h2 align="center">
  Frontend app build in React with Ionic.
</h2>

Ionic is an open source app development toolkit for building modern, fast, top-quality cross-platform native and Progressive Web Apps from a single codebase with JavaScript and the Web.

Ionic is based on [Web Components](https://www.webcomponents.org/introduction), which enables significant performance, usability, and feature improvements alongside support for popular web frameworks like Angular, React and Vue.

## Description

To display protected url of applications from your amazing company.

## Getting Started

- [Download the installer](https://nodejs.org/) for Node LTS.
- Install the ionic CLI globally: `npm install -g ionic`
- Clone this repository with `git clone`.
- Run `npm install` from the project root.
- Add, at the root level of the project an completed _.env_ file from the _.env.example_ file.
- Run `ionic serve` in a terminal from the project root.
- Profit. :tada:

_Note: See [How to Prevent Permissions Errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions) if you are running into issues when trying to install packages globally._

## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `ionic build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`

## Translation

This app aims to support internationalization, thanks to [i18next](https://www.i18next.com/). A crash course is available on [YouTube](https://www.youtube.com/watch?v=SA_9i4TtxLQ).

### how to configure it ?

```ts
i18.init({
  fallbackNS: 'common', // common namespaces will be used none is indicated
  resources: {
    en: {
      translation: {
        // Here common, friendly and error are defined as namespaces
        common: {
          validation: 'OK',
          cancel: 'Cancel',
        },
        friendly: {
          validation: "Let's go",
          cancel: 'Stop',
        },
        error: {
          404: 'Not found',
          unknown: 'Some strange thing happened',
        },
        proposition: '{{subject}} is {{predicate}}.',
        app_one: 'an app',
        app_other: '{{count}} apps',
        app_zero: 'no app',
        cake_other: '{{count, number}} cakes', //  "key": "Some format {{value, formatName}}",
      },
    },
  },
});
```

### how to use it ?

```ts
let sentence = i18n.t('key');
sentence = i18n.t('validation'); // => 'OK' from 'common' namespace as it is the fallbackNS
sentence = i18n.t('validation', { ns: 'friendly' }); // => 'Let's go' from 'friendly' namespace
sentence = i18n.t(`error.${code}`, 'error.unknown');
sentence = i18n.t('proposition', { what: 'David', predicate: 'awesome' });
sentence = i18n.t('proposition', { what: 'David', predicate: 'awesome' });
sentence = i18n.t('app', { count: 4 });
sentence = i18n.t('cake', { count: 10000 }); // => 10,000
```

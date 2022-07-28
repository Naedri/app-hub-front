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

### Tech Stack

React is a fully supported framework for building enterprise apps on the Ionic stack. Given the unique nature and constraints of mobile app development, there are some best practices to keep in mind as you build out your app that you can see at the following page : [React Best Practices with Ionic](https://ionic.io/enterprise-guide/react).

You can find two tutorial videos to ramp up on this stack at the following links : 

- [Ionic5 + Firebase + React](https://www.youtube.com/playlist?list=PLYxzS__5yYQkxcATbHyMA6wfEinKL6jPD)
- [Learn to Build Mobile Apps With Ionic Framework, ReactJS and Capacitor](https://www.youtube.com/playlist?list=PL2PY2-9rsgl3aYbgV5Y_jFkCH7WWsiP-f)

## Getting Started

- [Download the installer](https://nodejs.org/) for Node LTS.
- Install the ionic CLI globally: `npm install -g ionic`
- Clone this repository with `git clone`.
- From the project root, run `npm install`.
- At the root level of the project, add a completed _.env_ file from the _.env.example_ file.
- In a terminal from the project root, run `npm run start:dev`.
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

## To improve

Some parts of the code on which I have doubt may be improve : 
- i18 translation service : maybe it should be available differently (directly to all the components and pass throught components producing prop drilling)
- some useEffect hook may be not be triggered the first time
- the header button is not always displayed properly 
- state management with React Redux may be needed : [doc](https://ionic.io/enterprise-guide/state-management#react)

## Translation

This app aims to support internationalization, thanks to [i18next](https://www.i18next.com/). A crash course is available on [YouTube](https://www.youtube.com/watch?v=SA_9i4TtxLQ).

### how to change the content of the translation ?

The following folder : _public\locales_ contains the translation for each language you plan to support.
If you add a new language, please update the following enumeration : _src\utils\enums\languages.ts_ and add the associated translations.

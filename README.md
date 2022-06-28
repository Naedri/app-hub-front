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

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository with `git clone`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Profit. :tada:

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

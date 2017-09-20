---
title: 설치
sort: 1
contributors:
  - pksjce
  - bebraw
  - simon04
---

<!-- This guide goes through the various methods used to install webpack. -->
이 가이드는 웹팩을 설치하는 다양한 방법들을 소개합니다.


<!-- ## Pre-requisites -->
## 사전 요구사항

<!-- Before we begin, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) installed. The current Long Term Support (LTS) release is an ideal starting point. You may run into a variety of issues with the older versions as they may be missing functionality webpack and/or its related packages require. -->
이 가이드를 시작하기 전에 [Node.js](https://nodejs.org/ko/)의 새 버전이 설치되어 있는지 확인해주세요. 현재 지원 중인 LTS(Long Term Support) 릴리스는 이상적인 출발점입니다. 이전 버전에서는 webpack의 기능이 없거나 관련된 패키지에 필요한 기능이 누락 될 수 있으므로 다양한 문제가 발생될 수 있습니다.

<!-- ## Local Installation -->
## 로컬 설치

<!-- The latest webpack release is: -->
최신 webpack 릴리스

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

<!-- To install the latest release or a specific version, run one of the following commands: -->
최신 릴리스 또는 특정 버전을 설치하려면 다음 명령 중 하나를 실행해주세요.

``` bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

<!-- Installing locally is what we recommend for most projects. This makes it easier to upgrade projects individually when breaking changes are introduced. Typically webpack is run via one or more [npm scripts](https://docs.npmjs.com/misc/scripts) which will look for a webpack installation in your local `node_modules` directory: -->
우리는 대부분의 프로젝트에 로컬 설치를 권장합니다. 이렇게 하면 변경된 내용을 프로젝트에 적용할 때 프로젝트를 개별적으로 쉽게 업그레이드 할 수 있습니다. 일반적으로 webpack은 하나 또는 그 이상의 [npm 스크립트](https://docs.npmjs.com/misc/scripts)에 의해 실행되며, 로컬 `node_modules` 디렉토리에서 webpack을 찾을 것입니다 :

```json
"scripts": {
	"start": "webpack --config webpack.config.js"
}
```

<!-- To run the local installation of webpack you can access its bin version as `node_modules/.bin/webpack`. -->
T> webpack의 로컬 설치를 실행하기 위해 bin 버전에 있는 `node_modules/.bin/webpack`으로 접근 할 수 있습니다.

## 전역 설치

<!-- The following NPM installation will make `webpack` available globally: -->
다음 NPM 설치는 `webpack`을 전역에서 사용할 수 있게 합니다 :

``` bash
npm install --global webpack
```

<!-- Note that this is __not a recommended practice__. Installing globally locks you down to a specific version of webpack and could fail in projects that use a different version. -->
W> 이 방법은 __권장되는 방법은 아닙니다.__ 전역으로 설치를 하게 되면 webpack의 특정 버전으로 사용자가 잠기게 되며 다른 버전을 사용하는 프로젝트가 실패하게 될 수도 있습니다.

<!-- ## Bleeding Edge -->
## 한 단계 앞선 webpack

<!-- If you are enthusiastic about using the latest that webpack has to offer, you can install beta versions or even directly from the webpack repository using the following commands: -->
만약 webpack에서 제공하는 최신 버전을 사용하는 데 열정적이라면, 다음 명령을 사용하여 최신 베타 버전을 설치하거나 webpack 저장소에서 직접 설치할 수 있습니다.

``` bash
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

<!-- Take caution when installing these bleeding edge releases! They may still contain bugs and therefore should not be used in production. -->
W> 이러한 최첨단 릴리즈를 설치할 때는 주의해주세요! 버그가 여전히 남아있을 수 있으므로 프로덕션 환경에서 사용해서는 안됩니다.
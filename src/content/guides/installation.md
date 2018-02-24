---
title: 설치
sort: 1
contributors:
  - pksjce
  - bebraw
  - simon04
---

이 가이드는 웹팩을 설치하는 다양한 방법들을 소개합니다.

## 사전 요구사항

이 가이드를 시작하기 전에 [Node.js](https://nodejs.org/ko/)의 최신 버전이 설치되어 있는지 확인해주세요. 현재 지원 중인 LTS(Long Term Support) 릴리스를 설치할 경우 이상적인 시작점이 될 수 있습니다. 이전 버전을 사용할 경우 웹팩, 웹팩과 관련된 패키지에 필요한 기능이 누락 될 수 있으므로 다양한 문제가 발생될 수 있습니다.


## 지역(로컬) 설치

최신 웹팩 릴리즈는:

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases) 에서 확인하실 수 있습니다.

최신 릴리스 또는 특정 버전을 설치하려면 다음 명령 중 하나를 실행해주세요.

``` bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

우리는 대부분의 프로젝트에 로컬 설치를 권장합니다. 이렇게 하면 변경된 내용을 프로젝트에 적용할 때 프로젝트를 개별적으로 쉽게 업그레이드 할 수 있습니다. 일반적으로 웹팩은 하나 또는 그 이상의 [NPM 스크립트](https://docs.npmjs.com/misc/scripts)에 의해 실행되며, 이는 로컬에 있는 `node_modules` 디렉토리에서 웹팩을 찾을 것입니다:

```json
"scripts": {
	"start": "webpack --config webpack.config.js"
}
```
T> 웹팩의 로컬 설치를 실행하기 위해 bin 버전에 있는 `node_modules/.bin/webpack`으로 접근 할 수 있습니다.

## 전역(글로벌) 설치

다음 NPM 설치는 `webpack`을 전역에서 사용할 수 있게 합니다:

``` bash
npm install --global webpack
```

W> 이 방법은 __권장하지 않습니다.__ 전역으로 설치를 하게 되면 웹팩의 특정 버전에 잠기게 되며 다른 버전을 사용하는 프로젝트가 실패할 가능성이 생깁니다.

## 한 단계 앞선 웹팩

만약 당신이 웹팩에서 제공하고 있는 최신 버전을 사용하는 데 관심이 있다면, 다음 명령을 사용하여 최신 베타 버전을 설치할 수 있으며 또한 웹팩 저장소에서 직접 설치할 수 있습니다.

``` bash
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

W> 이러한 최신 릴리즈를 설치할 때는 주의해주세요! 아직 버그가 수정되지 않아있을 수 있으므로 프로덕션 환경에서는 사용해선 안됩니다.

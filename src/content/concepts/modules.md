---
title: 모듈
sort: 7
contributors:
  - TheLarkInn
  - simon04
  - rouzbeh84
---

[모듈형 프로그래밍](https://en.wikipedia.org/wiki/Modular_programming)에서, 개발자는 프로그램을 _모듈_이라는 각각 기능성을 담고 있는 덩어리들로 나눕니다.

각 모듈은 큰 규모의 프로그램보다 작은 표면적을 가지고 있어 검증, 디버깅 및 테스트를 진행하는 것이 훨씬 더 간단합니다. 잘 작성된 _모듈_은 견고한 추상화 및 캡슐화 경계를 제공하므로 각 모듈은 어플리케이션 내에서 일관된 디자인과 명확한 목적을 갖습니다.

Node.js는 처음부터 거의 모듈식 프로그래밍을 지원해 왔습니다.
그러나 웹에서는 _모듈_에 대한 지원이 느리게 이루어졌습니다.
웹에서는 모듈식 JavaScript를 지원하는 다양한 도구가 있으며 다양한 이점과 한계가 있습니다.
웹팩은 이러한 시스템에서 얻은 교훈을 토대로 빌드하고 _모듈_ 개념을 프로젝트의 모든 파일에 적용합니다.

## 웹팩 모듈이란?

[Node.js modules](https://nodejs.org/api/modules.html)와는 달리 웹팩 _모듈_은 _의존성_을 다양한 방법으로 표현할 수 있습니다. 여기에 몇 가지 예가 있습니다 :

* An [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement
* A [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` statement
* An [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` and `require` statement
* An [`@import` statement](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) inside of a css/sass/less file.
* An image url in a stylesheet (`url(...)`) or html (`<img src=...>`) file.

T> 웹팩 1은 ES2015 `import`를 변환하기 위해 특정 로더가 필요합니다. 그러나 이것은 웹팩 2를 통해 바로 가능해졌습니다.

## 지원되는 모듈 타입들

웹팩은 _로더_를 통해 다양한 언어와 전처리기로 작성된 모듈을 지원합니다. _로더_는 웹팩에서 자바스크립트가 아닌 _모듈_을 **어떻게** 처리하고 그것들의 _의존성_을 _번들_내에서 어떻게 포함시키는 지에 대해 설명합니다.
웹팩 커뮤니티는 다음과 같은 다양한 대중적인 언어 및 언어 프로세서에 대한 _로더_들을 구축했습니다.

* [CoffeeScript](http://coffeescript.org)
* [TypeScript](https://www.typescriptlang.org)
* [ESNext (Babel)](https://babeljs.io)
* [Sass](http://sass-lang.com)
* [Less](http://lesscss.org)
* [Stylus](http://stylus-lang.com)

웹팩은 사용자 정의를 위한 강력하고 풍부한 API를 제공하여 **어떤 스택**에서도 웹팩을 사용할 수 있으며, 개발, 테스트 및 프로덕션 워크 플로우에 대해 **간섭하지 않습니다.**

전체 목록은 [**로더 목록**](/loaders) 또는 [**자신만의 방법으로 작성하기**](/api/loaders)를 참조하십시오.


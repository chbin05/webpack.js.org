---
title: 시작하기
sort: 2
contributors:
  - bebraw
  - varunjayaraman
  - cntanglijun
  - chrisVillanueva
  - johnstew
  - simon04
  - aaronang
  - jecoopr
  - TheDutchCoder
  - sudarsangp
---

여러분도 알겠지만, webpack은 JavaScript 모듈을 컴파일하는데 사용됩니다. 일단 [설치](/guides/installation)하면, [CLI](/api/cli)나 [API](/api/node)를 통해 webpack을 인터페이스 할 수 있습니다. 여전히 webpack을 처음 접한다면, [핵심 개념](/concepts)과 [비교](/comparison)를 읽고 왜 커뮤니티에 없는 다른 도구들을 사용하는지 알아 보시기 바랍니다.

## 기본 설정

우선 디렉토리를 만든 후, npm을 초기화하고, [local에 webpack을 설치](/guides/installation#local-installation)해 봅시다.

``` bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
```

다음과 같은 디렉토리 구조와 컨텐츠들이 만들어져 있을 것입니다.

__project__

``` diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

``` javascript
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

``` html
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

이 예제에서, `<script>` 태그 간 암묵적인 의존성이 존재합니다. `index.js` 파일이 실행되기 전 페이지에 포함된 `lodash`에 의존하고 있습니다. `lodash`가 필요하다는 것을 `index.js`에 선언하지 않았기 때문에, 글로벌 변수 `_`가 존재한다고 가정하고 있습니다.

자바스크립트 프로젝트를 이런식으로 관리하는 것은 다음과 같은 문제가 있습니다.

- 스크립트가 외부라이브러리에 의존하는 것이 명확하지 않습니다.
- 의존성이 누락되었거나, 잘못된 순서로 포함될 경우, 어플리케이션이 적절하게 동작하지 않을 것입니다.
- 의존성이 포함되었으나 사용하지 않을 경우, 브라우저는 불필요한 코드를 강제로 다운로드 받아야 합니다.

대신 webpack을 이용해 이 스크립트들을 관리해 봅시다.


## 번들 생성

우선, 디렉터리 구조를 약간 변경할 건데, "원본" 코드 (`/src`)와 "배포용" 코드 (`/dist`)로 분리하였습니다. "원본" 코드는 코드를 작성하고 수정 할 수 있는 코드를 말하며, "배포용" 코드는 "원본" 코드를 최소화하고 최적화한 `결과물`을 의미하고 결국 브라우저에서 로드되는 코드입니다.

__project__

``` diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

`lodash` 의존성을 `index.js`와 번들링 하기 위해, 로컬에 라이브러리를 설치해야 합니다.

``` bash
npm install --save lodash
```

그리고 스크립트에 주입합니다.

__src/index.js__

``` diff
+ import _ from 'lodash';
+
  function component() {
    var element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

스크립트를 번들링 할 것이기 때문에, `index.html` 파일을 업데이트 해야합니다. `import`를 사용했기때문에, lodash `<script>`를 제거하고, `/src` 파일 대신에 번들이 로드되는 `<script>` 태그로 수정합니다.

__dist/index.html__

``` diff
  <html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="bundle.js"></script>
   </body>
  </html>
```

이 설정해서, `index.js`는 명시적으로 `lodash`를 필요로 하고 있고, `_`로 바인딩합니다(글로벌 스코프에 오염이 되지 않음). 모듈이 필요로 하는 의존성을 기술 함으로써 이 정보를 사용하여 webpack은 의존성 그래프를 만들고 이것을 이용해 스크립트가 올바른 순서대로 실행 될 수 있는 최적화된 번들을 생성합니다.

[시작 포인트](/concepts/entry-points)로써 스크립트와 [결과물](/concepts/output)로의 `bundle.js`를 가지고 `webpack`을 실행해 봅시다.

``` bash
./node_modules/.bin/webpack src/index.js dist/bundle.js

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 385ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 278 bytes {0} [built]
```

T> 결과물이 약간 상이 할 수 있지만, 빌드가 성공한다면 잘 진행됩니다.

브라우저에서 `index.html`을 열고, 잘 동작한다면 'Hello webpack'이라는 텍스트를 볼 수 있습니다.

## 모듈

es2015에서 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)와 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 문은 표준화 되었습니다. 대부분의 브라우저에서 지원하는 것은 아니지만 webpack은 지원하고 있습니다.

webpack은 사실 구형 브라우저에서 실행 될 수 있도록 코드를 "트랜스파일"합니다. `dist/bundle.js` 확인해 보면, webpack이 이 부분을 어떻게 하는지 볼 수 있는데 매우 독창적입니다! `import` 와 `export` 외에도 다양한 모듈 구문을 지원합니다. 좀더 자세한 내용은 [모듈 API](/api/module-methods)에서 확인해 보시기 바랍니다.

webpack은 `import`와 `export` 구문 외에 어떠한 코드도 변경하지 않는것에 주의하시기 바랍니다. 다른 [ES2015 피쳐들](http://es6-features.org/)을 사용하고 싶다면, webpack의 [로더 시스템](/concepts/loaders/)을 통해 [Babel](https://babeljs.io/) 또는 [Bublé](https://buble.surge.sh/guide/) 같은 [트랜스파일러를 사용](/loaders/#transpiling)하시기 바랍니다.

## 설정 이용

대부분의 프로젝트들은 복잡한 설정이 필요합니다. 그래서 webpack은 [설정하기 위한 파일](/concepts/configuration)을 제공합니다. 터미널에 많은 커맨드를 타이핑하는 것보다 좀 더 효율적이니 위에 CLI 옵션 대신 파일을 하나 생성해 보도록 합시다.

__project__

``` diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

새로운 설정파일을 이용해 다시 빌드해 봅시다.

``` bash
./node_modules/.bin/webpack --config webpack.config.js

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 390ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 278 bytes {0} [built]
```

T> `webpack.config.js`가 있다면, `webpack` 은 기본적으로 그 파일을 선택합니다. `--config` 옵션을 사용하면 다름 파일명을 가진 설정 파일을 실행 할 수 있습니다. 이 방법은 여러개의 파일로 분리해야하는 복잡한 설정에 유용합니다.

설정 파일은 단순히 CLI를 사용하는 것보다 좀 더 유연함을 제공해 줍니다. loader rules, plugins, resolve options 및 기타 개선사항들을 이 방법을 이용해 구성할 수 있습니다. 좀 더 자세한 내용은 [설정 문서](/configuration)를 참조하시기 바랍니다.

## NPM 스크립트

CLI에서 매번 webpack의 로컬 복사본을 실행하는 것은 그리 재밌는 일이 아니므로, 단축 명령어로 설정 할 수 있습니다. [npm 스크립트](https://docs.npmjs.com/misc/scripts)를 추가하여  _package.json_ 파일을 수정해 봅시다.

__package.json__

``` json
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

이제 `npm run build` 명령어를 이전에 사용했던 긴 명령어 대신 사용할 수 있습니다. `scripts`에서 전체 경로를 작성하지 않고 로컬에 설치된 npm 패키지의 이름을 참조 할 수 있는데 이 컨벤션은 npm 기반 프로젝트의 표준이며, `./node_modules/.bin/webpack`을 사용하는 대신 `webpack`을 사용하여 직접 호출 할 수 있습니다.

다음 명령어를 실행해 스크립트가 잘 돌아가는지 확인 할 수 있습니다.

``` bash
npm run build

Hash: ff6c1d39b26f89b3b7bb
Version: webpack 2.2.0
Time: 390ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 278 bytes {0} [built]
```

T> 커스텀한 파라미터들은 `npm run build` 명령어와 파라미터 사이에 두개의 대시(`--`)를 이용하여 전달 할 수 있습니다.  e.g. `npm run build -- --colors`.

## 결론

이제 기본 빌드를 구성해 보았으니, 다음 [`Asset 관리`](/guides/asset-management) 가이드로 넘어가 webpack으로 이미지와 폰트를 어떻게 구성하는지 알아보도록 합니다. 이 부분에서 프로젝트는 다음과 같이 보여야 합니다.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

T> 만약 npm 5를 사용한다면, 디렉터리에서 `package-lock.json`을 볼 수 있을 것입니다.

webpack을 디자인하는 것에 대해 좀 더 알아보고 싶다면, [기본 개념](/concepts)과 [구성](/configuration) 페이지에서 확인해 볼 수 있습니다. 또한 [API](/api)섹션에서 webpack에서 제공해주는 다양한 인터페이스를 파볼수 있습니다.

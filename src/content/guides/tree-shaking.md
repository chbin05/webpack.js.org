---
title: 트리 쉐이킹
sort: 7
contributors:
  - simon04
  - zacanger
  - alexjoverm
  - avant1
  - MijaelWatts
  - dmitriid
related:
  - title: 타입스크립트, 바벨과 함께 웹팩 2로 트리 쉐이킹 하기
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: 웹팩 2와 바벨 6로 트리 쉐이킹 하기
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: 웹팩 2 트리 쉐이킹 설정하기
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
  - title: Issue 2867
    url: https://github.com/webpack/webpack/issues/2867
  - title: Issue 4784
    url: https://github.com/webpack/webpack/issues/4784
---

_트리 쉐이킹_은 자바스크립트 컨텍스트에서 데드 코드(사용되지 않는 코드) 제거를 가리킬 때 일반적으로 사용되는 용어입니다. ES2015 모듈 구문의 [정적 구조]((http://exploringjs.com/es6/ch_modules.html#static-module-structure))에 의존합니다. 즉, [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 및 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)에 의존합니다. 이 이름과 개념은 ES2015 모듈 번들러 [롤업](https://github.com/rollup/rollup)에 의해 대중화 되었습니다.

webpack 2 릴리스에는 ES2015 모듈 (별칭 _harmony modules_) 뿐만 아니라 사용되지 않은 모듈 `export` 감지 기능이 내장되어 있습니다.

T> 이 가이드의 나머지 부분은 [시작하기](/guides/getting-started)에서 비롯됩니다. 가이드를 읽지 않으셨다면, 먼저 읽어주세요.

## 유틸리티 추가

두 함수를 내보내는 새 유틸리티 파일 `src / math.js`를 프로젝트에 추가해 보겠습니다.

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
  |- math.js
|- /node_modules
```

__src/math.js__

``` javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

여기서 우리는 새로운 함수 중 하나를 활용하기 위해 엔트리 스크립트를 업데이트하고 단순화를 위해 `lodash '를 제거해 보도록 하겠습니다.

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   var element = document.createElement('div');
+   var element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

`src / math.js` 모듈에서 __`square`함수를 `import`하지 않았음__ 을 주목해주세요. 이 함수는 "데드 코드"라고 불리는데, 이는 사용되지 않는 `export`를 의미합니다. 이제 npm 스크립트안에 정의된 `npm run build`를 실행하고 출력된 번들 파일을 살펴봅시다:

__dist/bundle.js (around lines 90 - 100)__

``` js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}
```

위의 '사용되지 않은 harmony export square'주석에 주목해주세요. 코드를 보면, `square`가 export 되어있지 않는 것을 알 수 있습니다. 그러나 여전히 번들 파일에 포함되어 있습니다. 우리는 다음 섹션에서 이 문제를 해결할 것입니다.

## 아웃풋 최소화하기

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that, we'll add a minifier that supports dead code removal -- the [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) -- to our configuration...

우리는 `import`와 `export` 사용으로"데드 코드"를 떼어냈습니다. 그러나 여전히 번들 파일에 남은 `dead code`를 제거할 필요가 있습니다. 그래서 우리는 `데드 코드`를 제거하기 위해 [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) 설정 내에 있는 minifier를 추가 할 것입니다.


먼저 설치를 해보겠습니다:

``` bash
npm i --save-dev uglifyjs-webpack-plugin
```

그런 다음 설정 파일안에 추가해주세요:

__webpack.config.js__

``` diff
const path = require('path');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ plugins: [
+   new UglifyJSPlugin()
+ ]
};
```

T> `--optimize-minimize` 플래그를 사용하여 `UglifyJsPlugin`을 추가할 수 있습니다.

다른 방법으로 보면, 우리는 또 다른 `npm run build`를 실행하여 변경된 것이 있는지 확인할 수 있습니다.

`dist/bundle.js`와 다른 점에 주목해주세요. 분명히 번들된 내용 전체가 축소되고 난독화되었습니다. 주의 깊게 살펴보면 `square` 함수는 코드에 포함되지 않았고 `cube` 함수만 난독화된 것을 확인할 수 있습니다. 

(`function r (e) {return e * e * e} na = r`). 

이제 축소화와 트리 쉐이킹의 사용으로 번들된 내용이 몇 바이트 작아졌습니다! 이 인위적인 예제에서는 그리 좋아 보이지 않는 것처럼 보이지만 복잡한 종속성 트리를 갖고 있는 규모가 큰 응용 프로그램에서 작업 할 때는 트리 쉐이킹을 사용하여 번들된 파일의 크기를 크게 줄일 수 있습니다.

## 주의 사항

webpack은 자체적으로 트리 쉐이킹을 하지 않습니다. 데드 코드를 제거하기 위해서는 [UglifyJS](/plugins/uglifyjs-webpack-plugin/)와 같은 서드 파티 도구에 의존해야 합니다.

여기에 트리 쉐이킹이 효과적이지 않을 수도 있는 상황을 볼 수 있습니다. 예를 들어 아래와 같은 모듈을 사용할 경우 트리 쉐이킹 사용을 다시 한번 고려해야 합니다:

__transforms.js__

``` js
import * as mylib from 'mylib';

export const someVar = mylib.transform({
  // ...
});

export const someOtherVar = mylib.transform({
  // ...
});
```

__index.js__

``` js
import { someVar } from './transforms.js';

// Use `someVar`...
```

위의 코드에서 webpack은 `mylib.transform`에 대한 호출이 부작용(side-effects)을 유발하는 지에 대해 결정을 내릴 수 없습니다. 
결과적으로, 코드의 안전성을 위해 오류를 발생시켜 번들 코드에 someOtherVar가 남도록 합니다.

일반적으로 도구 관점에서 특정 코드 경로가 부작용을 일으키지 않는다고 보장 할 수 없는 경우, 그 코드는 생성된 번들에 남아있을 수 있습니다. 
일반적인 상황으로는 webpack 및/또는 minifier가 검사 할 수 없는 타사 모듈에서 함수를 호출하거나 타사 모듈에서 가져온 함수를 다시 내보내는 작업 등이 있습니다.

이 가이드에서 사용 된 코드는 UglifyJS 플러그인을 사용하여 트리 셰이크를 수행한다고 가정합니다. 그러나, [webpack-rollup-loader](https://github.com/erikdesjardins/webpack-rollup-loader) 또는 [Babel Minify Webpack Plugin](/plugins/babel-minify-webpack-plugin)과 같은 툴들을 사용할 경우, 당신의 설정에 따라 결과가 다르게 나올 수도 있습니다.

## 결론

<!-- So, what we've learned is that in order to take advantage of _tree shaking_, you must... -->
여기서 우리가 배운 것은 _트리 쉐이킹_을 이용하는 방법이었습니다. (반드시 이용하세요...)

- ES2015 모듈 구문 사용하기 (즉, `import` and `export`).
- 데드 코드를 제거하기 위해 minifier 사용하기 (예, `UglifyJSPlugin`).

당신은 어플리케이션을 나무로 상상할 수 있습니다. 실제로 사용되는 소스 코드 및 라이브러리는 나무의 녹색 잎을 나타냅니다. 데드 코드는 가을이 찾아와 시든 갈색의 죽은 나뭇잎을 나타냅니다. 죽은 나뭇잎을 없애기 위해서는 나무를 흔들어 떨어 뜨려야합니다.

output을 최적화하는 더 많은 방법에 대해 관심이 있으시다면, 다음 가이드 [production](/guides/production)으로 이동해주세요.

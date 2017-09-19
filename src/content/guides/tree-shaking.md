---
title: 트리 쉐이킹
sort: 7
contributors:
  - simon04
  - zacanger
  - alexjoverm
related:
  - title: Tree shaking with webpack 2, TypeScript and Babel
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: Tree-shaking with webpack 2 and Babel 6
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: webpack 2 Tree Shaking Configuration
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
---

<!-- _Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination. It relies on the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of ES2015 module syntax, i.e. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export). The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup). -->
트리 쉐이킹은 사용되지 않는(dead-code) 코드를 제거를 위한 JavaScript 컨텍스트에서 일반적으로 사용되는 용어입니다. ES2015 모듈 구문의 [정적 구조]((http://exploringjs.com/es6/ch_modules.html#static-module-structure)), 즉 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 및 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)에 의존합니다. 이 이름과 개념은 ES2015 모듈 번들러에 의해 대중화되었습니다.

<!-- The webpack 2 release came with built-in support for ES2015 modules (alias _harmony modules_) as well as unused module export detection. -->
webpack 2 릴리스에는 ES2015 모듈 (별칭 _harmony 모듈_) 뿐만 아니라 사용되지 않은 모듈에 대한 export 감지 기능이 내장되어 있습니다.

<!-- The remainder of this guide will stem from [Getting Started](/guides/getting-started). If you haven't read through that guide already, please do so now. -->
T> 이 가이드의 나머지 부분은 [시작하기](/guides/getting-started)에서 비롯됩니다. 가이드를 이미 읽지 않았다면 지금 먼저 읽어주세요.

## 유틸리티 추가

<!-- Let's add a new utility file to our project, `src/math.js`, that exports two functions: -->
두 개의 함수를 내보내는 새 유틸리티 파일 `src / math.js`를 프로젝트에 추가해 보겠습니다.

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

<!-- With that in place, let's update our entry script to utilize this one of these new methods and remove `lodash` for simplicity: -->
여기서, 우리는 새로운 함수 중 하나를 활용하고 더 단순화를 시키기 위해 엔트리 스크립트를 업데이트를 하고 `lodash '를 제거하겠습니다.

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

<!-- Note that we __did not `import` the `square` method__ from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output bundle: -->
`src / math.js` 모듈에서 __`square`함수를 `import`하지 않았음을__ 주목해주세요. 이 함수는 "사용하지 않는 코드(dead code)"라고 불리는데, 이는 사용하지 않는 `export`를 의미합니다. 이제 npm 스크립트안에 정의된 `npm run build`를 실행하고 출력된 번들 파일을 확인해 봅시다.

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

<!-- Note the `unused harmony export square` comment above. If you look at the code below it, you'll notice that `square` is not being exported, however, it is still included in the bundle. We'll fix that in the next section. -->
위의 '사용되지 않은 harmony export square'주석에 주목해주세요. 코드를 보면, `square`가 export되지 않는다는 것을 알 수 있습니다. 그러나 여전히 번들 파일에 포함되어 있습니다. 우리는 다음 섹션에서 이 문제를 해결할 것입니다.

## Output 최소화하기

<!-- So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that, we'll add a minifier that supports dead code removal -- the [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) -- to our configuration... -->
그래서 우리는 `import`와 `export`문법을 사용하여 "dead code"를 삭제하도록 시도했지만, 여전히 번들 파일에 남은 `dead code`를 삭제해야합니다. 그렇게하기 위해 우리는 `dead code`를 제거하는 minifier를 추가 할 것입니다 - [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) - 설정 내에서...

<!-- Let's start by installing it: -->
먼저 `UglifyJSPlugin`를 설치해 보겠습니다.

``` bash
npm i --save-dev uglifyjs-webpack-plugin
```

<!-- And then adding it into our config: -->
그런 다음 설정에 `UglifyJSPlugin`를 추가해주세요.

__webpack.config.js__

``` diff
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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

<!-- Note that the `--optimize-minimize` flag can be used to insert the `UglifyJsPlugin` as well. -->
T>`--optimize-minimize` 플래그를 사용하여 `UglifyJsPlugin`을 추가할 수 있습니다.

<!-- With that squared away, we can run another `npm run build` and see if anything has changed. -->
우리는 또 다른 `npm run build`를 실행하여 변경된 것이 있는지 확인할 수 있습니다.

<!-- Notice anything different about `dist/bundle.js`? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees. -->
`dist / bundle.js`와 다른 점에 주목해주세요. 분명히 번들된 내용 전체가 축소되고 mangled(해석을 어렵게 만드는) 되었습니다. 하지만 주의 깊게 살펴보면 `square` 함수는 포함되지 않았지만 `cube` 함수가 mangled된 것을 확인할 수 있습니다. (`function r (e) {return e * e * e} na = r`). 이제 축소화와 트리 쉐이킹의 사용으로 번들된 내용이 몇 바이트 작아졌습니다! 이 인위적인 예제에서는 그리 좋아 보이지 않지만 복잡한 종속성 트리가 있는 규모가 큰 응용 프로그램에서 작업 할 때, 트리 쉐이킹을 사용하여 번들된 파일의 크기를 크게 줄일 수 있습니다.

<!-- ## Conclusion -->
## 결론

<!-- So, what we've learned is that in order to take advantage of _tree shaking_, you must... -->
여기서 우리가 배운 것은 _트리 쉐이킹_을 이용하기 위한 것이었습니다. (반드시 이용하세요..)

- Use ES2015 module syntax (i.e. `import` and `export`).
- Include a minifier that supports dead code removal (e.g. the `UglifyJSPlugin`).

<!-- If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production). -->
output을 최적화하는 것에 대한 더 많은 방법에 관심이 있으시다면, 다음 가이드인 [production](/guides/production)으로 이동해주세요.
---
title: 코드 스플리팅
sort: 9
contributors:
  - pksjce
  - pastelsky
  - simon04
  - jonwheeler
  - johnstew
  - shinxi
  - tomtasche
  - levy9527
  - rahulcs
  - chrisVillanueva
  - rafde
  - bartushek
  - shaunwallace
  - skipjack
  - jakearchibald
  - TheDutchCoder
  - rouzbeh84
  - shaodahong
  - sudarsangp
---

T> 이 가이드는 [시작하기](/guides/getting-started) 및 [output 관리](/guides/output-management)에서 제공되는 예제와 이어집니다. 이 가이드를 진행하시기 전에 먼저 제공된 예제들을 잘 이해하고 있는지 확인해주세요.

코드 스플리팅은 웹팩의 가장 강력한 기능 중 하나입니다. 이 기능을 사용하면 코드를 필요에 따라 병렬로 로드 할 수 있도록 다양한 번들로 분할 할 수 있습니다. 작은 번들을 구현하여 리소스 부하의 우선 순위를 제어하는 ​​데 사용할 수 있습니다. 올바르게 사용하면 로드 시간에 큰 영향을 줄 수 있습니다.

코드 스플리팅에는 일반적으로 다음 세 가지 접근이 있습니다.

- 엔트리 포인트: [`entry`](/configuration/entry-context)설정을 사용하여 코드를 수동으로 분할해주세요.
- 복사 방지: [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)을 사용하여 중복된 청크를 제거하고 분할해주세요.
- 동적 임포트: 모듈 내에서 인라인 함수 호출을 통해 코드를 분할해주세요.

## 엔트리 포인트

이것은 가장 쉽고 직관적인 코드 분할 방법입니다. 그러나, 이 방법은 좀 더 수동적이고, 함정에 빠질 위험이 있습니다. 메인 번들과 다른 모듈을 어떻게 분할 할 수 있는지 살펴 보겠습니다.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

__another-module.js__

``` js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

__webpack.config.js__

``` js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

위의 진행하게 되면, 다음처럼 빌드 결과가 생성됩니다.:

``` bash
Hash: 309402710a14167f42a8
Version: webpack 2.6.1
Time: 570ms
            Asset    Size  Chunks                    Chunk Names
  index.bundle.js  544 kB       0  [emitted]  [big]  index
another.bundle.js  544 kB       1  [emitted]  [big]  another
   [0] ./~/lodash/lodash.js 540 kB {0} {1} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} {1} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} {1} [built]
   [3] ./src/another-module.js 87 bytes {1} [built]
   [4] ./src/index.js 216 bytes {0} [built]
```

앞에서 언급 했듯이, 이 접근법에는 몇 가지 함정이 있습니다.

- 엔트리 청크 사이에 중복으로 적용된 모듈이 있는 경우, 이 모듈은 두 묶음에 모두 포함됩니다
- 유연하지 않기 때문에 코드를 코어 애플리케이션 로직과 동적으로 분리하는 데 사용할 수 없습니다.

이 두 가지 중 첫 번째는 우리가 진행하고 있는 예제에서 한가지 분명한 이슈를 담고 있습니다. 여기에는 `lodash` 또한 `./src/index.js`에 import 되어있기 때문에 모든 번들 파일 안에 같은 코드가 복사되어 있는 것을 확인할 수 있습니다. 그러면 이제 `CommonsChunkPlugin`를 사용하여 중복된 코드를 제거해봅시다.

## 중복 방지

[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)은 기존의 엔트리 청크 또는 완전히 새로운 청크에 공통으로 적용된 종속성을 추출 할 수 있게 합니다. 앞의 예제에서 봤던 `lodash`에 대한 의존성 중복 제거를 진행하기 위해 이 플러그인을 사용해봅시다:

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // Specify the common bundle's name.
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

With the [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) in place, we should now see the duplicate dependency removed from our `index.bundle.js`. The plugin should notice that we've separated `lodash` out to a separate chunk and remove the dead weight from our main bundle. Let's do an `npm run build` to see if it worked:
[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)을 이곳에 두면, 우리는 중복으로 적용된 의존성이 `index.bundle.js`에서 제거 된 것을 확인해야 합니다. 플러그인은 `lodash`를 분리 된 청크로 나누며 메인 번들에서 더 이상 사용되지 않는 코드를 제거합니다. 이 플러그인 설정이 잘 진행되는지 확인하기 위해 `npm run build`를 실행해봅시다.

``` bash
Hash: 70a59f8d46ff12575481
Version: webpack 2.6.1
Time: 510ms
            Asset       Size  Chunks                    Chunk Names
  index.bundle.js  665 bytes       0  [emitted]         index
another.bundle.js  537 bytes       1  [emitted]         another
 common.bundle.js     547 kB       2  [emitted]  [big]  common
   [0] ./~/lodash/lodash.js 540 kB {2} [built]
   [1] (webpack)/buildin/global.js 509 bytes {2} [built]
   [2] (webpack)/buildin/module.js 517 bytes {2} [built]
   [3] ./src/another-module.js 87 bytes {1} [built]
   [4] ./src/index.js 216 bytes {0} [built]
```

다음은 코드 분할을 위해 커뮤니티에서 제공하는 여러가지 유용한 플러그인과 로더입니다.

- [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin): 메인 어플리케이션에서 CSS를 분리하는 데 유용합니다.
- [`bundle-loader`](/loaders/bundle-loader): 코드를 분할하고 출력된 번들을 지연 로드하는데 사용됩니다.
- [`promise-loader`](https://github.com/gaearon/promise-loader): `bundle-loader`와 비슷하지만 Promise를 사용합니다.

T> [`ComminsChunkPlugin`](/plugins/commons-chunk-plugin)은 [explicit vendor chunks](/plugins/commons-chunk-plugin/#explicit-vendor-chunk)를 사용하여 벤더 모듈을 코어 어플리케이션 코드에서 분리하는 데에도 사용됩니다.

## 동적 임포트

동적 코드 분할과 관련된 두 가지 유사한 기술이 웹팩에서 지원됩니다. 가장 바람직한 첫 번째 방법은 동적 임포트를 위해 [`import()` syntax](/api/module-methods#import-)를 사용하는 것입니다. [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import)에서 동적 임포트를 위한 내용을 확인하실 수 있습니다. 레거시한 웹팩의 특별한 접근법은 [`require.ensure`](/api/module-methods#require-ensure)를 사용하는 것입니다. 이 두 가지 방법 중 첫 번째를 사용해 보겠습니다.

W> `import()` 호출은 [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 사용합니다. `Promise` 지원이 부족한 구형 브라우저 (예 : Internet Explorer)를 지원하려면 기본 번들 파일들 보다 먼저 'Promise' 폴리필을 포함시켜야 합니다.

시작하기 전, 다음 번 진행에서 필요하지 필요하지 않은 설정인 [`entry`](/concepts/entry-points/)와 [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)를 삭제합니다.

__webpack.config.js__

``` diff
  const path = require('path');
- const webpack = require('webpack');
  const HTMLWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     another: './src/another-module.js'
    },
    plugins: [
      new HTMLWebpackPlugin({
        title: 'Code Splitting'
-     }),
+     })
-     new webpack.optimize.CommonsChunkPlugin({
-       name: 'common' // Specify the common bundle's name.
-     })
    ],
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

엔트리 파일이 아닌 청크 파일의 이름을 결정하는 `chunkFilename` 사용에 주목해주세요. `chunkFilename`에 대한 자세한 내용은 [output documentation](/configuration/output/#output-chunkfilename)을 참조해주세요. 또한 우리는 사용하지 않는 파일들을 제거하기 위해 프로젝트를 업데이트 할 것입니다:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
- |- another-module.js
|- /node_modules
```

이제 `lodash`를 정적 임포트를 하는 대신 동적 임포트로 청크 파일들을 분리할 것입니다.

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

주석에 `webpackChunkName`을 사용하는 데에 주목해주세요. 이렇게 하면 별도의 번들 이름이 `[id] .bundle.js`가 아닌 `lodash.bundle.js`로 지정됩니다. `webpackChunkName`과 다른 옵션에 대한 더 자세한 정보는 [`import ()` 문서](/api/module-methods#import-)를 확인해주세요. 별도의 번들로 분리 된 `lodash`를 보기 위해 웹팩을 실행해주세요. :

``` bash
Hash: a27e5bf1dd73c675d5c9
Version: webpack 2.6.1
Time: 544ms
           Asset     Size  Chunks                    Chunk Names
lodash.bundle.js   541 kB       0  [emitted]  [big]  lodash
 index.bundle.js  6.35 kB       1  [emitted]         index
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] ./src/index.js 377 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

babel과 같은 전처리기를 통해 [`async` 함수들](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)을 활성화 한 경우 다음을 수행 할 수 있습니다. `import ()`문이 Promise를 반환하기 때문에 코드를 더 단순화 시킬 수 있습니다.:

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
-     var element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   var element = document.createElement('div');
+   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```


## 번들 분석

코드 분할을 적용하면 출력된 번들 파일 안에서 진행된 모듈 분할이 어디에서 끝났는 지 분석할 수 있습니다. [공식 분석 툴](https://github.com/webpack/analyse)은 번들 분석을 시작할 수 있게 도와줍니다. 또한 커뮤니티에서 지원하는 다른 옵션들도 존재합니다.

[webpack-chart](https://alexkuz.github.io/webpack-chart/): 웹팩 통계를 위한 파이 차트
[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 번들 파일들을 시각화하고 분석하여 어떤 모듈이 공간을 차지하고 있고 어떤 모듈이 중복 될 수 있는지 확인하세요.
[webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer): 번들된 내용을 확대/축소 가능한 편리한 트리 맵으로 나타내는 플러그인 및 CLI 유틸리티입니다.


## 다음 과정

실제 어플리케이션에서 `import()`를 어떻게 사용할 수 있는 지에 대한 구체적인 예를 확인하려면 [지연 로딩](/guides/lazy-loading)을 확인해주세요. 또한 코드를 보다 효과적으로 분할하는 방법을 배우려면 [캐싱](/guides/caching)을 확인해주세요.
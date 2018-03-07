---
title: 결과물 관리
sort: 4
contributors:
  - skipjack
  - TheDutchCoder
  - sudarsangp
---


T> 이 가이드는 [`에셋 관리`](/guides/asset-management) 가이드의 코드 예제를 확장하였습니다.

지금까지 `index.html` 파일에 모든 에셋들을 하나하나 추가하였는데, 어플리케이션이 커지고  [파일명으로 해시를 사용](/guides/caching)하며 [여러개의 번들](/guides/code-splitting)을 만들어 내면 `index.html`을 일일이 관리하기 힘들어집니다. 하지만, 이 프로세스를 좀 더 쉽게 관리할 수 있도록 도와주는 플러그인이 존재합니다.

## 준비

일단, 프로젝트를 약간 조정해 봅시다.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

`src/print.js`파일에 로직을 추가해 봅시다.

__src/print.js__

``` js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

`src/index.js`파일에 함수를 사용합니다.

__src/index.js__

``` diff
  import _ from 'lodash';
+ import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
+   var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+   btn.innerHTML = 'Click me and check the console!';
+   btn.onclick = printMe;
+
+   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
```

webpack에서 엔트리를 분할할 준비를 하기 위해 `dist/index.html` 파일을 업데이트 해 봅시다.

__dist/index.html__

``` diff
  <html>
    <head>
-     <title>Asset Management</title>
+     <title>Output Management</title>
+     <script src="./print.bundle.js"></script>
    </head>
    <body>
-     <script src="./bundle.js"></script>
+     <script src="./app.bundle.js"></script>
    </body>
  </html>
```

설정을 수정해 봅시다. 새로운 엔트리 포인트(`print`)로 `src/print.js`를 추가하고, 결과물 또한 변경하면, 엔트리 포인트 명에 기반한 번들명을 동적으로 만들어냅니다.

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: {
-     index: './src/index.js',
+     app: './src/index.js',
+     print: './src/print.js'
    },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

`npm run build`를 실행 한 후, 생성한 것을 보도록 합시다.

``` bash
Hash: aa305b0f3373c63c9051
Version: webpack 3.0.0
Time: 536ms
          Asset     Size  Chunks                    Chunk Names
  app.bundle.js   545 kB    0, 1  [emitted]  [big]  app
print.bundle.js  2.74 kB       1  [emitted]         print
   [0] ./src/print.js 84 bytes {0} {1} [built]
   [1] ./src/index.js 403 bytes {0} [built]
   [3] (webpack)/buildin/global.js 509 bytes {0} [built]
   [4] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

webpack이 `print.bundle.js`과 `app.bundle.js`파일을 생성하였고, `index.html`파일에 명시되어 있습니다. 브라우저에서 `index.html`을 열면, 버튼을 클릭했을 때 무슨 일이 발생하는지 확인 할 수 있습니다.

엔트리 포인트 중 이름 하나를 변경하거나 추가하면 어떤 일이 일어날까요? 빌드하면서 번들명은 바뀌겠지만, `index.html`파일은 예전 이름을 참조하고 있습니다. [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)을 가지고 수정해 봅시다.

## HtmlWebpackPlugin 설정하기

플러그인을 설치하고, `webpack.config.js`파일을 수정해 봅시다.

``` bash
npm install --save-dev html-webpack-plugin
```

__webpack.config.js__

``` diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

빌드 하기 전에, `HtmlWebpackPlugin`은 기본적으로 `dist/`폴더에 `index.html`파일이 존재하더라도 해당 파일을 생성한다는 점을 알아야 합니다. 이것은 기존의 `index.html`이 새로 생성된 것으로 대체된다는 것을 의미하기도 합니다. `npm run build`를 했을 때 무슨 일이 일어나는이 확인해 보도록 합시다.

``` bash
Hash: 81f82697c19b5f49aebd
Version: webpack 2.6.1
Time: 854ms
           Asset       Size  Chunks                    Chunk Names
 print.bundle.js     544 kB       0  [emitted]  [big]  print
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  249 bytes          [emitted]
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 172 bytes {1} [built]
   [4] multi lodash 28 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 538 bytes {0} [built]
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

코드 에디터에서 `index.html`를 열면, `HtmlWebpackPlugin`이 완전시 새로운 파일을 만들어 낸 것을 확인 할 수 있고, 모든 번들들이 자동으로 추가된 것 을 확인 할 수 있습니다.

`HtmlWebpackPlugin`에서 제공하는 기능과 옵션에 대해 좀 더 알고 싶다면, [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)레파지토리를 읽어보시기 바랍니다.

기본 템플릿 외에도 몇 가지의 추가 기능을 제공하는 [`html-webpack-template`](https://github.com/jaketrent/html-webpack-template) 또한 살펴 보실 수 있습니다.

## `/dist`폴더 정리하기

이전 가이드와 코드 예제를 보아서 알겠지만, `/dist` 폴더는 꽤 지저분해 졌습니다. webpack이 `/dist`폴더에 새로운 파일을 생성해 놓지만, 어떤 파일이 사실상 프로젝트에서 사용하고 있는지 파악하지 못하고 있습니다.

일반적으로 빌드 전에 `/dist` 폴더를 정리하면, 사용된 파일만 생성이 됩니다. 한번 다뤄보도록 합시다.

이 부분을 관리하기에 좋은 플러그인은 [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin)입니다. 설치하고 설정해 봅시다.

``` bash
npm install clean-webpack-plugin --save-dev
```

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

`npm run build`를 실행하고 `/dist` 폴더를 확인해 봅시다. 잘 동작했다면 빌드를 통해 생성된 파일을 확인 할 수 있고, 오래된 파일은 존재하지 않을 것입니다!

## 매니페스트

webpack과 플러그인들이 어떻게 어떤 파일이 생성되었는지 "알 수 있는지" 궁금 할지도 모릅니다. 답은 매니페스트에 있고 webpack은 모든 모듈이 결과 번들에 매핑되는 방식을 파악할 수 있습니다. webpack의 [`결과물`](/configuration/output)을 다른 방법으로 관리하는 것에 관심이 있다면, 매니페스트가 시작하기에 좋습니다.

매니페스트 데이터는 [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin)을 사용하여 쉽게 사용 할 수 있도록 json 파일로 추출 할 수 있습니다.

이번 프로젝트에서 이 플러그인을 다루는 방법에 대해 전체 예제를 살펴 보지 않을 것이지만, [개념 페이지](/concepts/manifest)와 [캐싱 가이드](/guides/caching)를 읽고 어떻게 이 부분이 장기 캐싱과 관련이 있는지 알아 볼 수 있습니다.

## 결론

이제 HTML에 번들을 동적으로 추가하는 방법에 대해 알아보았습니다. [개발 가이드](/guides/development)로 넘어가 보도록 합시다. 좀 더 심화된 토픽을 파보고 싶다면, [코드 분할 가이드](/guides/code-splitting)를 읽어볼 것을 추천합니다.

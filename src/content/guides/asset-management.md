---
title: 에셋 관리
sort: 3
contributors:
  - skipjack
  - michael-ciniawsky
  - TheDutchCoder
  - sudarsangp
---

처음부터 가이드를 따라 왔다면, "Hello webpack" 이라 보이는 작은 프로젝트를 진행 했을 것입니다. 이제 이미지 같은 에셋들을 통합하고 처리하는 방법에 대해 알아보도록 하겠습니다.

webpack 이전에, 프론트엔드 개발자들은 grunt나 gulp같은 도구를 이용하여 이러한 에셋들을 처리하고 `/src` 폴더에서 `/dist` 나 `/build` 디렉토리로 이동하도록 하였습니다. 이 같은 생각은 자바스크립트 모듈에 사용되었는데 webpack과 같은 도구는 [종속성 그래프](/concepts/dependency-graph)로 알려진 모든 종속성들을 __동적으로 번들링__ 합니다.


webpack의 기능 중 가장 멋진 것은 로더가 있다면 자바스크립트 외에 _다른 유형의 파일도 포함_ 할 수 있다는 것입니다. 이는 웹 사이트나 웹 앱을 구축할 때 사용되는 모든 것을 위에 나열된 자바스크립트에 대한 동일한 이익(예:명시적 의존성)을 적용할 수 있다는 것을 의미합니다. 먼저, 설정 하기에 친숙한 CSS로 시작해 봅시다.

## 설정

시작하기 전에 프로젝트를 조금 바꿔봅시다.

__dist/index.html__

``` diff
  <html>
    <head>
-    <title>Getting Started</title>
+    <title>Asset Management</title>
    </head>
    <body>
      <script src="./bundle.js"></script>
    </body>
  </html>
```


## CSS 로딩

자바스크립트 모듈에 CSS를 `import` 하기 위해, 여러분의 [`모듈` 설정](/configuration/module)에 [style-loader](/loaders/style-loader)와 [css-loader](/loaders/css-loader)를 설치하고 추가해 봅시다.

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

T> webpack은 정규식을 사용하여 특정 파일을 찾아 특정 로더에 제공해야 하는지 결정합니다. 위의 예제에 경우에는 `.css` 로 끝나는 파일을 `style-loader`와 `css-loader`에 제공하고,
이렇게 하면 해당 스타일을 의존하는 파일에 `import './style.css'` 가 가능합니다. 이제 모듈을 실행할때, 문자화가 된 css가 있는 `<style>` 태그는 html 파일의 `<head>`에 삽입됩니다.

프로젝트에 새 `style.css` 파일을 추가하고, `index.js`에 삽입해 봅시다.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

__src/style.css__

``` css
.hello {
  color: red;
}
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import './style.css';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

빌드 명렬어를 실행해 봅시다.

``` bash
npm run build

Hash: 9a3abfc96300ef87880f
Version: webpack 2.6.1
Time: 834ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  560 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] ./src/style.css 1 kB {0} [built]
   [2] ./~/css-loader!./src/style.css 191 bytes {0} [built]
   [3] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [4] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [5] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [6] (webpack)/buildin/global.js 509 bytes {0} [built]
   [7] (webpack)/buildin/module.js 517 bytes {0} [built]
   [8] ./src/index.js 351 bytes {0} [built]
```

브라우저에서 `index.html`을 열고, 빨간색으로 스타일이 적용된 `Hello webpack` 을 볼수 있습니다. webpack이 한 일을 보기위해, 페이지를 검사하여(원본 소스 페이지에는 결과가 나오지 않으니 보지 마세요) head 태그를 보시기 바랍니다. `index.js`에 포함된 스타일 블럭이 포함되어있을 것입니다.

T> 또한 프로덕션 모드에서 로링 시간을 단축하기 위해 [CSS 분할](/plugins/extract-text-webpack-plugin)을 할 수 있습니다. 또 여러분이 선호하는 CSS [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader), [less](/loaders/less-loader)를 위한 로더도 존재합니다

## 이미지 로딩

CSS를 가져오도록 수행하였지만, 배경이나 아이콘 같은 이미지는 어떻게 처리할 수 있을까요? [file-loader](/loaders/file-loader)를 이용해 쉽게 통합할 수 있습니다.

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

이제 `import MyImage from './my-image.png'`를 작성하면, 이미지가 처리되어 `output` 디렉토리에 추가되며, `MyImage` 변수는 처리 후 이미지의 최종 URL을 포함하고 있을 것입니다. 위에 보이는 것처럼 [css-loader](/loaders/css-loader)를 사용할때 CSS와 함께 `url('./my-image.png')`를 위한 유사한 처리과정이 일어날 것입니다. 로더는 로컬 파일이 있다는 것을 인지하고, `./my-image.png` 경로를 `output`디렉토리에 있는 이미지의 최종경로로 대체합니다. [html-loader](/loaders/html-loader)도 이같은 방식으로 `<img src="./my-image.png" />`를 처리합니다.

프로젝트에 이미지를 추가하고, 여러분이 좋아하는 이미지를 사용하여 어떻게 동작하는지 살펴 보도록 합시다.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
+ import Icon from './icon.png';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

+   // Add the image to our existing div.
+   var myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);

    return element;
  }

  document.body.appendChild(component());
```

__src/style.css__

``` diff
  .hello {
    color: red;
+   background: url('./icon.png');
  }
```

새로 빌드를 하고, index.html 파일을 다시 열어봅시다.

``` bash
npm run build

Hash: 854865050ea3c1c7f237
Version: webpack 2.6.1
Time: 895ms
                               Asset     Size  Chunks                    Chunk Names
5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
                           bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 242 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [6] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [7] (webpack)/buildin/global.js 509 bytes {0} [built]
   [8] (webpack)/buildin/module.js 517 bytes {0} [built]
   [9] ./src/index.js 503 bytes {0} [built]
```

잘 동작하였다면, `Hello webpack`텍스트 외에 `img`요소 뿐만이 아니라 배경이 반복되는 아이콘을 볼 수 있습니다. 이 요소를 검사하면, 실제 파일명이 `5c999da72346a995e7e2718865d019c8.png` 와 같이 변경된 것을 확인 할 수 있고, 이것은 webpack이 `src`폴더를 탐색하여 처리한다는 것을 알 수 있습니다.

T> 논리적으로 여기서 다음 스텝은 이미지를 최소화 하고 최적화 하는 과정입니다. 이미지 로딩 프로세스를 향상시키기 위해 [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 와 [url-loader](/loaders/url-loader) 를 확인해 보시기 바랍니다.

## 폰트 로딩

그럼 폰트와 같은 다른 에셋들은 어떻게 할끼요? 파일과 url 로더는 로드 한 모든 파일을 가져와 빌드 디렉토리로 출력합니다. 폰트처럼 모든 종류의 파일을 사용 할 수 있다는 것인데 폰트 파일을 처리 하기 위해 `webpack.config.js` 파일을 업데이트 해 봅시다.

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

프로젝트에 폰트 파일을 추가해 봅시다.

__project__


``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

로더가 설정되고, 폰트가 잘 위치하면, `@font-face` 선언을 통해 통합 할 수 있습니다. 로컬 `url (...)`문은 이미지처럼 webpack에 의해 선택 될 것입니다.

__src/style.css__

``` diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }

  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

새로 빌드를 실행하고, webpack 폰트를 처리했는지 살펴봅시다.

``` bash
npm run build

Hash: b4aef94169088c79ed1c
Version: webpack 2.6.1
Time: 775ms
                                Asset     Size  Chunks                    Chunk Names
 5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
11aebbbd407bcc3ab1e914ca0238d24d.woff   221 kB          [emitted]
                            bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 420 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./src/MyFont.woff 83 bytes {0} [built]
   [6] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [7] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [8] (webpack)/buildin/global.js 509 bytes {0} [built]
   [9] (webpack)/buildin/module.js 517 bytes {0} [built]
  [10] ./src/index.js 503 bytes {0} [built]
```

`index.html`을 다시 열고 `Hello webpack` 텍스트가 새로운 폰트로 잘 적용되었는지 확인해 봅시다. 잘 되었다면, 변경 된 것을 볼 수 있습니다.

## 데이타 로딩

JSON 파일, CSVs, TSVs, XML 또한 로드 될 수 있는 유용한 에셋들입니다. JSON 지원은 사실 내장되어 있는데, NodeJS 처럼 `import Data from './data.json'`가 기본적으로 동작합니다. CSVs, TSVs, and XML를 삽입하기 위해서 [csv-loader](https://github.com/theplatapi/csv-loader)와 [xml-loader](https://github.com/gisikw/xml-loader)를 사용 해야 합니다. 이 세개를 다 처리해 봅시다.

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

프로젝트에 데이터 파일들을 추가합니다.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/data.xml__

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

이제 이 4가지의 종류 데이터(JSON, CSV, TSV, XML)를 모두 `import` 할 수 있으며, 삽입한 `Data` 변수는 사용하기 쉽도록 파싱된 JSON을 포함하고 있습니다.

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
  import Icon from './icon.png';
+ import Data from './data.xml';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

+   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```

`index.html`을 열어 개발자 도구에서 콘솔을 보면, 삽입된 데이터의 콘솔 로그가 찍힌 것을 확인 할 수 있습니다!

T> 이것은 [d3](https://github.com/d3)같은 도구를 이용하여 데이터 시각화를 구현하는데 특히 유용합니다. ajax 요청을 만들고 런타임시 데이터를 파싱하는것 대신에 빌드 처리 동안 모듈에 데이터를 로드하여 모듈이 브라우저에 도달하자 마자 파싱 된 데이터를 즉시 처리 할 수 있습니다.

## 전역 에셋

위에 언급한 모든 것 중 가장 멋진 부분은 이러한 방법으로 에셋을 로딩하는 것은 모듈과 에셋들을 직관적인 방법으로 그룹화 할 수 있다는 점입니다. 모든 것이 담겨있는 전역 `/assets` 디렉토리에 의존하는 것 대신, 에셋을 사용하는 코드를 가지고 그룹화를 할 수 있습니다. 예를 들면 아래와 같은 구조처럼 매우 유용합니다,

``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

이러한 설정은 밀접하게 관련있는 것들이 함께 존재하기 때문에 이식성을 높게 만 들 수 있는데 다른 프로젝트에 `/my-component`를 사용하고 싶다면 `/components`디렉토리에 있는 것들을 복사하고 옮길 수 있습니다. _외부 종속_이 되는 것들을 설치하고 _같은 로더로 설정_하도록 정의된다면, 잘 동작해야 합니다.
그러나, 오래된 방식으로 되어있거나, 다양한 컴포넌트들(views, templates, modules, etc.)간에 공유되고 있는 에셋들이 존재하는 경우를 생각해 봅시다. 이 같은 경우는 에셋들을 기본 디렉토리에 저장하고 [aliasing](/configuration/resolve#resolve-alias)을 이용해 쉽게 `import` 할 수 있습니다.

## 마무리

다음 가이드에서는 이번 장에서 사용한 에셋들을 모두 사용하지 않을 것이므로, 정리하고 [결과물 관리](https://webpack.js.org/guides/output-management/)가이드를 준비해 보도록합시다.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
-   |- data.xml
-   |- my-font.woff
-   |- my-font.woff2
-   |- icon.png
-   |- style.css
    |- index.js
  |- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   module: {
-     rules: [
-       {
-         test: /\.css$/,
-         use: [
-           'style-loader',
-           'css-loader'
-         ]
-       },
-       {
-         test: /\.(png|svg|jpg|gif)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(woff|woff2|eot|ttf|otf)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(csv|tsv)$/,
-         use: [
-           'csv-loader'
-         ]
-       },
-       {
-         test: /\.xml$/,
-         use: [
-           'xml-loader'
-         ]
-       }
-     ]
-   }
  };
```

__src/index.js__

``` diff
  import _ from 'lodash';
- import './style.css';
- import Icon from './icon.png';
- import Data from './data.xml';
-
  function component() {
    var element = document.createElement('div');
-
-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.classList.add('hello');
-
-   // Add the image to our existing div.
-   var myIcon = new Image();
-   myIcon.src = Icon;
-
-   element.appendChild(myIcon);
-
-   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```


## 다음 가이드

[결과물 관리](https://webpack.js.org/guides/output-management/)로 넘어가 봅시다.


## 좀 더 읽을 거리들

- SurviceJS에 [폰트 로딩](https://survivejs.com/webpack/loading/fonts/)하기

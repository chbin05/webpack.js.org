---
title: 핵심 컨셉
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
---

*webpack* 은 모던 자바스크립트 어플리케이션을 위한 _모듈 번들러_ 입니다. webpack이 어플리케이션을 처리 할때, 어플리케이션이 필요로 하는 모든 모듈을 포함한 _의존성 그래프_ 를 만들고 나서, 모든 모듈을 브라우저에서 로드 되는 적은 수(보통 하나)의 _번들_ 로 패키징합니다.

[놀라운 구성](/configuration) 페이지에서도 가능하지만, 본격적으로 시작하려면 **네 가지 핵심 개념** : entry, output, loaders 및 plugins 을 이해 해야 합니다.

이 문서는 앞서 이야기한 개념에 대한 **high-level** 수준의 개요를 제공하고, 특정 유스 케이스에 대한 개념은 링크로 제공하고 있습니다.

## Entry

webpack은 어플리케이션의 모든 의존성 그래프를 만드는데 이 그래프의 시작점은 _entry point_ 입니다. _entry point_ 는 webpack이 _어디서 시작할지_ 알려주고  _무엇을 묶을지_ 알기 위해 의존성 그래프를 따릅니다. 여러분은 _entry point_ 를 **문맥의 근원** 또는 **앱을 시작하는 첫번째 파일** 이라고도 생각할 수 있어요.

webpack에서 _entry points_ 를 [webpack 구성 오브젝트](/configuration)의 `entry` 프로퍼티를 사용하여 정의하고 있습니다.

간단한 예제는 아래와 같습니다:

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

어플리케이션의 요구에 따라 `entry` 프로퍼티를 선언할 수 있는 다양한 방법들이 존재합니다.

[더 알아보기](/concepts/entry-points)


## Output

일단 asset을 모두 묶었다면, **어느위치** 에서 번들링 할 것인지 이야기 해줘야 합니다. webpack의 `output` 프로퍼티는 **번들링된 코드를 어떻게 다룰지** 말해주는 부분입니다.

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

<!-- In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to. -->
위에 예제에서 사용한 `output.filename`은 번들 이름을, `output.path`는 어느 위치에 번들러를 만들지 말해 주는 부분입니다.

`output` 프로퍼티는 [다양한 구성 방법](/configuration/output) 이 존재하지만, 일반적인 유스 케이스만 이해하고 넘어가도록 하겠습니다.

[더 알아보기!](/concepts/output)


## Loaders

모든 asset 들을 가지는 것은 **webpack** 의 목표이지, 브라우저의 일이 아닙니다.(하지만, 명확하게 이야기 해서, 모든 asset 들이 함께 번들링 되어야 한다는 것은 의미하진 않습니다.) webpack은 [모든 파일 (.css, .html, .scss, .jpg, etc.) 을 모듈로 인식](/concepts/modules) 하지만, **오직 자바스크립트만 이해** 할수 있습니다.

**webpack 의 Loader 들은 이러한 파일들을 의존성 그래프에 추가하기 위해 모듈로 변환합니다.**

높은 수준에서, **loaders** 는 webpack config 에서 두가지 목적을 가지고 있는데, 다음과 같이 작동합니다.

1. 어떤 파일들을 특정 로더를 이용해 변환해야 하는지 명시하고 (`test` 프로퍼티를 사용하죠)
2. 이 파일들을 변환해 의존성 그래프(그리고 번들에)에 추가합니다.(`use` 프로퍼티를 사용하죠)

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

위의 구성은 `test` 와 `use` 프로퍼티를 가진 싱글 모듈에 대해 `rules` 프로퍼티를 정의하고 있습니다. 이는 webpack 컴파일러에게 다음과 같이 알려줍니다.

> "야 webpack 컴파일러, `require()`/`import` 선언 안에서 '.txt'파일을 발견하면, 번들에 추가하기 전에 `raw-loader`를 **사용** 해서 변환해줘!"

W> **webpack config 에 rules 를 정의 할 때, `rules`가 아니라 `module.rules` 아래에 정의** 해야 하는 것을 명심해야 합니다. 만약 잘 못 된다면, webpack이 여러분에 소리칠 거에요!

여기서 다루지 않았던 Loader들를 정의하는 특정 프로퍼티들 또한 존재합니다.

[더 알아보기](/concepts/loaders)


## Plugins


`Loader`는 파일 단위로 변환을 하는 것이라면, `plugins` 은 일반적으로 번들링된 모듈의 "compilations" 나 "chunks" 또는 [(다른 많은 기능)](/concepts/plugins)을 수행하는데 사용됩니다. webpack 플러그인 시스템은 [매우 강력하고 커스터마이징](/api/plugins)이 가능합니다.

plugin을 사용하기 위해서, `require()` 가 필요하고, `plugins` 배열에 추가합니다. 대부분의 플로그인들은 옵션을 통해 커스터마이징이 가능합니다. config에서 플러그인을 여러 용도로 사용할 수 있기때문에 `new`를 사용하여 플러그인을 호출하여 인스턴스를 만들어야합니다

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

이 밖에도 웹팩에서 제공하는 다양한 플러그인이 존재하니, 더 많은 정보를 위해 [플러그인 리스트](/plugins) 를 확인해 보세요.

webpack config 에서 플러그인을 사용하는 것은 간단하지만, 좀 더 활용하기 위한 다양한 유스 케이스가 존재합니다.

[더 알아보기](/concepts/plugins)

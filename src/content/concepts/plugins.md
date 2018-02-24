---
title: 플러그인
sort: 5
contributors:
  - TheLarkInn
  - jhnns
  - rouzbeh84
  - johnstew
---

플러그인은 웹팩의 [뼈대](https://github.com/webpack/tapable)입니다. 웹팩 자체는 웹팩 구성에서 사용하는 **동일한 플러그인 시스템**을 기반으로 되어있습니다. 플러그인은 [로더](/concepts/loaders)가 할 수 없는 **여러가지 일**들을 수행합니다.

## 구조

웹팩은 ['apply'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 프로퍼티를 갖고있는 자바스크립트 객체입니다. 이 `apply` 프로퍼티는 웹팩 컴파일러에 의해 호출되며, **엔트리** 컴파일 수명주기에 접근할 수 있도록 합니다.

**ConsoleLogOnBuildWebpackPlugin.js**

```javascript
function ConsoleLogOnBuildWebpackPlugin() {

};

ConsoleLogOnBuildWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compiler, callback) {
    console.log("The webpack build process is starting!!!");

    callback();
  });
};
```

T> 영리한 JavaScript 개발자는`Function.prototype.apply` 메소드를 기억할 것입니다. 
이 방법을 통해 어떤 함수라도 플러그인에게 전달할 수 있기 때문입니다. (`this`는 `compiler`를 가리킵니다.) 
이런 스타일을 사용하여 당신의 웹팩 구성에서 사용자 정의 플러그인을 적용할 수 있습니다.

## 사용법

**플러그인**은 인자/옵션들을 받을 수 있기 때문에, 웹팩 설정의 `plugins` 속성에 `new` 인스턴스를 전달해야 합니다. 어떻게 웹팩을 사용하냐에 따라, 플러그인을 사용하는 방법 또한 다양하게 나뉠 수 있습니다.

### 설정

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm을 통해 설치된 플러그인
const webpack = require('webpack'); //빌트-인 플러그인에 접근하기 위해 필요합니다.
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```


### Node API

?> 노드 API를 사용하는 경우에도, 사용자는 `plugins` 프로퍼티를 통해 플러그인을 전달해야 합니다. `compiler.apply`를 사용하는 것은 권장 된 방법이 아닙니다.

**some-node-script.js**

```javascript
  const webpack = require('webpack'); //웹팩 런타임에 접근하기 위해
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // ...
  });
```

T> 알고 있었나요?: 위의 예는 [웹팩 런타임 자체](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292)와 매우 유사합니다. [웹팩 소스 코드](https://github.com/webpack/webpack)에는 당신 만의 설정과 스크립트에 적용할 수 있는 훌륭한  예제가 많이 숨어 있습니다.
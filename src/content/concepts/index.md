---
title: 핵심 개념
sort: 1
contributors:
  - TheLarkInn
  - jhnns
  - grgur
  - johnstew
  - jimrfenner
translators:
  - hangpark
---

*웹팩*은 모던 자바스크립트 어플리케이션을 위한 *모듈 번들러*입니다. 웹팩은 여러분의 어플리케이션을 실행할 때 어플리케이션이 필요로 하는 모든 모듈에 대한 *의존성 그래프*를 재귀적으로 생성한 뒤 이들 모듈을 브라우저에서 불러올 수 있도록 적은 개수(보통 한 개)의 *번들*로 패키징합니다.

웹팩은 [매우 자유롭게 설정 가능](/configuration)하지만, 첫 시작을 위해서 여러분은 다음 **네 가지 핵심 개념**만 이해하시면 됩니다: 엔트리, 아웃풋, 로더, 플러그인.

이 문서는 이들 개념에 대한 **전체적인** 개요를 알려드리는 것에 초점이 맞춰져있지만 특정 개념의 유즈케이스에 대한 자세한 설명역시 링크로 제공하고 있습니다.


## 엔트리

웹팩은 여러분의 어플리케이션에 대한 모든 의존성을 담은 그래프를 생성합니다. 이 그래프의 시작점을 *엔트리 포인트*라 합니다. *엔트리 포인트*는 웹팩에게 작업을 *어디서부터 시작해야 할지*를 알려주며 *무엇을 번들링할 것인지* 알기 위해 의존성 그래프를 따라갑니다. 여러분은 여러분의 어플리케이션의 *엔트리 포인트*를 **컨텍스트 루트**나 **어플리케이션 시작을 위한 첫번재 파일** 정도로 생각하셔도 됩니다.

웹팩에서 우리는 [웹팩 설정 객체](/configuration)의 `entry` 프로퍼티를 사용하여 *엔트리 포인트*를 정의합니다.

아래는 간단한 예제입니다:

**webpack.config.js**

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

이외에도 여러분의 어플리케이션에 맞게 `entry` 프로퍼티를 설정할 수 있는 다양한 방법이 있습니다.

[더 알아보기!](/concepts/entry-points)


## 아웃풋

여러분이 어셋들을 모두 번들링 하게 되었을 때 여러분은 여러분의 어플리케이션을 **어디에** 번들링할 것인지 웹팩에게 알려주어야 합니다. 웹팩의 `output` 프로퍼티는 웹팩에게 **번들링된 코드를 어떻게 처리해야 하는지** 알려줍니다.

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

위 예시에서 우리는 `output.filename`과 `output.path` 프로퍼티를 사용하여 번들의 이름과 이를 어디에 내보낼지를(emit) 웹팩에게 알려줍니다.

T> 이 문서와 [플러그인 API](/api/plugins) 전반에서 여러분은 **emit**이나 **emitted**란 표현을 보게 될 것입니다. 이는 'produced(생성된)'이나 'discharged(방출된)'의 세련된 표현입니다.

`output` 프로퍼티는 [설정가능한 기능들](/configuration/output)을 많이 갖고 있습니다. 그러나 우선 `output` 프로퍼티에 대한 가장 기본적인 용례를 이해하는데 시간을 조금 할애하겠습니다.

[더 알아보기!](/concepts/output)


## 로더

우리의 목표는 여러분의 프로젝트의 모든 어셋들이 브라우저가 아닌 **웹팩에서** 고려되게끔 하는 것입니다. (물론 분명하게 말하자면 이는 모든 어셋들이 무조건 하나로 번들링되어야 한다는 의미는 아닙니다.) 웹팩은 [모든 파일 (.css, .html, .scss, .jpg 등)을 모듈로써](/concepts/modules) 다룹니다. 그러나 웹팩 그 자체는 **자바스크립트만 이해합니다**.

**웹팩에서 로더는 _이들 파일을 모듈로 변환시키며_ 이들 파일은 여러분의 의존성 그래프에 추가됩니다.**

개괄적으로 바라보자면 **로더**는 웹팩 설정에서 두 가지 목적을 갖습니다. 로더는:

1. 어떤 파일(들)이 특정 로더에 의해 변환되어야 하는지 규정합니다. (`test` 프로퍼티)
2. 이 파일들을 변환시켜 이들이 여러분의 의존성 그래프에 (그리고 최종적으로 여러분의 번들에) 추가될 수 있도록 합니다. (`use` 프로퍼티)

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

위 설정은 하나의 모듈에 대한 `rules` 프로퍼티를 필수 프로퍼티인 `test`와 `use`로 정의하고 있습니다. 이는 웹팩 컴파일러에게 다음을 말하는 것과 같습니다:

> "안녕 웹팩 컴파일러야, 네가 `require()`나 `import` 구문 안에서 `.txt` 파일로 해석되는 경로를 마주친다면 이 파일을 번들에 추가하기 전에 `raw-loader`를 **사용**해서 변환해주렴."

W> **여러분의 웹팩 설정에 규칙들을 정의할 때 `rules`가 아닌 `modules.rules` 내에 이들을 정의해야 한다는 점**을 기억하는 것이 중요합니다. 여러분의 편의를 위해 만약 이것이 잘못 설정된 경우 웹팩은 '여러분을 혼낼 것'입니다.

아직 우리가 다루지 않았지만 로더에 정의할 수 있는 더욱 많은 세부 프로퍼티들이 많이 있습니다.

[더 알아보기!](/concepts/loaders)


## 플러그인

로더가 파일 단위의 변환만을 수행할 수 있는데에 비하여 `플러그인`은 여러분의 번들링된 모듈들의 "모음(compilation)"이나 "덩어리(chunk)"에 대한 액션이나 커스텀 기능을 수행하는 데 가장 흔히 사용됩니다. [(이에 더해 더 많은 것들을 할 수 있습니다!)](/concepts/plugins) 웹팩 플러그인 시스템은 **정말로 강력하며 자유롭게 커스터마이징할 수 있습니다**.

플러그인을 사용하기 위해서 여러분은 단지 `require()`를 통해 이를 불러와 `plugins` 배열에 추가하기만 하면 됩니다. 대부분의 플러그인은 옵션을 통해 커스터마이징할 수 있습니다. 동일한 플러그인을 설정에서 서로 다른 목적으로 여러번 사용할 수 있기 때문에 여러분은 `new`를 사용하여 플러그인의 인스턴스를 생성해주어야 합니다.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //npm에서 설치
const webpack = require('webpack'); //빌트인 플러그인을 사용하기 위함
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

웹팩이 제공하는 창조적인 플러그인들이 매우 많습니다! 우리의 [플러그인 리스트](/plugins)를 확인하시면 더 많은 정보를 얻을 수 있습니다.

웹팩 설정에서 플러그인을 사용하는 것은 간단합니다. 그러나 더욱 깊은 탐구의 가치가 있는 수많은 용례가 있습니다.

[더 알아보기!](/concepts/plugins)

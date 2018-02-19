---
title: 엔트리 포인트
sort: 2
contributors:
  - TheLarkInn
  - chrisVillanueva
translators:
  - hangpark
---

[Getting Started](/guides/getting-started/#using-a-configuration)에서 언급했듯이 여러분의 웹팩 설정에서 `entry` 프로퍼티를 정의할 수 있는 여러가지 방법이 있습니다. 우리는 여러분께 `entry` 프로퍼티를 설정**할 수 있는** 방법들을 보여드리고 이것이 어떻게 여러분에게 유용하게 쓰일 수 있는지 설명할 것입니다.


## 단일 엔트리 (축약형) 구문

용례: `entry: string|Array<string>`

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

`entry` 프로퍼티의 단일 엔트리 구문은 아래를 축약한 형태입니다:

```javascript
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> **`entry`에 배열을 전달하면 어떤 일이 발생하나요?** `entry` 프로퍼티에 파일 경로의 배열을 전달하면 **멀티 메인 엔트리**라 불리는 것이 생성됩니다. 이는 여러분이 여러 의존 파일들을 하나의 "덩어리(chunk)"로 모으고 이들의 의존성 그래프를 생성하고 싶을 때 유용합니다.

여러분이 하나의 엔트리 포인트를 갖는 어플리케이션이나 툴을 위한 웹팩 설정을 빠르게 하는 법을 찾고 있는 경우 (예: 라이브러리) 이 구문을 사용하는 것은 좋은 선택입니다. 그러나 이 구문은 여러분의 설정을 확장하거나 규모를 키우기 위해 필요한 유연성이 부족합니다.


## 객체 구문

용례: `entry: {[entryChunkName: string]: string|Array<string>}`

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

객체 구문은 조금 더 장황합니다. 그러나 이것은 여러분의 어플리케이션의 엔트리들을 정의하는 방법 중 가장 확장성 있는 방법입니다.

T> **"확장가능한 웹팩 설정"**은 재사용이 가능하며 다른 부분별 설정들과 잘 결합될 수 있는 설정입니다. 이것은 환경, 빌드 대상, 런타임에 의한 관심사의 분리에 사용되는 보편적인 기술입니다. 이들은 이후 [webpack-merge](https://github.com/survivejs/webpack-merge)와 같은 특수한 툴들을 이용하여 합쳐집니다.


## 시나리오

아래는 엔트리 설정들과 이들이 실제로 쓰이는 용례들의 리스트입니다:


### 앱과 벤더 엔티티를 분리하기

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

**이것은 무엇을 하는 건가요?** 액면 그대로 이것은 웹팩이 `app.js`와 `vendors.js` 각각으로부터 시작하여 의존성 그래프들을 생성하도록 합니다. 이 그래프들은 서로가 완벽히 분리되어있고 독립적입니다. (각 번들에는 웹팩 부트스트랩이 있을 것입니다.) 이것은 보통 (벤더를 제외하고) 단 하나의 엔트리 포인트를 지니는 단일 페이지 어플리케이션에서 자주 보이는 설정입니다.

**왜 사용하나요?** 이 설정은 여러분이 `CommonsChunkPlugin`을 사용하여 여러분의 앱 번들에 존재하는 모든 벤더 참조들을 `__webpack_require__()` 호출로 대체하고 이들을 벤더 번들로 추출할 수 있도록 해줍니다. 만약 여러분의 어플리케이션 번들에 벤더 코드가 없을 경우 여러분은 [장기 벤더 캐싱](/guides/caching)으로 불리는 웹팩의 일반적인 패턴을 얻을 수 있습니다.

?> 보다 향상된 벤더 분리 기능을 제공하는 DllPlugin을 본 시나리오 대신 사용하는 것을 고려해보세요.


### 멀티 페이지 어플리케이션

**webpack.config.js**

```javascript
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

**이것은 무엇을 하는 건가요?**  우리가 (위의 예시와 같이) 세 개의 분리된 의존성 그래프를 원한다고 웹팩에 말해주는 것입니다.

**왜 사용하나요?** 멀티 페이지 어플리케이션에서는 서버가 새로운 HTML 문서를 여러분께 가져다 줍니다. 페이지는 새로운 문서를 다시 로드하고 그 어셋 파일들을 재다운로드합니다. 그러나 이것은 우리에게 여러가지 일을 할 수 있는 특별한 기회를 줍니다:

- `CommonsChunkPlugin`을 사용하여 각 페이지에서 공통으로 사용되는 어플리케이션 코드들의 번들을 생성합니다. 엔트리 포인트들 간의 많은 코드와 모듈을 재사용하는 멀티 페이지 어플리케이션은 이 테크닉을 사용하면 엔트리 포인트가 늘어나는 정도에 비례하여 굉장히 많은 이득을 볼 수 있습니다.

T> 경험 법칙: 각 HTML 문서는 정확히 한 개의 엔트리 포인트를 사용합니다.
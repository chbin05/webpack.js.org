---
title: Entry Points
sort: 2
contributors:
  - TheLarkInn
  - chrisVillanueva
---

[시작하기](/guides/getting-started/#using-a-configuration)에서 언급한 것처럼, webpack을 구성할 때 `entry` 프로퍼티를 정의 할 수 있는 다양한 방법들이 존재합니다. 이제 `entry` 프로퍼티를 구성 **할 수** 있는 방법을 보여주고, 왜 이것이 유용한지 설명 해 보도록 하겠습니다.

## 단일 Entry (Shorthand) 구문

Usage: `entry: string|Array<string>`

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

`entry` 프로퍼티를 위한 단일 entry 구문은 다음과 같이 간단하게 작성할 수 있습니다.

```javascript
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> **배열을 `entry`에 전달하면 무슨 일이 일어날까요?** `entry` 프로퍼티에 파일 경로를 가진 배열을 전달하면 **"여러개의 주요 entry"** 를 만듭니다. 이는 여러개의 종속 파일을 함께 주입하고 이러한 종속성을 "청크" 단위로 그래프화 할때 유용합니다.

이 방법은 webpack을 구성 할 때 하나의 entry point가 있는(라이브러리 처럼) 응용 프로그램 또는 툴을 빠르게 설정하려는 경우에 가장 좋은 선택이나 이 구문을 가지고 구성을 확장할 수 있는 유연성은 가지고 있지 않습니다.


## Object 구문

Usage: `entry: {[entryChunkName: string]: string|Array<string>}`

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
이 오브젝트 구문은 장황해 보이지만, 어플리케이션에서 entry 부분을 확장해서 정의 할 수 있는 방법입니다.

<!--T **"Scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).-->
T> **webpack 구성을 확장 할 수 있다는 것** 은 재사용 할 수 있고 다른 부분과 결합해서 쓸수 있는데 이는 환경, 빌드 타겟 및 런타임에 대한 관심사를 분리하는 보편적인 기술입니다. [webpack-merge](https://github.com/survivejs/webpack-merge) 같은 툴을 이용해서 병합됩니다.


## 시나리오

아래는 entry 구성과 실제로 사용하는 유스케이스들입니다:


### App과 Vendor Entries 분리하기

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

<!-- **What does this do?** At face value this tells webpack to create dependency graphs starting at both `app.js` and `vendors.js`. These graphs are completely separate and independent of each other (there will be a webpack bootstrap in each bundle). This is commonly seen with single page applications which have only one entry point (excluding vendors). -->
**위 작업 어떤 것을 하는 것일까요?** `app.js` 와 `vendors.js` 를 시작으로 종속성 그래프를 만들라고 하는 부분인데 이 그래프는 완전히 분리되고 서로 비의존적인입니다.(각각 번들에는 webpack 부트스트랩이 있어요.) 이것은 vendors 를 제외하고 하나의 entry 포인트를 가진 single page applications에서 흔히 벌 수 있습니다.

<!-- **Why?** This setup allows you to leverage `CommonsChunkPlugin` and extract any vendor references from your app bundle into your vendor bundle, replacing them with `__webpack_require__()` calls. If there is no vendor code in your application bundle, then you can achieve a common pattern in webpack known as [long-term vendor-caching](/guides/caching). -->
**왜 이 작업을 하는 것일까요??** 이 작업은 `CommonsChunkPlugin`를 사용해서 app 번들에서 vendor를 참조하고 있는 것들을 vendor 번들로 추출하고, `__webpack_require__()` 호출로 대체합니다. 어플리케이션 번들에 vendor 코드가 없다면, [장시간 vendor 캐싱](/guides/caching) 으로 알려진 webpack의 일반적인 패턴을 달성 할 수 있습니다.

<!-- ? Consider removing this scenario in favor of the DllPlugin, which provides a better vendor-splitting. -->
?> 더 나은 vendor-splitting를 제공하는 DllPlugin 플러그인의 잠정을 이용해 이 시나리오를 제거해 보는 것을 고려해 보세요.

### Multi Page Application

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

<!-- **What does this do?** We are telling webpack that we would like 3 separate dependency graphs (like the above example). -->
**위 작업은 무엇을 하는 것일까요?** 위에 예제처럼 3개의 분리된 종속성 그래프를 만들라고 알려주는 부분입니다.

<!-- **Why?** In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do multiple things: -->
**왜 이 작업을 하는 것일까요?** multi-page application에서 서버가 새 HTML 문서를 가져오려하고, 이 페이지는 새로운 문서와 assets을 재 다운로드 합니다. 하지만 이러한 부분은 다양한 것들을 할 수 있는 기회를 얻을 수 있습니다.


<!-- - Use `CommonsChunkPlugin` to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increase. -->
- `CommonsChunkPlugin`을 사용해서 각 페이지 간에 어플리케이션 코드를 공유할 수 있는 번들을 만들어 보세요. entry points간에 많은 코드와 모듈을 재 사용할 수 있는 Multi-page applications은 entry points가 증가함에 따라 이러한 테크닉으로부터 큰 장점을 얻을 수 있습니다.

<!-- T As a rule of thumb: for each HTML document use exactly one entry point. -->
T> 경험으로 보아, 각각의 HTML 문서에는 정확하게 하나의 entry point를 사용합니다.

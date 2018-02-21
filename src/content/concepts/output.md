---
title: 아웃풋
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
---

`output` 설정 옵션을 구성하는 것은 webpack에게 컴파일된 파일을 디스크에 쓰는 방법을 알려주는 것을 의미합니다. 또, 엔트리 포인트는 여러개 존재할 수 있지만, `output` 설정은 오직 하나만 지정됩니다.


## 사용법

webpack 구성에서 `output` 프로퍼티의 최소 요구사항은 다음 두가지를 포함해서 오브젝트의 값을 세팅하는 것입니다:

- output 파일(들)에 사용할 `filename`
- output 디렉터리의 절대 `경로`

**webpack.config.js**

```javascript
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

이 구성은 `/home/proj/public/assets` 디렉터리에 하나의 `bundle.js` 파일로 출력합니다.

## 다중 엔트리 포인트

만약 하나이상의 "chunk"(CommonsChunkPlugin같은 플러그인을 사용할때나, 여러개의 entry point를 구성한 것처럼) 를 만들고 싶다면, 각 파일이 고유한 이름을 가질 수 있도록 [substitutions](/configuration/output#output-filename)을 사용해야 합니다.

```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

// 디스크에 쓰기: ./dist/app.js, ./dist/search.js
```


## 더 나아가기

여기 assets들의 CDN과 hash를 사용한 좀 더 복잡한 예제가 있습니다:

**config.js**

```javascript
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

output 파일에서 `publicPath`의 컴파일 시간이 알려지지 않았을 경우, 공백으로 남겨두며 엔트리 포인트 파일에서 런타임 시 컴파일 시간을 동적으로 설정하게 됩니다. 컴파일하는 동안 `publicPath`를 모르는 경우, 이를 생략하고 엔트리 포인트에 __webpack_public_path__를 설정할 수 있습니다.

```javascript
__webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```

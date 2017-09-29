---
title: Output
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
---

<!-- Configuring the `output` configuration options tell webpack how to write the compiled files to disk. Note that, while there can be multiple `entry` points, only one `output` configuration is specified. -->
`output`설정 옵션을 구성하는 것은 webpack에게 컴파일된 파일을 디스크에 쓰는 방법을 알려줍니다. 또, `entry` point는 여러개 존재할 수 있지만, 하나의 `output` 설정만이 지정됩니다.


## 사용법

<!-- The minimum requirements for the `output` property in your webpack config is to set its value to an object including the following two things: -->
webpack 구성에서 `output` 프로퍼티의 최소 요구사항은 다음 두가지를 포함해서 오브젝트의 값을 세팅하는 것입니다:

<!-- - A `filename` to use for the output file(s).
- An absolute `path` to your preferred output directory. -->
- output 파일에 사용할 `filename`
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

<!-- This configuration would output a single `bundle.js` file into the `/home/proj/public/assets` directory. -->
이 구성은 `/home/proj/public/assets` 디렉터리에 하나의 `bundle.js` 파일로 출력합니다.

## 다중 Entry Points

<!-- If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use [substitutions](/configuration/output#output-filename) to ensure that each file has a unique name. -->
만약 (CommonsChunkPlugin같은 플러그인을 사용할때나, 여러개의 entry point를 구성한 것처럼) 하나이상의 "chunk"를 만들고 싶다면, 각 파일이 고유한 이름을 가지도록 [substitutions](/configuration/output#output-filename)을 사용해야 합니다.

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

// writes to disk: ./dist/app.js, ./dist/search.js
```


## 더 나아가기

<!-- Here's a more complicated example of using a CDN and hashes for assets: -->
여기 assets들의 CDN과 hash를 사용한 좀 더 복잡한 예제가 있습니다:

**config.js**

```javascript
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

<!-- In cases when the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime in the entry point file. If you don't know the `publicPath` while compiling, you can omit it and set `__webpack_public_path__` on your entry point. -->
output 파일에서 `publicPath`의 컴파일 시간이 알려지지 않았을 경우, 공백으로 남겨두고, entry point파일에서 런타임시 동적으로 설정 할 수 있고, 컴파일하는 동안 publicPath를 모르는 경우, 이를 생략하고 entry point에 `__webpack_public_path__`를 설정할 수 있습니다.


```javascript
__webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```

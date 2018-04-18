---
title: 타입스크립트
sort: 14
contributors:
  - morsdyce
  - kkamali
  - mtrivera
---

T> 이 가이드는 [*시작하기*](/guides/getting-started/)에서 비롯됩니다.

[타입스크립트](https://www.typescriptlang.org)는 일반 자바스크립트로 컴파일 하는 자바스크립트의 상위 집합입니다. 이 가이드에서는 webpack으로 타입스크립트를 통합하는 방법에 대해 알아보겠습니다.


## 기본 설정

먼저 다음 명령어를 실행하여 타입스크립트 컴파일러와 로더를 설치합니다:

``` bash
npm install --save-dev typescript ts-loader
```

이제 디렉토리 구조와 설정 파일들을 수정합니다:

__project__

``` diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

__tsconfig.json__

JSX를 지원하고 타입스크립트를 ES5로 컴파일하기 위한 간단한 설정을 해보겠습니다.

``` json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

`tsconfig.json` 구성 옵션에 대한 자세한 내용은 [타입스크립트 설명서](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)를 참조하십시오.

webpack 구성에 대한 자세한 내용은 [설정](/concepts/configuration/)을 참조하십시오.

이제 타입스크립트를 처리하도록 webpack을 구성 해 보겠습니다:

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will direct webpack to _enter_ through `./index.ts`, _load_ all `.ts` and `.tsx` files through the `ts-loader`, and _output_ a `bundle.js` file in our current directory.


## Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

We use `ts-loader` in this guide as it makes enabling additional webpack features, such as importing other web assets, a bit easier.


## Source Maps

To learn more about source maps, see the [development guide](/guides/development).

To enable source maps, we must configure TypeScript to output inline source maps to our compiled JavaScript files. The following line must be added to our TypeScript configuration:

__tsconfig.json__

``` diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```

Now we need to tell webpack to extract these source maps and into our final bundle:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

See the [devtool documentation](/configuration/devtool/) for more information.


## Using Third Party Libraries

When installing third party libraries from npm, it is important to remember to install the typing definition for that library. These definitions can be found at [TypeSearch](http://microsoft.github.io/TypeSearch/).

For example if we want to install lodash we can run the following command to get the typings for it:

``` bash
npm install --save-dev @types/lodash
```

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/).


## Importing Other Assets

To use non-code assets with TypeScript, we need to defer the type for these imports. This requires a `custom.d.ts` file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for `.svg` files:

__custom.d.ts__

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for SVGs by specifying any import that ends in `.svg` and defining the module's `content` as `any`. We could be more explicit about it being a url by defining the type as string. The same concept applies to other assets including CSS, SCSS, JSON and more.


## Build Performance

W> This may degrade build performance.

See the [Build Performance](/guides/build-performance/) guide on build tooling.

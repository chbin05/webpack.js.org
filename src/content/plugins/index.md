---
title: 플러그인
contributors:
  - simon04
  - gonzoyumo
  - rouzbeh84
  - aretecode
  - eko3alpha
---

webpack에는 리치 플러그인 인터페이스가 있습니다. webpack 자체의 대부분의 기능은 이 플러그인 인터페이스를 사용합니다. 이것은 **webpack**을 융통성있게 만듭니다.


Name                                                     | Description
-------------------------------------------------------- | -----------
[`AggressiveSplittingPlugin`](/plugins/aggressive-splitting-plugin) | 생성된 청크파일들을 더 작은 청크파일들로 나눕니다.
[`BabelMinifyWebpackPlugin`](/plugins/babel-minify-webpack-plugin) | [babel-minify](https://github.com/babel/minify)를 통한 축소
[`BannerPlugin`](/plugins/banner-plugin)                 | 생성된 청크파일들의 최상위에 배너를 추가합니다.
[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)    | 청크 파일들 사이에서 공유되는 공통 모듈들을 추출합니다.
[`ComponentWebpackPlugin`](/plugins/component-webpack-plugin) | Use components with webpack / __UNMAINTAINED__
[`CompressionWebpackPlugin`](/plugins/compression-webpack-plugin) | Content-Encoding에 맞게 압축 된 버전의 에셋을 위한 설정을 합니다.
[`ContextReplacementPlugin`](/plugins/context-replacement-plugin) | 유추된 `require`의 컨텍스트를 오버라이딩합니다.
[`DefinePlugin`](/plugins/define-plugin)           | 컴파일이 되는 과정에서 전역 상수가 설정되는 것을 허용합니다.
[`DllPlugin`](/plugins/dll-plugin)                 | 빌드 시간을 대폭 향상시키기 위해 번들 파일들을 분할합니다.
[`EnvironmentPlugin`](/plugins/environment-plugin) | `process.env`에서 [`DefinePlugin`](./define-plugin)을 사용하는 것에 대한 축약형입니다.
[`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) | 번들 내에 있는 (CSS) 텍스트를 별도의 파일로 추출합니다.
[`HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin) | Hot Module Replacement (HMR)을 사용 가능하도록 설정합니다.
[`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)          | 번들 파일이 적용된 HTML 파일을 쉽게 생성하도록 설정합니다.
[`I18nWebpackPlugin`](/plugins/i18n-webpack-plugin)          | 번들 파일에 `i18n`이 지원될 수 있도록 설정합니다.
[`IgnorePlugin`](/plugins/ignore-plugin)                     | 번들 파일 내에 포함되지 않도록 제외되는 파일들을 설정합니다.
[`LimitChunkCountPlugin`](/plugins/limit-chunk-count-plugin) | Chunking을 잘 제어하기 위해 Chunking에 대한 최소/최대 제한을 설정합니다.(Chunking: 파일을 분할하는 과정)
[`LoaderOptionsPlugin`](/plugins/loader-options-plugin)      | 웹팩 1에서 웹팩 2로 마이그레이션 하기 위해 사용됩니다.
[`MinChunkSizePlugin`](/plugins/min-chunk-size-plugin)       | 청크 파일들을 정해진 제한 보다 높은 크기로 유지하기 위해 설정합니다.
[`NoEmitOnErrorsPlugin`](/plugins/no-emit-on-errors-plugin)  | 컴파일 오류가 발생하면 파일들을 내보내지 않도록 설정합니다. 
[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin) | 정규 표현식과 일치하는 리소스들을 대체합니다.
[`NpmInstallWebpackPlugin`](/plugins/npm-install-webpack-plugin) | 개발 모드 중 누락된 의존성 모듈을 자동으로 설치하도록 설정합니다.
[`ProvidePlugin`](/plugins/provide-plugin)                       | `import/require` 구문 사용 없이 모듈을 불러올 수 있도록 설정합니다. 
[`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin)  | 소스 맵을 더 세밀하게 다룰 수 있습니다.
[`UglifyjsWebpackPlugin`](/plugins/uglifyjs-webpack-plugin)      | `UglifyJS`를 프로젝트에 맞게 다룰 수 있습니다.
[`ZopfliWebpackPlugin`](/plugins/zopfli-webpack-plugin)          | node-zopfli이 적용된 압축 된 버전의 에셋을 사용하기 위해 설정합니다.

더 많은 서드 파티 플러그인은 [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins)에서 확인하실 수 있습니다.

![Awesome](../assets/awesome-badge.svg)

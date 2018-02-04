---
title: 플러그인
contributors:
  - simon04
  - gonzoyumo
  - rouzbeh84
  - aretecode
  - eko3alpha
---

<!-- webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack 
**flexible**. -->
webpack에는 리치 플러그인 인터페이스가 있습니다. webpack 자체의 대부분의 기능은 이 플러그인 인터페이스를 사용합니다. 이것은 **webpack**을 융통성있게 만듭니다.


Name                                                     | Description
-------------------------------------------------------- | -----------
[`AggressiveSplittingPlugin`](/plugins/aggressive-splitting-plugin) | 생성된 청크파일들을 더 작은 청크파일들로 나눕니다.
[`BabelMinifyWebpackPlugin`](/plugins/babel-minify-webpack-plugin) | [babel-minify](https://github.com/babel/minify)를 통한 축소
[`BannerPlugin`](/plugins/banner-plugin)                 | 생성된 청크파일들의 최상위에 배너를 추가합니다.
[`CommonsChunkPlugin`](/plugins/commons-chunk-plugin)    | 청크 파일들 사이에서 공유되는 공통 모듈들을 추출합니다.
[`ComponentWebpackPlugin`](/plugins/component-webpack-plugin) | Use components with webpack / __관리되지 않음__
[`CompressionWebpackPlugin`](/plugins/compression-webpack-plugin) | Prepare compressed versions of assets to serve them with Content-Encoding
[`ContextReplacementPlugin`](/plugins/context-replacement-plugin) | Override the inferred context of a `require` expression
[`DefinePlugin`](/plugins/define-plugin)           | Allow global constants configured at compile time
[`DllPlugin`](/plugins/dll-plugin)                 | Split bundles in order to drastically improve build time
[`EnvironmentPlugin`](/plugins/environment-plugin) | Shorthand for using the [`DefinePlugin`](./define-plugin) on `process.env` keys
[`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) | Extract text (CSS) from your bundles into a separate file
[`HotModuleReplacementPlugin`](/plugins/hot-module-replacement-plugin) | Enable Hot Module Replacement (HMR)
[`HtmlWebpackPlugin`](/plugins/html-webpack-plugin)          | Easily create HTML files to serve your bundles
[`I18nWebpackPlugin`](/plugins/i18n-webpack-plugin)          | Add i18n support to your bundles
[`IgnorePlugin`](/plugins/ignore-plugin)                     | Exclude certain modules from bundles
[`LimitChunkCountPlugin`](/plugins/limit-chunk-count-plugin) | Set min/max limits for chunking to better control chunking
[`LoaderOptionsPlugin`](/plugins/loader-options-plugin)      | Used for migrating from webpack 1 to 2
[`MinChunkSizePlugin`](/plugins/min-chunk-size-plugin)       | Keep chunk size above the specified limit
[`NoEmitOnErrorsPlugin`](/plugins/no-emit-on-errors-plugin)  | Skip the emitting phase when there are compilation errors
[`NormalModuleReplacementPlugin`](/plugins/normal-module-replacement-plugin) | Replace resource(s) that matches a regexp
[`NpmInstallWebpackPlugin`](/plugins/npm-install-webpack-plugin) | Auto-install missing dependencies during development
[`ProvidePlugin`](/plugins/provide-plugin)                       | Use modules without having to use import/require
[`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin)  | Enables a more fine grained control of source maps
[`UglifyjsWebpackPlugin`](/plugins/uglifyjs-webpack-plugin)      | Enables control of the version of UglifyJS in your project
[`ZopfliWebpackPlugin`](/plugins/zopfli-webpack-plugin)          | Prepare compressed versions of assets with node-zopfli

For more third-party plugins, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins).

![Awesome](../assets/awesome-badge.svg)

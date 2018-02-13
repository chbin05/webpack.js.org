---
title: ZopfliWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/zopfli-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/zopfli-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/zopfli-webpack-plugin
---

Node-Zopfli 플러그인

## Install

```bash
npm i -D zopfli-webpack-plugin
```

## Usage

``` javascript
var ZopfliPlugin = require("zopfli-webpack-plugin");
module.exports = {
	plugins: [
		new ZopfliPlugin({
			asset: "[path].gz[query]",
			algorithm: "zopfli",
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
}
```

## Arguments

* `asset`: 타겟의 에셋 이름입니다. `[file]`은 원본 에셋으로 대체됩니다. `[path]`는 `[query]`와 함께 원본 에셋의 경로로 대체됩니다. 기본 값은 `"[path].gz[query]"`입니다.
* `filename`: (`asset` 옵션을 처리 한 후) 에셋 이름을 받고 새로운 에셋 이름을 반환하는 `function(asset)`입니다. 기본 값은 `false`입니다.
* `algorithm`: `function(buf, callback)` 또는 `String`이 됩니다. `String`의 경우 알고리즘은 `zopfli`에서 가져옵니다.
* `test`: 이 정규식과 일치하는 모든 에셋들을 처리합니다. 기본 값은 모든 에셋들을 대상으로 합니다.
* `threshold`: 이 크기보다 큰 에셋들만 처리합니다.(바이트 단위). 기본 값은 `0`입니다.
* `minRatio`: 이 비율보다 압축률이 좋은 에셋들만 처리합니다. 기본 값은 `0.8`입니다.
* `deleteOriginalAssets`: 원본 에셋들을 지울 것인지 결정합니다. 기본 값은 `false`입니다.
## Option Arguments

* verbose: Default: false,
* verbose_more: Default: false,
* numiterations: Default: 15,
* blocksplitting: Default: true,
* blocksplittinglast: Default: false,
* blocksplittingmax: Default: 15

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/zopfli-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/zopfli-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/zopfli-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/zopfli-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/zopfli-webpack-plugin.svg
[test-url]: https://travis-ci.org/webpack-contrib/zopfli-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/zopfli-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/zopfli-webpack-plugin

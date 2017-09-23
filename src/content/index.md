---
title: webpack
---

## 코드를 작성하세요

<div class="homepage__wrap">
<div class="homepage__left">
__app.js__

```js
import bar from './bar';

bar();
```
</div>
<div class="homepage__right">
__bar.js__

```js
export default function bar() {
  //
}
```
</div>
</div>


## 웹팩을 통해 하나의 파일(`bundle.js`)로 묶어주세요.

<div class="homepage__wrap">
<div class="homepage__left">
__webpack.config.js__

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```
</div>
<div class="homepage__right">
__page.html__

```html
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script src="bundle.js"></script>
  </body>
</html>
```

`bundle.js`를 생성하기 위해 `webpack`을 커맨드 라인에서 실행하세요.
</div>
</div>

## 간단합니다.
웹팩을 [시작하기](/guides/getting-started)위해 __가이드__ 영역을 참조해주세요. 또는 Webpack 내의 핵심 개념에 대한 더 높은 수준의 정보를 찾고자 한다면 [개념](/concepts) 영역을 참조해주세요.

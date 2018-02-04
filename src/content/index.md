---
title: webpack
---

## 코드 작성하기

<div class="splash__wrap">
<div class="splash__left">
__app.js__

```js
import bar from './bar';

bar();
```
</div>
<div class="splash__right">
__bar.js__

```js
export default function bar() {
  //
}
```
</div>
</div>


## 웹팩과 함께 번들하기

<div class="splash__wrap">
<div class="splash__left">
__webpack.config.js__

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
};
```
</div>
<div class="splash__right">
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
</div>

<!-- Then run `webpack` on the command-line to create `bundle.js`. -->
`bundle.js`를 만들기 위해 `webpack` 명령어를 실행해주세요.

## 매우 간단합니다.

<!-- __[Get Started](/guides/getting-started)__ quickly in our __Guides__ section, or dig into the __[Concepts](/concepts)__ section for more high-level information on the core notions behind webpack. -->
__가이드__ 절에서 빠르게 __[시작](/guides/getting-started)__할 수 있습니다.

웹팩 안에 있는 코어 개념이나 혹은 더 자세한 정보를 얻고 싶으시다면 __[개념](/concepts)__ 절에서 확인해주세요.

</div>


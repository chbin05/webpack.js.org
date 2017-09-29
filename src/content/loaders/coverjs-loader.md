---
title: coverjs-loader
source: https://raw.githubusercontent.com/webpack-contrib/coverjs-loader/master/README.md
edit: https://github.com/webpack-contrib/coverjs-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/coverjs-loader
---
# 웹팩을 위한 coverjs 로더

## 사용법

``` javascript
webpack-dev-server "mocha!./cover-my-client-tests.js" --options webpackOptions.js
```

``` javascript
// webpackOptions.js
module.exports = {
	// your webpack options
	output: "bundle.js",
	publicPrefix: "/",
	debug: true,
	includeFilenames: true,
	watch: true,

	// the coverjs loader binding
	postLoaders: [{
		test: "", // every file
		exclude: [
			"node_modules.chai",
			"node_modules.coverjs-loader",
			"node_modules.webpack.buildin"
		],
		loader: "coverjs-loader"
	}]
}
```

``` javascript
// cover-my-client-tests.js
require("./my-client-tests");

after(function() {
	require("cover-loader").reportHtml();
});
```

<!-- See [the-big-test](https://github.com/webpack/the-big-test) for an example. -->
예제는 [the-big-test](https://github.com/webpack/the-big-test)를 참조하세요.

<!-- You don't have to combine it with the mocha loader, it's independent. So if you want to cover a normal app usage, you can do so. The `reportHtml` function just appends the output to the body. -->
mocha 로더와 같이 로드할 필요없이 독립적입니다. 따라서 일반적인 앱 사용법을 다루고 싶다면 그렇게 할 수 있습니다. `reportHtml` 함수는 단순히 출력을 본문에 추가합니다.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
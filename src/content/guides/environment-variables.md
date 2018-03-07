---
title: 환경 변수
sort: 16
contributors:
  - simon04
  - grisanu
related:
  - title: The Fine Art of the webpack 3 Config
    url: https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#d60a
---

`webpack.config.js`에서는 [개발 모드](/guides/development)와 [프로덕션 빌드](/guides/production) 사이의 차이를 잘 나타내기 위해 환경 변수를 사용할 수 있습니다.

웹팩 명령줄에서 [환경 옵션](/api/cli/#environment-options), `--env`을 통해 원하는 만큼 환경 변수를 전달할 수 있으며, `webpack.config.js`에서 접근 할 수 있습니다. 예: `--env.production` 또는 `--env.NODE_ENV = local`
(`NODE_ENV`는 일반적으로 환경 유형을 정의하는 데 사용됩니다. [여기](https://dzone.com/articles/what-you-should-know-about-node-env)를 참조하십시오.)

```bash
webpack --env.NODE_ENV=local --env.production --progress
```

T> `env` 변수를 할당하지 않은 상태로 설정하면, 기본적으로 `--env.production`을 `true`로 설정합니다. 자세한 내용은 [webpack CLI](/api/cli/#environment-options) 설명서를 참조해주세요. 여기에는 사용할 수 있는 이와 관련된 다른 구문들도 확인하실 수 있습니다.

일반적으로 웹팩 설정에서 `module.exports`는 설정 객체를 가리킵니다. `env` 변수를 사용하기 위해선, `module.exports`를 함수로 변환해야 합니다.:

__webpack.config.js__

``` js
module.exports = env => {
  // 여기에서 env.<당신이 전달한 환경 변수>를 사용하세요:
  console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
  console.log('Production: ', env.production) // true
  
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
```

---
title: 대상(target)
sort: 10
contributors:
  - TheLarkInn
  - rouzbeh84
  - johnstew
  - srilman
---

JavaScript는 서버와 브라우저 모두를 대상으로 코드를 작성할 수 있기 때문에, 웹팩은 당신만의 웹팩 [구성](/configuration)이 설정된 여러 배포 대상을 제공합니다.

W> 웹팩 `target` 속성은 `output.libraryTarget`속성과 혼동해서는 안됩니다. 더 자세한 정보는 [`output`](/concepts/output)을 참조하십시오.

## 사용법

`target` 속성을 설정하려면, 웹팩 설정에서 target 값을 설정하면 됩니다:

**webpack.config.js**

```javascript
module.exports = {
  target: 'node'
};
```

위의 예제에서, `node`를 사용하면 웹팩은 Node.js와 비슷한 환경에서 사용되기 위해 컴파일합니다. (청크를 로드하고 `fs` 또는 `path`와 같은 내장 모듈을 건드리지 않기 위해 Node.js의 `require`를 사용합니다.)

각 _target_에는 필요에 맞는 다양한 배포/환경을 위한 추가 기능이 있습니다. [사용할 수 있는 target](/configuration/target)을 확인하십시오.

?> 인기있는 target 값을 위한 추가 확장

## 여러 대상(target)

웹팩은 **target** 속성에 전달되는 여러 문자열을 **지원하진 않지만,** 별도의 두 웹팩 설정 값을 번들링하여 같은 모양의 라이브러리를 생성할 수 있습니다.

**webpack.config.js**

```javascript
var path = require('path');
var serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};

var clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
```

위 예제는 `dist` 폴더에 `lib.js`와 `lib.node.js` 파일을 생성합니다.

## 자료

위의 옵션에서 볼 수 있듯이, 선택할 수 있는 여러 배포 _target_이 있습니다. 다음은 참조 할 수 있는 예제 및 리소스 목록입니다.

* **[compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles)** : 다른 webpack _targets_을 테스트하고 볼 수 있는 훌륭한 리소스입니다. 또한 버그 리포팅에 좋습니다.
* **[Boilerplate of Electron-React Applicatio](https://github.com/chentsulin/electron-react-boilerplate)** : 일렉트론의 메인 프로세스와 렌더러 프로세스를 위한 빌드 프로세스의 좋은 예시입니다.

?> 라이브 코드 나 보일러 플레이트에서 사용되는 웹팩 target의 최신 예제 찾기.

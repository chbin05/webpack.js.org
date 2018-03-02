---
title: 설정
sort: 6
contributors:
- TheLarkInn
- simon04
---

**webpack의 구성 파일은 객체를 내보내는 JavaScript 파일이므로** 이 객체는 정의된 속성을 기반으로 웹팩에서 처리됩니다.

Node.js에서 CommonJS 모듈을 사용하기 떄문에 당신은 **다음 나오는 내용들을 수행 할 수 있습니다**:

* `require(...)`를 통해 다른 파일 가져오세요. 
* `require (...)`를 통해 npm에서 유틸리티를 사용하십시오. 
* JavaScript 제어 흐름 표현식을 사용하세요. 예: `?:` 연산자
* 자주 사용되는 값에 상수 또는 변수를 사용하세요. 
* 구성의 일부를 생성하는 함수 작성 및 실행하세요.

기술적으로 가능한 것들이지만, **다음과 같은 시도는 피해야 합니다.** :

* 웹팩 CLI를 사용할 때, CLI 인수에 접근 하기. (대신 자체 CLI를 작성하거나, [`--env` 사용하기](/configuration/configuration-types/))
* 비 결정적 값 내보내기(웹팩을 두 번 호출하면 동일한 출력 파일이 생성됩니다.)
* 긴 설정 내용 작성하기 (여러 파일 안에 설정 내용을 분할하여 담는 것 대신에)

T> 이 문서에서 가장 중요한 부분은 웹팩 설정의 서식과 스타일을 지정하는 여러 가지 방법이 있다는 것입니다. 중요한 것은 당신과 당신 팀이 이해하고 유지할 수 있는 일정한 방법을 고수하는 것입니다.

아래의 예제는 웹팩의 설정 정보를 담고있는 것이 여러분이 항상 사용하는 객체라는 것을 의미합니다. 왜냐하면 _이것 또한 코드이기 떄문입니다._ :

## 가장 심플한 웹팩 설정

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};
```

## 다수의 타겟

_See_: [여러 설정 객체 내보내기](/configuration/configuration-types/#exporting-multiple-configurations)

## 다른 언어 설정의 사용법

웹팩은 여러 프로그래밍 언어 및 데이터 언어로 작성된 설정 파일을 허용합니다.

_See_: [구성 언어](/configuration/configuration-languages/)

---
title: 모듈 분석
sort: 8
contributors:
    - pksjce
    - pastelsky
---

리졸버(resolver)는 모듈을 절대 경로로 찾는 데 도움이 되는 라이브러리입니다.
모듈은 다음과 같이 다른 모듈로부터의 의존성으로 요구될 수 있습니다:

```js
import foo from 'path/to/module'
// or
require('path/to/module')
```


종속성 모듈은 어플리케이션 코드 또는 타사 라이브러리를 통해 얻을 수 있습니다.
리졸버(resolver)는 웹팩이 `require`/`import`문을 통해 로드하는 모듈마다 번들 내에 포함되어야 하는 모듈인지 판단할 수 있도록 도와줍니다.
웹팩은 모듈을 번들하는 동안 파일 경로를 설정하기 위해 [enhanced-resolve](https://github.com/webpack/enhanced-resolve)를 사용합니다.

## 웹팩의 규칙 분석

`enhanced-resolve`를 사용하면, 웹팩은 세 가지 종류의 파일 경로를 분석할 수 있습니다:

### 절대 경로

```js
import "/home/me/file";

import "C:\\Users\\me\\file";
```

이미 파일에 대한 절대 경로가 있으므로 추가로 해결할 필요가 없습니다.

### 상대 경로

```js
import "../src/file1";
import "./file2";
```

이 경우, `import` 또는 `require`가 발생하는 리소스 파일의 디렉토리는 컨텍스트 디렉토리로 간주됩니다. `import/require`에 지정된 상대 경로는 이 컨텍스트 경로에 결합되어 모듈의 절대 경로를 생성합니다.

### 모듈 경로

```js
import "module";
import "module/lib/file";
```

모듈은 [resolve.modules`](/configuration/resolve/#resolve-modules)에 지정된 모든 디렉토리에서 검색됩니다.
[`resolve.alias`](/configuration/resolve/#resolve-alias) 구성 옵션을 사용하여 별칭을 만들어 원래 모듈 경로를 대체 경로로 바꿀 수 있습니다.

위의 규칙에 따라 경로가 확인되면, 경로가 파일 또는 디렉토리를 가리키는 지 확인합니다. 경로가 파일을 가리키는 경우:

* 경로에 파일 확장명이 있으면, 파일이 바로 묶입니다.
* 그렇지 않으면, 파일 확장자는 resolver에게 어떤 확장자(예 - `.js`,`.jsx`)가 있는 지를 알려주는 [`resolve.extensions`](/configuration/resolve/#resolve-extensions) 옵션을 사용하여 분석됩니다.

경로가 폴더를 가리키는 경우, 다음 단계를 수행하여 올바른 확장명을 가진 파일을 찾습니다.

* 폴더에 `package.json` 파일이 있으면 [resolve.mainFields`](/configuration/resolve/#resolve-mainfields) 설정 옵션에 지정된 필드가 순서대로 조회되고 `package.json`은 파일 경로를 결정합니다.
* `package.json`이 없거나 메인 필드가 유효한 경로를 반환하지 않으면, imported/required 디렉토리에 일치하는 파일 이름이 존재하는지 확인하기 위해 [resolve.mainFiles`](/configuration/resolve/#resolve-mainfiles) 구성 옵션에 지정된 파일 이름을 찾습니다.
* 파일 확장자는 `resolve.extensions` 옵션을 사용하여 비슷한 방법으로 분석됩니다.

웹팩은 빌드 대상에 따라 적절한 [기본 옵션들을](/configuration/resolve)을 제공합니다.

## 로더 분석

로더 분석은 파일 분석에 대해 지정된 규칙과 동일한 규칙을 따릅니다. 그러나 [`resolveLoader`](/configuration/resolve/#resolveloader) 구성 옵션은 로더에 대한 별도의 분석 규칙을 갖는 데 사용될 수 있습니다.

## 캐싱

동일한 파일에 대한 여러 개의 병렬 또는 직렬 요청이 더 빠르게 발생하기 떄문에, 모든 파일 시스템 접근이 캐싱됩니다. [watch 모드](/configuration/watch/#watch)에서는 수정된 파일만 캐시에서 제거됩니다. watch 모드가 꺼져 있으면, 컴파일 전에 항상 캐시가 제거됩니다.

위에서 언급한 구성 옵션에 대한 자세한 내용은 [Resolve API](/configuration/resolve)를 참조하십시오.
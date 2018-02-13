---
title: WatchIgnorePlugin
contributors:
  - skipjack
---

특정한 파일들을 무시합니다. 다시 말해, 제공된 경로 또는 정규 표현식에 일치하는 항목들은 [watch mode](/configuration/watch)일 때 감시 대상에서 제외됩니다.

``` javascript
new webpack.WatchIgnorePlugin(paths)
```


## Options

- `paths` (array): 감시 대상에서 제외되는 항목들을 가리키는 경로를 설정합니다. 이 경로는 절대 경로 또는 정규 표현식을 활용하여 설정할 수 있습니다.
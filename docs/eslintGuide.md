# ESLint руководство, советы

Следуем [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). 
В проекте настроен **precommit** и **prepush**, каждый раз при попытке сделать commit или push плагин **lint-staged** 
будет проверять дирректорию **src** и **tools** на соответствие style guide и при наличии ошибок в консоли 
покажет в каких файлах и какой тип у ошибок соответственно пока ошибки не будут исправлены сделать 
**commit** или **push** не выйдет.

## Мотивация

Необходимо стандартизировать стиль написания кода для того чтобы его было проще поддерживать, наращивать, а в будующем 
возможно анализировать. В style guide по мимо общих правил оформления оступов, ковычек и т.д. так же 
входят полезные практики написания кода.

## Полезные ссылки:

> Если возникают проблемы или вопросы касателньо предупреждений или ошибок eslint 99% ответов в разделах rules или issue
 
* [eslint rules](https://eslint.org/docs/rules/)
* [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
* [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
* [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)


## Рецепты 

> Если в ходе работы вы сталкиваетесь с не очень очевидными вещами связанными с ESLint то не поленитесь и добавьте этот случай в список

1. Глобальные переменные использованные в файле необходимо объявить на первой строчке файла 
через запятую в комментарии [подробнее](https://eslint.org/docs/3.0.0/rules/no-restricted-globals#disallow-specific-global-variables-no-restricted-globals):

```
 /* global ENDPOINT_CLIENT */
 
 function onClick() {
     console.log(ENDPOINT_CLIENT);
 }
 
 fdescribe("foo", onClick);
```

2. ESLint не любит метод react [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
[подробней при это сдесь](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md) 
по этому в файле где вы используете этот медод необходимо поставить следующий комментарий

```javascript 
/* eslint-disable react/no-danger */

```

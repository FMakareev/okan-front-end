# OKAN

## Getting started

1. yarn - установка пакетов
2. yarn start:ssr - запуск в режиме разработки 
3. Откройте браузер и перейдите по ссылке http://localhost:3007 для доступа к приложению
4. Откройте браузер и перейдите по ссылке chrome://inspect/#devices затем в списке Remote target откройте инспектор node.js
5. Для сборки на продакшн выполните yarn build:prod

## Документация

### Окружение
* [Общая структура проекта](./docs/environmentStructure.md.md)
* [NPM скрипты](docs/npmScripts.md)
* [Глобальны переменные](docs/globalVariables.md)
* [ESLint руководство, советы](docs/eslintGuide.md)
* [JsDoc](./docs/jsDoc.md)

### Проект

* [Структура проекта](docs/sourceStructure.md)
* [Структура модуля](./docs/module.md)
* [Стили](./docs/style.md)


* [FAQ](./docs/faq.md)

* [Todo](./docs/todo.md)





# Отлов ошибок

В проект подключен модуль [sentry](https://sentry.io) для логирования ошибок и формирования отетов в облаке. 

Этот модуль работает только в режиме `production` т.к. бесплатное кол-во запросов в месяц ограничено.

Для упрощения контроля запросов были созданы следующие методы:

* [captureException]('src\hocs\withSentry\withSentry.js') - логирует объект ошибки ([документация](https://docs.sentry.io/error-reporting/capturing/?platform=javascript#capturing-errors--exceptions))

Пример использования:

```js
try{
  // ваш код
} catch(error) {
  captureException(error)
}
```

* [captureMessage]('src\hocs\withSentry\withSentry.js') - просто для отправки сообщения ([документация](https://docs.sentry.io/error-reporting/capturing/?platform=javascript#capturing-messages))



## компоненты которые не используются

* CheckAuthorization


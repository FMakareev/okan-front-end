# Структура проекта


* docs - документация проекта
* node_modules - node.js модули
* public - транспилированный код проекта
* [src](docs/sourceStructure.md) - исходный код проекта   
* scripts - скрипты для запуска окружения
  * build.spa - сделать билд single page application
  * build.ssr - сделать билд isomorphic application
  * start.spa - запуск в режиме разработки single page application
  * start.ssr - запуск в режиме разработки isomorphic application
  * test - запуск тестов
* tools - вспомогательные утелиты для окружения
  * getVariablesesEnvironment - функция получает переменные из cli и засовывает в process.env
  * clear - функция удоления временных файлов
  * createIndex - метод создания файла Index.js в папке src/modules
  * initLocalizationFiles - создает файлы с локализацией для модулей
  * compilerPromise
  * logMessage

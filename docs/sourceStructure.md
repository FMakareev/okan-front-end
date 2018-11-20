# Структура проекта

* src
    * apollo - [Apollo client](https://www.apollographql.com/)
        * index.client.js - Browser config
        * index.server.js - Server config
        * package.json
        * ...
    * blocks - Список блоков
        * ...
        * index.js - блоки обязательно прописываются сюда и импортирутся отсуда
        * package.json
    * components - Набор компонентов
        * ...
        * index.js - компоненты обязательно прописываются сюда и импортирутся отсуда
        * package.json
    * client - Точка входа клиента
        * index.js 
        * package.json
    * modules - Модули 
        * ...
        * index.js
        * package.json
    * routes - [React router](https://reacttraining.com/) + [loadable-components](https://github.com/smooth-code/loadable-components)
        * errors - шаблоны страниц с ошибками
        * index.js - тут генерируется список маршрутов. 
            > **Важно!**: провайдер для маршрутизации указывается в точке входа отдельно для клиента и сервера
            сдесь просто создается список маршрутов
        * package.json
    * server - Точка входа для сервера
        * html - шаблон html разметки для любой страницы
        * index.js 
        * package.json
    * style - Стили и все что с ними связано
        * ...
        * index.js
        * package.json

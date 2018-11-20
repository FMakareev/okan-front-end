# Модули в проекте

Модули проекта лежат в дирректории `src/modules/`.

Структура модуля:

* {moduleName}
  * [view](#view)
        * {pageName}
            * index.js
  * [reducers](#reducers)
  * [index.js](#indexjs) 
  * [package.json](#packagejson)
  * [routes.js](#routesjs)
  * [translate.xml](#translatexml)
  
### view 

This directory stores the module page. 
Each page is in its directory. The entry point for a page is a file `index.js`.
The page code must be `export default`.

Example page:

```jsx

import React, {Component} from 'react';

class PageName extends Component {
  render() {
    return (<div>
    Hello world!
</div>)
  }
}

export default PageName;
```

### reducers

in developing


### index.js

Entry point to the module.

```js
import React from 'react';
import { routes } from './routes';

export default {
  routes,
};
```

### package.json

Required for each module file, without it the module will not be included in the assembly.

* name - the name of the module must match the directory name
* main - the file name being the entry point
* translate - array of translations available for the module, description of the object:
  * "ISO Code" - двухбуквенный код языка, [ISO_3166](http://kirste.userpage.fu-berlin.de/diverse/doc/ISO_3166.html)
  * language - full name of the language will be displayed in the user interface
  * active - do I include the language in the assembly
  * default - whether the selected language is the default language, 
  if the module does not have the required language, select the default language or the first
  
```json
{
  "name": "moduleName",
  "version": "0.0.1",
  "private": true,
  "main": "./index.js",
  "translate": [
    {
      "ISO Code": "en",
      "language": "English",
      "active": true,
      "default": false
    }
  ]
}
```

### routes.js

Список маршрутов модуля. обязательно должен быть хотябы один маршрут.

* exact - [react-router](https://reacttraining.com/react-router/web/api/Route/exact-bool)
* title - the title of the page will be presented in the title tag in the head, you can specify the key from the dictionary
* path -the path by which the page will be accessible
* load - the function of dynamically import your page, use dynamic imports for code splitting
* component - here is simply passed jsx your page, do not use this method for production

```js
export const routes = [
   {
      exact: true,
      title: 'Distributor',
      path: '/distributor',
      load: () => import('./view/distributor'),
    },
]
```

### translate.xml



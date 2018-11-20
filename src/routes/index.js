import React from 'react';
import { asyncComponent } from 'react-async-component';
import * as modules from '../modules/index';
import { LayoutBase } from '../components/LayoutBase/LayoutBase';
import { ErrorComponent } from './errors/ErrorComponent';

const has = Object.prototype.hasOwnProperty;

/**
 * @param {array} modulesRoutes - array routes
 * @param {array} newRoutes - empty array
 * @param {string} moduleName - name current module
 * @description - recursive generator of an array of application routing objects
 * */
const createRoutes = (modulesRoutes, newRoutes, moduleName) => {
  const routes = newRoutes;

  if (!modulesRoutes) return null;
  for (let i = 0; i < modulesRoutes.length; i += 1) {
    if (has.call(modulesRoutes[i], 'load')) {
      routes.push({
        exact: true,
        order: modulesRoutes[i].order,
        name: modulesRoutes[i].name || modulesRoutes[i].title,
        path:
          modulesRoutes[i].path ||
          console.error(
            `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
          ),
        component: asyncComponent({
          resolve: modulesRoutes[i].load,
          ErrorComponent: <ErrorComponent />,
        }),
        resolvers: modulesRoutes[i].resolvers || [],
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
      });
    } else if (has.call(modulesRoutes[i], 'component')) {
      routes.push({
        exact: true,
        order: modulesRoutes[i].order,
        name: modulesRoutes[i].name || modulesRoutes[i].title,
        path:
          modulesRoutes[i].path ||
          console.error(
            `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
          ),
        component: modulesRoutes[i].component,
        resolvers: modulesRoutes[i].resolvers || [],
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
      });
    } else {
      console.error(`Error: in the module ${moduleName} there is no component at 
            the address ${
              modulesRoutes[i].path
            }. Make sure that you added the "load: () => import('...')" 
            property with the component import or React component. `);
    }

    if (has.call(modulesRoutes[i], 'children')) {
      routes[newRoutes.length - 1].children = [
        ...createRoutes(modulesRoutes[i].children, [], moduleName),
      ];
    }
  }
  return routes;
};

let routes = [];

Object.entries(modules).map(([key, value]) => {
  if (has.call(value, 'routes')) {
    routes = [...routes, ...createRoutes(value.routes, [], key)];
    return null;
  }
  console.error(`ERROR:in the module "${key}" there is no property "routes".
        Add the property "routes" to the module "${key}" and determine at least
        one route otherwise the module will be inaccessible to users.`);
  return null;
});

routes.push({
  exact: true,
  path: '/500',
  hidden: true,
  name: 'Internal Server Error',
  component: asyncComponent({
    resolve: () => import('./errors/500'),
  }),
});

routes.push({
  exact: true,
  path: '/404',
  hidden: true,
  name: 'Page not found',
  component: asyncComponent({
    resolve: () => import('./errors/404'),
  }),
});

routes.push({
  exact: true,
  path: '*',
  hidden: true,
  name: 'Page not found',
  component: asyncComponent({
    resolve: () => import('./errors/404'),
  }),
});

export const ConfigRouter = [
  {
    component: LayoutBase,
    routes,
  },
];

export default ConfigRouter;

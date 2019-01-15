import React from 'react';
import { asyncComponent } from 'react-async-component';
import * as modules from '../modules/index';
import { connect } from 'react-redux';

/** View */
import ErrorCatch from '../components/ErrorCatch/ErrorCatch';
import CheckAuthorization from '../components/CheckAuthorization/CheckAuthorization';
import { LayoutAuth } from '../components/LayoutAuth/layoutAuth';
import { GetPageTitle } from '../components/GetPageTitle/GetPageTitle';
import LayoutBase from '../components/LayoutBase/LayoutBase';
import LayoutApp from '../components/LayoutApp/LayoutApp';

/** Global constants */
import { LAYOUT_ADMIN, LAYOUT_APP, LAYOUT_AUTH } from '../shared/layout';
import { ROLE_ADMIN, ROLE_USER } from '../shared/roles';

/** redux */
import { getUserFromStore } from '../store/reducers/user/selectors';
import { Store } from '../store';

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
    const somePropertyRoutes = {
      moduleName: moduleName,
      exact: modulesRoutes[i].exact,
      layout: modulesRoutes[i].layout,
      name: modulesRoutes[i].name || modulesRoutes[i].title,
      path: modulesRoutes[i].path,
      roles: [],
      resolvers: modulesRoutes[i].resolvers || [],
      hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
    };

    if (has.call(modulesRoutes[i], 'load')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }

      routes.push({
        ...modulesRoutes[i],
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
        component: GetPageTitle({ Store })(
          asyncComponent({
            resolve: modulesRoutes[i].load,
            LoadingComponent: () => <div>Loading...</div>,
            ErrorComponent: ({ error }) => <ErrorCatch>{error.message}</ErrorCatch>,
          }),
        ),
        exactResolvers:
          modulesRoutes[i].exactResolvers !== undefined ? modulesRoutes[i].exactResolvers : true,
      });
    } else if (has.call(modulesRoutes[i], 'component')) {
      if (!modulesRoutes[i].path) {
        console.error(
          `Error: in the module ${moduleName} in one of the routes there is no property "path".`,
        );
      }
      routes.push({
        ...modulesRoutes[i],
        hidden: has.call(modulesRoutes[i], 'hidden') && modulesRoutes[i].hidden,
        exactResolvers:
          modulesRoutes[i].exactResolvers !== undefined ? modulesRoutes[i].exactResolvers : true,
      });
    } else if (has.call(modulesRoutes[i], 'routes')) {
      routes.push({
        ...modulesRoutes[i],
        routes: [...createRoutes(modulesRoutes[i].routes, [], moduleName)],
      });
    } else {
      console.error(
        `Error: in the module ${moduleName} there is no component at
            the address ${
              modulesRoutes[i].path
            }. Make sure that you added the "load: () => import('...')"
            property with the component import or React component. `,
      );
    }
  }
  return routes;
};

let routes = [];

Object.entries(modules).map(([moduleName, value]) => {
  if (has.call(value, 'routes')) {
    routes = [...routes, ...createRoutes(value.routes, [], moduleName)];
    return null;
  }
  console.error(
    `ERROR:in the module "${moduleName}" there is no property "routes".
        Add the property "routes" to the module "${moduleName}" and determine at least
        one route otherwise the module will be inaccessible to users.`,
  );
  return null;
});

const Page404 = {
  path: '*',
  hidden: true,
  name: 'Page not found',
  component: asyncComponent({
    resolve: () => import('./errors/404'),
    LoadingComponent: () => <div>Loading...</div>,
    ErrorComponent: ({ error }) => <ErrorCatch>{error.message}</ErrorCatch>,
  }),
};

const layoutSorting = routes => {
  let newRoutes = [
    {
      layout: LAYOUT_AUTH,
      path: '/',
      component: LayoutAuth,
      routes: [],
    },
    {
      layout: LAYOUT_APP,
      path: '/app',
      component: LayoutApp,
      routes: [],
    },
  ];
  // routes.forEach(item => {
  //   switch (item.layout) {
  //     case LAYOUT_AUTH: {
  //       newRoutes[0].routes.push(item);
  //       break;
  //     }
  //     case LAYOUT_APP: {
  //       const connectCheckAuthorization = connect(state => {
  //         return { user: getUserFromStore(state) };
  //       })(CheckAuthorization(item.roles)(item.component));

  //       newRoutes[1].routes.push({
  //         ...item,
  //         path: `${newRoutes[1].path}${item.path}`,
  //         component: connectCheckAuthorization,
  //       });
  //       break;
  //     }
  //     default: {
  //       console.error(`Warning: для маршрута ${item.path} не задан layout либо задан неверно.`);
  //       break;
  //     }
  //   }
  // });

  routes.forEach(item => {
    switch (item.layout) {
      case LAYOUT_AUTH: {
        newRoutes[0].routes.push(item);
        return item;
      }
      case LAYOUT_APP: {
        newRoutes[1].routes.push({ ...item, path: `${newRoutes[1].path}${item.path}` });
        return item;
      }
      default: {
        console.error(`Warning: для маршрута ${item.path} не задан layout либо задан неверно.`);
        break;
      }
    }
  });

  newRoutes = newRoutes.map(item => {
    item.routes.push(Page404);
    return item;
  });
  return newRoutes;
};

export const ConfigRouter = [
  {
    component: LayoutBase,
    exact: true,
    // path: '/',
    routes: layoutSorting(routes),
  },
];

export default ConfigRouter;

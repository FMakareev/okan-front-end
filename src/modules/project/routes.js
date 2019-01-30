import { LAYOUT_APP } from '../../shared/layout';
import { ROLE_ADMIN, ROLE_USER } from '../../shared/roles';

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Настройки проекта', // path: '/project-settings/:id',
    path: '/project-settings',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectSettings' */ './view/projectSettings'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Список проектов',
    path: '/project-list',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectList'  */ './view/projectList'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Создание проекта',
    path: '/project-create',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectCreate'  */ './view/projectCreate'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Список ревизий',
    path: '/revision-list',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'revisionList'  */ './view/revisionList'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Настройки документа',
    // path: '/document-settings/:id',
    path: '/document-settings',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'documentSettings'  */ './view/documentSettings'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Проект',
    path: '/project/:projectid/:documentid/:sectionid/:cellid',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectEditor'  */ './view/projectEditor'),
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Проект',
    path: '/project/:projectid/:documentid/:sectionid',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectEditor'  */ './view/projectEditor'),
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Проект',
    path: '/project/:projectid/:documentid',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectEditor'  */ './view/projectEditor'),
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Проект',
    path: '/project/:projectid',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'projectEditor'  */ './view/projectEditor'),
  },
];
// roles: [ROLE_ADMIN, ROLE_USER],
// roles: [ROLE_ADMIN, ROLE_USER],
// roles: [ROLE_ADMIN, ROLE_USER],
// roles: [ROLE_ADMIN, ROLE_USER],

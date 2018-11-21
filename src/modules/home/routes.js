import { LAYOUT_APP, LAYOUT_AUTH } from "../../shared/layout";

export const routes = [
  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'Home',
    path: '/home',
    order: 0,
    hidden: false,
    load: () => import('./view/home'),
    resolvers: [],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Contact',
    path: '/contact',
    order: 0,
    hidden: false,
    load: () => import('./view/contacts'),
    resolvers: [],
  },
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Help',
    path: '/help',
    order: 0,
    hidden: false,
    load: () => import('./view/help'),
    resolvers: [],
  },
];

export default routes;

export const routes = [
  {
    exact: true,
    name: 'Home',
    path: '/',
    order: 0,
    hidden: false,
    load: () => import('./view/home'),
    resolvers: [],
  },
  {
    exact: true,
    name: 'Contact',
    path: '/contact',
    order: 0,
    hidden: false,
    load: () => import('./view/contacts'),
    resolvers: [],
  },
];

export default routes;

import { LAYOUT_AUTH } from "../../shared/layout";

export const routes = [
  {
    layout: LAYOUT_AUTH,
    exact: false,
    name: 'Вход',
    path: '/',
    order: 0,
    hidden: false,
    load: () => import('./view/login'),
    resolvers: [],
  },{
    layout: LAYOUT_AUTH,
    exact: false,
    name: 'Вход',
    path: '/login',
    order: 0,
    hidden: false,
    load: () => import('./view/login'),
    resolvers: [],
  },  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'Регистрация',
    path: '/login',
    order: 0,
    hidden: false,
    load: () => import('./view/registration'),
    resolvers: [],
  },  {
    layout: LAYOUT_AUTH,
    exact: true,
    name: 'Восстановление пароля',
    path: '/password-recovery',
    order: 0,
    hidden: false,
    load: () => import('./view/passwordRecovery'),
    resolvers: [],
  },
];

import {LAYOUT_APP} from "@lib/shared/layout";
import {ROLE_ADMIN, ROLE_USER} from "@lib/shared/roles";

export const routes = [
  {
    layout: LAYOUT_APP,
    exact: true,
    name: 'Настройки документа',
    path: '/document-settings/:id',
    order: 0,
    hidden: false,
    load: () => import(/* webpackChunkName: 'documentSettings'  */ './view/documentSettings'),
    roles: [ROLE_ADMIN, ROLE_USER],
  },
]

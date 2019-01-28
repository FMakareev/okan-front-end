import faker from 'faker';
import {GraphQLError} from 'graphql';

/** Apollo Client Mock */
import setupClient from './helpers/apolloClientMock';

/** Constants */
import {ROLE_ADMIN, ROLE_USER} from '../shared/roles';

/** Schema */
import schema from './schema.graphqls';

/** Mock query */
import {userlist} from './graphql/query/userlist';
import {useritem} from './graphql/query/useritem';
import {celItem} from './graphql/query/celItem';
import cellTree from './graphql/query/cellTree';
import {documentitem} from './graphql/query/documentItem';
import {documentlist} from './graphql/query/documentlist';
import {projectitem} from './graphql/query/projectitem';
import {notificationList} from './graphql/query/notificationList';
import {notificationItem} from './graphql/query/notificationItem';
import {projectlist} from "./graphql/query/projectlist";
import {celllist} from "./graphql/query/celllist";

const defaultMocks = {
  Query: () => ({
    userlist: () => userlist(faker.random.number(5)),
    useritem,
    documentitem: () => documentitem(),
    currentuseritem: () => {
      const result = useritem();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(result);
        }, faker.random.number(0));
      });
    },
    projectitem: (query, {id}) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(projectitem({id}));
        }, faker.random.number(0));
      });
    },
    projectlist: (query, {id}) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(projectlist(4));
        }, faker.random.number(0));
      });
    },

    documentlist: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(documentlist(1));
        }, faker.random.number(0))
      })
    },

    notificationList: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(notificationList(1));
        }, faker.random.number(0));
      });
    },

    celllist: (query, props) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(celllist());
        }, faker.random.number(0));
      });
    },
    cellitem: (query, props) => {

      const {id} = props;
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = cellTree.find(item => item.id === id);
          resolve(result);
        }, faker.random.number(0))
      })
    },
  }),

  Mutation: () => ({
    /**
     * @params {func} mutation - этот же запрос
     * @params {object} props - аргументы которые были переданы
     * */
    createuser: (mutation, props) => {
      // TODO review: добавить рандомную задержку от 500 до 3000
      return setTimeout(() => {
        if (props.email === 'error@okan.su') {
          throw new GraphQLError('already registered');
        } else {
          return props;
        }
      }, 10000);
    },

    activateuser: (mutation, props) => {
      // TODO review: добавить рандомную задержку от 500 до 3000
      return setTimeout(() => {
        if (props.email === 'error@okan.su') {
          throw new GraphQLError('already registered');
        } else {
          return props;
        }
      }, 5000);
    },

    updateuser: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve({...useritem()})
            : reject(
            JSON.stringify({
              errors: [
                {
                  message: 'error!',
                },
              ],
            }),
            );
        }, faker.random.number(2000));
      }),

    changepassword: (mutation, props) => props,

    createdocument: (mutation, props) => {
      console.log('createdocument: ', props);
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          faker.random.number(1) ?
            resolve({
              ...documentitem(),
              childcell: null,
              name: props.name
            }) :
            reject(
              JSON.stringify({
                errors: [
                  {
                    message: 'error!',
                  },
                ],
              }));

        }, faker.random.number(2000));
      })
    },

    createrevision: (mutation, props) => {
      console.log('createrevision: ', props);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1) ?
            resolve({
              ...documentitem(),
              childcell: null,
              name: props.name
            }) :
            reject(
              JSON.stringify({
                errors: [
                  {
                    message: 'error!',
                  },
                ],
              }));
        }, faker.random.number(2000));
      })
    },

    createcell: (mutation, props) => {

      console.log('cellitem: ', props);
      const {prevcell, parent} = props;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            ...celItem({
              prevcell,
              parent
            }),
          });
        }, faker.random.number(2000))
      })
    },
  }),
};

export const mocksClient = setupClient(defaultMocks, schema)();

export default mocksClient;

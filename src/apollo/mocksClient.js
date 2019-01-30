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
import {useritem} from './graphql/query/userItem';
import {celItem} from './graphql/query/celItem';
import cellTree from './graphql/query/cellTree';
import {celllist} from "./graphql/query/celllist";
import { documentitem } from './graphql/query/documentItem';
import { documentlist } from './graphql/query/documentlist';
import { projectitem } from './graphql/query/projectitem';
import { notificationList } from './graphql/query/notificationList';
import { notificationItem } from './graphql/query/notificationItem';
import { projectlist } from './graphql/query/projectlist';
import { revisionitem } from './graphql/query/revisionitem';
import { revisionList } from './graphql/query/revisionList';



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
    templatelist:()=>{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(projectlist(10,{
            isTemplate: true,
          }));
        }, faker.random.number(2000));
      });
    },
    projectitem: (query, {id}) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            ...projectitem(),
            id,
          });
        }, faker.random.number(0));
      });
    },
    projectList: (query, {id}) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(projectlist(4));
        }, faker.random.number(0));
      });
    },

    revisionitem: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(revisionItem());
        }, faker.random.number(0));
      });
    },

    revisionList: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(revisionList(2));
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          faker.random.number(1) ?
            resolve({
              ...documentitem(),
              children: null,
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
            cell: {
              ...celItem({
                prevcell,
                parent
              }),
            }
          });
        }, faker.random.number(2000));
      });
    },

    createproject: (mutation, props) => {
      console.log('createproject: ', props);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            project:{
              ...projectitem(),
              ...props,
            },
          });
        }, faker.random.number(2000));
      });
    },

    updateproject: (mutation, props) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            project:{
              ...projectitem(),
              ...props,
            },
          });
        }, faker.random.number(2000));
      });
    },

    updatedocument: (mutation, props) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            document:{
              ...documentitem(),
              ...props,
            },
          });
        }, faker.random.number(2000));
      });
    },

    createdocument: (mutation, props) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const document = {
            ...documentitem(),
            ...props,
          }
          console.log('documentitem(): ', documentitem());
          console.log('document: ', document);
          console.log('document: ', props);
          resolve({
            document:document,
          });
        }, faker.random.number(2000));
      });
    },
  }),
};

export const mocksClient = setupClient(defaultMocks, schema)();

export default mocksClient;

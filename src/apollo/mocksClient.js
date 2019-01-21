import faker from 'faker';
import {GraphQLError} from 'graphql';

import setupClient from './helpers/apolloClientMock';

import schema from './schema.graphqls';

import {userlist} from './graphql/query/userlist';
import {useritem} from './graphql/query/useritem';

import {ROLE_ADMIN, ROLE_USER} from '../shared/roles';
import {celItem} from "./graphql/query/celItem";
import cellTree from './graphql/query/cellTree';
import {documentitem} from "./graphql/query/documentItem";
import {documentlist} from "./graphql/query/documentlist";
import {projectitem} from "./graphql/query/projectitem";

const defaultMocks = {
  Query: () => ({
    userlist: () => userlist(faker.random.number(5)),
    useritem,
    documentitem:()=>documentitem(),
    projectitem:(query, {id})=>{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(projectitem({id}));
        }, faker.random.number(0))
      })
    },
    documentlist:()=>{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(documentlist(1));
        }, faker.random.number(0))
      })
    },
    cellitem: (query, props) => {

      console.log('cellitem: ', props);
      const {id, prevcell, nextcell, parent} = props;
      return new Promise((resolve, reject) => {

        setTimeout(() => {
          const result = cellTree.find(item => item.id === id);

          console.log('cellitem result: ', result);
          resolve(result);
        }, faker.random.number(0))
      })
    },
    useremailitem: (query, {email}) => {
      switch (email) {
        case 'client@okan.su': {
          return {...useritem(), email: 'client@okan.su', role: ROLE_USER};
        }
        case 'admin@okan.su': {
          return {...useritem(), email: 'admin@okan.su', role: ROLE_ADMIN};
        }

        default: {
          // throw new GraphQLError('user not found');
          throw Error(
            JSON.stringify({
              useremailitem: null,
              errors: [
                {
                  message: 'GraphQL error: user not found',
                },
              ],
            }),
          );
        }
      }
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

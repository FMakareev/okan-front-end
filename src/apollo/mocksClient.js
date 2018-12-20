import faker from 'faker';
import { GraphQLError } from 'graphql';

import setupClient from './helpers/apolloClientMock';

import schema from './schema.graphqls';

import { userlist } from './graphql/query/userlist';
import { useritem } from './graphql/query/userItem';

import { ROLE_ADMIN, ROLE_USER } from '../shared/roles';

const defaultMocks = {
  Query: () => ({
    userlist,
    useritem,
    useremailitem: (query, { email }) => {
      console.log(query, email);
      switch (email) {
        case 'client@test.com': {
          return {
            ...useritem(),
            email: 'client@test.com',
            role: ROLE_CLIENT,
          };
        }
        case 'bank@test.com': {
          return {
            ...useritem(),
            email: 'bank@test.com',
            role: ROLE_BANK,
          };
        }
        case 'bureau@test.com': {
          return {
            ...useritem(),
            email: 'bureau@test.com',
            role: ROLE_BUREAU,
          };
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
      if (props.email === 'error@test.com') {
        throw new GraphQLError('already registered');
      } else if (props.bankName && props.bankName !== 'KnownBank') {
        throw new GraphQLError('unknown bank');
      } else {
        return props;
      }
    },
    updateuser: (mutation, props) =>
      // для имитации запроса к серверу с рандомной задержкой и результатом.
      new Promise((resolve, reject) => {
        setTimeout(() => {
          faker.random.number(1)
            ? resolve({ ...useritem() })
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

  }),
};

export const mocksClient = setupClient(defaultMocks, schema)();

export default mocksClient;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
// import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import after from 'lodash/after';
import UserEmailItemQuery from './UserEmailItemQuery.graphql';
// import roleItem from './roleItem.graphql';
// import FormPreLoader from '../../../../components/FormPreLoader/FormPreLoader';
// import Alert from '../../../../components/Alert/Alert';
// import { getTranslate } from 'react-localize-redux';

class GetUserDate extends Component {
  static propTypes = {
    uname: PropTypes.string,
  };

  static defaultProps = {
    uname: null,
  };

  constructor(props) {
    super(props);
  }

  setUserLocalStorage(resolvers) {
    console.log(1, resolvers);
    const user = JSON.parse(localStorage.getItem('user'));

    user.resolvers = [...user.resolvers, ...resolvers];
    localStorage.setItem('user', JSON.stringify(user));
  }

  render() {
    const { uname, translate } = this.props;
    console.log(1111, this.props);

    const isAdmin = Cookie.get('admin') === 'True';

    /** @desc data query of an authorized user */
    return <div>1</div>;
  }
}
// GetUserDate = connect(state => ({
//   translate: getTranslate(state.locale),
// }))(GetUserDate);
export default GetUserDate;

/*// <Query skip={isAdmin} query={userItem} variables={{ username: uname }}>
      //   {({ loading: loadingUser, error: errorUser, data: dataUser }) => {
      //     console.log('dataUser: ', dataUser);
      //     /** @desc waiting for response */
//     if (!isAdmin && loadingUser) {
//       return <FormPreLoader />;
//     }

//     /** @desc response error */
//     if (!isAdmin && errorUser) {
//       console.log('errorUser: ', JSON.stringify(errorUser));
//       console.log('errorUser: ', errorUser.message);
//       if (errorUser.message === 'GraphQL error: You not accessed') {
//         return <Alert mb={7}>{translate('error_access_denied_title')}</Alert>;
//       }
//       return <Alert mb={7}>{translate('error_unexpected_error_title')}</Alert>;
//     }

//     /** @desc response error */
//     if (!isAdmin && !dataUser.usernameitem) {
//       return <Alert mb={7}>{translate('user_login_error_message_401')}</Alert>;
//     }

//     if (!isAdmin) {
//       const submitLoaderDone = after(dataUser.usernameitem.role.length, () => {
//         location.replace('/');
//       });
//       /** @desc set user date in localStorage */
//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           /** @desc username */
//           username: dataUser.usernameitem.username,
//           /** @desc name */
//           name: dataUser.usernameitem.name,
//           /** @desc array roles */
//           role: dataUser.usernameitem.role,
//           /** @desc array resolvers */
//           resolvers: [],
//         }),
//       );
//       /** @desc get resolvers role */
//       return (
//         <Fragment>
//           {dataUser.usernameitem.role.map((item, index) => (
//             <Query
//               key={`goodsItem/role-${index}`}
//               query={roleItem}
//               variables={{ name: dataUser.usernameitem.role[index] }}>
//               {({ loading: loadingRole, error: errorRole, data: dataRole }) => {
//                 console.log('roleItem: ', loadingRole, errorRole, dataRole);

//                 /** @desc waiting for response */
//                 if (loadingRole) {
//                   return null;
//                 }
//                 /** @desc response error */
//                 if (errorRole) {
//                   if (errorRole.message === 'GraphQL error: You not accessed') {
//                     return <Alert mb={7}>{translate('error_access_denied_title')}</Alert>;
//                   }
//                   return <Alert mb={7}>{translate('error_unexpected_error_title')}</Alert>;
//                 }
//                 /** @desc set user date in localStorage */
//                 this.setUserLocalStorage(dataRole.roleitem.resolvers);
//                 submitLoaderDone();
//                 /** @desc */
//                 return null;
//               }}
//             </Query>
//           ))}
//         </Fragment>
//       );
//     }
//     return (
//       <Query query={roleItem} variables={{ name: 'all' }}>
//         {({ loading: loadingRole, error: errorRole, data: dataRole }) => {
//           console.log('roleItem admin: ', loadingRole, errorRole, dataRole);

//           /** @desc waiting for response */
//           if (loadingRole) {
//             return null;
//           }
//           /** @desc response error */
//           if (errorRole) {
//             if (errorRole.message === 'GraphQL error: You not accessed') {
//               return <Alert mb={7}>{translate('error_access_denied_title')}</Alert>;
//             }
//             return <Alert mb={7}>{translate('error_unexpected_error_title')}</Alert>;
//           }
//           /** @desc set user date in localStorage */

//           localStorage.setItem(
//             'user',
//             JSON.stringify({
//               /** @desc username */
//               name: uname,
//               /** @desc array roles */
//               role: 'all',
//               /** @desc array resolvers */
//               resolvers: dataRole.roleitem.resolvers,
//             }),
//           );
//           location.replace('/');

//           /** @desc */
//           return null;
//         }}
//       </Query>
//     );
//   }}
// </Query>*/

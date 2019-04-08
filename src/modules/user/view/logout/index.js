import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_REMOVE } from '../../../../store/reducers/user/actionTypes';

import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import SmallPreloader from '../../../../components/SmallPreloader/SmallPreloader';
import { withApollo } from 'react-apollo';
import { captureException } from '../../../../hocs/withSentry/withSentry';

export class LogOut extends Component {
  static propTypes = {
    ...ReactRoutePropTypes,
    // /** react-localize-redux/lib/index */
    // translate: PropTypes.func,
    /**  */
    staticContex: PropTypes.any,
    /** func redux */
    dispatch: PropTypes.func,
    // /** language */
    // currentLanguage: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.logOut = this.logOut.bind(this);
    this.logOut();
  }

  get initialState() {
    return {
      redirect: null,
    };
  }
  logOut() {
    if (isBrowser) {
      try {
        this.props.client.resetStore();
      } catch (error) {
        captureException(error);
        console.error('Error reset store in logout: ', error);
      }
      return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT_CLIENT}/user/logout`, {
          method: 'POST',
          credentials: 'include',
          mode: 'no-cors',
          headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then(response => {
            this.props.removeUser();
            this.setState(() => ({
              redirect: '/login',
            }));
            resolve(response);
          })
          .catch(error => {
            captureException(error,'Error logout: ');
            this.props.removeUser();
            this.setState(() => ({
              redirect: '/login',
            }));
            reject(error);
          });
      });
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return <SmallPreloader />;
  }
}
LogOut = connect(
  state => ({
    user: getUserFromStore(state),
  }),
  dispatch => ({
    removeUser: () => dispatch({ type: USER_REMOVE }),
  }),
)(LogOut);

LogOut = withApollo(LogOut);
export default LogOut;

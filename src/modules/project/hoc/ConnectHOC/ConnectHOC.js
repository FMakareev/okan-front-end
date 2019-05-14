import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

export const ConnectHOC = () => WrappedComponent => {
  return connect(
    store => ({
      user: getUserFromStore(store),
    }),
    dispatch => ({
      setNotificationSuccess: message => dispatch(success(message)),
      setNotificationError: message => dispatch(error(message)),
    }),
  )(WrappedComponent);
};

export default ConnectHOC;

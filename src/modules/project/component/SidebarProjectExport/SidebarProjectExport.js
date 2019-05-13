import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { exportDocument } from '../../../../hocs/withExportDocument/withExportDocument';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarExport } from '../../../../components/Icons/SvgSidebarExport';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

export class SidebarProjectExport extends React.Component {
  static propTypes = {
    document: PropTypes.object,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    const {
      document: { id, name },
    } = this.props;
    console.log('SidebarProjectExport: ', this.props);
    return (
      <ButtonBase
        title={'Эспортировать документ'}
        onClick={event => {
          event.stopPropagation();
          exportDocument(id, name);
        }}
        variant={'outlineGray'}
        p={'2px'}
        fontSize={'15px'}>
        <SvgSidebarExport />
      </ButtonBase>
    );
  }
}

SidebarProjectExport = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarProjectExport);

export default SidebarProjectExport;

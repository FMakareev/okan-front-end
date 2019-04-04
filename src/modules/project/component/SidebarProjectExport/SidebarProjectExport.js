import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarExport } from '../../../../components/Icons/SvgSidebarExport';

/** store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** json method */
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';

/** graphQL schema */
import ExportDocumentMutation from '../../graphql/ExportDocumentMutation.graphql';

export class SidebarProjectExport extends React.Component {
  static propTypes = {
    document: PropTypes.object,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
  };
  static defaultProps = {};

  exportDocument = id => {
    return fetch(`${ENDPOINT_CLIENT}/docx_converter/convert`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        Accept: 'text/plain,text/html,application/xhtml+xml,application/xml',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'multipart/form-data',
      },
      body: jsonToUrlEncoded({ id }),
    })
      .then(response => {
        console.log(1, response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {
      document: { id },
    } = this.props;

    return (
      <ButtonBase
        title={'Эспортировать документ'}
        onClick={event => {
          event.stopPropagation();
          this.exportDocument(id);
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

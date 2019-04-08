import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import FileSaver from 'file-saver';
import { captureException } from '../../../../hocs/withSentry/withSentry';

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

  exportDocument = () => {
    const {
      document: { name, id },
    } = this.props;

    let formData = new FormData();
    formData.append('document', id);
    return fetch(`${ENDPOINT_CLIENT}/docx_converter/convert`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      body: formData,
    })
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        FileSaver.saveAs(blob, `${name || 'document'}.docx`);
      })
      .catch(error => {
        captureException(error, 'Error exportDocument: ');
      });
  };

  render() {
    const {
      document: { id },
    } = this.props;
    console.log('SidebarProjectExport: ', this.props);
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

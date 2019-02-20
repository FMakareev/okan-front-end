import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import settingsSidebar from '../../../../assets/image/settingsSidebar.png';

export const SidebarProjectSettings = ({ projectid, documentid }) => (
  <Link
    title={'Открыть настройки документа'}
    onClick={event => event.stopPropagation()}
    to={`/app/document-settings/${documentid}`}>
    <ButtonBase variant={'empty'}>
      <img src={settingsSidebar} />
    </ButtonBase>
  </Link>
);
SidebarProjectSettings.propTypes = {
  projectid: PropTypes.string,
  documentid: PropTypes.string.isRequired,
};

SidebarProjectSettings.defaultProps = {};

export default SidebarProjectSettings;

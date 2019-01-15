import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import settingsSidebar from '../../../../assets/image/settingsSidebar.png';

export const SidebarProjectSettings = () => {
  return (
    <Link to={`/project-settings/${1}`}>
      <ButtonBase variant={'empty'}>
        <img src={settingsSidebar} />
      </ButtonBase>
    </Link>
  );
};

SidebarProjectSettings.propTypes = {};

SidebarProjectSettings.defaultProps = {};

export default SidebarProjectSettings;

import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import settingsSidebar from '../../../../assets/image/settingsSidebar.png';

export const SidebarProjectSettings = ({id}) =>(
  <Link title={'Открыть настройки проекта'} onClick={(event)=>event.stopPropagation()} to={`/project-settings/${id}`}>
    <ButtonBase variant={'empty'}>
      <img src={settingsSidebar} />
    </ButtonBase>
  </Link>
);
SidebarProjectSettings.propTypes = {
  id: PropTypes.string.isRequired,
};

SidebarProjectSettings.defaultProps = {};

export default SidebarProjectSettings;

import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import settingsSidebar from '../../../../assets/image/settingsSidebar.png';

export const SidebarChangeCell = () => {
  return (
    <ButtonBase variant={'empty'}>
      <img src={settingsSidebar} />
    </ButtonBase>
  );
};

SidebarChangeCell.propTypes = {};

SidebarChangeCell.defaultProps = {};

export default SidebarChangeCell;

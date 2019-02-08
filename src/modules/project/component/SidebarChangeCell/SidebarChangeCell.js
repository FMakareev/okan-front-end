import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import settingsSidebar from '../../../../assets/image/settingsSidebar.png';

export const SidebarChangeCell = ({onClick}) => {
  return (
    <ButtonBase
      title={'Переименовать раздел.'}
      onClick={(event) => {
        event.stopPropagation();
        onClick()
      }}
      variant={'empty'}
    >
      <img src={settingsSidebar}/>
    </ButtonBase>
  );
};

SidebarChangeCell.propTypes = {};

SidebarChangeCell.defaultProps = {};

export default SidebarChangeCell;

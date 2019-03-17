import PropTypes from 'prop-types';
import React from 'react';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import { SvgSettings } from '@lib/ui/Icons/SvgSettings';

export const SidebarChangeCell = ({ onClick }) => {
  return (
    <ButtonBase
      title={'Переименовать раздел.'}
      onClick={event => {
        event.stopPropagation();
        onClick();
      }}
      variant={'outlineGray'}
      p={'2px'}
      fontSize={'15px'}>
      <SvgSettings />
    </ButtonBase>
  );
};

SidebarChangeCell.propTypes = {
  onClick: PropTypes.func.isRequired,
};

SidebarChangeCell.defaultProps = {};

export default SidebarChangeCell;

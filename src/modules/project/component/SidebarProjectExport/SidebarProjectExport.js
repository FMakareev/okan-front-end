import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarExport } from '../../../../components/Icons/SvgSidebarExport';

export const SidebarProjectExport = () => (
  <ButtonBase
    title={'Эспортировать документ'}
    onClick={event => event.stopPropagation()}
    variant={'outlineGray'}
    p={'2px'}
    fontSize={'15px'}
  >
    <SvgSidebarExport />
  </ButtonBase>
);

SidebarProjectExport.propTypes = {};

SidebarProjectExport.defaultProps = {};

export default SidebarProjectExport;

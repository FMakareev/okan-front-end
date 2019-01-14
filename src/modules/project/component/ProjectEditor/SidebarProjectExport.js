import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarExport } from '../../../../components/Icons/SvgSidebarExport';

export const SidebarProjectExport = () => {
  return <ButtonBase variant={'empty'}>{SvgSidebarExport()}</ButtonBase>;
};

SidebarProjectExport.propTypes = {};

SidebarProjectExport.defaultProps = {};

export default SidebarProjectExport;

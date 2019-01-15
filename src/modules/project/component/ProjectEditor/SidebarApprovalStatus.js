import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgStatus } from '../../../../components/Icons/SvgStatus';

export const SidebarApprovalStatus = () => {
  return <ButtonBase variant={'empty'}>{SvgStatus('#DF4624', '#fff')}</ButtonBase>;
};

SidebarApprovalStatus.propTypes = {};

SidebarApprovalStatus.defaultProps = {};

export default SidebarApprovalStatus;

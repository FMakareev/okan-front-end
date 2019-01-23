import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgStatus } from '../../../../components/Icons/SvgStatus';
import {CELL_STATUS_CHANGED, CELL_STATUS_CHECKED, CELL_STATUS_NOT_CHECKED} from "@lib/shared/approvalStatus";

const GetStatusColor = (status) => {
  switch(status){
    case(CELL_STATUS_CHECKED):{
      return '#2FBC0B'
    }
    case(CELL_STATUS_CHANGED):{
      return '#F3C318'
    }
    case(CELL_STATUS_NOT_CHECKED):{
      return '#DF4624'
    }
    default:{
      return '#DF4624'
    }
  }
};


export const SidebarApprovalStatus = ({status}) => {
  return <ButtonBase title={'Статус проверки блока'} variant={'empty'}>
    <SvgStatus fill={GetStatusColor(status)} stroke={'#fff'}/>
  </ButtonBase>;
};

SidebarApprovalStatus.propTypes = {};

SidebarApprovalStatus.defaultProps = {};

export default SidebarApprovalStatus;

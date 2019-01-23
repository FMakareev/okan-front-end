import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgSidebarSave } from '../../../../components/Icons/SvgSidebarSave';

export const SidebarSaveChanges = () => (<ButtonBase
  onClick={(event)=>event.stopPropagation()}
  variant={'empty'}>
  <SvgSidebarSave/>
</ButtonBase>);

SidebarSaveChanges.propTypes = {};

SidebarSaveChanges.defaultProps = {};

export default SidebarSaveChanges;

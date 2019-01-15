import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import { SvgSidebarList } from '../../../../components/Icons/SvgSidebarList';

export const SidebarRevisionList = () => {
  return (
    <Link to={`/revision-list/${1}`}>
      <ButtonBase variant={'empty'}>{SvgSidebarList()}</ButtonBase>
    </Link>
  );
};

SidebarRevisionList.propTypes = {};

SidebarRevisionList.defaultProps = {};

export default SidebarRevisionList;

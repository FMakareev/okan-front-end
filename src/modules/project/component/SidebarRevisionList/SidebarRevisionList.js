import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import {SvgSidebarList} from '../../../../components/Icons/SvgSidebarList';

export const SidebarRevisionList = ({projectid}) => (
  <Link
    onClick={(event) => event.stopPropagation()}
    to={`/app/revision-list/${projectid}`}>
    <ButtonBase variant={'empty'}>
      <SvgSidebarList/>
    </ButtonBase>
  </Link>
);

SidebarRevisionList.propTypes = {
  projectid: PropTypes.string.isRequired,
};

SidebarRevisionList.defaultProps = {};

export default SidebarRevisionList;

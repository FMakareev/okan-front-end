import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import {SvgSidebarList} from '../../../../components/Icons/SvgSidebarList';

export const SidebarRevisionList = ({id}) => (
  <Link
    onClick={(event) => event.stopPropagation()}
    to={`/revision-list/${id}`}>
    <ButtonBase variant={'empty'}>
      <SvgSidebarList/>
    </ButtonBase>
  </Link>
);

SidebarRevisionList.propTypes = {
  id: PropTypes.string.isRequired,
};

SidebarRevisionList.defaultProps = {};

export default SidebarRevisionList;

import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import {SvgSidebarList} from '../../../../components/Icons/SvgSidebarList';

export const SidebarRevisionList = ({documentid}) => (
  <Link
    onClick={(event) => event.stopPropagation()}
    to={`/app/revision-list/${documentid}`}>
    <ButtonBase variant={'empty'}>
      <SvgSidebarList/>
    </ButtonBase>
  </Link>
);

SidebarRevisionList.propTypes = {
  documentid: PropTypes.string.isRequired,
};

SidebarRevisionList.defaultProps = {};

export default SidebarRevisionList;

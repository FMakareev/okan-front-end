import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

export const SidebarСreateRevision = () => {
  return (
    <Link to={`/revision-list/${1}`}>
      <ButtonBase variant={'empty'}>{SvgSidebarComment()}</ButtonBase>
    </Link>
  );
};

SidebarСreateRevision.propTypes = {};

SidebarСreateRevision.defaultProps = {};

export default SidebarСreateRevision;

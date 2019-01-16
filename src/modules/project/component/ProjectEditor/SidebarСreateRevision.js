import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

export const SidebarCreateRevision = () => {
  return (
    <Link to={`/revision-list/${1}`}>
      <ButtonBase variant={'empty'}>{SvgSidebarComment()}</ButtonBase>
    </Link>
  );
};

SidebarCreateRevision.propTypes = {};

SidebarCreateRevision.defaultProps = {};

export default SidebarCreateRevision;

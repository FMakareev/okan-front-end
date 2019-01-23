import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

// TODO: добавить мутацию для создания ревизии документа

export const SidebarCreateRevision = () => (<ButtonBase
  onClick={(event) => event.stopPropagation()}
  variant={'empty'}>
  <SvgSidebarComment/>
</ButtonBase>);

SidebarCreateRevision.propTypes = {
  id: PropTypes.string.isRequired,
};

SidebarCreateRevision.defaultProps = {};

export default SidebarCreateRevision;

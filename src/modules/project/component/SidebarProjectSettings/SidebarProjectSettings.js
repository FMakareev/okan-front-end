import React from 'react';
import PropTypes from 'prop-types';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Link from '../../../../components/Link/Link';

/**Image */
import SvgSettings from "@lib/ui/Icons/SvgSettings";

export const SidebarProjectSettings = ({ projectid, documentid }) => (
  <Link
    title={'Открыть настройки документа'}
    onClick={event => event.stopPropagation()}
    to={`/app/document-settings/${documentid}`}>
    <ButtonBase
      variant={'outlineGray'}
      p={'2px'}
      fontSize={'15px'}
    >
      <SvgSettings/>
    </ButtonBase>
  </Link>
);
SidebarProjectSettings.propTypes = {
  projectid: PropTypes.string,
  documentid: PropTypes.string.isRequired,
};

SidebarProjectSettings.defaultProps = {};

export default SidebarProjectSettings;

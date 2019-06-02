import React from 'react';

/** View */
import Flex from '../../../../components/Flex/Flex';

/** Image */
import { SvgLogo } from '../../../../components/Icons/SvgLogo';

export const FormLogo = () => (
  <Flex alignItems="center" justifyContent="center" pt={17} pb="125px">
    <SvgLogo />
  </Flex>
);

export default FormLogo;

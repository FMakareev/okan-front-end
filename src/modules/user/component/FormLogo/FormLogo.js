import React from 'react';

/** View */
import Flex from '@lib/ui/Flex/Flex';

/** Image */
import { SvgLogo } from '@lib/ui/Icons/SvgLogo';

export const FormLogo = () => (
  <Flex alignItems="center" justifyContent="center" pt={17} pb="125px">
    <SvgLogo />
  </Flex>
);

export default FormLogo;

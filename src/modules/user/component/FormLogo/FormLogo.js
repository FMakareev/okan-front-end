import React, { Component } from 'react';

import Flex from '../../../../components/Flex/Flex';

import { SvgLogo } from '../../../../components/Icons/SvgLogo';

export const FormLogo = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} pt={17} pb={'125px'}>
      {SvgLogo()}
    </Flex>
  );
};

export default FormLogo;

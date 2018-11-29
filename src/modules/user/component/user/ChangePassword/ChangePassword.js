import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**Components*/
import Link from '../../../../../components/Link/Link';
import ButtonWithImage from '../../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '../../../../../components/Icons/SvgPlay';

export const ChangePassword = props => {
  console.log(1, props);
  return (
    <Link to={'/auth/password-recovery'}>
      <ButtonWithImage
        type="submit"
        variant={'large'}
        size={'medium'}
        children={'Сменить пароль'}
        rightIcon={SvgPlay()}
        ml={9}
        width={'100%'}
        widthIcon={'10px'}
      />
    </Link>
  );
};

ChangePassword.PropTypes = {};

export default ChangePassword;

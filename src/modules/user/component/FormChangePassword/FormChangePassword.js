import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**Components*/
import Link from '@lib/ui/Link/Link';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

/** Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

export const FormChangePassword = () => {
  return (
    <Link to={'/password-recovery'}>
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

FormChangePassword.propTypes = {
  /** to*/
  to: PropTypes.string,
  /** variant button*/
  variant: PropTypes.string,
  /** size button*/
  size: PropTypes.string,
  /** children */
  children: PropTypes.string,
  /** icon for button */
  rightIcon: PropTypes.func,
  /** width*/
  width: PropTypes.string,
  /** width icon*/
  widthIcon: PropTypes.string,
};

export default FormChangePassword;

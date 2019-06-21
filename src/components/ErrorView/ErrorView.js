import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from 'styled-system';
import { Icon } from 'react-icons-kit';

/**Icons */
import { ic_error_outline } from 'react-icons-kit/md/ic_error_outline';

/** View */
import Text from '../Text/Text';
import Card from '../Card/Card';

const Wrapper = styled(Card)`
  max-width: 320px;
  font-weight: normal;
  text-align: center;
  margin: 64px auto;
  ${color};
`;

const IconStyled = styled(Icon)`
  font-weight: normal;
  text-align: center;
  ${color};
`;

/**
 * Компонент ошибки
 * @example ./RenderError.example.md
 */
export const ErrorView = ({ title, message, icon, iconColor }) => (
  <Wrapper p={5}>
    <IconStyled color={iconColor} size={64} icon={icon} />
    <Text fontSize={7} fontWeight={'bold'} textAlign={'center'}>
      {title || 'Error'}
    </Text>
    <Text fontSize={5} wb={'break-all'} color={'#000'}>
      {message}
    </Text>
  </Wrapper>
);

ErrorView.propTypes = {
  /** error */
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  iconColor: PropTypes.string,
};
ErrorView.defaultProps = {
  title: 'Error',
  message: 'unexpected error',
  icon: ic_error_outline,
  iconColor: 'color6',
};

export default ErrorView;

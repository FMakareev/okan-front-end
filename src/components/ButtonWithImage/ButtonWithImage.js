import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

// TODO review:MICHA:внутренние блоки те что слева, по центру и справа нет смысла делать через компонент Flex,
// лучше переделать на Box так по крайней мере появится возможность внутри их стилизовать и позиционировать
// на сколько я помню есть у нас в профиле кнопка у которой иконка под текстом стоит и такую используя этот
// компонент получится сделать только если блок по центру будет не Flex, а Box т.к. у Flex по умолчанию элементы строятся в ряд
export const ButtonWithImage = ({ leftIcon, rightIcon, name, variant, size, mr, ml }) => (
  <ButtonBase variant={variant} size={size}>
    <Flex justifyContent="center" alignItems="space-around">
      {leftIcon && (
        <Flex mr={mr} justifyContent="center" alignItems="center">
          {leftIcon}
        </Flex>
      )}

      <Flex justifyContent="center" alignItems="center">
        {name}
      </Flex>

      {rightIcon && (
        <Flex ml={ml} justifyContent="center" alignItems="center">
          {rightIcon}
        </Flex>
      )}
    </Flex>
  </ButtonBase>
);

ButtonWithImage.PropTypes = {
  /** name button */
  name: PropTypes.string,
  /** left icon */
  leftIcon: PropTypes.string,
  /** right icon */
  rightIcon: PropTypes.string,
  /** variant button */
  variant: PropTypes.string,
  /** size button */
  size: PropTypes.string,
  /** css value - margin-right */
  mr: PropTypes.string,
  /** css value - margin-left */
  ml: PropTypes.string,
};

export default ButtonWithImage;

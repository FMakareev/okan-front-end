import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components*/
import Box from '../../../../../components/Box/Box';
import Text from '../../../../../components/Text/Text';

/** Styles property */
import { FontFamilyProperty } from '../../../../../styles/styleProperty/FontFamilyProperty';
import { BorderColorProperty } from '../../../../../styles/styleProperty/BorderColorProperty';
import { BorderRadiusProperty } from '../../../../../styles/styleProperty/BorderRadiusProperty';

const BoxStyled = styled(Box)`
  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
  padding: 10px;
`;

const TextStyled = styled(Text)`
  border-top: 2px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color7' })};
  ${props => FontFamilyProperty({ ...props, fontFamily: 'secondary' })};
  padding-top: 4px;
  padding-bottom: 4px;
`;

export class PersonData extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={13}
          fontFamily={'primary500'}>
          Личные данные
        </Text>
        <BoxStyled>
          <Text fontSize={5} lineHeight={7} pl={4} pt={0} pb={2} fontFamily={'secondary'}>
            Колесников
          </Text>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            Александр
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            Владиславович
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            12.12.1984
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            Специалист по технической документации.
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            8-999-888-77-66
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4} mb={-2}>
            email@okan.su
          </TextStyled>
        </BoxStyled>
      </Fragment>
    );
  }
}

export default PersonData;

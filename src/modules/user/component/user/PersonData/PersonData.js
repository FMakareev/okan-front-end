import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components*/
import Box from '../../../../../components/Box/Box';
import Text from '../../../../../components/Text/Text';
import {FontFamilyProperty} from "../../../../../styles/styleProperty/FontFamilyProperty";

const BoxStyled = styled(Box)`
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 10px;
`;

const TextStyled = styled(Text)`
  border-top: 2px solid #00649c;
  padding-top: 4px;
  padding-bottom: 4px;
  ${props => FontFamilyProperty({...props, fontFamily: 'secondary'})}
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
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={13} fontFamily={'primary500'}>
          Личные данные
        </Text>
        <BoxStyled>
          <Text fz={5} lh={6} pl={4} pt={0} pb={2} fontFamily={'secondary'}>
            Колесников
          </Text>
          <TextStyled fz={5} lh={6} pl={4}>
            Александр
          </TextStyled>
          <TextStyled fz={5} lh={6} pl={4}>
            Владиславович
          </TextStyled>
          <TextStyled fz={5} lh={6} pl={4}>
            12.12.1984
          </TextStyled>
          <TextStyled fz={5} lh={6} pl={4}>
            Специалист по технической документации.
          </TextStyled>
          <TextStyled fz={5} lh={6} pl={4}>
            8-999-888-77-66
          </TextStyled>
          <TextStyled fz={5} lh={6} pl={4} mb={-2}>
            email@mail.ru
          </TextStyled>
        </BoxStyled>
      </Fragment>
    );
  }
}

export default PersonData;

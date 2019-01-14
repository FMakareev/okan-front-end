import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**Components*/
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Styles property */
import { FontFamilyProperty } from '../../../../styles/styleProperty/FontFamilyProperty';
import { BorderColorProperty } from '../../../../styles/styleProperty/BorderColorProperty';
import { BorderRadiusProperty } from '../../../../styles/styleProperty/BorderRadiusProperty';

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

export class FormPersonData extends Component {
  static propTypes = {
    /** last name user*/
    lastName: PropTypes.string /** first name user*/,
    firstName: PropTypes.string /** patronymic user*/,
    patronymic: PropTypes.string /** birth date user*/,
    birthdate: PropTypes.string /** position user*/,
    position: PropTypes.string /** phone user*/,
    phone: PropTypes.string /** email user*/,
    email: PropTypes.string,
    mb: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { lastName, firstName, patronymic, birthdate, position, phone, email } = this.props;

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
            {lastName}
          </Text>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            {firstName}
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            {patronymic}
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            {birthdate}
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            {position}
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4}>
            {phone}
          </TextStyled>
          <TextStyled fontSize={5} lineHeight={7} pl={4} mb={-2}>
            {email}
          </TextStyled>
        </BoxStyled>
      </Fragment>
    );
  }
}

export default FormPersonData;

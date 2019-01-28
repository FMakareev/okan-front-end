import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { reduxForm, Form, getFormValues } from 'redux-form';

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
    lastname: PropTypes.string /** first name user*/,
    firstname: PropTypes.string /** patronymic user*/,
    patronymic: PropTypes.string /** birth date user*/,
    birthdate: PropTypes.string /** position user*/,
    position: PropTypes.string /** phone user*/,
    phone: PropTypes.string /** email user*/,
    email: PropTypes.string,
    mb: PropTypes.string,
  };

  state = {};

  submit = value => {
    console.log('value', value);
  };
  render() {
    const {
      handleSubmit,
      initialValues: { lastname, firstname, patronymic, birthdate, position, phone, email },
    } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
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
          {lastname && (
            <Text fontSize={5} lineHeight={7} pl={4} pt={0} pb={2} fontFamily={'secondary'}>
              {lastname}
            </Text>
          )}

          {firstname && (
            <TextStyled fontSize={5} lineHeight={7} pl={4}>
              {firstname}
            </TextStyled>
          )}

          {patronymic && (
            <TextStyled fontSize={5} lineHeight={7} pl={4}>
              {patronymic}
            </TextStyled>
          )}

          {birthdate && (
            <TextStyled fontSize={5} lineHeight={7} pl={4}>
              {birthdate}
            </TextStyled>
          )}

          {position && (
            <TextStyled fontSize={5} lineHeight={7} pl={4}>
              {position}
            </TextStyled>
          )}

          {phone && (
            <TextStyled fontSize={5} lineHeight={7} pl={4}>
              {phone}
            </TextStyled>
          )}

          {email && (
            <TextStyled fontSize={5} lineHeight={7} pl={4} mb={-2}>
              {email}
            </TextStyled>
          )}
        </BoxStyled>
      </Form>
    );
  }
}

FormPersonData = connect(
  state => {
    ({ values: getFormValues('FormPersonData')(state) });
  },
  null,
)(FormPersonData);

FormPersonData = reduxForm({
  form: 'FormPersonData',
})(FormPersonData);

export default FormPersonData;

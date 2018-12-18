import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import TextFieldBase from '../../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '../../../../../components/Icons/SvgPlay';
import Box from '../../../../../components/Box/Box';

/**PropTypes */
import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderRadiusProperty from '../../../../../styles/styleProperty/BorderRadiusProperty';

const BoxStyled = styled(Box)`
  input:first-child {
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
  }
`;

export class ProfileRecoveryEmail extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);

    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {}
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form>
        <BoxStyled mb={4}>
          <Field
            name="emailRecovery"
            component={TextFieldBase}
            placeholder={'email@mail.ru'}
            type="text"
            fontSize={5}
            lineHeight={7}
            fontFamily={'secondary'}
          />
        </BoxStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Восстановить пароль'}
          rightIcon={SvgPlay()}
          ml={9}
          disabled={pristine || submitting || invalid}
          width={'100%'}
          widthIcon={'10px'}
        />
      </Form>
    );
  }
}

ProfileRecoveryEmail = reduxForm({
  form: 'ProfileRecoveryEmail',
})(ProfileRecoveryEmail);

export default ProfileRecoveryEmail;

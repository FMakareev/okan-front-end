import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import { SvgPlay } from '../../../../components/Icons/SvgPlay';
import Box from '../../../../components/Box/Box';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';

/** Validation */
import isEmail from '../../../../utils/validation/isEmail';

const BoxStyled = styled(Box)`
  input {
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
  }
`;

export class FormProfileRecoveryEmail extends Component {
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
            component={TextFieldWithTooltip}
            placeholder={'email@okan.su'}
            type="text"
            fontSize={5}
            lineHeight={7}
            fontFamily={'secondary'}
            validate={isEmail}
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

FormProfileRecoveryEmail = reduxForm({
  form: 'FormProfileRecoveryEmail',
})(FormProfileRecoveryEmail);

export default FormProfileRecoveryEmail;

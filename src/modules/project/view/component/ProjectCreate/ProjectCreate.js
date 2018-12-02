import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

/**View */
import TextFieldBase from '../../../../../components/TextFieldBase/TextFieldBase';
import ButtonWithImage from '../../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../../components/Text/Text';
import Box from '../../../../../components/Box/Box';
import PictureUploadPreview from '../../../../../components/PictureUploadPreview/PictureUploadPreview';
import SelectBase from '../../../../../components/SelectBase/SelectBase';

/**Image */
import { SvgPlay } from '../../../../../components/Icons/SvgPlay';

/**PropTypes */
import { formPropTypes } from '../../../../../propTypes/Forms/FormPropTypes';

const BoxStyled = styled(Box)`
  input {
    border-radius: 5px;
    text-align: center;
    font-family: ${props => {
      // if ((props.meta && props.meta.active) || props.meta.dirty) {
      //   return props.theme.fontFamily.secondary;
      // }
      // return props.theme.fontFamily.secondaryBold;
      return console.log(props);
    }};
  }
`;

export class ProjectCreate extends Component {
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
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={6} fontFamily={'primary500'}>
          Номер проекта
        </Text>

        <BoxStyled mb={16}>
          <Field
            name="firstName"
            component={TextFieldBase}
            placeholder={'Название документа'}
            type="text"
            fontSize={5}
            lineHeight={6}
          />
        </BoxStyled>

        <Text fz={6} lh={7} color={'color7'} textAlign={'center'} mb={6} fontFamily={'primary500'}>
          Список шаблонов
        </Text>

        <BoxStyled mb={'180px'}>
          <Field
            name="firstName"
            component={SelectBase}
            placeholder={'Название документа'}
            type="text"
            fontSize={5}
            lineHeight={6}
          />
        </BoxStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать проект'}
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

ProjectCreate = reduxForm({
  form: 'ProjectCreate',
})(ProjectCreate);

export default ProjectCreate;

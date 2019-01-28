import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, FieldArray, getFormValues } from 'redux-form';

/**View */
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import TextFieldArray from '../../../../components/TextFieldArray/TextFieldArray';

/**Image */
import { SvgSave } from '../../../../components/Icons/SvgSave';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

/** Graphql schema */
import ProjectSettingsMutation from './ProjectSettingsMutation.graphql';

const BoxStyled = styled(Box)`
  input {
    padding: 3px 7px;
    border: 0;
    text-align: center;
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
    ${props => FontSizeProperty({ ...props, fontSize: 6 })};
    ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
  }

  border: 1px solid;
  ${props => BorderColorProperty({ ...props, borderColor: 'color4' })};
  ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
`;

const notificationOpts = () => ({
  success: {
    title: 'Настройки проекта успешно обновлены',
    message: 'Настройки проекта успешно обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Настройки проекта не обновлены',
    message: 'Настройки проекта не обновлены',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class ProjectSettings extends Component {
  static propTypes = { ...formPropTypes, mb: PropTypes.string };

  state = {};

  submit = value => {
    const data = { variables: Object.assign({}, value) };
    console.log('data', data);

    return this.props['@apollo/update'](data)
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);

        return response;
      })
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        this.props.setNotificationError(notificationOpts().error);

        if (graphQLErrors) {
          throw new SubmissionError({ ...this.getNetworkError(graphQLErrors) });
        } else {
          throw new SubmissionError({ _error: message });
        }
      });
  };

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <BoxStyled mb={16}>
          <Field
            name="name"
            component={TextFieldWithTooltip}
            placeholder={'Название документа'}
            type="text"
            fontSize={6}
            lineHeight={8}
            fontFamily={'secondary'}
          />
        </BoxStyled>

        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={4}
          fontFamily={'primary500'}>
          Участники проекта
        </Text>

        <Box mb={'180px'}>
          <FieldArray
            name={'partners'}
            component={TextFieldArray}
            type={'text'}
            button={'Добавить нового участника'}
          />
        </Box>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Сохранить настройки'}
          leftIcon={SvgSave()}
          mr={9}
          disabled={pristine || submitting || invalid}
          width={'100%'}
          widthIcon={'16px'}
        />
      </Form>
    );
  }
}

ProjectSettings = graphql(ProjectSettingsMutation, {
  name: '@apollo/update',
})(ProjectSettings);

ProjectSettings = connect(
  state => ({
    values: getFormValues('ProjectSettings')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(ProjectSettings);

ProjectSettings = reduxForm({
  form: 'ProjectSettings',
})(ProjectSettings);

export default ProjectSettings;

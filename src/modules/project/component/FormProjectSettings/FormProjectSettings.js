import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, Query } from 'react-apollo';
import styled from 'styled-components';
import { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, FieldArray, getFormValues } from 'redux-form';
import UserListQuery from './UserListQuery.graphql';
import { Redirect } from 'react-router-dom';

/**View */
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import TextFieldArray from '@lib/ui/TextFieldArray/TextFieldArray';
import { CheckboxBase } from '@lib/ui/CheckboxBase/CheckboxBase';

/**Image */
import { SvgSave } from '@lib/ui/Icons/SvgSave';

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

export class FormProjectSettings extends Component {
  static propTypes = { ...formPropTypes, mb: PropTypes.string };

  state = this.initialState;

  get initialState() {
    return { redirect: null };
  }

  submit = value => {
    const data = { variables: Object.assign({}, value) };
    console.log('ProjectSettings', data);

    return this.props['@apollo/update'](data)
      .then(response => {
        console.log(response);
        this.props.setNotificationSuccess(notificationOpts().success);
        this.setState(() => ({ redirect: '/app/project-list' }));

        return response;
      })
      .catch(({ graphQLErrors, message, networkError, ...rest }) => {
        console.log('graphQLErrors: ', graphQLErrors);
        console.log('message: ', message);
        console.log('networkError: ', networkError);
        console.log('rest: ', rest);
        this.props.setNotificationError(notificationOpts().error);

        throw new SubmissionError({ _error: message });
      });
  };

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

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
          Согласующие
        </Text>

        <Box mb={'45px'}>
          <Query query={UserListQuery}>
            {({ loading, data }) => {
              // console.log('FormProjectSettings', data);

              return (
                <Field
                  isLoading={loading}
                  name={'partners'}
                  component={TextFieldArray}
                  type={'text'}
                  labelKey={'name'}
                  valueKey={'id'}
                  options={
                    data &&
                    data.userlist &&
                    data.userlist.map(item => ({
                      id: item.id,
                      name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
                    }))
                  }
                />
              );
            }}
          </Query>
        </Box>

        <Box mb={'90px'}>
          <Field component={CheckboxBase} name={'isTemplate'}>
            <Text fontFamily={'primary300'} fontSize={6} lineHeight={8} color={'color11'} ml={20}>
              Сделать проект шаблоном
            </Text>
          </Field>
        </Box>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Сохранить настройки'}
          leftIcon={SvgSave()}
          mr={9}
          disabled={submitting || invalid}
          width={'100%'}
          widthIcon={'16px'}
        />
      </Form>
    );
  }
}

FormProjectSettings = graphql(ProjectSettingsMutation, {
  name: '@apollo/update',
})(FormProjectSettings);

FormProjectSettings = connect(
  state => ({
    values: getFormValues('FormProjectSettings')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormProjectSettings);

FormProjectSettings = reduxForm({
  form: 'FormProjectSettings',
})(FormProjectSettings);

export default FormProjectSettings;

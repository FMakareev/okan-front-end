import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, Query } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';

import { withRouter } from 'react-router-dom';

/**View */
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';
import Text from '@lib/ui/Text/Text';
import Box from '@lib/ui/Box/Box';
import SelectBase from '@lib/ui/SelectBase/SelectBase';

/**Image */
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

/** Graphql schema */
import TemplateListQuery from './TemplateListQuery.graphql';
import CreateProjectMutation from './CreateProjectMutation.graphql';

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
    title: 'Проект создан',
    message: 'Проект создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Проект не создан',
    message: 'Проект не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormProjectCreate extends Component {
  static propTypes = { ...formPropTypes };

  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
  }

  submit(value) {
    const data = { variables: Object.assign({}, value) };
    console.log('data', data);

    return this.props['@apollo/create'](data)
      .then(response => {
        console.log('response: ', response);
        const { data, error } = response;
        if (data && data.createproject && data.createproject.project) {
          this.props.setNotificationSuccess(notificationOpts().success);
          this.props.history.push(`/app/project-settings/${data.createproject.project.id}`);
          return response;
        } else if (error) {
          throw error;
        }
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
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={6}
          fontFamily={'primary500'}>
          Номер проекта
        </Text>

        <BoxStyled mb={16}>
          <Field
            name={'name'}
            component={TextFieldWithTooltip}
            placeholder={'Введите название проекта ...'}
            type={'text'}
            fontSize={5}
            lineHeight={6}
            fontFamily={'secondary'}
          />
        </BoxStyled>

        <Text
          fontSize={6}
          lineHeight={8}
          color={'color7'}
          textAlign={'center'}
          mb={6}
          fontFamily={'primary500'}>
          Список шаблонов
        </Text>

        <BoxStyled mb={'180px'}>
          <Query query={TemplateListQuery}>
            {({ data, loading, error }) => {
              // console.log(data, loading, error);

              return (
                <Field
                  name={'template'}
                  component={SelectBase}
                  disabled={loading}
                  placeholder={'Выберите шаблон для проекта ...'}
                  type={'text'}
                  fontSize={5}
                  lineHeight={6}
                  options={data && data.templatelist}
                  labelKey={'name'}
                  valueKey={'id'}
                />
              );
            }}
          </Query>
        </BoxStyled>

        <ButtonWithImage
          type="submit"
          variant={'large'}
          size={'medium'}
          children={'Создать'}
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

FormProjectCreate = graphql(CreateProjectMutation, {
  name: '@apollo/create',
})(FormProjectCreate);

FormProjectCreate = connect(
  state => ({
    values: getFormValues('FormProjectCreate')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormProjectCreate);

FormProjectCreate = reduxForm({
  form: 'FormProjectCreate',
})(FormProjectCreate);

FormProjectCreate = withRouter(FormProjectCreate);

export default FormProjectCreate;

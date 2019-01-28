import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';

/**View */
import TextFieldWithTooltip from '../../../../components/TextFieldWithTooltip/TextFieldWithTooltip';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';
import Text from '../../../../components/Text/Text';
import Box from '../../../../components/Box/Box';
import SelectBase from '../../../../components/SelectBase/SelectBase';

/**Image */
import { SvgPlay } from '../../../../components/Icons/SvgPlay';

/**PropTypes */
import { formPropTypes } from '../../../../propTypes/Forms/FormPropTypes';

/** Styles property */
import BorderColorProperty from '../../../../styles/styleProperty/BorderColorProperty';
import BorderRadiusProperty from '../../../../styles/styleProperty/BorderRadiusProperty';
import FontSizeProperty from '../../../../styles/styleProperty/FontSizeProperty';
import LineHeightProperty from '../../../../styles/styleProperty/LineHeightProperty';

/** Graphql schema */
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

const options = [
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
  { value: 'E6 - OK-186-346', label: 'E6 - OK-186-346' },
  { value: 'ТЗ - RK-186-344', label: 'ТЗ - RK-186-344' },
];

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

export class ProjectCreate extends Component {
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
            placeholder={'Название документа'}
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
          <Field
            name={'customercode'}
            component={SelectBase}
            placeholder={'Название документа'}
            type={'text'}
            fontSize={5}
            lineHeight={6}
            options={options}
            labelKey={'label'}
            valueKey={'value'}
          />
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

ProjectCreate = graphql(CreateProjectMutation, {
  name: '@apollo/create',
})(ProjectCreate);

ProjectCreate = connect(
  state => ({
    values: getFormValues('ProjectCreate')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(ProjectCreate);

ProjectCreate = reduxForm({
  form: 'ProjectCreate',
})(ProjectCreate);

export default ProjectCreate;

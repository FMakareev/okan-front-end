import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Container from '../../../../components/Container/Container';
import ButtonWithImage from '../../../../components/ButtonWithImage/ButtonWithImage';

/**Image */
import { SvgSave } from '../../../../components/Icons/SvgSave';

/** Components */
import SettingsUser from './SettingsUser';
import SettingsNameDocument from './SettingsNameDocument';
import TitlePage from './TitlePage';

/** Graphql schema */
import DocumentSettingsMutation from './DocumentSettingsMutation.graphql';
import UserListQuery from './UserListQuery.graphql';

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

const has = Object.prototype.hasOwnProperty;

export class DocumentSettings extends Component {
  static propTypes = { ...ReactRoutePropTypes };

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
        <Flex mt={9} justifyContent={'space-around'}>
          <Box>
            <Container maxWidth={'500px'} width={'100%'}>
              <Query query={UserListQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return 'Загрузка...';
                  }
                  if (error) {
                    return 'Произошла ошибка.';
                  }

                  // if (!data || (data && !has.call(data, 'projectlist'))) {
                  //   return null;
                  // }
                  return <SettingsUser data={data.userlist} />;
                }}
              </Query>
            </Container>

            <Container maxWidth={'500px'} width={'100%'}>
              <SettingsNameDocument />
            </Container>
          </Box>

          <Container maxWidth={'400px'} width={'100%'}>
            <TitlePage />
          </Container>
        </Flex>

        <Flex justifyContent={'center'}>
          <ButtonWithImage
            type="submit"
            variant={'large'}
            size={'medium'}
            children={'Сохранить настройки'}
            leftIcon={SvgSave()}
            mr={9}
            disabled={pristine || submitting || invalid}
            width={'500px'}
            widthIcon={'16px'}
          />
        </Flex>
      </Form>
    );
  }
}

DocumentSettings = graphql(DocumentSettingsMutation, {
  name: '@apollo/update',
})(DocumentSettings);

DocumentSettings = connect(
  state => ({
    values: getFormValues('DocumentSettings')(state),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(DocumentSettings);

DocumentSettings = reduxForm({
  form: 'DocumentSettings',
})(DocumentSettings);

export default DocumentSettings;

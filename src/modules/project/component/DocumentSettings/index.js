import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Fields, Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Box from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

/**Image */
import { SvgSave } from '@lib/ui/Icons/SvgSave';

/** Components */
import SettingsUser from './SettingsUser';
import SettingsNameDocument from './SettingsNameDocument';
import TitlePage from './TitlePage';

/** Graphql schema */
import UserListQuery from './UserListQuery.graphql';
import DocumentSettingsMutation from './DocumentSettingsMutation.graphql';

/** Redux reducers*/
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const BoxStyled = styled(Box)`
  input {
    ${props => BorderRadiusProperty({ ...props, borderRadius: '5px' })};
    ${props => FontSizeProperty({ ...props, fontSize: 6 })};
    ${props => LineHeightProperty({ ...props, lineHeight: 8 })};
    padding: 3px 7px;
    border: 0;
    text-align: center;
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

const has = Object.prototype.hasOwnProperty;

const sleep = ms =>
  new Promise(resolve => {
    return setInterval(resolve, ms);
  });

export class DocumentSettings extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  submit = value => {
    const data = { variables: Object.assign({}, value) };
    console.log('DocumentSettings', data);

    return this.props['@apollo/update'](data)
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);
        return response;
      })
      .then(response => {
        return sleep(1000);
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
    const { handleSubmit, pristine, submitting, invalid, user } = this.props;

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
                  if (!data || (data && !has.call(data, 'userlist'))) {
                    return null;
                  }
                  return <SettingsUser data={data.userlist} />;
                }}
              </Query>
            </Container>

            <Container maxWidth={'500px'} width={'100%'}>
              <Fields
                names={['name', 'customercode', 'okancode']}
                component={SettingsNameDocument}
              />
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

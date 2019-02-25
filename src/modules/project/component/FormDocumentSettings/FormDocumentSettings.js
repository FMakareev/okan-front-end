import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import Notifications, { success, error } from 'react-notification-system-redux';
import { Fields, Field, reduxForm, SubmissionError, Form, getFormValues } from 'redux-form';
import { Redirect } from 'react-router-dom';

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
import ProjectItemQuery from './ProjectItemQuery.graphql';
import FormDocumentSettingsMutation from './FormDocumentSettingsMutation.graphql';
import DocumentItemQuery from '../../view/documentSettings/DocumentItemQuery.graphql';

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

export class FormDocumentSettings extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = this.initialState;

  get initialState() {
    return { redirect: null };
  }

  submit = value => {
    // console.log('FormDocumentSettings', value);
    const data = {
      variables: Object.assign({}, value),
      update: (store, response) => {
        try {
          const {
            data: { updatedocument },
          } = response;

          const data = store.readQuery({ query: DocumentItemQuery });

          data.documentitem.push(updatedocument.document);

          store.writeQuery({ query: DocumentItemQuery, data });
        } catch (e) {
          console.error('Error in FormProjectCreate, method submit : ', e);
        }
      },
    };
    console.log('FormDocumentSettings', data);

    return this.props['@apollo/update'](data)
      .then(response => {
        this.props.setNotificationSuccess(notificationOpts().success);
        this.setState(() => ({ redirect: `/app/project/${data.variables.project}` }));

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
    const {
      handleSubmit,
      submitting,
      invalid,
      initialValues: { project },
    } = this.props;

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex mt={9} justifyContent={'space-around'}>
          <Box width={'55%'}>
            <Container maxWidth={'500px'} width={'100%'}>
              <Query query={ProjectItemQuery} variables={{ id: project }}>
                {({ loading, error, data }) => {
                  console.log('FormDocumentSettings', data);
                  if (loading) {
                    return 'Загрузка...';
                  }
                  if (error) {
                    return 'Произошла ошибка.';
                  }
                  if (!data || (data && !has.call(data, 'projectitem'))) {
                    return null;
                  }
                  return (
                    <Field
                      component={SettingsUser}
                      options={
                        data.projectitem &&
                        data.projectitem.partners.map(item => ({
                          id: item.id,
                          name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
                        }))
                      }
                      name={'partners'}
                    />
                  );
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
        </Flex>

        <Flex justifyContent={'center'}>
          <ButtonWithImage
            type="submit"
            variant={'large'}
            size={'medium'}
            children={'Сохранить настройки'}
            leftIcon={SvgSave()}
            mr={9}
            disabled={submitting || invalid}
            width={'500px'}
            widthIcon={'16px'}
          />
        </Flex>
      </Form>
    );
  }
}

FormDocumentSettings = graphql(FormDocumentSettingsMutation, {
  name: '@apollo/update',
})(FormDocumentSettings);

FormDocumentSettings = connect(
  state => {
    return { values: getFormValues('FormDocumentSettings')(state) };
  },
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormDocumentSettings);

FormDocumentSettings = reduxForm({
  form: 'FormDocumentSettings',
})(FormDocumentSettings);

export default FormDocumentSettings;

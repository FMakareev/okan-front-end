import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Field, reduxForm, Form, getFormValues } from 'redux-form';

/** View */
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import SvgSidebarAdd from '@lib/ui/Icons/SvgSidebarAdd';
import { Flex } from '@lib/ui/Flex/Flex';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import { Box } from '@lib/ui/Box/Box';

/** Graphql schema */
import ProjectItemQuery from '../../view/projectEditor/ProjectItemQuery.graphql';
import CreateDocumentQuery from './CreateDocumentQuery.graphql';

const notificationOpts = () => ({
  success: {
    title: 'Раздел создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Раздел не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormCreateDocument extends Component {
  submit = value => {
    const { project } = this.props;

    return this.props['@apollo/create']({
      variables: {
        ...value,
        projectid: project.project.id,
      },
      /** @link https://www.apollographql.com/docs/angular/features/cache-updates.html#directAccess */
      update: (store, { data: { createdocument } }) => {
        // считываем из локального кеша аполо по запросу данные
        // TODO: добавить вывод сообщений о ошбках через redux-notification
        const data = store.readQuery({
          query: ProjectItemQuery,
          variables: {
            id: this.props.project.project.id,
          },
        }); // пушим наш только что созданный документ в список всех документов
        data.projectitem.documents.push(createdocument.document);

        // записываем в кеш обновленный список документов
        store.writeQuery({
          query: ProjectItemQuery,
          variables: {
            id: this.props.project.project.id,
          },
          data,
        });
      },
    })
      .then(response => {
        console.log(response);
        this.props.setNotificationSuccess(notificationOpts().success);
        this.props.reset();
      })
      .catch(error => {
        this.props.setNotificationError(notificationOpts().error);

        console.log(error);
      });
  };

  render() {
    const { submitting, handleSubmit, submitSucceeded, project } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex py={4} pl={'10px'} pr={'12px'} alignItems={'center'}>
          <Box height={'20px'} width={'100%'}>
            <Mutation mutation={CreateDocumentQuery}>
              {(mutate, { loading, error, data }) => {
                if (loading) return <p>Loading...</p>;

                return (
                  <Field
                    name={'name'}
                    disabled={submitting}
                    component={TextFieldWithTooltip}
                    placeholder={'Введите название документа...'}
                    size={'xs'}
                    type={'text'}
                    borderRadius={'4px'}
                    onBlur={event => {
                      mutate({
                        variables: {
                          name: event.target.value,
                          projectid: project.project.id,
                        },
                        /** @link https://www.apollographql.com/docs/angular/features/cache-updates.html#directAccess */
                        update: (store, { data: { createdocument } }) => {
                          // считываем из локального кеша аполо по запросу данные
                          // TODO: добавить вывод сообщений о ошбках через redux-notification
                          const data = store.readQuery({
                            query: ProjectItemQuery,
                            variables: {
                              id: this.props.project.project.id,
                            },
                          }); // пушим наш только что созданный документ в список всех документов
                          data.projectitem.documents.push(createdocument.document);

                          // записываем в кеш обновленный список документов
                          store.writeQuery({
                            query: ProjectItemQuery,
                            variables: {
                              id: this.props.project.project.id,
                            },
                            data,
                          });
                        },
                      })
                        .then(response => {
                          console.log(response);
                          this.props.setNotificationSuccess(notificationOpts().success);
                          this.props.reset();
                        })
                        .catch(error => {
                          this.props.setNotificationError(notificationOpts().error);

                          console.log(error);
                        });
                    }}
                  />
                );
              }}
            </Mutation>
          </Box>

          <Box ml={'3'} height={'20px'}>
            <ButtonBase
              disabled={submitting}
              title={'Добавить документ'}
              size={'small'}
              variant={'empty'}>
              <SvgSidebarAdd />
            </ButtonBase>
          </Box>
        </Flex>
      </Form>
    );
  }
}

FormCreateDocument = graphql(CreateDocumentQuery, {
  name: '@apollo/create',
})(FormCreateDocument);

FormCreateDocument = reduxForm({
  form: 'FormCreateDocument',
})(FormCreateDocument);

FormCreateDocument = connect(
  state => {
    return { values: getFormValues('FormCreateDocument')(state) };
  },
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormCreateDocument);

export default FormCreateDocument;

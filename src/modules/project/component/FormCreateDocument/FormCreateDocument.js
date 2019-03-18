import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';
import { connect } from 'react-redux';
import { Field, reduxForm, Form, getFormValues } from 'redux-form';

/** View */
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import { Flex } from '@lib/ui/Flex/Flex';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import { Box } from '@lib/ui/Box/Box';

/** Image */
import SvgSidebarAdd from '@lib/ui/Icons/SvgSidebarAdd';

/** Graphql schema */
import ProjectItemQuery from '../../graphql/ProjectItemQuery.graphql';
import CreateDocumentQuery from '../../graphql/CreateDocumentQuery.graphql';

const notificationOpts = () => ({
  success: {
    title: 'Документ создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Документ не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class FormCreateDocument extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    project: PropTypes.object,
    reset: PropTypes.func,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool
  };

  createDocument = (value) => {
    if (!value.name || !value.name.length) return;
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
      .then(() => {
        this.props.setNotificationSuccess(notificationOpts().success);
        this.props.reset();
      })
      .catch(error => {
        this.props.setNotificationError(notificationOpts().error);

        console.error('Error createDocument: ',error);
      });
  };

  render() {
    const { submitting, handleSubmit,  } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.createDocument)}>
        <Flex py={4} pl={'10px'} pr={'12px'} alignItems={'center'} mb={'150px'}>
          <Box mt={'-6px'} height={'20px'} width={'100%'}>
            <Mutation mutation={CreateDocumentQuery}>
              {(mutate, { loading }) => {
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
                    onBlur={handleSubmit(this.createDocument)}
                    autoComplete="off"
                  />
                );
              }}
            </Mutation>
          </Box>

          <Box ml={'3'} height={'20px'}>
            <ButtonBase
              type={'submit'}
              disabled={submitting}
              title={'Добавить документ'}
              size={'small'}
              variant={'outlineGray'}
              p={'2px'}
              fontSize={'15px'}
            >
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

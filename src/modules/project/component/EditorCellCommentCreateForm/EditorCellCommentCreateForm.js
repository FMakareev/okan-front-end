import React, { Component } from 'react';
import { Field, reduxForm, Form, getFormValues } from 'redux-form';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import { Query, withApollo } from 'react-apollo';

/** View */
import TextAreaBase from '../../../../components/TextAreaBase/TextAreaBase';

/** Graphql Schema */
import CreateCommentMutation from './CreateCommentMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import CellItemQuery from './CellItemQuery.graphql';

const notificationOpts = () => ({
  success: {
    title: 'Комментарий создан',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Комментарий не создан',
    position: 'tr',
    autoDismiss: 2,
  },
});

const sleep = ms =>
  new Promise(resolve => {
    return setInterval(resolve, ms);
  });

export class EditorCellCommentCreateForm extends Component {
  onClickCreateComment = value => {
    return this.props['@apollo/create']({
      variables: {
        message: value.comment,
        sender: this.props.userId,
        cell: this.props.cellId,
      },
      /** @link https://www.apollographql.com/docs/angular/features/cache-updates.html#directAccess */
      update: (store, { data: { createcomment } }) => {
        // считываем из локального кеша аполо по запросу данные

        const options = { query: CellListQuery, variables: { parent: this.props.cellId } };

        let data = store.readQuery(options);

        // пушим наш только что созданный документ в список всех документов
        data.celllist.map(item => item.comments.push(createcomment.comment));
        console.log(111, data.celllist.map(item => item.comments));

        // // записываем в кеш обновленный список документов
        store.writeQuery({ ...options, data });
      },
    })
      .then(response => {
        // console.log(response);
        this.props.setNotificationSuccess(notificationOpts().success);
        this.props.reset();
        return sleep(30000);
      })
      .catch(error => {
        this.props.setNotificationError(notificationOpts().error);

        console.log(error);
      });
  };

  componentWillUnmount() {
    clearInterval(sleep);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onClickCreateComment)}>
        <Field
          name={'comment'}
          component={TextAreaBase}
          size={'md'}
          color={'color7'}
          onBlur={handleSubmit(this.onClickCreateComment)}
        />
      </Form>
    );
  }
}

EditorCellCommentCreateForm = reduxForm({
  form: 'EditorCellCommentCreateForm',
})(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = graphql(CreateCommentMutation, {
  name: '@apollo/create',
})(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = connect(
  state => {
    return { values: getFormValues('EditorCellCommentCreateForm')(state) };
  },
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellCommentCreateForm);

EditorCellCommentCreateForm = withApollo(EditorCellCommentCreateForm);

export default EditorCellCommentCreateForm;

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CreateCellMutation from './CreateCellMutation.graphql';
import UpdateDocumentMutation from './UpdateDocumentMutation.graphql';
import ProjectItemQuery from '../../view/projectEditor/ProjectItemQuery.graphql';
import { ButtonBase } from '@lib/ui/ButtonBase/ButtonBase';
import SvgSidebarAdd from '@lib/ui/Icons/SvgSidebarAdd';
import { Flex } from '@lib/ui/Flex/Flex';
import { Field, reduxForm, Form } from 'redux-form';
import TextFieldWithTooltip from '@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip';
import { Box } from '@lib/ui/Box/Box';
import { connect } from 'react-redux';
import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { error, success } from 'react-notification-system-redux';

const notificationOpts = name => {
  return {
    success: {
      title: `Раздел создан.`,
      message: `В документе ${name} добавлен раздел.`,
      position: 'tr',
      autoDismiss: 6,
    },
    error: {
      title: `Произошла ошибка.`,
      message: `Раздел в документе ${name} не создан.`,
      position: 'tr',
      autoDismiss: 6,
    },
  };
};

export class FormCreateFirstCell extends Component {
  SubmitCreateCell = value => {
    const { project } = this.props;
    return this.props['CreateCellMutation']({
      variables: {
        ...value,
        isHead: true,
        projectid: project.project.id,
      },
    }).catch(error => {
      console.log('Error SubmitCreateCell:', error);
    });
  };

  // TODO: Добавить методы для уведомления о успехе или ошибке
  /**
   * @param {string} children - id дочерней ячейки которая присваивается документу
   * @desc метод для обновления документа
   * */
  SubmitUpdateDocument = children => {
    const { project, document, setNotificationSuccess, setNotificationError } = this.props;
    return this.props['UpdateDocumentMutation']({
      variables: {
        id: document.id,
        children: children,
      },
      update: (store, { data: { updatedocument } }) => {
        console.log('FormCreateFirstCell updatedocument.document: ', updatedocument.document);
        const data = store.readQuery({
          query: ProjectItemQuery,
          variables: {
            id: updatedocument.document.project,
          },
        });
        // пушим наш только что созданный документ в список всех документов
        let documentIndex = data.projectitem.documents.findIndex(
          item => item.id === updatedocument.document.id,
        );
        data.projectitem.documents[documentIndex] = updatedocument.document;

        store.writeQuery({
          query: ProjectItemQuery,
          variables: {
            id: updatedocument.document.project,
          },
          data,
        });
        setNotificationSuccess(notificationOpts(updatedocument.document.name).success);
      },
    }).catch(error => {
      console.log('Error SubmitUpdateDocument:', error);
      setNotificationError(notificationOpts(document.name).error);
    });
  };

  submit = value => {
    this.SubmitCreateCell(value).then(response => {
      const { data } = response;
      this.SubmitUpdateDocument(data.createcell.cell.id);
    });
  };

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex pb={4} pl={'10px'} pr={'12px'} alignItems={'center'}>
          <Box height={'20px'} width={'100%'}>
            <Field
              name={'name'}
              disabled={submitting}
              component={TextFieldWithTooltip}
              placeholder={'Введите название раздела...'}
              size={'xs'}
              type={'text'}
              borderRadius={'4px'}
            />
          </Box>
          <Box ml={'3'} height={'20px'}>
            <ButtonBase
              disabled={submitting}
              title={'Добавить раздел'}
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

FormCreateFirstCell = graphql(UpdateDocumentMutation, {
  name: 'UpdateDocumentMutation',
})(FormCreateFirstCell);
FormCreateFirstCell = graphql(CreateCellMutation, {
  name: 'CreateCellMutation',
})(FormCreateFirstCell);

FormCreateFirstCell = reduxForm({
  form: 'FormCreateFirstCell',
})(FormCreateFirstCell);
FormCreateFirstCell = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(FormCreateFirstCell);
export default FormCreateFirstCell;

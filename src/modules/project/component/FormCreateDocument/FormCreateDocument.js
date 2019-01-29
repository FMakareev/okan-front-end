import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import CreateDocumentQuery from './CreateDocumentQuery.graphql';
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import SvgSidebarAdd from "@lib/ui/Icons/SvgSidebarAdd";
import {Flex} from "@lib/ui/Flex/Flex";
import {Field, reduxForm, Form} from 'redux-form';
import TextFieldWithTooltip from "@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip";
import {Box} from "@lib/ui/Box/Box";
import ProjectItemQuery from '../../view/projectEditor/ProjectItemQuery.graphql';

export class FormCreateDocument extends Component {

  submit = (value) => {
    return this.props['@apollo/create']({
      variables: value,
      /** @link https://www.apollographql.com/docs/angular/features/cache-updates.html#directAccess */
      update: (store, {data: {createdocument}}) => {
        // считываем из локального кеша аполо по запросу данные
        // TODO: добавить вывод сообщений о ошбках через redux-notification
        const data = store.readQuery({
          query: ProjectItemQuery,
          variables: {
            id: this.props.project.project.id
          }
        });
        console.log('data: ', data);

        // пушим наш только что созданный документ в список всех документов
        data.projectitem.documents.push(createdocument);

        // записываем в кеш обновленный список документов
        store.writeQuery({
          query: ProjectItemQuery,
          variables: {
            id: this.props.project.project.id
          },
          data
        });
      },
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  render() {
    const {submitting, handleSubmit} = this.props;
    console.log('this.props: ', this.props);
    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Flex py={4} pl={'10px'} pr={'12px'} alignItems={'center'}>
          <Box
            height={'20px'}
            width={'100%'}
          >
            <Field
              name={'name'}
              disabled={submitting}
              component={TextFieldWithTooltip}
              placeholder={'Введите название документа...'}
              size={'xs'}
              type={"text"}
              borderRadius={'4px'}
            />
          </Box>
          <Box
            ml={'3'}
            height={'20px'}
          >
            <ButtonBase
              disabled={submitting}
              title={'Добавить документ'}
              size={'small'}
              variant={'empty'}>
              <SvgSidebarAdd/>
            </ButtonBase>
          </Box>
        </Flex>
      </Form>)
  }
}

FormCreateDocument = graphql(CreateDocumentQuery, {
  name: '@apollo/create'
})(FormCreateDocument);

FormCreateDocument = reduxForm({
  form: 'FormCreateDocument',
})(FormCreateDocument);

export default FormCreateDocument;

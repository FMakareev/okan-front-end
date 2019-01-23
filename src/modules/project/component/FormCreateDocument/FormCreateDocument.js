import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import CreateDocumentQuery from './CreateDocumentQuery.graphql';
import {ButtonBase} from "@lib/ui/ButtonBase/ButtonBase";
import SvgSidebarAdd from "@lib/ui/Icons/SvgSidebarAdd";
import {Flex} from "@lib/ui/Flex/Flex";
import {Field, reduxForm, Form} from 'redux-form';
import TextFieldWithTooltip from "@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip";
import {Box} from "@lib/ui/Box/Box";
import DocumentListQuery from '../ProjectSidebar/DocumentListQuery.graphql';

export class FormCreateDocument extends Component {

  submit = (value) => {
    return this.props['@apollo/create']({
      variables: value,
      /** @link https://www.apollographql.com/docs/angular/features/cache-updates.html#directAccess */
      update: (store, {data: {createdocument}}) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({
          query: DocumentListQuery,
          variables: {
            projectid: this.props.projectid
          }
        });

        // Add our comment from the mutation to the end.
        data.documentlist.push(createdocument);
        // // Write our data back to the cache.
        store.writeQuery({
          query: DocumentListQuery,
          variables: {projectid: this.props.projectid},
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
    console.log(this.props);

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

import React from 'react';
import {Query} from "react-apollo";
import UserItemQuery from "../../graphql/UserItemQuery.graphql";
import SmallPreloader from "../../view/profile";
import {captureException} from "../../../../hocs/withSentry/withSentry";
import FormPersonData from "../FormPersonData/FormPersonData";
import ErrorView from "@lib/ui/ErrorView/ErrorView";


export const FormPersonDataWithQuery = ({id}) => (<Query
  query={UserItemQuery}
  variables={{...(id ? {id} : null)}}
  skip={!id}
>
  {({loading, error, data}) => {
    if (id && loading) {
      return <SmallPreloader/>;
    }
    if (error) {
      captureException(error, `Error UserItemQuery: `);
      return <ErrorView
        title={'Ошибка'}
        message={'Во время выполнения запроса произошла ошибка, попробуйте перезагрузить страницу, если это не поможет обратитесь к администратору.'}
      />;
    }
    if (id && data && !data.useritem) {
      return null;
    }
    return (
      <FormPersonData
        initialValues={data && Object.assign({}, {...data.useritem})}
      />
    );
  }}
</Query>);


export default FormPersonDataWithQuery;

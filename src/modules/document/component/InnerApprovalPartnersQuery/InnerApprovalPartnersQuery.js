import React from 'react';
import PropTypes from 'prop-types';
import {Query} from "react-apollo";
import {Field} from "redux-form";
import has from '../../../../utils/has';
import {InnerApprovalPartners} from "../InnerApprovalPartners/InnerApprovalPartners";

import ProjectItemQuery from './ProjectItemQuery.graphql';

export const InnerApprovalPartnersQuery = ({projectid, name}) => ( <Query
  skip={!projectid}
  query={ProjectItemQuery}
  variables={{
    id: projectid
  }}
>
  {({ loading, error, data }) => {
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
        component={InnerApprovalPartners}
        options={
          data.projectitem &&
          data.projectitem.partners.map(item => ({
            id: item.id,
            name: `${item.firstname} ${item.lastname} ${item.patronymic}`,
          }))
        }
        name={name}
      />
    );
  }}
</Query>);

InnerApprovalPartnersQuery.propTypes = {
  projectid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InnerApprovalPartnersQuery;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/** Component Helpers */
import WithProjectItem from '../WithProjectItem/WithProjectItem';

/** Graphql schema */
import DocumentItemQuery from './DocumentItemQuery.graphql';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import { PROJECT_MODE_RC } from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

export class DocumentCommenting extends Component {
  static propTypes = {
    ...ReactRoutePropTypes,
    match: PropTypes.shape({
      params: PropTypes.shape({
        cellid: PropTypes.string,
        sectionid: PropTypes.string,
        documentid: PropTypes.string,
        projectid: PropTypes.string,
      }),
    }),
  };

  state = {};

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <ErrorCatch>
        <Query
          query={DocumentItemQuery}
          variables={{ documentid: params.documentid, projectid: params.projectid }}>
          {({ loading, data, error, ...rest }) => {
            if (loading) {
              return 'Загрузка...';
            }
            if (error) {
              console.error('Error:', error);
              throw Error(error);
            }

            return (
              <WithProjectItem
                mode={PROJECT_MODE_RC}
                params={params}
                projectitem={data.projectitem}
                id={'SideBarWrapper'}
                documentitem={data.documentitem}
                sectionid={params.sectionid}
              />
            );
          }}
        </Query>
      </ErrorCatch>
    );
  }
}

export default DocumentCommenting;

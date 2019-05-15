import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/** Component Helpers */
import WithProjectItem from '../WithProjectItem/WithProjectItem';

/** Graphql schema */
import RevisionItemQuery from './RevisionItemQuery.graphql';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import { PROJECT_MODE_REVISION } from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

export class RevisionItem extends Component {
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

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <ErrorCatch>
        <Query query={RevisionItemQuery} variables={{ id: params.revisionid }}>
          {({ loading, data, error }) => {
            if (loading) {
              return 'Загрузка...';
            }
            if (error) {
              console.error('Error:', error);
              throw Error(error);
            }
            return (
              <WithProjectItem
                mode={PROJECT_MODE_REVISION}
                params={params}
                projectitem={{
                  documents: [data.revisionItem],
                  id: data.revisionItem.project,
                }}
                id={'SideBarWrapper'}
                documentitem={data.revisionItem}
                sectionid={params.sectionid}
              />
            );
          }}
        </Query>
      </ErrorCatch>
    );
  }
}

export default RevisionItem;

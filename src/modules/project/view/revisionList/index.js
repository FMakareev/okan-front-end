import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import SmallPreloader from '@lib/ui/SmallPreloader/SmallPreloader';

/**  Components*/
import RevisionList from '../../component/RevisionList/RevisionList';

/** Graphql schema */
import RevisionListQuery from './RevisionListQuery.graphql';

const has = Object.prototype.hasOwnProperty;

export class RevisionListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'800px'} width={'100%'}>
            <Query
              query={RevisionListQuery}
              variables={{
                id: params && params.id,
              }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <SmallPreloader />;
                }
                if (error) {
                  throw new Error(error);
                }
                if (!data || (data && !has.call(data, 'revisionList'))) {
                  return null;
                }

                return <RevisionList data={data.revisionList} />;
              }}
            </Query>
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default RevisionListPage;

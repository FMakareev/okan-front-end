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

export class RevisionListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      user: { id },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'800px'} width={'100%'}>
            <Query query={RevisionListQuery} variables={{ ...(id ? { id } : null) }}>
              {({ loading, error, data }) => {
                console.log('RevisionListQuery', data);
                if (id && loading) {
                  return <SmallPreloader />;
                }
                if (error) {
                  throw error;
                }
                if (id && data && !data.revisionList) {
                  throw { message: `GraphQL error: not found` };
                }
                return (
                  <RevisionList
                    initialValues={data && Object.assign({}, { ...data.revisionList })}
                  />
                );
              }}
            </Query>
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}

export default RevisionListPage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';
import SmallPreloader from '../../../../components/SmallPreloader/SmallPreloader';

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
                console.log('data', data);
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

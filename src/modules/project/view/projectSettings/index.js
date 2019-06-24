import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import ProjectItemQuery from './ProjectItemQuery.graphql';

/** Redux user */
// import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';

/** Components */
import FormProjectSettings from '../../component/FormProjectSettings/FormProjectSettings';

const has = Object.prototype.hasOwnProperty;

export class ProjectSettingsPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <Query
              query={ProjectItemQuery}
              variables={{
                id: params.id,
              }}>
              {({ data, error, loading }) => {
                if (loading) {
                  console.error('loading:', loading);
                  return 'Загрузка ...';
                }
                if (error) {
                  console.error('Error:', error);
                  throw Error(error);
                }

                if (!data || (data && !has.call(data, 'projectitem'))) {
                  return null;
                }

                return (
                  <FormProjectSettings
                    initialValues={{
                      ...data.projectitem,
                      partners: data.projectitem
                        ? data.projectitem.partners.map(item => item.id)
                        : [],
                    }}
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

// ProjectSettingsPage = connect(state => ({
//   user: getUserFromStore(state),
// }))(ProjectSettingsPage);

export default ProjectSettingsPage;

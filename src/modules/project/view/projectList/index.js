import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Link } from '@lib/ui/Link/Link';

/** components */
import ProjectList from '../../component/ProjectList/ProjectList';

/** Image */
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

/** Graphql schema */
import ProjectListQuery from './ProjectListQuery.graphql';

/** Redux reducers*/
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const has = Object.prototype.hasOwnProperty;

export class ProjectListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  state = {};

  render() {
    const { user } = this.props;

    return (
      <ErrorCatch>
        <Flex mt={9} justifyContent={'center'}>
          <Container maxWidth={'500px'} width={'100%'}>
            <Query
              variables={{
                id: user && user.id,
              }}
              query={ProjectListQuery}>
              {({ loading, error, data }) => {
                console.log('ProjectListQuery', data);
                if (loading) {
                  return 'Загрузка...';
                }
                if (error) {
                  return 'Произошла ошибка.';
                }

                // if (!data || (data && !has.call(data, 'projectlist'))) {
                //   return null;
                // }
                return <ProjectList data={data && data.projectList} />;
              }}
            </Query>

            <Link mr={6} to={`/app/project-create`} textDecoration={'none'}>
              <ButtonWithImage
                type="submit"
                variant={'large'}
                size={'medium'}
                children={'Создать проект'}
                rightIcon={<SvgPlay />}
                ml={9}
                width={'100%'}
                widthIcon={'10px'}
              />
            </Link>
          </Container>
        </Flex>
      </ErrorCatch>
    );
  }
}
ProjectListPage = connect(state => ({
  user: getUserFromStore(state),
}))(ProjectListPage);
export default ProjectListPage;

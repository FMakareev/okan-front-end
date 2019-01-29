import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';
import Flex from '../../../../components/Flex/Flex';
import Container from '../../../../components/Container/Container';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';

/** components */
import ProjectList from '../../component/ProjectList/ProjectList';

/** Image */
import { SvgPlay } from '@lib/ui/Icons/SvgPlay';

/** Graphql schema */
import ProjectListQuery from './ProjectListQuery.graphql';

/** Redux reducers*/
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

const has = Object.prototype.hasOwnProperty;

class ProjectListPage extends Component {
  static propTypes = { ...ReactRoutePropTypes };

  constructor(props) {
    super(props);
    this.state = {};
  }
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
                console.log('data', data);
                if (loading) {
                  return 'Загрузка...';
                }
                if (error) {
                  return 'Произошла ошибка.';
                }

                if (!data || (data && !has.call(data, 'projectlist'))) {
                  return null;
                }
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

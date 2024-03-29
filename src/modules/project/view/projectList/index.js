import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

import { connect } from 'react-redux';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import Flex from '@lib/ui/Flex/Flex';
import Container from '@lib/ui/Container/Container';
import { ButtonWithImage } from '@lib/ui/ButtonWithImage/ButtonWithImage';
import { Link } from '@lib/ui/Link/Link';
import PaginationPageHOC from '@lib/ui/PaginationPageHOC/PaginationPageHOC';
import PaginationPage from '@lib/ui/PaginationPage/PaginationPage';

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
            <PaginationPageHOC
              queryName={'projectList'}
              pageSize={5}
              pageNumber={1}
              queryVariables={{
                id: user && user.id,
              }}
              query={ProjectListQuery}>
              {props => (
                <PaginationPage
                  {...props}
                  data={props.data && props.data.projectList}
                  Consumer={ProjectList}
                />
              )}
            </PaginationPageHOC>

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

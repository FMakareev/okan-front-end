import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import {connect} from 'react-redux';

/** css style */
import '../../../../assets/style/editor-cell_content.css';

/** Graphql schema */
import ProjectItemQuery from '../../graphql/ProjectItemQuery.graphql';

/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import {Flex} from '@lib/ui/Flex/Flex';

/** Components */
import ProjectSidebar from '../../component/ProjectSidebar/ProjectSidebar';
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';

/** Context */
import {
  withProject,
} from '../../component/ProjectContext/ProjectContext';

/** Redux action to remove BlockId from store */
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';
import ProjectStore from "../../component/ProjectStore/ProjectStore";
import {SideBarWrapper} from "../../component/SideBarWrapper/SideBarWrapper";
import {ProjectPageWrapper} from "../../component/ProjectPageWrapper/ProjectPageWrapper";
import {ProjectEditorWrapper} from "../../component/ProjectEditorWrapper/ProjectEditorWrapper";




const ProjectEditorWithProject = withProject(props => <ProjectEditor {...props} />);
const ProjectSidebarWithProject = withProject(props => <ProjectSidebar {...props} />);

export class ProjectEditorPage extends Component {
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      match: {params},
      user,
    } = this.props;

    return (
      <Query query={ProjectItemQuery} variables={{id: params.projectid}}>
        {({loading, data, error, ...rest}) => {
          if (loading) {
            return 'Загрузка...';
          }
          if (error) {
            console.error('Error:', error);
            return 'Ошибка...';
          }
          return (
            <ErrorCatch>

              <ProjectPageWrapper>

                <ProjectStore
                  params={params}
                  projectitem={data.projectitem}
                >

                  <SideBarWrapper id={'SideBarWrapper'}>
                    <ProjectSidebarWithProject/>
                  </SideBarWrapper>

                  <ProjectEditorWrapper>
                    <ProjectEditorWithProject sectionid={params.sectionid}/>
                  </ProjectEditorWrapper>

                </ProjectStore>

              </ProjectPageWrapper>

            </ErrorCatch>
          );
        }}
      </Query>
    );
  }
}


ProjectEditorPage = connect(
  (state) => ({
    user: getUserFromStore(state),
  }),
  {removeBlock},
)(ProjectEditorPage);

export default ProjectEditorPage

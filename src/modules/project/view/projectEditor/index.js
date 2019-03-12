import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import styled from 'styled-components';
import {connect} from 'react-redux';

/** css style */
import '../../../../assets/style/editor-cell_content.css';

/** Graphql schema */
import ProjectItemQuery from './ProjectItemQuery.graphql';

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

const SideBarWrapper = styled.div`
  position: relative;
  padding-top: 10px;
  width: 340px;
  min-height: calc(100vh - 40px);
  background-color: #ffffff;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 40px);
  background-color: #e8e8e8;
`;

const EditorWrapper = styled.div`
  width: calc(100% - 380px);
  min-height: calc(100vh - 40px);
`;

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
              <Wrapper flexDirection={'row'}>
                <ProjectStore
                  params={params}
                  projectitem={data.projectitem}
                >
                  <SideBarWrapper width={'320px'}>
                    <ProjectSidebarWithProject/>
                  </SideBarWrapper>
                  <EditorWrapper
                    style={this.props.cellToCopy ? {opacity: '0.4'} : {}}
                  >
                    <ProjectEditorWithProject sectionid={params.sectionid}/>
                  </EditorWrapper>
                </ProjectStore>
              </Wrapper>
            </ErrorCatch>
          );
        }}
      </Query>
    );
  }
}


ProjectEditorPage = connect(
  (state) => ({
    ...state.blocksBinding,
    user: getUserFromStore(state),
  }),
  {removeBlock},
)(ProjectEditorPage);

export default ProjectEditorPage

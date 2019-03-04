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
  PROJECT_MODE_READ,
  PROJECT_MODE_RW,
  ProjectContext,
  withProject,
} from '../../component/ProjectContext/ProjectContext';

/** Redux action to remove BlockId from store */
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 340px;
  min-height: calc(100vh - 40px);
  padding-top: 10px;
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

  currentUserProjectAuthor = (currentUser, projectAuthor) => {
    try {
      if (currentUser.id === projectAuthor.id) {
        return PROJECT_MODE_RW;
      } else {
        return PROJECT_MODE_READ;
      }
    } catch (error) {
      console.error('Error currentUserProjectAuthor: ', error);
      return PROJECT_MODE_READ;
    }
  };

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
                <ProjectContext.Provider
                  value={{
                    // объект с параметрами роутера
                    position: params,
                    // объект с данными о проекте
                    project: data.projectitem,

                    mode: this.currentUserProjectAuthor(user, data.projectitem.author),
                  }}>
                  <SideBarWrapper width={'320px'}>
                    <ProjectSidebar {...data.projectitem} />
                  </SideBarWrapper>
                  <EditorWrapper
                    style={this.props.cellToCopy ? {opacity: '0.4'} : {}}
                  >
                    <ProjectEditorWithProject sectionid={params.sectionid}/>
                  </EditorWrapper>
                </ProjectContext.Provider>
              </Wrapper>
            </ErrorCatch>
          );
        }}
      </Query>
    );
  }
}

// export default ProjectEditorPage;
const mapStateToProps = state => {
  return {
    ...state.blocksBinding,
    user: getUserFromStore(state),
  };
};

export default connect(
  mapStateToProps,
  {removeBlock},
)(ProjectEditorPage);

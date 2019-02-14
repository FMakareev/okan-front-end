import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { connect } from 'react-redux';

/** css style */
import '../../../../assets/style/editor-cell_content.css';

/** Graphql schema */
import ProjectItemQuery from './ProjectItemQuery.graphql';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import { Flex } from '@lib/ui/Flex/Flex';

/** Components */
import ProjectSidebar from '../../component/ProjectSidebar/ProjectSidebar';
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';
import { ProjectContext, withProject } from '../../component/ProjectContext/ProjectContext';

/** Redux action to remove BlockId from store */
import { removeBlock } from '../../../../store/reducers/blocksBinding/actions';

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 340px;
  min-height: calc(100vh - 40px);
  padding-top: 10px;
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

  handleClick() {
    if (this.props.cellToCopy) {
      this.props.removeBlock();
    }
  }

  render() {
    const {
      match: { params },
    } = this.props;
    // console.log(1, this.props);

    return (
      <Query query={ProjectItemQuery} variables={{ id: params.projectid }}>
        {({ loading, data, error, ...rest }) => {
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
                  }}>
                  <SideBarWrapper width={'320px'}>
                    <ProjectSidebar
                      project={{
                        // объект с параметрами роутера
                        position: params,
                        // объект с данными о проекте
                        project: data.projectitem,
                      }}
                      {...data.projectitem}
                    />
                  </SideBarWrapper>
                  <EditorWrapper
                    style={this.props.cellToCopy ? { opacity: '0.4' } : {}}
                    onClick={() => this.handleClick()}>
                    <ProjectEditor sectionid={params.sectionid} />
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
  return state.blocksBinding;
};

export default connect(
  mapStateToProps,
  { removeBlock },
)(ProjectEditorPage);

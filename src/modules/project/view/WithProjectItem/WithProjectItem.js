import React, { Component } from 'react';

/** Components */
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';
import { withProject } from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ProjectPageWrapper } from '../../component/ProjectPageWrapper/ProjectPageWrapper';
import { ProjectStore } from '../../component/ProjectStore/ProjectStore';
import { SideBarWrapper } from '../../component/SideBarWrapper/SideBarWrapper';
import { ProjectEditorWrapper } from '../../component/ProjectEditorWrapper/ProjectEditorWrapper';
import { ProjectSidebar } from '../../component/ProjectSidebar/ProjectSidebar';

const ProjectSidebarWithProject = withProject(props => <ProjectSidebar {...props} />);
const ProjectEditorWithProject = withProject(props => <ProjectEditor {...props} />);

export class WithProjectItem extends Component {
  render() {
    const { mode, params, projectitem, id, documentitem, sectionid } = this.props;
    return (
      <ProjectPageWrapper>
        <ProjectStore mode={mode} params={params} projectitem={projectitem}>
          <SideBarWrapper id={id}>
            <ProjectSidebarWithProject documentitem={documentitem} />
          </SideBarWrapper>

          <ProjectEditorWrapper>
            <ProjectEditorWithProject sectionid={sectionid} />
          </ProjectEditorWrapper>
        </ProjectStore>
      </ProjectPageWrapper>
    );
  }
}

export default WithProjectItem;

import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react';

/** View */
import { DocumentTree } from '../DocumentTree/DocumentTree';
import FormCreateDocument from '../FormCreateDocument/FormCreateDocument';
import { PROJECT_MODE_RW, withProject } from '../ProjectContext/ProjectContext';

/** PropTypes */
import ProjectModeState from '../ProjectContext/ProjectModeState';
import {SidebarDocumentSearch} from "../SidebarDocumentSearch/SidebarDocumentSearch";

const DocumentTreeWithProject = withProject(props => <DocumentTree {...props} />);
const FormCreateDocumentWithProject = withProject(props => <FormCreateDocument {...props} />);

export class ProjectSidebar extends Component {
  static propTypes = {
    documents: PropTypes.array,
    id: PropTypes.string
  }

  render() {
    const { documents, id } = this.props;

    return (
      <Fragment>
        {documents &&
          documents.map(item => (
            <DocumentTreeWithProject data={item} key={`DocumentTree=${item.id}`} />
          ))}

        {!documents && <DocumentTreeWithProject data={this.props} key={`DocumentTree=${id}`} />}

        <ProjectModeState is={PROJECT_MODE_RW}>
          <FormCreateDocumentWithProject />
        </ProjectModeState>

        <ProjectModeState is={PROJECT_MODE_RW}>
          <SidebarDocumentSearch/>
        </ProjectModeState>
      </Fragment>
    );
  }
}

export default ProjectSidebar;

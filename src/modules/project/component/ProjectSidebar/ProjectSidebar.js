import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/** View */
import { DocumentTree } from '../DocumentTree/DocumentTree';
import FormCreateDocument from '../FormCreateDocument/FormCreateDocument';
import { PROJECT_MODE_RW, withProject } from '../ProjectContext/ProjectContext';

/** Graphql Schema */
import DocumentListQuery from './DocumentListQuery.graphql';

/** PropTypes */
import { ProjectPropTypes } from '../../../../propTypes/ProjectPropTypes';
import ProjectModeState from '../ProjectContext/ProjectModeState';

const DocumentTreeWithProject = withProject(props => <DocumentTree {...props} />);
const FormCreateDocumentWithProject = withProject(props => <FormCreateDocument {...props} />);

export class ProjectSidebar extends Component {
  static propTypes = {
    project: ProjectPropTypes,
  };

  render() {
    const { documents, id, project } = this.props;
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
      </Fragment>
    );
  }
}

export default ProjectSidebar;

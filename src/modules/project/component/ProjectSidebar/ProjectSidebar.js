import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react';

/** View */
import {DocumentTree} from '../DocumentTree/DocumentTree';
import FormCreateDocument from '../FormCreateDocument/FormCreateDocument';
import {PROJECT_MODE_RW, withProject} from '../ProjectContext/ProjectContext';

/** PropTypes */
import ProjectModeState from '../ProjectContext/ProjectModeState';
import {SidebarDocumentSearch} from "../SidebarDocumentSearch/SidebarDocumentSearch";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {getLocationSearchPhrase} from "../../utils/getLocationSearchPhrase";
import {getProject} from "../ProjectContext/ProjectContextSelectors";

const DocumentTreeWithProject = withProject(props => <DocumentTree {...props} />);
const FormCreateDocumentWithProject = withProject(props => <FormCreateDocument {...props} />);
const SidebarDocumentSearchWithProject = withProject(props => <SidebarDocumentSearch {...props} />);

export class ProjectSidebar extends Component {
  static propTypes = {
    documents: PropTypes.array,
    id: PropTypes.string,
    location: PropTypes.shape({
      search: PropTypes.string
    })
  }

  static defaultProps = {
    project: {},
  }


  render() {
    const {location, documentitem, project} = this.props;
    const documents = getProject(project, 'documents');
    return (
      <Fragment>
        {
          !documentitem && documents &&
          documents.map(item => (
            <DocumentTreeWithProject data={item} key={`DocumentTree=${item.id}`}/>
          ))
        }

        {
          documentitem && <DocumentTreeWithProject data={documentitem}/>
        }

        <ProjectModeState is={PROJECT_MODE_RW}>
          <FormCreateDocumentWithProject/>
        </ProjectModeState>

        <SidebarDocumentSearchWithProject
          initialValues={{
            name: getLocationSearchPhrase(location.search),
          }}
        />
      </Fragment>
    );
  }
}

ProjectSidebar = withRouter(ProjectSidebar);


export default ProjectSidebar;

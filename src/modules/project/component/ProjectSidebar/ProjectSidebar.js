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

  getLocationSearchPhrase = (search) => {
    try{
      return queryString.parse(search).searchPhrase
    } catch(error){
      console.error('Error: ', error);
      return null;
    }
  };

  render() {
    const {location, project: {project: {documents, id}}} = this.props;
    return (
      <Fragment>
        {documents &&
        documents.map(item => (
          <DocumentTreeWithProject data={item} key={`DocumentTree=${item.id}`}/>
        ))}

        {!documents && <DocumentTreeWithProject data={this.props} key={`DocumentTree=${id}`}/>}

        <ProjectModeState is={PROJECT_MODE_RW}>
          <FormCreateDocumentWithProject/>
        </ProjectModeState>

        <ProjectModeState is={PROJECT_MODE_RW}>
          <SidebarDocumentSearchWithProject
            initialValues={{
              name: this.getLocationSearchPhrase(location.search),
            }}
          />
        </ProjectModeState>
      </Fragment>
    );
  }
}

ProjectSidebar = withRouter(ProjectSidebar);


export default ProjectSidebar;

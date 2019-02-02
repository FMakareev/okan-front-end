import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import DocumentListQuery from './DocumentListQuery.graphql'
import {Query} from 'react-apollo';
import {DocumentTree} from "../DocumentTree/DocumentTree";
import FormCreateDocument from "../FormCreateDocument/FormCreateDocument";
import {ProjectPropTypes} from "../../../../propTypes/ProjectPropTypes";
import {withProject} from "../ProjectContext/ProjectContext";


const DocumentTreeWithProject =  withProject((props) => {
  // console.log('DocumentTreeWithProject: ',props);
  return (<DocumentTree {...props}/>)
});
const FormCreateDocumentWithProject =  withProject((props) => {
  // console.log('DocumentTreeWithProject: ',props);
  return (<FormCreateDocument {...props}/>)
});


export class ProjectSidebar extends Component {

  static propTypes = {
    project: ProjectPropTypes,
  };

  render() {
    const {
      documents
    } = this.props;

    return (<Fragment>
      {
        documents && documents.map((item, index) => (<DocumentTreeWithProject
          data={item}
          key={`DocumentTree=${index}`}/>))
      }
      <FormCreateDocumentWithProject />
    </Fragment>)
  }
}

export default ProjectSidebar;

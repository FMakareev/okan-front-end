import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import DocumentListQuery from './DocumentListQuery.graphql'
import {Query} from 'react-apollo';
import {DocumentTree} from "../DocumentTree/DocumentTree";
import FormCreateDocument from "../FormCreateDocument/FormCreateDocument";
import {ProjectPropTypes} from "../../../../propTypes/ProjectPropTypes";
import {withProject} from "../ProjectContext/ProjectContext";


const DocumentTreeWithProject = withProject((props) => (<DocumentTree {...props}/>));
const FormCreateDocumentWithProject = withProject((props) => (<FormCreateDocument {...props}/>));


export class ProjectSidebar extends Component {

  static propTypes = {
    project: ProjectPropTypes,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate: ',nextProps,this.props);
  //   const {
  //     documents
  //   } = nextProps;
  //   if (documents !== this.props.documents.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const {
      documents
    } = this.props;

    return (<Fragment>
      {
        documents && documents.map((item, index) => (<DocumentTreeWithProject
          data={item}
          key={`DocumentTree=${item.id}`}/>))
      }
      <FormCreateDocumentWithProject/>
    </Fragment>)
  }
}

export default ProjectSidebar;

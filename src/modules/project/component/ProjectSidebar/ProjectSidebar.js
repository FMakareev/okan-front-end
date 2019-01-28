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


export class ProjectSidebar extends Component {

  static propTypes = {
    projectid: PropTypes.string.isRequired,
    params: PropTypes.shape({
      projectid: PropTypes.string.isRequired,
    }),
    project: ProjectPropTypes,
  };

  render() {
    const {
      projectid,
      params,
      project
    } = this.props;
    // console.log('ProjectSidebar: ',this.props);
    return (
      <Query
        query={DocumentListQuery}
        variables={{projectid}}
      >
        {
          ({loading, data, error}) => {
            if (loading) {
              return 'Список документов загружается...';
            }
            if (error) {
              console.error('Error:', error);
              return 'Ошибка...';
            }
            console.log(data);
            return <Fragment>
              {
                data &&
                data.documentlist &&
                data.documentlist.map((item, index) => (<DocumentTreeWithProject
                  data={item}
                  key={`DocumentTree=${index}`}/>))
              }
              <FormCreateDocument projectid={projectid}/>
            </Fragment>
          }
        }
      </Query>)
  }
}

export default ProjectSidebar;

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import DocumentListQuery from './DocumentListQuery.graphql'
import {Query} from 'react-apollo';
import {DocumentTree} from "../DocumentTree/DocumentTree";

export class ProjectSidebar extends Component {

  static propTypes = {
    projectid: PropTypes.string.isRequired,
  };

  render(){
    const {projectid,params} = this.props;

    return(
      <Query
        query={DocumentListQuery}
        variables={{projectid}}
      >
        {
          ({loading, data,error})=>{
            if(loading){
              return 'Список документов загружается...';
            }
            if(error){
              console.error('Error:', error);
              return 'Ошибка...';
            }
            console.log(data);
            return <Fragment>
              {
                data &&
                data.documentlist &&
                data.documentlist.map((item, index) => <DocumentTree params={params} data={item} key={`DocumentTree=${index}`}/>)
              }

            </Fragment>
          }
        }
      </Query>)
  }
}

export default ProjectSidebar;

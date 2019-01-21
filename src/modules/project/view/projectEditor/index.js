import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import ProjectItemQuery from './ProjectItemQuery.graphql'
/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';

/** Components */
import {Box} from '@lib/ui/Box/Box';
import {DocumentTree} from '../../component/DocumentTree/DocumentTree';
import ProjectSidebar from "../../component/ProjectSidebar/ProjectSidebar";

export class ProjectEditorPage extends Component {
  static propTypes = {...ReactRoutePropTypes};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('ProjectEditorPage: ', this.props);
    const {match: {params}} = this.props;
    // match.params.projectid
    return (<Query
        query={ProjectItemQuery}
        variables={{id:params.projectid}}
      >
        {
          ({loading, data,error}) => {
            if(loading){
              return 'Загрузка...';
            }
            if(error){
              console.error('Error:', error);
              return 'Ошибка...';
            }
            return (<ErrorCatch>
              <Box width={'320px'}>
                <ProjectSidebar params={params} projectid={params.projectid}/>
              </Box>
            </ErrorCatch>)
          }
        }
      </Query>

    );
  }
}

export default ProjectEditorPage;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import styled from 'styled-components';

import ProjectItemQuery from './ProjectItemQuery.graphql'
/**PropTypes */
import {ReactRoutePropTypes} from '../../../../propTypes/ReactRoutePropTypes';

/** View */
import ErrorCatch from '../../../../components/ErrorCatch/ErrorCatch';

/** Components */
import {Box} from '@lib/ui/Box/Box';
import ProjectSidebar from "../../component/ProjectSidebar/ProjectSidebar";

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 320px;  
  min-height: calc(100vh - 40px);
  padding-top: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

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
              <SideBarWrapper width={'320px'}>
                <ProjectSidebar params={params} projectid={params.projectid}/>
              </SideBarWrapper>
            </ErrorCatch>)
          }
        }
      </Query>

    );
  }
}

export default ProjectEditorPage;

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
import ProjectSidebar from "../../component/ProjectSidebar/ProjectSidebar";
import {Flex} from "@lib/ui/Flex/Flex";
import ProjectEditor from "../../component/ProjectEditor/ProjectEditor";

import {ProjectContext, withProject} from '../../component/ProjectContext/ProjectContext';
const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 320px;  
  min-height: calc(100vh - 40px);
  padding-top: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled(Flex)`
  width: 100%;  
  min-height: calc(100vh - 40px);
  background-color: #E8E8E8;
`;
const EditorWrapper = styled.div`
  width: calc(100% - 360px);  
  min-height: calc(100vh - 40px);
`;


const ProjectEditorWithProject =  withProject((props) => (<ProjectEditor {...props}/>));


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
    // match.params.sectionid
    return (<Query
        query={ProjectItemQuery}
        variables={{id: params.projectid}}
      >
        {
          ({loading, data, error}) => {
            if (loading) {
              return 'Загрузка...';
            }
            if (error) {
              console.error('Error:', error);
              return 'Ошибка...';
            }
            return (<ErrorCatch>
              <Wrapper flexDirection={'row'}>
                <ProjectContext.Provider value={{
                  position: params,
                  project: data.projectitem,
                }}>
                  <SideBarWrapper width={'320px'}>
                    <ProjectSidebar
                      project={data.projectitem}
                      projectid={params.projectid}
                    />
                  </SideBarWrapper>
                  <EditorWrapper>
                    <ProjectEditor
                      sectionid={params.sectionid}
                    />
                  </EditorWrapper>
                </ProjectContext.Provider>
              </Wrapper>
            </ErrorCatch>)
          }
        }
      </Query>

    );
  }
}

export default ProjectEditorPage;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

/** Graphql schema */
import RevisionItemQuery from './RevisionItemQuery.graphql';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';

/** Components */
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';
import {
  PROJECT_MODE_REVISION,
  withProject
} from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';
import {ProjectPageWrapper} from "../../component/ProjectPageWrapper/ProjectPageWrapper";
import {ProjectStore} from "../../component/ProjectStore/ProjectStore";
import {SideBarWrapper} from "../../component/SideBarWrapper/SideBarWrapper";
import {ProjectEditorWrapper} from "../../component/ProjectEditorWrapper/ProjectEditorWrapper";
import {ProjectSidebar} from "../../component/ProjectSidebar/ProjectSidebar";



const ProjectSidebarWithProject = withProject(props => <ProjectSidebar {...props} />);
const ProjectEditorWithProject = withProject(props => <ProjectEditor {...props} />);

export class RevisionItem extends Component {
  static propTypes = {
    ...ReactRoutePropTypes,
    match: PropTypes.shape({
      params: PropTypes.shape({
        cellid: PropTypes.string,
        sectionid: PropTypes.string,
        documentid: PropTypes.string,
        projectid: PropTypes.string,
      }),
    }),
  };

  state = {};

  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <Query query={RevisionItemQuery} variables={{ id: params.revisionid }}>
        {({ loading, data, error }) => {
          if (loading) {
            return 'Загрузка...';
          }
          if (error) {
            console.error('Error:', error);
            return 'Ошибка...';
          }
          return (
            <ErrorCatch>

              <ProjectPageWrapper>

                <ProjectStore
                  mode={PROJECT_MODE_REVISION}
                  params={params}
                  projectitem={{
                    documents: [data.revisionItem],
                    id: data.revisionItem.project
                  }}
                >

                  <SideBarWrapper id={'SideBarWrapper'}>
                    <ProjectSidebarWithProject  documentitem={data.revisionItem}/>
                  </SideBarWrapper>
                  <ProjectEditorWrapper>
                    <ProjectEditorWithProject sectionid={params.sectionid} />
                  </ProjectEditorWrapper>

                </ProjectStore>

              </ProjectPageWrapper>

            </ErrorCatch>
          );
        }}
      </Query>
    );
  }
}

export default RevisionItem;

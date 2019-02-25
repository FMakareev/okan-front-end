import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

/** Graphql schema */
import RevisionItemQuery from './RevisionItemQuery.graphql';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import { Flex } from '@lib/ui/Flex/Flex';

/** Components */
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';
import {PROJECT_MODE_READ, ProjectContext, withProject} from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';
import { DocumentTree } from '../../component/DocumentTree/DocumentTree';

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 340px;
  min-height: calc(100vh - 40px);
  padding-top: 10px;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Wrapper = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 40px);
  background-color: #e8e8e8;
`;

const EditorWrapper = styled.div`
  width: calc(100% - 380px);
  min-height: calc(100vh - 40px);
`;

const DocumentTreeWithProject = withProject(props => <DocumentTree {...props} />);
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
    console.log(1, params.id);

    return (
      <Query query={RevisionItemQuery} variables={{ id: params.revisionid }}>
        {({ loading, data, error, ...rest }) => {
          if (loading) {
            return 'Загрузка...';
          }
          if (error) {
            console.error('Error:', error);
            return 'Ошибка...';
          }
          return (
            <ErrorCatch>
              <Wrapper flexDirection={'row'}>
                <ProjectContext.Provider
                  value={{
                    // объект с параметрами роутера
                    position: params,
                    // объект с данными о проекте
                    project: null,
                    // можно ли редактировать проект
                    mode: PROJECT_MODE_READ,
                  }}>
                  <SideBarWrapper width={'320px'}>
                    <DocumentTreeWithProject data={data.revisionItem} />
                  </SideBarWrapper>
                  <EditorWrapper>
                    <ProjectEditorWithProject sectionid={params.sectionid} />
                  </EditorWrapper>
                </ProjectContext.Provider>
              </Wrapper>
            </ErrorCatch>
          );
        }}
      </Query>
    );
  }
}

export default RevisionItem;

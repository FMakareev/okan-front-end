import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';

/** Graphql schema */
import RevisionItemQuery from './RevisionItemQuery.graphql';

/** View */
import ErrorCatch from '@lib/ui/ErrorCatch/ErrorCatch';
import { Flex } from '@lib/ui/Flex/Flex';

/** Components */
import ProjectSidebar from '../../component/ProjectSidebar/ProjectSidebar';
import ProjectEditor from '../../component/ProjectEditor/ProjectEditor';
import { ProjectContext, withProject } from '../../component/ProjectContext/ProjectContext';

/**PropTypes */
import { ReactRoutePropTypes } from '../../../../propTypes/ReactRoutePropTypes';

const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 340px;
  min-height: calc(100vh - 40px);
  padding-top: 10px;
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

export class EditorRevision extends Component {
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
      <Query query={RevisionItemQuery} variables={{ id: params.id }}>
        {({ loading, data, error, ...rest }) => {
          // console.log(2, data);
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
                    project: data.revisionItem,
                  }}>
                  <SideBarWrapper width={'320px'}>
                    <ProjectSidebar
                      project={{
                        // объект с параметрами роутера
                        position: params,
                        // объект с данными о проекте
                        project: data.revisionItem,
                      }}
                      {...data.revisionItem}
                    />
                  </SideBarWrapper>
                  <EditorWrapper
                    style={this.props.cellToCopy ? { opacity: '0.4' } : {}}
                    onClick={() => this.handleClick()}>
                    <ProjectEditor sectionid={params.id} />
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

export default EditorRevision;

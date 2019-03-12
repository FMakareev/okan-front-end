import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Query, withApollo } from 'react-apollo';

/** Components */
import EditorCellController from '../EditorCellController/EditorCellController';
import {
  PROJECT_MODE_RW,
  ProjectContextPropTypes,
  withProject,
} from '../ProjectContext/ProjectContext';
import { EditorAdditionalMenu } from '../EditorAdditionalMenu/EditorAdditionalMenu';

/**View */
import { Flex } from '@lib/ui/Flex/Flex';
import { Box } from '@lib/ui/Box/Box';
import { Text } from '@lib/ui/Text/Text';

/** Graphql */
import CellListQuery from './CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

/** Utils */
import { sortingCells } from '../../utils/sortingCells';

/** Constants */
import { BLOCK_TEXT } from '@lib/shared/blockType';

/** COntext */
import { getPosition } from '../ProjectContext/ProjectContextSelectors';
import ProjectModeState from '../ProjectContext/ProjectModeState';

const ContentWrapper = styled.div`
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  min-height: 60px;
`;

const EditorCellControllerWithProject = withProject(props => <EditorCellController {...props} />);

export class ProjectEditor extends Component {
  static propTypes = {
    client: PropTypes.object,
    location: PropTypes.object,
    project: PropTypes.object,
    sectionid: PropTypes.string,
    ...ProjectContextPropTypes,
  };

  state = {
    childName: '',
    parentName: '',
    parentNumber: null,
    parentLetterNumber: null,
  };

  componentWillUnmount() {
    this.unsubscribeToCellItem();
  }

  componentDidMount() {
    if (this.props.sectionid) {
      this.createPageTitle(getPosition(this.props.project, 'sectionid'));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      getPosition(nextProps.project, 'sectionid') !== getPosition(this.props.project, 'sectionid')
    ) {
      this.createPageTitle(getPosition(nextProps.project, 'sectionid'));
    }
  }

  getSectionNumber = () => {
    try {
      return queryString.parse(this.props.location.search).sectionNumber;
    } catch (e) {
      console.error(e);
      return '';
    }
  };
  getSectionLetterNumber = () => {
    try {
      return queryString.parse(this.props.location.search).sectionLetterNumber;
    } catch (e) {
      console.error(e);
      return '';
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc метод для создания заголовков
   * */
  createPageTitle = async id => {
    try {
      this.unsubscribeToCellItem();

      let childCell = await this.getCellItem(id);
      this.subscribeInstanceToUpdateTitle = this.subscribeToCellItem(
        childCell.data.cellitem.id,
      ).subscribe(({ data }) => {
        const name = data.cellitem && data.cellitem.name;
        return this.setState(state => ({
          ...state,
          childName: name,
          parentNumber: this.getSectionNumber(),
          parentLetterNumber: this.getSectionLetterNumber(),
        }));
      });

      if (childCell && childCell.data.cellitem.parent) {
        let parentCell = await this.getCellItem(childCell.data.cellitem.parent.id);
        this.subscribeInstanceToUpdateParentTitle = this.subscribeToCellItem(
          parentCell.data.cellitem.id,
        ).subscribe(({ data }) => {
          const name = data.cellitem && data.cellitem.name;
          return this.setState(state => ({
            ...state,
            parentName: name,
          }));
        });
      }
    } catch (error) {
      console.log('Error createPageTitle: ', error);
    }
  };

  /** @desc сбрасываем подписки на изменение ячеек */
  unsubscribeToCellItem = () => {
    if (this.subscribeInstanceToUpdateTitle) {
      this.subscribeInstanceToUpdateTitle.unsubscribe();
      this.subscribeInstanceToUpdateTitle = null;
    }
    if (this.subscribeInstanceToUpdateParentTitle) {
      this.subscribeInstanceToUpdateParentTitle.unsubscribe();
      this.subscribeInstanceToUpdateParentTitle = null;
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc создает подписку на обновление ячейки
   * */
  subscribeToCellItem = id => {
    try {
      return this.props.client.watchQuery({
        query: CellItemQuery,
        variables: { id: id },
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc метод выполняет получение данные по ячейке
   * */
  getCellItem = id => {
    return this.props.client.query({ query: CellItemQuery, variables: { id } }).catch(error => {
      console.log('Error getCellItem: ', error);
    });
  };

  render() {
    const {
      location: { search },
      project,
    } = this.props;

    const { childName, parentName, parentNumber, parentLetterNumber } = this.state;

    if (!getPosition(project, 'sectionid')) {
      return (
        <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'60px'} flexDirection={'column'}>
          <ContentWrapper>
            <Text fontFamily={'primary300'} fontSize={6} lineHeight={8}>
              Раздел не выбран.
            </Text>
          </ContentWrapper>
        </Flex>
      );
    }
    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'5px'} flexDirection={'column'}>
        <Query
          skip={!getPosition(project, 'sectionid')}
          query={CellListQuery}
          variables={{ parent: getPosition(project, 'sectionid') }}>
          {({ data, loading, error }) => {
            if (loading) {
              return `Загрузка`;
            }

            if (error) {
              return null;
            }

            if (data && data.celllist) {
              const section = parentNumber ? parentNumber.slice(0, -2) : '';
              let childCellIndex = 0;
              return (
                <Fragment>
                  <Text
                    width={'100%'}
                    fontFamily={'secondary'}
                    lineHeight={8}
                    fontSize={6}
                    color={'color11'}
                    mt={'15px'}
                    ml={'15px'}>
                    {/** TODO: для формирования нумерации гавного заголовка лучше сделай отдельный метод чтобы этой каши тут небыло */}
                    {parentNumber && parentNumber.length === 2 ? (
                      <Fragment>{`${parentNumber || parentLetterNumber} ${childName ||
                        ''}`}</Fragment>
                    ) : (
                      <Fragment>{`${section} ${!parentLetterNumber ? parentName : ''}`}</Fragment>
                    )}
                  </Text>
                  <ContentWrapper>
                    <Text
                      width={'100%'}
                      fontFamily={'secondary'}
                      lineHeight={8}
                      fontSize={6}
                      color={'color11'}
                      mt={'7px'}
                      ml={'5px'}
                      mb={'10px'}>
                      {parentNumber && parentNumber.length <= 2 ? null : (
                        <Fragment>{`${parentNumber ||
                          (parentLetterNumber && parentLetterNumber
                            ? `Приложение ${parentLetterNumber} `
                            : null)} ${childName || ''}`}</Fragment>
                      )}
                    </Text>

                    {sortingCells(data.celllist).map((item, index) => {
                      if (item.content && item.content.contenttype === BLOCK_TEXT) {
                        childCellIndex += 1;
                      }
                      return (
                        <Box
                          pb={6}
                          pt={6}
                          position={'relative'}
                          zIndex={data.celllist.length - index}
                          key={`EditorCellControllerWithProject-${index}`}>
                          <EditorCellControllerWithProject
                            key={`EditorCellControllerWithProject-${index}`}
                            data={item}
                            editable={
                              item.content.parentNumber === 0 // редактирование первого блока и не запускает автосохранение // TODO: эта штука работает не так, проблема в том что она каждый раз включает
                            }
                            sectionNumber={`${parentNumber || parentLetterNumber}${childCellIndex}`}
                            parentLetterNumber={parentLetterNumber}
                          />
                        </Box>
                      );
                    })}
                  </ContentWrapper>
                </Fragment>
              );
            }

            return null;
          }}
        </Query>
        <ProjectModeState is={PROJECT_MODE_RW}>
          <EditorAdditionalMenu parentid={getPosition(project, 'sectionid')} activeMenu />
        </ProjectModeState>
      </Flex>
    );
  }
}

ProjectEditor = withRouter(ProjectEditor);

ProjectEditor = withApollo(ProjectEditor);

export default ProjectEditor;

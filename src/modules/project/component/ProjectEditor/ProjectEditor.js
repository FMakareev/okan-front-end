import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {Query, withApollo} from 'react-apollo';

/** Components */
import {PROJECT_MODE_RW} from '../ProjectContext/ProjectContext';
import {EditorAdditionalMenu} from '../EditorAdditionalMenu/EditorAdditionalMenu';

/**View */
import {Flex} from '@lib/ui/Flex/Flex';
import {Text} from '@lib/ui/Text/Text';

/** Graphql */
import CellListQuery from '../../graphql/CellListQuery.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';

/** Utils */
import {sortingCells} from '../../utils/sortingCells';

/** Context */
import {getPosition} from '../ProjectContext/ProjectContextSelectors';
import ProjectModeState from '../ProjectContext/ProjectModeState';
import {ProjectEditorNoSectionSelected} from '../ProjectEditorNoSectionSelected/ProjectEditorNoSectionSelected';
import {ProjectEditorContentWrapper} from '../ProjectEditorContentWrapper/ProjectEditorContentWrapper';
import ProjectEditorCellList from '../ProjectEditorCellList/ProjectEditorCellList';

const ProjectEditorSecondTitle = ({children}) => (
  <Text
    width={'100%'}
    fontFamily={'secondary'}
    lineHeight={8}
    fontSize={6}
    color={'color11'}
    mt={'7px'}
    ml={'5px'}
    mb={['10px']}>
    {children}
  </Text>
);

const ProjectEditorFirstTitle = ({children}) => (
  <Text
    width={'100%'}
    fontFamily={'secondary'}
    lineHeight={8}
    fontSize={6}
    color={'color11'}
    mt={'15px'}
    ml={'15px'}>
    {children}
  </Text>
);

export class ProjectEditor extends Component {
  static propTypes = {
    client: PropTypes.object,
    location: PropTypes.object,
    project: PropTypes.object,
    sectionid: PropTypes.string,
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
        variables: {id: id},
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
    return this.props.client.query({query: CellItemQuery, variables: {id}}).catch(error => {
      console.error('Error getCellItem: ', error);
    });
  };

  /**
   * @desc метод для получения заголовков
   * */
  getSectionTitle = cellItem => {
    if (!cellItem) {
      return {};
    }
    if (cellItem.isAttachment) {
      return {
        firstTitle: `Приложение ${cellItem.number.join('.').toUpperCase()}. ${cellItem.name}`,
        secondTitle: null,
        sectionNumber: `${cellItem.number.join('.').toUpperCase()}.`,
      };
    } else if (!cellItem.isAttachment) {
      if (cellItem.parent) {
        return {
          firstTitle: `${cellItem.parent.number.join('.')}. ${cellItem.parent.name}`,
          secondTitle: `${cellItem.number.join('.')}. ${cellItem.name}`,
          sectionNumber: `${cellItem.number.join('.')}.`,
        };
      } else {
        return {
          firstTitle: `${cellItem.number.join('.')}. ${cellItem.name}`,
          secondTitle: null,
          sectionNumber: `${cellItem.number.join('.')}.`,
        };
      }
    }
    return {};
  };

  render() {
    const {
      location: {search},
      project,
    } = this.props;

    const {parentLetterNumber} = this.state;
    const sectionid = getPosition(project, 'sectionid');

    if (!sectionid) {
      return <ProjectEditorNoSectionSelected/>;
    }

    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'5px'} flexDirection={'column'}>
        <Query skip={!sectionid} query={CellListQuery} variables={{parent: sectionid}}>
          {({data:dataCellList, loading: loadingCellList, error: errorCellList}) => {
            if (loadingCellList) {
              return `Загрузка`;
            }

            if (errorCellList) {
              return `Ошибка`;
            }

            return (<Query skip={!sectionid} query={CellItemQuery} variables={{id: sectionid}}>
              {({data: dataParent, loading: loadingParent, error: errorParent}) => {

                if (loadingParent) {
                  return `Загрузка`;
                }

                if (errorParent) {
                  return `Ошибка`;
                }

                const {firstTitle, secondTitle, sectionNumber} = this.getSectionTitle(dataParent.cellItem);
                if (dataCellList && dataCellList.celllist) {
                  return (
                    <Fragment>
                      {firstTitle && <ProjectEditorFirstTitle>{firstTitle}</ProjectEditorFirstTitle>}
                      <ProjectEditorContentWrapper>
                        {secondTitle && (
                          <ProjectEditorSecondTitle>{secondTitle}</ProjectEditorSecondTitle>
                        )}
                        <ProjectEditorCellList
                          childCellIndex={0}
                          parentNumber={sectionNumber}
                          parentLetterNumber={parentLetterNumber}
                          celllist={sortingCells(dataCellList.celllist)}
                        />
                      </ProjectEditorContentWrapper>
                    </Fragment>
                  );
                }

                return null;
              }}
            </Query>);

          }}
        </Query>
        <ProjectModeState is={PROJECT_MODE_RW}>
          <EditorAdditionalMenu parentid={getPosition(project, 'sectionid')} activeMenu/>
        </ProjectModeState>
      </Flex>
    );
  }
}

ProjectEditor = withRouter(ProjectEditor);

ProjectEditor = withApollo(ProjectEditor);

export default ProjectEditor;

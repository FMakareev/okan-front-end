import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {Query, withApollo} from 'react-apollo';

/** Components */
import {
  PROJECT_MODE_RW,
} from '../ProjectContext/ProjectContext';
import {EditorAdditionalMenu} from '../EditorAdditionalMenu/EditorAdditionalMenu';

/**View */
import {Flex} from '@lib/ui/Flex/Flex';
import {Text} from '@lib/ui/Text/Text';

/** Graphql */
import CellListQuery from './CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

/** Utils */
import {sortingCells} from '../../utils/sortingCells';


/** Context */
import {getPosition} from '../ProjectContext/ProjectContextSelectors';
import ProjectModeState from '../ProjectContext/ProjectModeState';
import {ProjectEditorNoSectionSelected} from "../ProjectEditorNoSectionSelected/ProjectEditorNoSectionSelected";
import {ProjectEditorContentWrapper} from "../ProjectEditorContentWrapper/ProjectEditorContentWrapper";
import ProjectEditorCellList from "../ProjectEditorCellList/ProjectEditorCellList";


const ProjectEditorSecondTitle = ({children}) => (<Text
  width={'100%'}
  fontFamily={'secondary'}
  lineHeight={8}
  fontSize={6}
  color={'color11'}
  mt={'7px'}
  ml={'5px'}
  mb={'10px'}>
  {children}
</Text>);

const ProjectEditorFirstTitle = ({children}) => (<Text
  width={'100%'}
  fontFamily={'secondary'}
  lineHeight={8}
  fontSize={6}
  color={'color11'}
  mt={'15px'}
  ml={'15px'}>
  {children}
</Text>);


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
      console.log('Error getCellItem: ', error);
    });
  };

  /**
   * @desc метод для получения заголовков
   * */
  getSectionTitle = (cellitem) => {
    if(!cellitem){
      return {};
    }
    if (cellitem.isAttachment) {
      return {
        firstTitle: `Приложение ${cellitem.number.join('.').toUpperCase()}. ${cellitem.name}`,
        secondTitle: null,
        sectionNumber: `${cellitem.number.join('.').toUpperCase()}.`,
      }
    } else if (!cellitem.isAttachment) {
      if (cellitem.parent) {
        return {
          firstTitle: `${cellitem.parent.number.join('.')}. ${cellitem.parent.name}`,
          secondTitle: `${cellitem.number.join('.')}. ${cellitem.name}`,
          sectionNumber: `${cellitem.number.join('.')}.`,
        }
      } else {
        return {
          firstTitle: `${cellitem.number.join('.')}. ${cellitem.name}`,
          secondTitle: null,
          sectionNumber: `${cellitem.number.join('.')}.`,
        }
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
      return (<ProjectEditorNoSectionSelected/>);
    }

    return (
      <Flex pl={'10px'} pr={'40px'} mb={'20px'} pt={'5px'} flexDirection={'column'}>
        <Query
          skip={!sectionid}
          query={CellListQuery}
          variables={{parent: sectionid}}>
          {({data, loading, error}) => {
            if (loading) {
              return `Загрузка`;
            }

            if (error) {
              return null;
            }
            console.log('data.cellitem: ', data.cellitem);

            const {
              firstTitle,
              secondTitle,
              sectionNumber
            } = this.getSectionTitle(data.cellitem);
            if (data && data.celllist) {

              return (
                <Fragment>
                  {
                    firstTitle &&
                    <ProjectEditorFirstTitle>
                      {firstTitle}
                    </ProjectEditorFirstTitle>
                  }
                  <ProjectEditorContentWrapper>
                    {
                      secondTitle &&
                      <ProjectEditorSecondTitle>
                        {secondTitle}
                      </ProjectEditorSecondTitle>
                    }
                    <ProjectEditorCellList
                      childCellIndex={0}
                      parentNumber={sectionNumber}
                      parentLetterNumber={parentLetterNumber}
                      celllist={sortingCells(data.celllist)}
                    />
                  </ProjectEditorContentWrapper>
                </Fragment>
              );
            }

            return null;
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

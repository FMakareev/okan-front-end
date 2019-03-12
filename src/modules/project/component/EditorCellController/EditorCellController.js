import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import {graphql} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {findAll} from "highlight-words-core";

/** Mutation */
import UpdateCellMutation from '../EditorCellController/UpdateCellMutation.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';

import CheckForCellChangesQuery from '../SidebarApprovalStatus/CheckForCellChangesQuery.graphql';

/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';
import {EditorCellTitle} from '../EditorCellTitle/EditorCellTitle';
import {
  PROJECT_MODE_RC,
  PROJECT_MODE_RW,
  ProjectContextPropTypes,
} from '../ProjectContext/ProjectContext';
import EditorCellDelete from '../EditorCellDelete/EditorCellDelete';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import {Flex} from '@lib/ui/Flex/Flex';
import EditorCellCommentController from '../EditorCellCommentController/EditorCellCommentController';
import EditorTypeIcon from '../../../../components/EditorTypeIcon/EditorTypeIcon';

/** Redux */
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {error, success} from 'react-notification-system-redux';
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';

/** Global */
import {BLOCK_IMAGE, BLOCK_TABLE} from '../../../../shared/blockType';
import {ProjectModeState} from '../ProjectContext/ProjectModeState';
import {Relative} from '@lib/ui/Relative/Relative';
import {getPosition} from '../ProjectContext/ProjectContextSelectors';
import {CELL_STATUS_CHANGED} from '@lib/shared/approvalStatus';
import {EditorCellContent} from "../EditorCellContent/EditorCellContent";
import EditorCellControllerNumber from "../EditorCellControllerNumber/EditorCellControllerNumber";

const notificationOpts = () => ({
  success: {
    title: 'Раздел сохранен',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Раздел не сохранен',
    position: 'tr',
    autoDismiss: 2,
  },
});

export class EditorCellController extends Component {
  static propTypes = {
    data: PropTypes.string,
    location: PropTypes.object,
    parentLetterNumber: PropTypes.string,
    project: PropTypes.object,
    removeBlock: PropTypes.func,
    sectionNumber: PropTypes.string,
    setNotificationError: PropTypes.func,
    setNotificationSuccess: PropTypes.func,
    values: PropTypes.object,
    ...ProjectContextPropTypes,
  };

  static defaultProps = {data: ''};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      editable: false,
      timer: null,
      toggleAdditionalMenu: false,
      // draggable: false,
    };
  }

  componentDidMount() {
    const {data} = this.props;
    if (
      this.state.editable &&
      (data.content && (!data.content.content || data.content.content === ''))
    ) {
      this.openEditor();
    }
  }

  /**
   * @desc это метод нужен для сохранения контента через setInterval
   * */
  createAutoSave = () => {
    const {values, data} = this.props;
    if (values && values.content && values.content !== data.content.content) {
      console.info('auto save.');
      this.saveCellContent();
    } else {
      console.info('нет изменений');
    }
  };

  /** @desc запуск автосохранения */
  startAutoSave = () => {
    // console.log('startAutoSave...');
    const timer = setInterval(this.createAutoSave, 30000);
    this.setState(state => ({
      ...state,
      timer: timer,
    }));
  };

  /** @desc стоп автосохранения */
  stopAutoSave = () => {
    // console.log('stopAutoSave...');
    clearInterval(this.state.timer);
    this.setState(state => ({
      ...state,
      timer: null,
    }));
  };

  /**
   * @desc метод для переключения в режим редактирования ячейки
   * */
  onToggleForm = () => {
    // console.log('onToggleForm');
    this.setState(state => ({
      ...state,
      editable: !state.editable,
    }));
  };

  /**
   * @desc метод открывает редактор и стартует автосохранение
   * */
  openEditor = () => {
    try {
      this.startAutoSave();
      this.onToggleForm();
    } catch (error) {
      console.error('Error openEditor:', error);
    }
  };

  /**
   * @desc Метод для сохранения ячейки
   * */
  saveCellContent() {
    return this.props
      .mutate({
        variables: {
          id: this.props.data.id,
          content: this.props.values.content,
          contentname: this.props.values.name,
          verify: CELL_STATUS_CHANGED,
        },
        //update cellitem=id ^ CheckForCellChangesQuery===false, cellitem aprent - data.cellitem.verify
        update: (store, {data: {updatecell}}) => {
          let data = {cellitem: {}};
          const options = {
            query: CellItemQuery,
            variables: {
              id: this.props.data.parent.id,
            },
          };
          try {
            data = store.readQuery(options);
            data.cellitem.parent.verify = updatecell.cell.verify;
            data.cellitem.verify = updatecell.cell.verify;
          } catch (error) {
            console.warn('Warning UpdateCellInCache read: ', error);
          }
          // console.log(1111, data);
          try {
            store.writeQuery({...options, data: {cellitem: {...data.cellitem}}});
          } catch (e) {
            console.log(e);
          }

          // let checkChanges = { checkForCellChanges: {} };
          // const dataCheckForCellChanges = {
          //   query: CheckForCellChangesQuery,
          //   variables: {
          //     id: this.props.data.parent.id,
          //   },
          // };

          // try {
          //   checkChanges = store.readQuery(dataCheckForCellChanges);
          //   checkChanges.checkForCellChanges.answer = true;
          //   this.props.cellCheckStatusChange(id, data.cellitem.verify);
          // } catch (error) {
          //   console.warn('Warning UpdateCellInCache read: ', error);
          // }

          // try {
          //   store.writeQuery({
          //     ...dataCheckForCellChanges,
          //     data: { checkForCellChanges: { ...checkChanges.checkForCellChanges } },
          //   });
          // } catch (e) {
          //   console.log(e);
          // }
        },
      })
      .then(response => {
        // console.log('got data', response);
        return response;
      })
      .catch(error => {
        console.log('Error saveCellContent: ', error);
        throw error;
      });
  }

  /**
   * @desc метод для отключения фокуса формы
   * */
  onBlurForm = e => {
    let currentTarget = e.currentTarget.parentNode.parentNode.parentNode;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.props.removeBlock();
        this.startSave();
      }
    }, 0);
  };

  startSave = () => {
    const {values, data} = this.props;
    this.stopAutoSave();
    if (values && (values.content || values.name)) {
      this.saveCellContent()
        .then(response => {
          this.props.setNotificationSuccess(notificationOpts().success);
          this.onToggleForm();
        })
        .catch(error => {
          console.log('Error onBlurForm: ', error);
          this.props.setNotificationError(notificationOpts().error);
          this.onToggleForm();
        });
    } else {
      this.onToggleForm();
    }
  };

  onHover = toggle => {
    this.setState(state => ({
      ...state,
      toggleAdditionalMenu: toggle,
    }));
  };

  highlightedContent = (textToHighlight, searchWords) => {
    const chunks = findAll({
      searchWords: [searchWords],
      textToHighlight
    });

    return chunks
      .map(chunk => {
        const {end, highlight, start} = chunk;
        const text = textToHighlight.substr(start, end - start);
        if (highlight) {
          return `<mark>${text}</mark>`;
        } else {
          return text;
        }
      })
      .join("");
  };

  render() {
    const {editable} = this.state;
    const {
      data,
      location: {search},
      sectionNumber,
      project,
      parentLetterNumber,
    } = this.props;

    const {toggleAdditionalMenu} = this.state;

    return (
      <Relative onMouseEnter={() => this.onHover(true)} onMouseLeave={() => this.onHover(false)}>
        <Flex pl={'10px'} alignItems="flex-start">
          {
            parentLetterNumber ? null : (
              <EditorCellControllerNumber
                {...data}
                toggleAdditionalMenu={toggleAdditionalMenu}
                sectionid={getPosition(project, 'sectionid')}
                sectionNumber={sectionNumber}
              />
            )
          }

          <Box width={parentLetterNumber ? 'calc(100% - 70px)' : 'calc(100% - 160px)'}>
            {/** заголовок таблицы */}
            <EditorCellTitle
              textAlign={'left'}
              contenttype={BLOCK_TABLE}
              onClick={this.openEditor}
              content={data.content}
              editable={editable}
              parentLetterNumber={parentLetterNumber}
            />

            {/** текстовый контент */}
            {
              !editable && (<EditorCellContent
                onClick={() => (project.mode === PROJECT_MODE_RW ? this.openEditor() : null)}
                textAlign={data.content.contenttype === BLOCK_IMAGE ? 'center' : 'left'}
                project={project}
                {...data}
              />)
            }

            {/** форма редактора */}
            <ProjectModeState is={PROJECT_MODE_RW}>
              {editable && (
                <EditorCellForm
                  form={'EditorCellForm-' + data.id}
                  initialValues={{
                    id: data.id,
                    content: data.content.content,
                    name: data.content.name,
                    contenttype: data.content.contenttype,
                  }}
                  id={data.id}
                  data={data}
                  onBlurForm={e => this.onBlurForm(e)}
                  instantSave={() => this.startSave()}
                />
              )}
            </ProjectModeState>

            {/** заголовок картинки */}
            <EditorCellTitle
              textAlign={'center'}
              parentLetterNumber={parentLetterNumber}
              contenttype={BLOCK_IMAGE}
              onClick={this.openEditor}
              content={data.content}
              editable={project.editable && editable}
            />
          </Box>

          <Flex width={'60px'}>
            <ProjectModeState is={PROJECT_MODE_RW}>
              <Box mx={2}>
                <EditorCellDelete id={data.id} sectionid={project.position.sectionid}/>
              </Box>
            </ProjectModeState>
            <ProjectModeState is={[PROJECT_MODE_RW, PROJECT_MODE_RC]}>
              <Box mx={2}>
                <EditorCellCommentController
                  {...this.props.project}
                  {...data}
                  location={this.props.location}
                />
              </Box>
            </ProjectModeState>
          </Flex>
        </Flex>
      </Relative>
    );
  }
}

EditorCellController = graphql(UpdateCellMutation)(EditorCellController);
EditorCellController = withRouter(EditorCellController);

EditorCellController = connect(
  (state, {data}) => ({
    values: getFormValues('EditorCellForm-' + data.id)(state),
  }),
  dispatch => ({
    removeBlock: () => dispatch(removeBlock()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellController);

export default EditorCellController;

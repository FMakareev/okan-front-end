import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {withRouter} from 'react-router-dom';

/** Mutation */
import UpdateCellMutation from '../../graphql/UpdateCellMutation.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';

/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';
import {EditorCellTitle} from '../EditorCellTitle/EditorCellTitle';
import {
  PROJECT_MODE_RC,
  PROJECT_MODE_RW,
} from '../ProjectContext/ProjectContext';
import EditorCellDelete from '../EditorCellDelete/EditorCellDelete';

/** View */
import Box from '../../../../components/Box/Box';
import {Flex} from '@lib/ui/Flex/Flex';
import EditorCellCommentController from '../EditorCellCommentController/EditorCellCommentController';

/** Redux */
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';
import {error, success} from 'react-notification-system-redux';
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';

/** Global */
import {BLOCK_IMAGE, BLOCK_TABLE} from '../../../../shared/blockType';
import {ProjectModeState} from '../ProjectContext/ProjectModeState';
import {Relative} from '@lib/ui/Relative/Relative';
import {getPosition, getProject} from '../ProjectContext/ProjectContextSelectors';
import {CELL_STATUS_CHANGED} from '@lib/shared/approvalStatus';
import {EditorCellContent} from '../EditorCellContent/EditorCellContent';
import EditorCellControllerNumber from '../EditorCellControllerNumber/EditorCellControllerNumber';
import shallowequal from 'shallowequal';
import scrollTo, {linearTween} from '@lib/utils/dom/scrollTo';
import {UpdateCellInCache} from '../../utils/UpdateCellInCache';
import {captureException} from "../../../../hocs/withSentry/withSentry";

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

/** этот контент froala добавляет в разметку когда запускается на https соединении */
const FROALA_WATER_MARK = `<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>`

export class EditorCellController extends Component {
  static propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
    parentLetterNumber: PropTypes.string,
    project: PropTypes.object,
    removeBlock: PropTypes.func, // setNotificationError: PropTypes.func,
    // setNotificationSuccess: PropTypes.func,
    values: PropTypes.object,
  };

  static defaultProps = {data: ''};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleScrollToCurrentCell = this.handleScrollToCurrentCell.bind(this);
    this.currentCellRef = React.createRef();
  }

  get initialState() {
    return {editable: false, timer: null, toggleAdditionalMenu: false};
  }


  /**
   * @param {object} currentCellRef объект DOM элемента
   * @return {object} объект DOM элемента
   * @desc метод ищет в доме элементы которые отмечены поиском и возвращает первый из массива элементов найденный
   * внутри текущего компонента если же не чего не найдено то вернет ref ссылку на сам компонент
   * */
  getDOMElementCurrentMark = (currentCellRef) => {
    let markList = [];
    try{
      markList = document.getElementsByClassName(`highlightedContentMark-${this.props.data.id}`);
      if(markList.length){
        return markList[0];
      } else {
        return currentCellRef
      }
    } catch (error) {
      captureException(error);
      return currentCellRef
    }
  };

  /**
   * @param {object} currentCellRef объект DOM элемента
   * @desc метод получает дом элемент просчитывает +- его середину си выполняет плавный скрол к ней.
   * */
  handleScrollToCurrentCell(currentCellRef) {
    try {
      const top = currentCellRef.documentOffsetTop() - window.innerHeight / 2;
      scrollTo(top, 150, linearTween);
    } catch (error) {
      console.error('handleScrollToCurrentCell error: ', error);
      captureException(error);
    }
  }

  componentWillReceiveProps(nextProps) {
    let nextSearchResult = getProject(nextProps, 'searchResult');
    let nextSearchCursor = getProject(nextProps, 'searchCursor');
    let prevSearchCursor = getProject(this.props, 'searchCursor');

    if (nextSearchResult.length) {
      /** если есть результаты поиска */

      if (!shallowequal(nextSearchCursor, prevSearchCursor)) {
        /** если предыдущее состояние курсора поиска не такое же как новое */
        if (this.props.data.id === nextSearchCursor.cell.id) {
          if (isBrowser) {
            this.handleScrollToCurrentCell(this.getDOMElementCurrentMark(this.currentCellRef.current));

          }
        }
      }
    }
  }

  componentDidMount() {
    const {data} = this.props;
    if (
      this.state.editable &&
      (data.content && (!data.content.content || data.content.content === ''))
    ) {
      this.openEditor();
    }

    if (isBrowser) {
      let searchCursor = getProject(this.props, 'searchCursor');
      if (searchCursor && searchCursor.cell && this.props.data.id === searchCursor.cell.id) {
        this.handleScrollToCurrentCell(this.getDOMElementCurrentMark(this.currentCellRef.current));
      }
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
    const timer = setInterval(this.createAutoSave, 30000);
    this.setState(state => ({...state, timer: timer}));
  };

  /** @desc стоп автосохранения */
  stopAutoSave = () => {
    clearInterval(this.state.timer);
    this.setState(state => ({...state, timer: null}));
  };

  /**
   * @desc метод для переключения в режим редактирования ячейки
   * */
  onToggleForm = () => {
    this.setState(state => ({...state, editable: !state.editable}));
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
      captureException(error);
    }
  };

  /**
   * @desc Метод для сохранения ячейки
   * */
  saveCellContent() {
    const content = typeof this.props.values.content ? this.props.values.content.replace(FROALA_WATER_MARK, '') : '';
    return this.props
      .mutate({
        variables: {
          id: this.props.data.id,
          content: content,
          contentname: this.props.values.name,
          verify: CELL_STATUS_CHANGED,
        },
        update: (store, {data: {updateCell}}) => {
          let data = {cellItem: {}};
          const options = {
            query: CellItemQuery,
            variables: {
              id: this.props.data.parent.id,
            },
          };

          try {
            UpdateCellInCache(store, {...updateCell.cell});
          } catch (e) {
            console.error( e);
            captureException(error,'Error in SidebarApprovalStatus change status: ');
          }

          try {
            data = store.readQuery(options);
            data.cellItem.verify = updateCell.cell.verify;
          } catch (error) {

            captureException(error, 'Warning UpdateCellInCache read: ');
          }
          try {
            store.writeQuery({...options, data: {...data}});
          } catch (error) {
            console.error(error);
            captureException(error);
          }


        },
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error('Error saveCellContent: ', error);
        captureException(error);
        throw error;
      });
  }

  /**
   * @desc метод для отключения фокуса формы
   * */
  onBlurForm = e => {
    /** setTimeout нужен для того чтобы при переключении фокуса из контента в заголовок и обратно не успевало срабатывать событие сохранения */
    let currentTarget = e.currentTarget.parentNode.parentNode.parentNode;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.props.removeBlock();
        this.startSave();
      }
    }, 50);
  };

  startSave = () => {
    this.stopAutoSave();
    this.saveCellContent()
      .then(() => {
        this.props.setNotificationSuccess(notificationOpts().success);
        this.onToggleForm();
      })
      .catch(error => {
        console.error('Error onBlurForm: ', error);
        this.props.setNotificationError(notificationOpts().error);
        this.onToggleForm();
        captureException(error);
      });
  };

  onHover = toggle => {
    this.setState(state => ({...state, toggleAdditionalMenu: toggle}));
  };


  render() {
    const {
      data,
      location: {search},
      sectionNumber,
      project,
      parentLetterNumber,
    } = this.props;
    const {toggleAdditionalMenu, editable} = this.state;
    return (
      <Relative
        ref={this.currentCellRef}
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}>
        <Flex pl={'10px'} alignItems="flex-start">
          {/** Отвечает за нумерацию разделов ячеек в эдиторе (1.1.1 Текст)*/}
          {parentLetterNumber ? null : (
            <EditorCellControllerNumber
              {...data}
              toggleAdditionalMenu={toggleAdditionalMenu}
              sectionid={getPosition(project, 'sectionid')}
              sectionNumber={sectionNumber}
            />
          )}

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
            {!editable && (
              <EditorCellContent
                onClick={() => (project.mode === PROJECT_MODE_RW ? this.openEditor() : null)}
                textAlign={data.content.contenttype === BLOCK_IMAGE ? 'center' : 'left'}
                project={project}
                {...data}
              />
            )}

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
                  handleScrollToCurrentCell={this.handleScrollToCurrentCell}
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

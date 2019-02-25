import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import {graphql} from 'react-apollo';
import {withRouter} from 'react-router-dom';

/** Mutation */
import UpdateCellMutation from '../EditorCellController/UpdateCellMutation.graphql';

/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';
import {EditorCellTitle} from '../EditorCellTitle/EditorCellTitle';
import {
  PROJECT_MODE_RC,
  PROJECT_MODE_RW,
  ProjectContextPropTypes,
} from '../ProjectContext/ProjectContext';
import EditorCellDelete from './EditorCellDelete';

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

/** Global */
import {BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT} from '../../../../shared/blockType';
import {ProjectModeState} from '../ProjectContext/ProjectModeState';
import {Relative} from "@lib/ui/Relative/Relative";
import {getPosition} from "../ProjectContext/ProjectContextSelectors";
import {EditorAdditionalMenu} from "../EditorAdditionalMenu/EditorAdditionalMenu";

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
    /** data for components */
    data: PropTypes.string,
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
      this.props.editable &&
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

  // onHover() {
  //   let bindingButton = document.querySelector('.fr-btn[id|="bind"]')

  //   if(bindingButton) {
  //     bindingButton.onmouseenter = (e) => {
  //       this.startBinding()
  //     }
  //     bindingButton.onmouseleave = () => {
  //       this.toggleDraggable()
  //     }
  //     bindingButton.onmousedown = () => {
  //       this.onDragBlock
  //     }
  //   }
  // }

  // async startBinding() {
  //   await this.toggleDraggable();
  // }

  // toggleDraggable = () => {
  //   this.setState((state) => ({
  //     ...state,
  //     draggable: !state.draggable,
  //   }))
  //   // this.onDrag = () => {
  //   //   console.log('dragging')
  //   // }
  // }

  // onDragBlock = (event) => {
  //   console.log(event)
  // }

  onHover = (toggle) => {
    this.setState(state => ({
      ...state,
      toggleAdditionalMenu: toggle,
    }));
  }

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
      <Relative
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}
      >
        <Flex pl={'10px'} alignItems="flex-start">
          <Relative pl={'10px'}>
            <Box
              mt={'-20px'}
              opacity={toggleAdditionalMenu ? 1 : 0}
            >
              <ProjectModeState is={PROJECT_MODE_RW}>
                <EditorAdditionalMenu
                  prevcell={data.prevcell ? data.prevcell.id : null}
                  nextcell={data.id}
                  parentid={getPosition(project, 'sectionid')}
                />
              </ProjectModeState>
            </Box>
            <Text
              width={'100px'}
              fontFamily={'secondary'}
              lineHeight={'22px'}
              fontSize={6}
              color={'color4'}
              mt={'2px'}>
              {/** иконка редактора */}
              {editable && data.content.contenttype !== BLOCK_TEXT && (
                <EditorTypeIcon type={data.content.contenttype}/>
              )}

              {/** номер текстового блока */}
              {data.content.contenttype === BLOCK_TEXT && data.parent && data.prevcell && (
                <Fragment> {sectionNumber}</Fragment>
              )}
            </Text>
            <Box
              opacity={toggleAdditionalMenu ? 1 : 0}
            >
              <ProjectModeState is={PROJECT_MODE_RW}>
                <EditorAdditionalMenu
                  prevcell={data.id}
                  nextcell={data.nextcell ? data.nextcell.id : null}
                  parentid={getPosition(project, 'sectionid')}
                />
              </ProjectModeState>
            </Box>
          </Relative>

          <Box width={'calc(100% - 160px)'}>
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
              <Text
                className={'editor-cell_content'}
                onClick={() => (project.mode === PROJECT_MODE_RW ? this.openEditor() : null)}
                fontSize={5}
                textAlign={data.content.contenttype === BLOCK_IMAGE ? 'center' : 'left'}
                wordBreak={'break-all'}
                lineHeight={6}
                color={'color11'}
                fontFamily={'primary300'}>
                {data.content &&
                typeof data.content.content === 'string' &&
                ReactHTMLParser(
                  data.content.content.replace('data-f-id="pbf"', 'style="display:none;"'),
                )}
                {data.content &&
                !data.content.content &&
                'Нажмите чтобы начать редактирование раздела.'}
              </Text>
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
                <EditorCellCommentController {...this.props.project} {...data} />
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
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellController);

export default EditorCellController;

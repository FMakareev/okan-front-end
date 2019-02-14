import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/** Mutation */
import UpdateCellMutation from '../EditorCellController/UpdateCellMutation.graphql';

/** Components */
import EditorCellForm from '../EditorCellForm/EditorCellForm';
import EditorCellDelete from './EditorCellDelete';

/** View */
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import { Flex } from '@lib/ui/Flex/Flex';
import EditorCellCommentController from '../EditorCellCommentController/EditorCellCommentController';
import EditorTypeIcon from '../../../../components/EditorTypeIcon/EditorTypeIcon';

/** Redux */
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { error, success } from 'react-notification-system-redux';

/** Global */
import {BLOCK_IMAGE, BLOCK_TEXT, BLOCK_TABLE} from '../../../../shared/blockType';

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
  };

  static defaultProps = { data: '' };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      editable: false,
      timer: null,
      // draggable: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
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
    const { values, data } = this.props;
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
   * @desc метод для отключения фокуса формы и автосохранения
   * */
  onBlurForm = () => {
    const { values, data } = this.props;
    this.stopAutoSave();
    if (values && values.content && values.content !== data.content.content) {
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

  render() {
    const { editable } = this.state;
    const {
      data,
      location: { search },
      sectionNumber,
      project,
    } = this.props;

    // console.log('1: ', this.props);
    // console.log('EditorCellController: ', editable);
    return (
      <Box
        ml={(data.content.contenttype !== BLOCK_TEXT && !editable)? 19 : null}
        mt={12}
      >
        <Text
          Weight={500}
          fontSize={6}
          color={'color11'}
          ml={'10px'}
        >
          {
            !editable && data.content.contenttype === BLOCK_TABLE ?
            data.content.number + '. ' + data.content.name :
            null
          }
        </Text>
        <Flex
          pl={'10px'}
          // onMouseOver={()=>this.onHover()}
          // // draggable={this.state.draggable}
          // // onClick={(event)=>{console.log('clicked', event.isPropagationStopped)}}
          // draggable="true"
          // draggable
          // onDrag={(event)=>this.onDragBlock(event)}
          // ondragstart={(event)=>this.onDragBlock(event)}
          alignItems="flex-start">
          {(data.content.contenttype === BLOCK_TEXT) && (
            <Text
              width={'100px'}
              fontFamily={'secondary'}
              lineHeight={'22px'}
              fontSize={6}
              color={'color4'}
              mt={'2px'}
              ml={'10px'}>
              {data.parent && data.prevcell && <Fragment> {sectionNumber}</Fragment>}
            </Text>
          )}
          {editable && data.content.contenttype !== BLOCK_TEXT && (
            <EditorTypeIcon type={data.content.contenttype} />
          )}
          <Box width={'calc(100% - 120px)'}>
            {!editable && (
              <Text
                className={'editor-cell_content'}
                onClick={this.openEditor}
                fontSize={5}
                lineHeight={6}
                color={'color11'}
                fontFamily={'primary300'}>
                {data.content && ReactHTMLParser(data.content.content)}
                {data.content &&
                  !data.content.content &&
                  'Нажмите чтобы начать редактирование раздела.'}
              </Text>
            )}
            {editable && (
              <EditorCellForm
                form={'EditorCellForm-' + data.id}
                initialValues={{
                  id: data.id,
                  content: data.content.content,
                  contenttype: data.content.contenttype,
                }}
                id={data.id}
                data={data}
                onBlurForm={() => this.onBlurForm()}
              />
            )}
          </Box>
          <EditorCellDelete id={data.id} sectionid={project.position.sectionid} />
          <Box width={'20px'}>
            <EditorCellCommentController {...this.props.project} {...data} />
          </Box>
        </Flex>
        <Text
          Weight={500}
          fontSize={6}
          color={'color11'}
          textAlign={'center'}
        >
          {
            !editable && data.content.contenttype === BLOCK_IMAGE ?
            data.content.number + '. ' + data.content.name :
            null
          }
        </Text>
      </Box>
    );
  }
}

EditorCellController = graphql(UpdateCellMutation)(EditorCellController);
EditorCellController = withRouter(EditorCellController);

EditorCellController = connect(
  (state, { data }) => {
    // console.log(data);
    // console.log('values: ', getFormValues('EditorCellForm-' + data.id)(state));

    return {
      values: getFormValues('EditorCellForm-' + data.id)(state),
    };
  },
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellController);

export default EditorCellController;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Absolute} from 'rebass';
import {connect} from 'react-redux';
/** Components */
import EditorCellCommentButton from '../EditorCellCommentButton/EditorCellCommentButton';

/** View */
import Box from '../../../../components/Box/Box';
import {Relative} from '@lib/ui/Relative/Relative';
import TextAreaBase from '@lib/ui/TextAreaBase/TextAreaBase';
import {Flex} from '@lib/ui/Flex/Flex';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import BorderColorProperty from '@lib/styles/styleProperty/BorderColorProperty';
import BackgroundColorProperty from '@lib/styles/styleProperty/BackgroundColorProperty';
import {EditorCellCommentItem} from '../EditorCellCommentItem/EditorCellCommentItem';
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

const FormStyled = styled(Form)`
  width: 250px;
  border: 1px solid;
  ${props => BorderColorProperty({...props, borderColor: 'color4'})};
  ${props => BackgroundColorProperty({...props, backgroundColor: 'color0'})};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

class FormCommentEditor extends Component {
  render() {
    // console.log('FormCommentEditor', this.props);
    return (
      <Box zIndex={1} right={'10px'} top={'10px'}>
        <FormStyled onSubmit={() => {
        }}>
          <Field name={'message'} component={TextAreaBase}/>
        </FormStyled>
        <Flex justifyContent={'flex-end'}/>
      </Box>
    );
  }
}

FormCommentEditor = reduxForm({
  form: 'FormCommentEditor',
})(FormCommentEditor);

export class EditorCellCommentController extends Component {
  state = {};

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    if (isBrowser) {
      this.app = document.getElementById('app');
    }
  }

  get initialState() {
    return {
      isOpen: false,
      status: this.getCurrentStatus(),
    };
  }

  /** @desc метод для получения статуса для кнопки комментария */
  getCurrentStatus = () => {
    try {
      const {comment, user, id} = this.props;
      // console.log('EditorCellCommentController: ', this.props);
      if (user && user.isAuth) {
        if (!comment) {
          return 'emptyComment';
        }
        if (user.id === comment.sender.id) {
          return 'comment';
        }
        return 'newComment';
      } else {
        return 'emptyComment';
      }
    } catch (error) {
      console.error(`Error getCurrentStatus id=${id}:`, error);
    }
  };

  /** @desc метод для вкл/выкл комментария */
  onToggle = () => {
    this.setState(state => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  };

  /** @desc обработчик клика по кнопке открытия комментария*/
  onClick = () => {
    try {
      this.onToggle();
      this.app && this.app.addEventListener('click', this.eventHandle);
    } catch (error) {
      console.error('Error onClick: ', error);
    }
  };

  /** @desc метод необходим для реализации закрытия комменатрия при клике вне области коментария */
  eventHandle = event => {
    try {
      const onToggleDetail = this.onToggle;
      const app = this.app;

      if (Array.isArray(event.path)) {
        if (
          event.path.findIndex(item => {
            return (
              item.className &&
              typeof item.className === 'string' &&
              item.className.indexOf('EditorCellCommentWrapper') >= 0
            );
          }) === -1
        ) {
          onToggleDetail();
          app.removeEventListener('click', this.eventHandle);
        }
      }
    } catch (error) {
      console.log('Error eventHandle: ', error);
    }
  };

  render() {
    const {isOpen, status} = this.state;
    const {comments, project, user} = this.props;
    console.log('EditorCellCommentController: ',this.props);
    /** @desc скрываю кнопук коментариев для автора проекта если коментариев нет */
    if(project.author.id === user.id && (!comments || comments.length === 0)){
      return null;
    }
    return (
      <Relative>
        <EditorCellCommentButton status={status} onClick={this.onClick}/>
        {Array.isArray(comments) && comments.length > 0 && isOpen && (
          <Absolute zIndex={5} className={'EditorCellCommentWrapper'} top={'20px'} right={0}>
            <EditorCellCommentItem cell={this.props} {...comments[0]} key={`FormCommentEditor`}/>
          </Absolute>
        )}
      </Relative>
    );
  }
}

EditorCellCommentController = connect(store => ({
  user: getUserFromStore(store),
}))(EditorCellCommentController);
export default EditorCellCommentController;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Absolute} from 'rebass';
import {connect} from 'react-redux';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';

/** Components */
import EditorCellCommentButton from '../EditorCellCommentButton/EditorCellCommentButton';
import {EditorCellCommentItem} from '../EditorCellCommentItem/EditorCellCommentItem';

/** View */
import Box from '@lib/ui/Box/Box';
import {Relative} from '@lib/ui/Relative/Relative';
import TextAreaBase from '@lib/ui/TextAreaBase/TextAreaBase';
import {Flex} from '@lib/ui/Flex/Flex';

/** Styles css */
import BorderColorProperty from '@lib/styles/styleProperty/BorderColorProperty';
import BackgroundColorProperty from '@lib/styles/styleProperty/BackgroundColorProperty';

/** Reducer */
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

  /**
   * @return {string}
   * @desc метод для получения статуса для кнопки комментария */
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
      return 'emptyComment';
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

  /**
   * @return {array}
   * @desc Получаем список комментов */
  get partnersList() {
    try {
      if (Array.isArray(this.props.comments)) {
        return this.props.comments.filter(item => item.sender.id === this.props.user.id);
      }
      return []
    } catch (error) {
      console.error('Error: ', error);
      return []
    }
  }

  render() {
    const {isOpen, status} = this.state;
    const {comments, project, user} = this.props;

    /** @desc скрываю кнопку комментариев для автора проекта если коментариев нет */
    if (
      project &&
      project.author &&
      project.author.id === user.id &&
      (!comments || comments.length === 0)
    ) {
      return null;
    }

    const comment = this.partnersList ? this.partnersList : null;
    return (
      <Relative>
        <EditorCellCommentButton status={status} onClick={this.onClick}/>
        {Array.isArray(comments) && comments.length > 0 && isOpen && (
          <Absolute zIndex={5} className={'EditorCellCommentWrapper'} top={'20px'} right={0}>
            <EditorCellCommentItem
              cell={this.props}
              commentsList={comment}
              key={`FormCommentEditor`}
            />
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

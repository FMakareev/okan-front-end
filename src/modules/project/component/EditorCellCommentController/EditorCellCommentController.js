import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {Absolute} from 'rebass';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {error, success} from "react-notification-system-redux";
import {graphql} from "react-apollo";
import {RegistryFactory, RegistrySwitch} from "@lib/ui/RegistryPattern/RegistryPattern";

/** Components */
import EditorCellCommentButton from '../EditorCellCommentButton/EditorCellCommentButton';
import {EditorCellCommentList} from '../EditorCellCommentList/EditorCellCommentList';
import {EditorCellCommentItem} from "../EditorCellCommentItem/EditorCellCommentItem";
import {EditorCellCommentCreateForm} from "../EditorCellCommentCreateForm/EditorCellCommentCreateForm";

/** View */
import {Relative} from '@lib/ui/Relative/Relative';


/** Reducer */
import {getUserFromStore} from '../../../../store/reducers/user/selectors';

/** graphql query|mutation*/
import CellListQuery from '../../graphql/CellListAndParentCellQuery.graphql';
import UpdateCommentMutation from '../../graphql/UpdateCommentMutation.graphql';

/** constants */
import {
  COMMENTS_HIDE,
  COMMENTS_READ_AUTHOR,
  COMMENTS_READ_PARTNER,
  COMMENTS_WRITE
} from "./EditorCellCommentControllerMode";
import {PROJECT_MODE_RC, PROJECT_MODE_RW} from "../ProjectContext/ProjectContext";
import {findClassInPath} from "../../utils/findClassInPath";
import {withRouter} from "react-router-dom";


const CommentRegistry = new RegistryFactory({
  components: {
    COMMENTS_READ_AUTHOR: EditorCellCommentList,
    COMMENTS_READ_PARTNER: EditorCellCommentItem,
    COMMENTS_WRITE: EditorCellCommentCreateForm,
    COMMENTS_HIDE: null,
  }
});


const commentDeletionNotifications = () => ({
  success: {
    title: 'Комментарий удален',
    message: 'Комментарий удален',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Комментарий не удален',
    message: 'Комментарий не удален',
    position: 'tr',
    autoDismiss: 2,
  },
});


export class EditorCellCommentController extends Component {
  state = {};

  static propTypes = {
    comments: PropTypes.array,
    id: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    parent: PropTypes.object,
    position: PropTypes.object,
    project: PropTypes.object,
    setNotificationError: PropTypes.func.isRequired,
    setNotificationSuccess: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    if (isBrowser) {
      this.app = document.getElementById('app');
      this.currentCommentRef = React.createRef();
    }
  }

  get initialState() {
    return {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.checkIfRedirected();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isOpen !== this.state.isOpen) {
      return true;
    } else if (nextProps.mode !== this.props.mode) {
      return true;
    } else if (Array.isArray(nextProps.comments) !== Array.isArray(this.props.comments)) {
      return true;
    } else if ((Array.isArray(nextProps.comments) && Array.isArray(this.props.comments)) &&
      nextProps.comments.length !== this.props.comments.length) {
      return true;
    }
    return false;
  }


  /** @desc метод для вкл/выкл комментария */
  onToggleComments = () => {
    this.setState(state => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  };

  /** @desc обработчик клика по кнопке открытия комментария*/
  handleClickForButtonComment = () => {
    try {
      this.onToggleComments();
      this.app && this.app.addEventListener('click', this.eventHandle);
    } catch (error) {
      console.error('Error handleClickForButtonComment: ', error);
    }
  };

  /** @desc метод необходим для реализации закрытия комменатрия при клике вне области коментария */
  eventHandle = event => {
    try {
      const {isOpen} = this.state;
      if (Array.isArray(event.path) && isOpen) {
        if (findClassInPath(event.path, `EditorCellCommentWrapper`) >= 0) {
          return null
        } else if (findClassInPath(event.path, `EditorCellCommentWrapper`) < 0 || findClassInPath(event.path, `EditorCellCommentButton`) >= 0) {
          this.onToggleComments();
          this.app && this.app.removeEventListener('click', this.eventHandle);
        }
      }
    } catch (error) {
      console.error('Error eventHandle: ', error);
    }
  };

  /** @desc Метод проверяет, есть ли в uri значения cellid и сommentid.
   * Если есть, то пользователь был перенаправлен по клику на уведомление,
   * тогда открываем комментарий
   */
  checkIfRedirected = () => {
    const cellId = this.getCellIdFromSearchParam();
    const commentId = this.getCommentIdFromSearchParam();
    if (cellId === this.props.id && this.getCommentById(this.props.comments, commentId)) {
      this.handleClickForButtonComment();
      this.props.handleScrollToCurrentCell(this.currentCommentRef.current);
      return true;
    } else {
      return false;
    }
  };

  /**
   * @param {array} comments
   * @param {string} id
   * @return {object|null}
   * @desc получить комментарий из ячейки по id */
  getCommentById = (comments, id) => {
    try {
      if (Array.isArray(comments) && id) {
        return comments.find(comment => comment.id === id);
      }
      return null;

    } catch (error) {
      console.error('Error getCommentById: ', error);
      return null;
    }
  };

  /**
   * @return {string|null}
   * @desc метод парсит параметры поиска адресной строки и выдает id ячейки если он там есть
   * */
  getCellIdFromSearchParam = () => {
    try {
      return queryString.parse(this.props.location.search).cellid;
    } catch (e) {
      return null;
    }
  };

  /**
   * @return {string|null}
   * @desc метод парсит параметры поиска адресной строки и выдает id комментария если он там есть
   * */
  getCommentIdFromSearchParam = () => {
    try {
      return queryString.parse(this.props.location.search).commentid;
    } catch (e) {
      return null;
    }
  };

  /**
   * @return {string|null}
   * @desc метод для получения статуса для кнопки комментария */
  getCurrentStatus = (mode) => {
    try {
      switch (mode) {
        case(COMMENTS_READ_AUTHOR): {
          return 'newComment';
        }
        case(COMMENTS_READ_PARTNER): {
          return 'comment';
        }
        case(COMMENTS_WRITE): {
          return 'emptyComment';
        }
        case(COMMENTS_HIDE): {
          return 'emptyComment';
        }
      }
    } catch (error) {
      console.error(`Error getCurrentStatus id=$:`, error);
      return 'emptyComment';
    }
  };

  /**
   * @param {object} project
   * @param {string} documentid
   * @return {object}
   * @desc метод получает из проекта объект документа к которому принадлежит инстанс этого класса
   * */
  getDocumentToWhichTheCellBelongs = (project, documentid) => {
    try {
      return project.documents.find(item => {
        return item.id === documentid;
      })
    } catch (error) {
      console.error('Error getDocumentToWhichTheCellBelongs: ', error);
      return null;
    }
  };

  /**
   * @param {object} document
   * @param {string} userId
   * @return {object | null}
   * @desc метод проверяет является ли указанный пользователь проверяющим документа
   * */
  userOneOfDocumentPartners = (document, userId) => {
    try {
      return document.partners ? document.partners.find(item => item.id === userId) : null;
    } catch (error) {
      console.error('Error userOneOfDocumentPartners: ', error);
      return null;
    }
  };

  /**
   * @param {array} comments
   * @param {string} userId
   * @return {object|null}
   * @desc метод для получения комментария пользователя
   * */
  getUserComment = (comments, userId) => {
    try {
      return Array.isArray(comments) ? comments.find(item => item.sender.id === userId) : null;
    } catch (error) {
      console.error('Error getUserComment: ', error);
      return null;
    }
  };

  /**
   * @returns {string} oneOf(COMMENTS_READ_AUTHOR|COMMENTS_READ_PARTNER|COMMENTS_HIDE|COMMENTS_WRITE)
   * @desc метод для получения текущего режима работы этого компонента */
  getCurrentCommentMode = () => {
    try {
      const {comments, user, mode, project, position} = this.props;

      /** пользователь авторизован и редактор в режиме комментирования или редактирования */
      if (
        user && user.isAuth &&
        (mode === PROJECT_MODE_RW || mode === PROJECT_MODE_RC)
      ) {
        /** если пользователь автор проекта */
        if (project.author.id === user.id) {
          if ((Array.isArray(comments) && comments.length)) {
            return COMMENTS_READ_AUTHOR;
          }
        } else {
          const documentToWhichTheCellBelongs = this.getDocumentToWhichTheCellBelongs(project, position.documentid);
          const userIsPartner = this.userOneOfDocumentPartners(documentToWhichTheCellBelongs, user.id);
          if (userIsPartner) {
            if (this.getUserComment(comments, user.id)) {
              return COMMENTS_READ_PARTNER;
            }
            return COMMENTS_WRITE;
          }
        }
      }
      return COMMENTS_HIDE;
    } catch (error) {
      console.error('Error getCurrentCommentMode: ', error);
      return COMMENTS_HIDE;
    }
  };

  /**
   * @param {array} comments
   * @param {string} mode
   * @param {string} userId
   * @return {object}
   * @desc метод является по сути прослойкой для формирования определенной структуры данных для компонентов списка комментариев и одного комментария
   * */
  commentListFilter = (comments, mode, userId) => {
    try {
      switch (mode) {
        case (COMMENTS_READ_AUTHOR): {
          return {
            comments: comments
          };
        }
        case (COMMENTS_READ_PARTNER): {
          return this.getUserComment(comments, userId);
        }
        default: {
          return {};
        }
      }
    } catch (error) {
      console.error('Error commentListFilter: ', error);
      return {};
    }
  };

  /** @desc метод для удаления коментария из ячейки */
  onDeletionNotifications = (id) => {
    return this.props[`@apollo/deletionNotification`]({
      variables: {id, isdelete: true},
      update: (store, {data: {updatecomment}}) => {
        const options = {
          query: CellListQuery,
          variables: {parent: this.props.parent.id},
        };
        let data = null;
        try {
          data = store.readQuery(options);
        } catch (error) {
          console.error('Error onDeletionNotifications update.read: ', error);
        }
        try {
          if (data) {
            data.celllist.map(cell => {
              if (Array.isArray(cell.comments)) {
                let documentIndex = cell.comments.findIndex(comment => comment.id === updatecomment.comment.id);
                if (documentIndex >= 0) {
                  cell.comments && cell.comments.splice(documentIndex, 1);
                }
              }
              return cell;
            });
          }
        } catch (error) {
          console.error('Error onDeletionNotifications update.change: ', error);
        }
        try {
          store.writeQuery({...options, data});
        } catch (error) {
          console.error('Error onDeletionNotifications update.write: ', error);
        }
      },
    })
      .then(response => {
        this.props.setNotificationSuccess(commentDeletionNotifications().success);
        this.onToggleComments();
        return response;
      })
      .catch(error => {
        this.props.setNotificationError(commentDeletionNotifications().error);
        console.error('Error onDelete:', error);
      });
  };

  render() {
    const {isOpen} = this.state;
    const {comments, user, id} = this.props;
    const commentControllerMode = this.getCurrentCommentMode();
    const buttonStatus = this.getCurrentStatus(commentControllerMode);

    if (commentControllerMode === COMMENTS_HIDE) {
      return null;
    }

    return (
      <Relative ref={this.currentCommentRef}>
        <EditorCellCommentButton
          className={'EditorCellCommentButton'}
          status={buttonStatus}
          onClick={this.handleClickForButtonComment}
        />
        {isOpen && (
          <Absolute zIndex={5} className={'EditorCellCommentWrapper'} top={'20px'} right={0}>
            <RegistrySwitch
              registry={CommentRegistry}
              type={commentControllerMode}
              form={`EditorCellCommentCreateForm-${id}`}
              cell={this.props}
              onDelete={this.onDeletionNotifications}
              {...this.commentListFilter(comments, commentControllerMode, user.id)}
            />
          </Absolute>
        )}
      </Relative>
    );
  }
}

EditorCellCommentController = withRouter(EditorCellCommentController);
EditorCellCommentController = graphql(UpdateCommentMutation, {
  name: `@apollo/deletionNotification`,
})(EditorCellCommentController);

EditorCellCommentController = connect(
  store => ({
    user: getUserFromStore(store),
  }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorCellCommentController);
export default EditorCellCommentController;

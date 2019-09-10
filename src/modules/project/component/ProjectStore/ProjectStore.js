import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  PROJECT_MODE_READ,
  PROJECT_MODE_RW,
  ProjectContext,
} from '../ProjectContext/ProjectContext';
import { connect } from 'react-redux';
import shallowequal from 'shallowequal'; // ES6

import { getUserFromStore } from '../../../../store/reducers/user/selectors';
import { joinQueryString } from '@lib/utils/joinQueryString';
import { withRouter } from 'react-router-dom';
import { captureException } from '../../../../hocs/withSentry/withSentry';

/**
 * @typedef {Object} Position
 * @property {string} sectionid - id активной ячейки
 * @property {string} documentid - id документа в котором активна ячейка
 * @property {string} projectid - id открытого проекта
 * @property {string} revisionid - id ревизии документа
 */

/**
 * @typedef {Object} ProjectStoreState
 * @property {object} position
 * @property {Position} project
 * @property {string} mode
 */

export class ProjectStore extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    params: PropTypes.object.isRequired,
    projectitem: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    const { user, projectitem, params } = this.props;

    return {
      /** объект с параметрами роутера */
      position: params,
      /** объект с данными о проекте */
      project: projectitem,
      /** режим работы проекта */
      mode: this.getCurrentEditorMode(user, projectitem.author),
      searchResult: [],
      searchPhrase: null,
      searchCursor: {
        documentIndex: 0,
        document: null,
        cellIndex: 0,
        cell: null,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowequal(this.props.params, nextProps.params) ||
      !shallowequal(this.props.projectitem, nextProps.projectitem) ||
      !shallowequal(this.state.searchCursor, nextState.searchCursor) ||
      this.state.searchResult.length !== nextState.searchResult
    );
  }

  componentWillReceiveProps(nextProps) {
    let newState = null;

    if (!shallowequal(this.props.params, nextProps.params)) {
      newState = {
        ...newState,
        position: nextProps.params,
      };
    }

    if (!shallowequal(this.props.projectitem, nextProps.projectitem)) {
      newState = {
        ...newState,
        project: nextProps.projectitem,
        mode: this.getCurrentEditorMode(nextProps.user, nextProps.projectitem.author),
      };
    }

    if (newState) {
      this.setState(state => ({
        ...state,
        ...newState,
      }));
    }
  }

  /**
   * @desc метод по текущему авторизованному пользователю и авторму проекта определяет режим работы редактора
   * */
  getCurrentEditorMode = (currentUser, projectAuthor) => {
    try {
      if (this.props.mode) return this.props.mode;

      const { projectitem } = this.props;

      if (currentUser.id === projectAuthor.id || projectitem.partners.find((user) => user.id === currentUser.id)) {
        return PROJECT_MODE_RW;
      } else {
        return PROJECT_MODE_READ;
      }
    } catch (error) {
      console.error('Error getCurrentEditorMode: ', error);
      captureException(error);
      return PROJECT_MODE_READ;
    }
  };

  /**
   * @param {string} searchPhrase новый параметр
   * @desc изенение в адресной строки параметра поиска searchPhrase */
  changeSearchPhraseInLocationSearch = searchPhrase => {
    try {
      this.props.history.push({
        search: joinQueryString(this.props.location.search, {
          searchPhrase: searchPhrase,
        }),
      });
    } catch (error) {
      captureException(error);
      console.error('Error changeSearchPhraseInLocationSearch: ', error);
    }
  };

  /**
   * @desc метод сбрасываетпараметры поиска
   * */
  resetSearchCondition = () => {
    try {
      this.setState(state => ({
        ...state,
        searchResult: [],
        searchPhrase: null,
        searchCursor: {
          documentIndex: 0,
          document: null,
          cellIndex: 0,
          cell: null,
        },
      }));

      this.changeSearchPhraseInLocationSearch(null);
    } catch (error) {
      captureException(error);
      console.error('Error resetSearchCondition', error);
    }
  };

  /**
   * @param {array} result
   * @param {string} searchPhrase
   * @desc метод пишет в state контекста результаты поиска
   * */
  updateSearchResults = (result, searchPhrase) => {
    try {
      this.setState(
        state => ({
          ...state,
          searchResult: result,
          searchPhrase: searchPhrase,
        }),
        () => {
          this.changeSearchPhraseInLocationSearch(searchPhrase);
          this.initSearchCursor();
        },
      );
    } catch (error) {
      captureException(error);
      console.error(error);
    }
  };

  searchCellInSearchResult = (cursor, result) => {
    cursor.document = result[cursor.documentIndex].documents;
    cursor.cellIndex = result[cursor.documentIndex].cells.length - 1;
    cursor.cell = result[cursor.documentIndex].cells[cursor.cellIndex];
    return cursor.cell;
  };

  /**
   * @param {array} searchResult
   * @param {object} searchCursor
   * @return {object}
   * @desc
   * */
  cursorBackward = (searchResult, searchCursor) => {
    if (searchCursor.cellIndex > 0) {
      searchCursor.cellIndex -= 1;
      searchCursor.cell = searchResult[searchCursor.documentIndex].cells[searchCursor.cellIndex];
    } else {
      if (searchCursor.documentIndex > 0) {
        searchCursor.documentIndex -= 1;
        this.searchCellInSearchResult(searchCursor, searchResult);
      } else {
        searchCursor.documentIndex = searchResult.length - 1;
        this.searchCellInSearchResult(searchCursor, searchResult);
      }
    }
    return searchCursor;
  };

  /**
   * @param {number} documentIndex индекс текущего документа
   * @param {number} cellIndex индекс ячейки которую необходимо получить - 1
   * @return {object} cell
   * @return {number} cell.cellIndex
   * @return {object} cell.cell
   * @desc получить следующую ячейку,
   * */
  getNextCellFromSearch = (documentIndex, cellIndex) => {
    try {
      const { searchResult } = this.state;
      if (searchResult && searchResult.length) {
        if (cellIndex < searchResult[documentIndex].cells.length - 1) {
          return {
            cellIndex: cellIndex + 1,
            cell: searchResult[documentIndex].cells[cellIndex + 1],
          };
        } else {
          return {
            cellIndex: 0,
            cell: searchResult[documentIndex].cells[0],
          };
        }
      } else {
        return {
          cellIndex: 0,
          cell: null,
        };
      }
    } catch (error) {
      captureException(error);
      console.error('Error: ', error);
    }
  };

  /**
   * @param {number} documentIndex индекс текущего документа
   * @param {number} cellIndex индекс текущей ячейки
   * @return {object}
   * @desc метод возвращает документ
   * */
  getCurrentDocumentFromSearch = (documentIndex, cellIndex) => {
    try {
      const { searchResult } = this.state;
      if (searchResult && searchResult.length) {
        if (cellIndex < searchResult[documentIndex].cells.length - 1) {
          return {
            documentIndex: documentIndex,
            document: searchResult[documentIndex].documents,
          };
        } else if (documentIndex < searchResult.length - 1) {
          return {
            documentIndex: documentIndex + 1,
            document: searchResult[documentIndex + 1].documents,
          };
        } else {
          return {
            documentIndex: 0,
            document: searchResult[0].documents,
          };
        }
      } else {
        return {
          documentIndex: 0,
          document: null,
        };
      }
    } catch (error) {
      captureException(error);
      console.error('Error: ', error);
    }
  };

  /**
   * @desc инициализация курсора поиска
   * */
  initSearchCursor = () => {
    try {
      const { searchResult, position } = Object.assign({}, this.state);
      if (position.sectionid && position.documentid) {
        const documentIndex = searchResult.findIndex(
          document => document.documents.id === position.documentid,
        );

        if (documentIndex >= 0) {
          const cellIndex = searchResult[documentIndex].cells.findIndex(
            cell => cell.parent.id === position.sectionid,
          );

          if (cellIndex >= 0) {
            const document = this.getCurrentDocumentFromSearch(documentIndex, cellIndex - 1);
            const cell = this.getNextCellFromSearch(documentIndex, cellIndex - 1);

            this.setState(state => ({
              ...state,
              searchCursor: {
                ...document,
                ...cell,
              },
            }));
          }
        }
      } else {
        const document = this.getCurrentDocumentFromSearch(0, 0);
        const cell = this.getNextCellFromSearch(0, 0);

        this.setState(state => ({
          ...state,
          searchCursor: {
            ...document,
            ...cell,
          },
        }));
      }
    } catch (error) {
      captureException(error);
      console.error('Error initSearchCursor:', error);
    }
  };

  /**
   * @desc смещение курсора поиска
   * */
  changeSearchCursor = (moved = 'forward') => {
    const { searchResult, searchCursor } = Object.assign({}, this.state);

    if (searchResult.length) {
      if (moved === 'forward') {
        let newSearchCursor = {
          ...searchCursor,
          ...this.getCurrentDocumentFromSearch(searchCursor.documentIndex, searchCursor.cellIndex),
        };

        newSearchCursor = {
          ...newSearchCursor,
          ...this.getNextCellFromSearch(newSearchCursor.documentIndex, newSearchCursor.cellIndex),
        };

        this.setState(state => ({
          ...state,
          searchCursor: newSearchCursor,
        }));
      } else if (moved === 'backward') {
        this.setState(state => ({
          ...state,
          searchCursor: this.cursorBackward(searchResult, searchCursor),
        }));
      }
    }
    /**
     * 1. как выполнять движение по списку поиска по клику
     * 2. как открывать разделы если контент найден в подразделе
     *    1. можно тут проверять есть ли у ячейки парент и если есть то выгружать ветку до начала и таким образом
     *    формировать путь до нашей ячейки в дереве, этот путь передавать в DocumentTree замутить там метод который будет по этому пути выстраивать ветку и открывать всех
     *    2. в searchCursor.cell писать объект и его передавать в DocumentTree там проверять есть ли парент и строить ветку как при инициализации
     * 3.
     *
     * */
  };

  render() {
    const { children } = this.props;
    return (
      <ProjectContext.Provider
        value={{
          ...this.state,
          updateSearchResults: this.updateSearchResults,
          changeSearchCursor: this.changeSearchCursor,
          resetSearchCondition: this.resetSearchCondition,
        }}>
        {children}
      </ProjectContext.Provider>
    );
  }
}

ProjectStore = withRouter(ProjectStore);

ProjectStore = connect(state => ({
  user: getUserFromStore(state),
}))(ProjectStore);

export default ProjectStore;

import React, {Component} from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components';
import {Flex} from "@lib/ui/Flex/Flex";
import {connect} from 'react-redux';
import {Field, getFormValues, reduxForm, SubmissionError} from "redux-form";
import {Box} from "@lib/ui/Box/Box";
import TextFieldWithTooltip from "@lib/ui/TextFieldWithTooltip/TextFieldWithTooltip";
import throttle from "lodash/throttle";
import CellByNameQuery from '../../graphql/CellByNameQuery.graphql';
import {withApollo} from "react-apollo";
import has from "@lib/utils/has";
import {ButtonWithImage} from "@lib/ui/ButtonWithImage/ButtonWithImage";
import {withRouter} from "react-router-dom";
import {getPosition, getProject} from "../ProjectContext/ProjectContextSelectors";

const WrapperStyled = styled(Flex)`
  position: fixed;
  max-width: 323px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #ffffff;
`;

export class SidebarDocumentSearch extends Component {

  static propTypes = {
    client: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    project: PropTypes.shape({
      mode: PropTypes.string,
      position: PropTypes.object,
      project: PropTypes.object,
      updateSearchResults: PropTypes.func
    }),
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    const {project: {changeSearchCursor}} = this.props;

    this.changeSearchCursorWithThrottle = throttle(changeSearchCursor, 600);
    this.documentSearchWithThrottle = throttle(this.props.handleSubmit(this.documentSearch), 500);
  }

  get initialState() {
    return {
      isLoading: false,
    };
  }

  componentDidMount() {
    /** инициализация поиска при наличии данных во время первого рендера формы */
    if (has.call(this.props.initialValues, 'name') && this.props.initialValues.name) {
      this.documentSearch(this.props.initialValues);
    }
  }

  /** @desc Изменние состояния загрузки */
  toggleLoading = () => {
    this.setState(state => ({
      isLoading: !state.isLoading
    }));
  };


  /**
   * @param {object} value
   * @param {string} value.name
   * @desc выполнение запроса на сервер
   * */
  documentSearch = async (value) => {
    const {project, client} = this.props;

    const {updateSearchResults, resetSearchCondition, searchResult, searchPhrase} = project;

    if (!has.call(value, 'name') || typeof value.name === 'string' && value.name.length < 4) {
      resetSearchCondition();
      return
    } else if (value.name === searchPhrase && searchResult.length) {
      return
    } else {
      resetSearchCondition();
    }

    this.toggleLoading();

    const {data} = await client.query({
      query: CellByNameQuery,
      fetchPolicy: 'no-cache',
      variables: {
        ...value,
        projectid: getProject(project, 'id'),
        revision: getPosition(project, 'revisionid'),
        document: getPosition(project, 'documentid'),
      }
    }).catch(error => {
      console.error('Error documentSearch: ', error);
      return error;
    });

    if (data) {
      updateSearchResults(data.cellbyname, value.name);
    }

    this.toggleLoading();

    if (data && !data.cellbyname.length) {
      throw new SubmissionError({name: `По вашему запросу совпадений не найдено.`});
    }
  };

  /** @desc Обработчик ввода с клавиатуры, проверет нажатие enter */
  onKeyUp = (event) => {
    if (event.key === "Enter") {
      event.persist();
      this.onUserInput(event);
    }
  };

  /**
   * @param {object} event
   * @desc если в результатах поиска что либо есть и текущий запрос в форме не соответствует состоянию
   * то выполняем движение по списку результатов, иначе делаем запрос на сервер
   * */
  onUserInput = (event) => {
    const {project: {searchResult, searchPhrase}, values} = this.props;
    if (
      (Array.isArray(searchResult) && searchResult.length) &&
      (values && values.name === searchPhrase)
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.changeSearchCursorWithThrottle();
    } else {
      this.documentSearchWithThrottle();
    }
  };


  /**
   * @param {object} event
   * @desc метод обертка для метода onChange в TextField сравнивает старое значение и новое и если новое пустое,
   * а старое полное делает сброс параметров поиска
   * */
  onResetSearchField = (event) => {
    const {values, project: {resetSearchCondition}} = this.props;
    if (
      event.target.value === '' &&
      (values && typeof values.name === 'string' && values.name.length)
    ) {
      resetSearchCondition();
    }
    return event;
  };

  /** @desc метод считает сколько всего результатов по всем документам */
  getNumberOfSearchResults = () => {
    let count = 0;
    try {
      const {project: {searchResult}} = this.props;
      if (Array.isArray(searchResult)) {
        searchResult.forEach(item => {
          count += item.cells.length;
        });
      }
      return count || '';
    } catch (e) {
      console.error('Error getNumberOfSearchResults: ', e);
      return '';
    }
  };

  /** @desc метод считает сколько всего результатов по всем документам и какой порядковый номер
   * у результата на котором курсор и возвращает объект с этими данными. */
  getNumberOfSearchCursor = () => {
    let resultCount = 0;
    let cursorIndex = 0;
    try {
      const {project: {searchResult, searchCursor}} = this.props;

      if (Array.isArray(searchResult) && searchCursor.cell) {
        searchResult.forEach(item => {
          cursorIndex = item.cells.findIndex(cell => cell.id === searchCursor.cell.id);
          if (cursorIndex >= 0) {
            cursorIndex += resultCount + 1;
          }
          resultCount += item.cells.length;
        });
      }

      return {
        resultCount: resultCount,
        resultCursorIndex: cursorIndex
      };
    } catch (e) {
      console.error('Error getNumberOfSearchResults: ', e);
      return {
        resultCount: 0,
        resultCursorIndex: 0,
      };
    }
  };

  render() {
    const {isLoading} = this.state;
    const {resultCount, resultCursorIndex} = this.getNumberOfSearchCursor();
    return (
      <WrapperStyled
        py={4}
        pl={'10px'}
        pr={'12px'}
        alignItems={'center'}
      >
        <Box mt={'-6px'} height={'20px'} width={'100%'}>
          <Field
            name={'name'}
            disabled={isLoading}
            tooltipPosition={'top'}
            component={TextFieldWithTooltip}
            placeholder={'Введите название документа...'}
            size={'xs'}
            type={'search'}
            borderRadius={'4px'}
            pr={'50px'}
            onChangeHOC={this.onResetSearchField}
            onKeyUp={this.onKeyUp}
          />
        </Box>
        {
          (resultCursorIndex > 0 && resultCount > 0) &&
          <Box m={0} height={'20px'} width={'auto'} position={'absolute'} right={'75px'} lineHeight={'20px'}
               zIndex={10}>
            {resultCursorIndex}/{resultCount}
          </Box>
        }
        <Box ml={'3'} height={'20px'}>
          <ButtonWithImage
            type={'submit'}
            disabled={isLoading}
            isLoading={isLoading}
            title={'Поиск по документам'}
            size={'small'}
            variant={'outlineGray'}
            p={'2px'}
            fontSize={'15px'}
            onClick={this.onUserInput}
          >
            Поиск
          </ButtonWithImage>
        </Box>
      </WrapperStyled>
    )
  }
}

SidebarDocumentSearch = withApollo(SidebarDocumentSearch);
SidebarDocumentSearch = withRouter(SidebarDocumentSearch);

SidebarDocumentSearch = connect(
  state => ({
    values: getFormValues('SidebarDocumentSearch')(state),
  })
)(SidebarDocumentSearch);

SidebarDocumentSearch = reduxForm({
  form: 'SidebarDocumentSearch',
})(SidebarDocumentSearch);


export default SidebarDocumentSearch;

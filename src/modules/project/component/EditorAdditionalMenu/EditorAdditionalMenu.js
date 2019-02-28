import React, {Component, Fragment} from 'react';
import {Absolute} from 'rebass';
import PropTypes from 'prop-types';
import {graphql, Query, withApollo} from 'react-apollo';
import {connect} from 'react-redux';
import {error, success} from 'react-notification-system-redux';

/** Image */
import {SvgSidebarAdd} from '@lib/ui/Icons/SvgSidebarAdd';

/** View */
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/** Components */
import EditorAdditionalMenuButtonTable from './EditorAdditionalMenuButtonTable';
import EditorAdditionalMenuButtonImage from './EditorAdditionalMenuButtonImage';
import EditorAdditionalMenuButtonText from './EditorAdditionalMenuButtonText';

/** Graphql schema */
import CreateCellMutation from '../SidebarCreateCell/CreateCellMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

/** New block types */
import {BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT} from '../../../../shared/blockType';

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';

/** Utils */
import {sortingCells} from '../../utils/sortingCells';
import {UpdateCellInCache} from "../../utils/UpdateCellInCache";

// TODO: три компонента кнопок превратить в один и тип и название передавать пропсами
const EditorAdditionalMenuButton = props => {
  return (
    <Absolute className={'EditorAdditionalMenuButton'} left={'30px'} top={'0%'}>
      <Flex mx={-2}>
        <Box mx={2}>
          <EditorAdditionalMenuButtonTable {...props} />
        </Box>
        <Box mx={2}>
          <EditorAdditionalMenuButtonImage {...props} />
        </Box>
        <Box mx={2}>
          <EditorAdditionalMenuButtonText {...props} />
        </Box>
      </Flex>
    </Absolute>
  );
};

const createCellNotification = (contentType, messageType) => {
  let contentTypeName = '';
  switch (contentType) {
    case BLOCK_TABLE: {
      contentTypeName = 'таблица';
      break;
    }
    case BLOCK_IMAGE: {
      contentTypeName = 'изображение';
      break;
    }
    case BLOCK_TEXT: {
      contentTypeName = 'текстовый блок';
      break;
    }
  }

  switch (messageType) {
    case 'success': {
      return {
        title: `Создан: ${contentTypeName}`,
        position: 'tr',
        autoDismiss: 3,
      };
    }
    case 'error': {
      return {
        title: 'Ошибка',
        message: `Не создан: ${contentTypeName}`,
        position: 'tr',
        autoDismiss: 3,
      };
    }
    default: {
      return {
        title: 'Ошибка',
        message: 'Произошла неизвестная ошибка, попробуйте перезагрузить страницу и повторить операцию.',
        position: 'tr',
        autoDismiss: 3,
      };
    }
  }
};

/**
 * @desc Компонент контроллер для добавления новых блоков в документ
 * */
export class EditorAdditionalMenu extends Component {
  static propTypes = {
    /** func submit for Form */
    handleClick: PropTypes.func,
    /** open window */
    isOpen: PropTypes.bool,
    /** id парента */
    parentid: PropTypes.string.isRequired,
    prevcell: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    if (isBrowser) {
      this.app = document.getElementById('app');
    }
  }

  get initialState() {
    return {
      active: false,
    };
  }

  componentWillUnmount() {
    if (isBrowser) {
      document.removeEventListener('click', this.eventHandle, false);
    }
  }

  componentWillMount() {
    if (isBrowser) {
      document.addEventListener('click', this.eventHandle, false);
    }
  }

  /**
   * @param {array} path - массив объекто дом элементов начиная от того на котором сработало событие и до корня документа
   * @param {string} className - название класса который
   * @desc метод ищет в массиве класс и возвращает его индекс.
   * */
  findClassInPath = (path, className) => {
    try {
      return path.findIndex(item => item.className && item.className.indexOf(className) >= 0);
    } catch (error) {
      return null;
    }
  };

  /**
   * @desc метод является callback обработчиком для прослушивания дом
   * */
  eventHandle = event => {
    try {
      if (Array.isArray(event.path)) {
        if (this.findClassInPath(event.path, `EditorAdditionalMenuButton`) >= 0) {
          return null;
        } else {
          if (this.state.active) {
            return this.toggleMenu();
          }
          return null;
        }
      }
    } catch (error) {
      console.log('Error eventHandle: ', error);
    }
  };

  /**
   * @desc переключатель состояния списка вкл/выкл
   * */
  toggleMenu = () => {
    this.setState(state => ({
      ...state,
      active: !state.active,
    }));
  };

  /**
   * @desc Получаем из кэша id последней ячейки в celllist,
   * чтобы использовать при создании как prevcell
   * */
  getLastCellId = parentid => {
    return this.props.client
      .query({
        query: CellListQuery,
        variables: {
          parent: parentid,
        },
      })
      .then(({data}) => {
        let lastCellId = null;
        if (data && Array.isArray(data.celllist) && data.celllist.length > 0) {
          lastCellId = data.celllist[data.celllist.length - 1].id;
        }
        return lastCellId;
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
        return null;
      });
  };

  /**
   * @param {string} contenttype
   * @param {string} parentid
   * @param {string} prevcell
   * @desc Отправляем мутацию на создание ячейки, затем берем из кэша
   * celllist и вставляем туда новую ячейку, а предыдущей присваиваем
   * nextcell равный id созданной ячейки
   * */
  createNewCell = (contenttype, parentid, prevcell) => {
    this.props
      .client.mutate({
      mutation: CreateCellMutation,
      variables: {
        contentname: '',
        prevcell: prevcell,
        parent: parentid,
        contenttype: contenttype,
        isHead: false,
        content: '',
      },
      update: (store, {data: {createcell}}) => {
        console.log(createcell);
        let data = {celllist: []};
        let parent = null;
        try {
          data = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: parentid,
            },
          });

          parent = store.readQuery({
            query: CellItemQuery,
            variables: {
              id: parentid,
            },
          });
        } catch (error) {
          console.error('Error: ', error);
          this.props.setNotificationError(createCellNotification());
        }

        try {
          if (data && data.celllist.length > 0) {

            let nextCellIndex = createcell.cell.nextcell ? data.celllist.findIndex(item => item.id === createcell.cell.nextcell.id) : -1;
            let prevCellIndex = data.celllist.findIndex(item => item.id === createcell.cell.prevcell.id);
            console.table({
              nextCellIndex,
              prevCellIndex,
            });

            if (nextCellIndex >= 0 && prevCellIndex >= 0) {
              /** ячейка добавляется между ячейками */
              data.celllist[prevCellIndex].nextcell = createcell.cell;
              data.celllist[nextCellIndex].prevcell = createcell.cell;


            } else if (prevCellIndex >= 0) {
              /** ячейка добавляется в конец */
              data.celllist[prevCellIndex].nextcell = createcell.cell;

              /** последняя в списке ячеек родителя */
              parent.cellitem.lastChildren = createcell.cell;
            } else if (createcell.cell.prevcell && createcell.cell.prevcell.id === createcell.cell.parent.id) {

              /** ячейка первая в списке ячеек родителя  */
              parent.cellitem.children = createcell.cell;
              data.celllist[nextCellIndex].prevcell = createcell.cell;
            }

            data.celllist.splice(prevCellIndex, 0, createcell.cell);

          } else {
            /** первая ячейка потомок */
            data.celllist.push(createcell.cell);

            /** ячейка первая в списке ячеек родителя  */
            parent.cellitem.children = createcell.cell;

            /** ячейка последняя в списке ячеек родителя  */
            parent.cellitem.lastChildren = createcell.cell;
            data.celllist = sortingCells(data.celllist);
          }
        } catch (error) {
          console.error('Error: ', error);
          this.props.setNotificationError(createCellNotification());
        }

        /** запись новой ячейки в кеш */
        UpdateCellInCache(store, createcell.cell);

        try {
          /** запись в кеш данных родителя */
          store.writeQuery({
            query: CellItemQuery,
            variables: {
              id: createcell.cell.parent.id,
            },
            data: parent,
          });
        } catch (error) {
          console.error('Error: ', error);
          this.props.setNotificationError(createCellNotification());
        }

        try {
          /** запись в кеш обновленного списка ячеек */
          store.writeQuery({
            query: CellListQuery,
            variables: {
              parent: parentid,
            },
            data,
          });
        } catch (error) {
          console.error('Error: ', error);
          this.props.setNotificationError(createCellNotification());
        }
      },
    })
      .then(({data}) => {
        console.log('got data', data);
        this.props.setNotificationSuccess(createCellNotification(contenttype, 'success'));
      })
      .catch(error => {
        this.props.setNotificationError(createCellNotification(contenttype, 'error'));
        console.error('there was an error sending the query', error);
      });
  };


  createCellStateMachine = async (contenttype) => {
    let {
      parentid,
      prevcell,
    } = this.props;

    try {
      const lastCellId = await this.getLastCellId(parentid);
      console.log('createCellStateMachine: ',);
      console.table({
        contenttype,
        lastCellId,
        parentid,
        prevcell,
      })
      prevcell = !prevcell && lastCellId ? lastCellId : prevcell;
      this.createNewCell(contenttype, parentid, prevcell ? prevcell : parentid);

    } catch (error) {
      console.error('Error createCellStateMachine: ', error);
    }

  };


  render() {
    const {active} = this.state;

    return (
      <Box position={'relative'}>
        <ButtonBase
          variant={'outlineGray'}
          p={'2px'}
          fontSize={'15px'}
          onClick={this.toggleMenu}>
          <SvgSidebarAdd/>
        </ButtonBase>
        {active && (
          <EditorAdditionalMenuButton
            handleButtonPress={blockType => {
              this.createCellStateMachine(blockType);
            }}
          />
        )}
      </Box>
    );
  }
}

EditorAdditionalMenu = withApollo(EditorAdditionalMenu);

EditorAdditionalMenu = connect(
  null,
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(EditorAdditionalMenu);

export default RenderOpenWindow(EditorAdditionalMenu);


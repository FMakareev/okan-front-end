import React, { Component, Fragment } from 'react';
import { Absolute } from 'rebass';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { error, success } from 'react-notification-system-redux';
import styled from 'styled-components';

/** Image */
import { SvgSidebarAdd } from '@lib/ui/Icons/SvgSidebarAdd';

/** View */
import ButtonBase from '@lib/ui/ButtonBase/ButtonBase';
import Flex from '@lib/ui/Flex/Flex';
import Box from '@lib/ui/Box/Box';

/** Components */
import EditorAdditionalMenuButtonTable from './EditorAdditionalMenuButtonTable';
import EditorAdditionalMenuButtonImage from './EditorAdditionalMenuButtonImage';
import EditorAdditionalMenuButtonText from './EditorAdditionalMenuButtonText';

/** Graphql schema */
import CreateCellMutation from '../../graphql/CreateCellMutation.graphql';
import CellListQuery from '../../graphql/CellListQuery.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';

/** New block types */
import { BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT } from '../../../../shared/blockType';

/** HOC */
import RenderOpenWindow from '../../../../utils/helpers/RenderOpenWindow';


import { UpdateCellInCache } from '../../utils/UpdateCellInCache';
import { findClassInPath } from '../../utils/findClassInPath';
import { CELL_STATUS_CHANGED, CELL_STATUS_CHECKED } from '@lib/shared/approvalStatus';
import {captureException} from "../../../../hocs/withSentry/withSentry";

const AbsoluteStyled = styled(Absolute)`
  min-height: 40px;
  display: flex;
  align-items: center;
  top: -10px;
`;

// TODO: три компонента кнопок превратить в один и тип и название передавать пропсами
const EditorAdditionalMenuButton = props => {
  return (
    <AbsoluteStyled className={'EditorAdditionalMenuButton'} left={'30px'} top={'0%'}>
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
    </AbsoluteStyled>
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
        message:
          'Произошла неизвестная ошибка, попробуйте перезагрузить страницу и повторить операцию.',
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
    client: PropTypes.any,
    handleClick: PropTypes.func,
    isOpen: PropTypes.bool,
    parentid: PropTypes.string.isRequired,
    prevcell: PropTypes.string,
    setNotificationError: PropTypes.any,
    setNotificationSuccess: PropTypes.any,
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
   * @desc метод является callback обработчиком для прослушивания дом
   * */
  eventHandle = event => {
    try {
      if (Array.isArray(event.path)) {
        if (findClassInPath(event.path, `EditorAdditionalMenuButton`) >= 0) {
          return null;
        } else {
          if (this.state.active) {
            return this.toggleMenu();
          }
          return null;
        }
      }
    } catch (error) {
      captureException(error);
      console.error('Error eventHandle: ', error);
    }
  };

  /**
   * @desc метод состояния списка выкл
   * */
  toggleMenu = () => {
    this.setState(state => ({
      ...state,
      active: !state.active,
    }));
  };

  /**
   * @desc переключатель состояния списка вкл/выкл
   * */
  closeMenu = () => {
    this.setState(state => ({
      ...state,
      active: false,
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
      .then(({ data }) => {
        let lastCellId = null;
        if (data && Array.isArray(data.celllist) && data.celllist.length > 0) {
          lastCellId = data.celllist[data.celllist.length - 1].id;
        }
        return lastCellId;
      })
      .catch(error => {
        console.error('there was an error sending the query', error);
        captureException(error);
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
    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables: {
          contentname: '',
          prevcell: prevcell,
          parent: parentid,
          contenttype: contenttype,
          isHead: false,
          content: '',
          verify: CELL_STATUS_CHANGED,
        },
        update: (store, { data: { createcell } }) => {
          let data = { celllist: [] };
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

            captureException(error);
            this.props.setNotificationError(createCellNotification());
          }

          try {
            if (data && data.celllist.length > 0) {
              let nextCellIndex = -1;
              let prevCellIndex = -1;
              if(createcell.cell.nextcell){
                nextCellIndex =data.celllist.findIndex(item => item.id === createcell.cell.nextcell.id)
              }

              if(createcell.cell.prevcell){
                prevCellIndex = data.celllist.findIndex(item => item.id === createcell.cell.prevcell.id);
              }



              if (nextCellIndex >= 0 && prevCellIndex >= 0) {
                /** ячейка добавляется между ячейками */
                data.celllist[prevCellIndex].nextcell = createcell.cell;
                data.celllist[nextCellIndex].prevcell = createcell.cell;
              } else if (prevCellIndex >= 0) {
                /** ячейка добавляется в конец */
                data.celllist[prevCellIndex].nextcell = createcell.cell;

                /** последняя в списке ячеек родителя */
                parent.cellItem.lastChildren = createcell.cell;
              } else if (
                createcell.cell.prevcell &&
                createcell.cell.prevcell.id === createcell.cell.parent.id
              ) {
                /** ячейка первая в списке ячеек родителя  */
                parent.cellItem.children = createcell.cell;
                data.celllist[nextCellIndex].prevcell = createcell.cell;
              }

              data.celllist.splice(prevCellIndex + 1, 0, createcell.cell);
            } else {
              /** первая ячейка потомок */
              data.celllist.push(createcell.cell);

              /** ячейка первая в списке ячеек родителя  */
              parent.cellItem.childcell = createcell.cell;

              /** ячейка последняя в списке ячеек родителя  */
              parent.cellItem.lastChildren = createcell.cell;
            }
          } catch (error) {
            console.error('Error: ', error);
            captureException(error);
            this.props.setNotificationError(createCellNotification());
          }

          /** запись новой ячейки в кеш */
          UpdateCellInCache(store, createcell.cell);

          parent.cellItem.verify = CELL_STATUS_CHANGED;
          try {
            /** запись в кеш данных родителя */
            UpdateCellInCache(store, parent.cellItem);
          } catch (error) {
            console.error('Error: ', error);
            captureException(error);
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
            captureException(error);
            this.props.setNotificationError(createCellNotification());
          }
        },
      })
      .then(() => {
        this.props.setNotificationSuccess(createCellNotification(contenttype, 'success'));
      })
      .catch(error => {
        this.props.setNotificationError(createCellNotification(contenttype, 'error'));
        console.error('there was an error sending the query', error);
        captureException(error);
      });
  };

  createCellStateMachine = async contenttype => {
    let { parentid, prevcell } = this.props;

    try {
      const lastCellId = await this.getLastCellId(parentid);

      prevcell = !prevcell && lastCellId ? lastCellId : prevcell;
      this.createNewCell(contenttype, parentid, prevcell ? prevcell : parentid);
    } catch (error) {
      console.error('Error createCellStateMachine: ', error);
      captureException(error);
    }
  };

  render() {
    const { active } = this.state;
    const { activeMenu } = this.props;
    return (
      <Fragment>
        {activeMenu ? (
          <Box position={'relative'} ml={'-30px'}>
            <EditorAdditionalMenuButton
              handleButtonPress={blockType => {
                this.createCellStateMachine(blockType);
              }}
            />
          </Box>
        ) : (
          <Box position={'relative'} onMouseLeave={this.closeMenu}>
            <ButtonBase
              variant={'outlineGray'}
              p={'2px'}
              fontSize={'15px'}
              onMouseEnter={this.toggleMenu}>
              <SvgSidebarAdd />
            </ButtonBase>
            {active && (
              <EditorAdditionalMenuButton
                handleButtonPress={blockType => {
                  this.createCellStateMachine(blockType);
                }}
              />
            )}
          </Box>
        )}
      </Fragment>
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

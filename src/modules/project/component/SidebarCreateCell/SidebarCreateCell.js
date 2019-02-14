import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Mutation, withApollo } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';
import { invalidateFields, ROOT } from 'apollo-cache-invalidation';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';
import Box from '../../../../components/Box/Box';

/** Image */
import { SvgSidebarAdd } from '../../../../components/Icons/SvgSidebarAdd';

/** Style css */
import { AbsoluteStyled, BoxStyled } from './SidebarCreateCellStyled';

/** Store */
import { getUserFromStore } from '../../../../store/reducers/user/selectors';

/** Constatnts */
import { BLOCK_IMAGE, BLOCK_TABLE, BLOCK_TEXT } from '@lib/shared/blockType';

/** Graphql schema */
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';
import CreateCellMutation from './CreateCellMutation.graphql';
import DeleteCellMutation from './DeleteCellMutation.graphql';
import CreateSubCellMutation from './CreateSubCellMutation.graphql';
import { sortingCells } from '../../utils/sortingCells';

const notificationCreate = ({ prevcell, parent, isHead, contenttype }) => {
  let title = '';

  if (prevcell && isHead && !parent) {
    title = 'Раздел';
  } else if (prevcell && isHead && parent) {
    title = 'Подраздел';
  } else if (!isHead && contenttype) {
    switch (contenttype) {
      case BLOCK_TEXT: {
        title = 'Текстовый блок';
        break;
      }
      case BLOCK_IMAGE: {
        title = 'Блок с изображением';
        break;
      }
      case BLOCK_TABLE: {
        title = 'Блок с таблицей';
        break;
      }
      default: {
        title = 'Текстовый блок';
        break;
      }
    }
  } else {
    title = 'Блок';
  }

  return {
    success: {
      title: `${title} создан.`,
      position: 'tr',
      autoDismiss: 6,
    },
    error: {
      title: `Произошла ошибка.`,
      message: `${title} не создан.`,
      position: 'tr',
      autoDismiss: 6,
    },
  };
};

const notificationDelete = name => {
  return {
    success: {
      title: `Раздел "${name ? name : ''}" удален.`,
      position: 'tr',
      autoDismiss: 6,
    },
    error: {
      title: `Произошла ошибка.`,
      message: `Раздел "${name ? name : ''}" не удален.`,
      position: 'tr',
      autoDismiss: 6,
    },
  };
};

const has = Object.prototype.hasOwnProperty;

export class SidebarCreateCell extends Component {
  static propTypes = {
    /** @desc id предыдущей ячейки, той после которой будет добавлен раздел, этот id будет являтся parent для подраздела */
    prevcell: PropTypes.string,
    /** @desc id ячейки родетеля это общее для ячейки prevcell и той что будет создана следом */
    parent: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      toggle: false,
    };
  }

  /**
   * @desc метод для управления открыванием выпадающего списка
   * */
  onToggle = event => {
    event && event.stopPropagation();
    this.setState(state => ({ toggle: !state.toggle }));
  };

  /**
   * @param {string} id - id ячейки
   * @desc метод получения ячейки
   * */
  getCell = id => {
    const { client } = this.props;
    return client
      .query({
        query: CellItemQuery,
        variables: {
          id,
        },
      })
      .catch(error => {
        console.error(`Error getNode, id=${id}: `, error);
        return error;
      });
  };

  /**
   * @param {string} id - id следующей ячейки
   * @param {array} nodes - список всех полученых ячеек, пополняется каждый раз после выполнения запроса.
   * @desc получить список ячеек попорядку рекурсивно
   * */
  getListOfParentCells = (id, nodes) => {
    return this.getCell(id)
      .then(response => {
        // console.log(response);
        const { data } = response;
        if (data && data.cellitem) {
          nodes.push(data.cellitem);
          if (data.cellitem.nextcell && has.call(data.cellitem.nextcell, 'id')) {
            return this.getListOfParentCells(data.cellitem.nextcell.id, nodes);
          }
          return nodes;
        } else {
          return nodes;
        }
      })
      .catch(error => {
        console.error('Error getListOfParentCells: ', error);
        return [];
      });
  };

  /**
   * @param {string} prevcell - id предыдущей ячейки или родительской
   * @param {string || null} nextcell
   * @param {string} parent - id родителя
   * @param {boolean} isHead - если раздел то true, если контент то false
   * @param {string || null} contenttype
   * @param {object} node
   * @desc создание ячейки
   * */
  createSubCellStateMachine = async ({ prevcell, nextcell, parent, isHead, contenttype, node }) => {
    try {
      console.log(
        'createSubCellStateMachine:',
        prevcell,
        nextcell,
        parent,
        isHead,
        contenttype,
        node,
      );
      /** 1) если дочерние ячейки являются разделами */
      if (node.isHead && !node.childcell) {
        if (node.childcell) {
          let cells = await this.getListOfParentCells(node.childcell.id, []);
          cells = sortingCells(cells);
          this.createCell({
            prevcell: cells && cells.length > 0 ? cells[cells.length - 1].id : parent,
            parent: parent,
            isHead: true,
            contenttype: null,
            nextcell: null,
          });
        } else if (!node.childcell) {
          this.createSubCell({
            parent: node.id,
            prevcell,
            isHead: true,
          });
        }
      } else {
        this.createCell({
          prevcell: parent,
          parent: parent,
          isHead: true,
          contenttype: null,
          nextcell: null,
        });
      }
    } catch (error) {
      console.error('Error createCellStateMachine: ', error);
    }
  };

  /**
   * @param {string} prevcell - id предыдущей ячейки или родительской
   * @param {string} parent - id родителя
   * @param {boolean} isHead - если раздел то true, если контент то false
   * @param {string || null} contenttype
   * @param {string || null} nextcell
   * @desc создание подраздела у раздела ячейки которого являются контентом
   * */
  createSubCell = ({ prevcell, parent, isHead, contenttype, nextcell }) => {
    const { setNotificationSuccess, setNotificationError } = this.props;

    const variables = {
      parent: parent,
      contenttype: null,
      isHead,
    };

    this.props.client
      .mutate({
        mutation: CreateSubCellMutation,
        variables,
        update: (store, { data: { createsubcell } }) => {
          try {
            let options = {
              query: CellItemQuery,
              variables: {
                id: createsubcell.cell.id,
              },
            };
            store.writeQuery({
              ...options,
              data: {
                cellitem: createsubcell.cell,
              },
            });
          } catch (error) {
            console.error('Error createCell: ', error);
          }
        },
      })
      .then(response => {
        // console.log('SidebarCreateCell response createsubcell: ', response.data.createsubcell.cell);
        this.props.addNodeInTree(response.data.createsubcell.cell);
        setNotificationSuccess(
          notificationCreate({
            prevcell,
            parent: parent || 'document',
            isHead,
            contenttype,
          }).success,
        );
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);

        setNotificationError(notificationCreate({ prevcell, parent, isHead, contenttype }).error);
      });
  };

  /**
   * @param {string} prevcell - id предыдущей ячейки или родительской
   * @param {string} parent - id родителя
   * @param {boolean} isHead - если раздел то true, если контент то false
   * @param {string || null} contenttype
   * @param {string || null} nextcell
   * @desc создание ячейки
   * */
  createCell = ({ prevcell, parent, isHead, contenttype, nextcell }) => {
    const { setNotificationSuccess, setNotificationError } = this.props;

    console.log('createCell:', prevcell, nextcell, parent, isHead, contenttype);

    const variables = {
      ...(prevcell ? { prevcell } : null),
      ...(nextcell ? { nextcell } : null),
      ...(parent ? { parent } : null),
      ...(contenttype ? { contenttype } : { contenttype: null }),
      isHead,
    };

    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables,
        update: (store, { data: { createcell } }) => {
          try {
            let options = {
              query: CellItemQuery,
              variables: {
                id: createcell.cell.id,
              },
            };
            store.writeQuery({
              ...options,
              data: {
                cellitem: createcell.cell,
              },
            });
          } catch (error) {
            console.error('Error createCell: ', error);
          }
        },
      })
      .then(response => {
        // console.log('SidebarCreateCell response: ', response.data.createcell.cell);
        this.props.addNodeInTree(response.data.createcell.cell);
        setNotificationSuccess(
          notificationCreate({ prevcell, parent: null, isHead, contenttype }).success,
        );
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);

        setNotificationError(
          notificationCreate({ prevcell, parent: null, isHead, contenttype }).error,
        );
      });
  };

  /**
   * @param {string} id
   * @param {string} name
   * @desc метод для удаления ячейки
   * */
  deleteCell = (id, name) => {
    const { setNotificationSuccess, setNotificationError } = this.props;

    // TODO: Добавить удаление удаленного объекта из кеша

    this.props.client
      .mutate({
        mutation: DeleteCellMutation,
        variables: { id },
        fetchPolicy: 'no-cache',
      })
      .then(response => {
        this.props.removeNodeInTree(id);
        setNotificationSuccess(notificationDelete(name).success);
      })
      .catch(error => {
        console.error('Error deleteCell: ', error);

        setNotificationError(notificationDelete(name).error);
      });
  };

  render() {
    const {
      node: { isHead, childcell, id, parent, nextcell, name },
    } = this.props;

    const { toggle } = this.state;

    return (
      <Box position={'relative'}>
        <ButtonBase
          title={'Добавить подраздел или раздел.'}
          variant={'empty'}
          onClick={this.onToggle}>
          <SvgSidebarAdd />
        </ButtonBase>

        {toggle && (
          <AbsoluteStyled
            onMouseLeave={this.onToggle}
            onClick={event => {
              event.stopPropagation();
            }}
            top={'20px'}
            right={'0'}>
            <BoxStyled
              onClick={event => {
                this.onToggle(event);
                this.createCell({
                  prevcell: id,
                  parent: parent !== null ? parent.id : null,
                  isHead: true,
                  contenttype: null,
                  nextcell: null,
                });
              }}>
              Раздел
            </BoxStyled>

            <BoxStyled
              onClick={event => {
                this.onToggle(event);
                this.createSubCellStateMachine({
                  prevcell: id,
                  parent: id,
                  nextcell: null,
                  isHead: true,
                  node: this.props.node,
                });
              }}>
              Подраздел
            </BoxStyled>

            <BoxStyled
              onClick={event => {
                // console.log('Удалить раздел', this.props);
                this.onToggle(event);
                this.deleteCell(id, name);
              }}>
              Удалить {parent ? 'подраздел' : 'раздел'}
            </BoxStyled>
          </AbsoluteStyled>
        )}
      </Box>
    );
  }
}

SidebarCreateCell = withApollo(SidebarCreateCell);

SidebarCreateCell = connect(
  state => ({ user: getUserFromStore(state) }),
  dispatch => ({
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCreateCell);

export default SidebarCreateCell;

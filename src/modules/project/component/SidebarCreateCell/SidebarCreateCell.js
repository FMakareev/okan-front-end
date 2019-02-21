import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { error, success } from 'react-notification-system-redux';

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
import CreateCellMutation from './CreateCellMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import DeleteCellMutation from './DeleteCellMutation.graphql';
import CreateSubCellMutation from './CreateSubCellMutation.graphql';

/** Context */
import { ProjectContextPropTypes } from '../ProjectContext/ProjectContext';
import { getPosition } from '../ProjectContext/ProjectContextSelectors';

/** Utils */
import { UpdateCellInCache } from '../../utils/UpdateCellInCache';
import deleteQueryFromCache from '../../utils/deleteQueryFromCache';

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

export class SidebarCreateCell extends Component {
  static propTypes = {
    /** @desc id предыдущей ячейки, той после которой будет добавлен раздел, этот id будет являтся parent для подраздела */
    prevcell: PropTypes.string,
    /** @desc id ячейки родетеля это общее для ячейки prevcell и той что будет создана следом */
    parent: PropTypes.string,
    removeNodeInTree: PropTypes.func,
    ...ProjectContextPropTypes,
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
      /**
       * 1) если нет дочерних разделов и контента
       * 2) если есть дочернии разделы
       * 3) если есть дочерний контент -
       * */
      /** если дочка*/
      if (node.isHead && node.childcell && !node.childcell.isHead) {
        this.createSubCell({
          parent: node.id,
          prevcell: node.lastChildren ? node.lastChildren.id : parent,
          isHead: true,
        });
      } else {
        this.createCell({
          prevcell: node.lastChildren ? node.lastChildren.id : parent,
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
    const { setNotificationSuccess, setNotificationError, project, history, client } = this.props;

    const variables = {
      parent: parent,
      contenttype: null,
      isHead,
    };

    client
      .mutate({
        mutation: CreateSubCellMutation,
        variables,
        update: (store, { data: { createsubcell } }) => {
          try {
            console.log('createsubcell: ', createsubcell);
            /** записываем в кеш аполо только что созданную ячейку */
            UpdateCellInCache(store, createsubcell.cell);

            /** обновляем у родителя ссылку на последнюю дочернюю ячейку */
            if (createsubcell.cell.parent && !createsubcell.cell.nextcell) {
              UpdateCellInCache(store, {
                ...createsubcell.cell.parent,
                lastChildren: createsubcell.cell,
              });
            }

            /** обновляем у дочерних ячеек ссылку на родителя */
            if (createsubcell.cell.childcell && !createsubcell.cell.childcell.isHead) {
              let options = {
                query: CellListQuery,
                variables: {
                  parent: createsubcell.cell.parent.id,
                },
              };

              let data = { celllist: [] };
              try {
                data = store.readQuery(options);
              } catch (error) {
                console.error('Error createSubCell update read celllist', error);
              }
              try {
                console.log('update: ', data);
                data.celllist = data.celllist.map(item => {
                  if (item.prevcell.id === item.parent.id) {
                    item.prevcell = createsubcell.cell;
                  }
                  item.parent = createsubcell.cell;
                  return item;
                });
                console.log('update: ', data);

                store.writeQuery({
                  ...options,
                  variables: {
                    parent: createsubcell.cell.id,
                  },
                  data,
                });
              } catch (error) {
                console.error('Error createSubCell update write celllist', error);
              }
            }
          } catch (error) {
            console.error('Error createCell: ', error);
          }
        },
      })
      .then(response => {
        this.props.addNodeInTree(response.data.createsubcell.cell);

        setNotificationSuccess(
          notificationCreate({
            prevcell,
            parent: parent || 'document',
            isHead,
            contenttype,
          }).success,
        );
        try {
          if (response.data.createsubcell.cell.parent) {
            if (getPosition(project, 'sectionid') === response.data.createsubcell.cell.parent.id) {
              console.log('Мы тут, парент у нового раздела совпадает с текущим активным разделом');
              this.props.changeActiveNode(response.data.createsubcell.cell.id);
            }
          }
        } catch (error) {
          console.error('Error: ', error);
        }
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
    const { setNotificationSuccess, project, setNotificationError } = this.props;

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
            UpdateCellInCache(store, createcell.cell);

            if (createcell.cell.parent && !createcell.cell.nextcell) {
              UpdateCellInCache(store, {
                ...createcell.cell.parent,
                lastChildren: createcell.cell,
              });
            }
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
        if (response.data.createcell.cell.parent) {
          if (getPosition(project, 'sectionid') === response.data.createcell.cell.parent.id) {
            console.log('Мы тут, парент у нового раздела совпадает с текущим активным разделом');
            this.props.changeActiveNode(response.data.createcell.cell.id);
          }
        }
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);

        setNotificationError(
          notificationCreate({ prevcell, parent: null, isHead, contenttype }).error,
        );
      });
  };

  createAttachment = ({ prevcell, parent, isHead, contenttype, nextcell, isAttachment }) => {
    const { setNotificationSuccess, project, setNotificationError } = this.props;

    const variables = {
      ...(prevcell ? { prevcell } : null),
      ...(nextcell ? { nextcell } : null),
      ...(parent ? { parent } : null),
      ...(contenttype ? { contenttype } : { contenttype: null }),
      isHead,
      isAttachment,
    };

    this.props.client
      .mutate({
        mutation: CreateCellMutation,
        variables,
        update: (store, { data: { createcell } }) => {
          try {
            UpdateCellInCache(store, createcell.cell);

            if (createcell.cell.parent && !createcell.cell.nextcell) {
              UpdateCellInCache(store, {
                ...createcell.cell.parent,
                lastChildren: createcell.cell,
              });
            }
          } catch (error) {
            console.error('Error createCell: ', error);
          }
        },
      })
      .then(response => {
        this.props.addNodeInTree(response.data.createcell.cell);
        setNotificationSuccess(
          notificationCreate({ prevcell, parent: null, isHead, contenttype, isAttachment }).success,
        );
        if (response.data.createcell.cell.parent) {
          if (getPosition(project, 'sectionid') === response.data.createcell.cell.parent.id) {
            console.log('Мы тут, парент у нового раздела совпадает с текущим активным разделом');
            this.props.changeActiveNode(response.data.createcell.cell.id);
          }
        }
      })
      .catch(error => {
        console.error('Error createAttachment: ', error);
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

    this.props.client
      .mutate({
        mutation: DeleteCellMutation,
        variables: { id },
        fetchPolicy: 'no-cache',
        update: (client, response, test) => {
          try {
            client.optimisticData.data = deleteQueryFromCache(client.optimisticData.data, id);
          } catch (err) {
            console.log(err);
          }
        },
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
      node: { isHead, childcell, id, parent, nextcell, name, isAttachment },
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

        {toggle && !isAttachment && (
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
                this.onToggle(event);
                if (confirm("Вы уверены что хотите удалить раздел?")) {
                  this.deleteCell(id, name);
                }
              }}>
              Удалить {parent ? 'подраздел' : 'раздел'}
            </BoxStyled>

            <BoxStyled
              onClick={event => {
                this.onToggle(event);
                this.createAttachment({
                  prevcell: id,
                  parent: parent !== null ? parent.id : null,
                  isHead: true,
                  contenttype: null,
                  nextcell: null,
                  isAttachment: true,
                });
              }}>
              Создать приложение
            </BoxStyled>
          </AbsoluteStyled>
        )}

        {toggle && isAttachment && (
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
                this.createAttachment({
                  prevcell: id,
                  parent: parent !== null ? parent.id : null,
                  isHead: true,
                  contenttype: null,
                  nextcell: null,
                  isAttachment: true,
                });
              }}>
              Создать приложение
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

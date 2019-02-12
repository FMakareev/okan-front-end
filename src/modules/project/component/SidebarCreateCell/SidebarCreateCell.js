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
      title: `"${name}" удален.`,
      position: 'tr',
      autoDismiss: 6,
    },
    error: {
      title: `Произошла ошибка.`,
      message: `"${name}" не удален.`,
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

  onToggle = event => {
    event && event.stopPropagation();
    this.setState(state => ({ toggle: !state.toggle }));
  };

  /**
   * @param {string} prevcell - id предыдущей ячейки или родительской
   * @param {string} parent - id родителя
   * @param {boolean} isHead - если раздел то true, если контент то false
   * @param {string || null} contenttype
   * @param {string || null} nextcell
   * @desc создание ячейки
   * */
  createCell = (prevcell, parent, isHead, contenttype, nextcell) => {
    // console.log(prevcell, parent, isHead, contenttype);
    const { setNotificationSuccess, setNotificationError } = this.props;

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
          const newCell = createcell.cell;
          let prevcell = null;
          let nextcell = null;

          try {
            if (newCell.prevcell) {
              let options = {
                query: CellItemQuery,
                variables: {
                  id: newCell.prevcell.id,
                },
              };

              prevcell = store.readQuery(options);
              console.log(prevcell);

              prevcell.cellitem.nextcell = newCell;
              store.writeQuery({
                ...options,
                data: prevcell,
              });
            }
          } catch (error) {
            console.error('Error createCell: ', error);
          }

          try {
            if (newCell.nextcell) {
              let options = {
                query: CellItemQuery,
                variables: {
                  id: newCell.nextcell.id,
                },
              };
              nextcell = store.readQuery(options);
              console.log(newCell);
              nextcell.cellitem.prevcell = newCell;
              store.writeQuery({
                ...options,
                data: nextcell,
              });
            }
          } catch (error) {
            console.error('Error createCell: ', error);
          }
        },
      })
      .then(response => {
        console.log('SidebarCreateCell response: ', response.data.createcell.cell);
        this.props.addNodeInTree(response.data.createcell.cell);
        console.log(222222, response.data.createcell);
        setNotificationSuccess(
          notificationCreate({ prevcell, parent, isHead, contenttype }).success,
        );
      })
      .catch(error => {
        console.error('Error SidebarCreateCell: ', error);

        setNotificationError(notificationCreate({ prevcell, parent, isHead, contenttype }).error);
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
                this.createCell(
                  id,
                  parent !== null ? parent.id : null,
                  true,
                  null,
                  nextcell !== null ? nextcell.id : null,
                );
              }}>
              Раздел
            </BoxStyled>

            <BoxStyled
              onClick={event => {
                this.onToggle(event);
                this.createCell(id, id, true);
              }}>
              Подраздел
            </BoxStyled>

            {isHead && !childcell && (
              <BoxStyled
                onClick={event => {
                  this.onToggle(event);
                  this.createCell(id, id, false, BLOCK_TEXT);
                }}>
                Добавить текст
              </BoxStyled>
            )}

            {isHead && !childcell && (
              <BoxStyled
                onClick={event => {
                  this.onToggle(event);
                  this.createCell(id, id, false, BLOCK_IMAGE);
                }}>
                Добавить изображение
              </BoxStyled>
            )}

            {isHead && !childcell && (
              <BoxStyled
                onClick={event => {
                  this.onToggle(event);
                  this.createCell(id, id, false, BLOCK_TABLE);
                }}>
                Добавить таблицу
              </BoxStyled>
            )}

            <BoxStyled
              onClick={event => {
                console.log('Удалить раздел', this.props);
                this.onToggle(event);
                this.deleteCell(id, name);
              }}>
              Удалить раздел
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

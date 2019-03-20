import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query, withApollo} from 'react-apollo';
import objectPath from 'object-path';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import {SvgStatus} from '../../../../components/Icons/SvgStatus';

/**Graphql schema */
import ChangeStatusMutation from '../../graphql/ChangeStatusMutation.graphql';
import CheckForCellChangesQuery from '../../graphql/CheckForCellChangesQuery.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';
import CellListQuery from '../../graphql/CellListAndParentCellQuery.graphql';

/** Constants */
import {
  CELL_STATUS_CHANGED,
  CELL_STATUS_CHECKED,
  CELL_STATUS_NOT_CHECKED,
} from '@lib/shared/approvalStatus';

/** Utils */
import {UpdateCellInCache} from '../../utils/UpdateCellInCache';
import * as shallowequal from "shallowequal";

const GetStatusColor = status => {
  switch (status) {
    case CELL_STATUS_CHECKED: {
      return '#2FBC0B';
    }
    case CELL_STATUS_CHANGED: {
      return '#F3C318';
    }
    case CELL_STATUS_NOT_CHECKED: {
      return '#DF4624';
    }
    default: {
      return '#DF4624';
    }
  }
};

export class SidebarApprovalStatus extends Component {
  static propTypes = {
    cellCheckStatusChange: PropTypes.func,
    client: PropTypes.object,
    node: PropTypes.object,
    updateNode: PropTypes.func,
  };

  static defaultProps = {};

  /**
   * @param {string} id - id изменяемой ячейки
   * @param {string} status - статус на который нужно изменить
   * @desc изменение статуса у ячейки
   * */
  changeStatus = (id, status) => {
    this.props.client
      .mutate({
        mutation: ChangeStatusMutation,
        variables: {
          id,
          status,
        },
        update: (store, {data: {changestatus}}) => {
          let cell = {celllist: {}};
          const options = {
            query: CellListQuery,
            variables: {
              parent: id,
            },
          };

          try {
            UpdateCellInCache(store, {...changestatus.cell});
          } catch (e) {
            console.error('Error in SidebarApprovalStatus change status: ', e);
          }

          try {
            cell = store.readQuery(options);
            cell.celllist.map(item => (item.verify = changestatus.cell.verify));
          } catch (e) {
            console.error('Error in readQuery change status: ', e);
          }
          try {
            store.writeQuery({
              ...options,
              data: {
                ...cell,
              },
            });
          } catch (e) {
            console.error('Error in writeQuery change status: ', e);
          }

          let checkChanges = {checkForCellChanges: {}};
          const dataCheckForCellChanges = {
            query: CheckForCellChangesQuery,
            variables: {
              id: id,
            },
          };

          try {
            checkChanges = store.readQuery(dataCheckForCellChanges);
            checkChanges.checkForCellChanges.answer = false;
          } catch (error) {
            console.warn('Warning checkForCellChanges read: ', error);
          }

          try {
            store.writeQuery({
              ...dataCheckForCellChanges,
              data: {checkForCellChanges: {...checkChanges.checkForCellChanges}},
            });
          } catch (error) {
            console.error('Error changeStatus: ', error);
          }
        },
      })
      .then(async response => {
        await this.props.cellCheckStatusChange(id, status);
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillUnmount() {
    this.unsubscribeToCellItem();
  }

  componentDidMount() {
    this.initSubscribe();
  }

  /**
   * @param {object} prevCell - сюда может принимать и node из дерева, в методе предусмотрен фильтр для удаления полей которых нет в типе ячейки
   * @param {object} nextCell - новая версия ячейки
   * @return {boolean} true - равны, false - не равны
   * @desc метод сравнивает две ячейки отвечает равны они или нет.
   * */
  equalPrevCellAndNextCell = (prevCell, nextCell) => {
    try {
      let removeProps = [];
      let newPrevCell = Object.assign({}, prevCell);
      /** ищем каких свойств нет в nextCell */
      Object.entries(prevCell).map(([prevKey]) => {
        let result = Object.entries(nextCell).findIndex(([nextKey]) =>prevKey === nextKey);
        if (result === -1) {
          removeProps.push(prevKey);
        }
      });
      /** удоляем из prevCell те свойства которых нет в nextCell чтобы привести prevCell к типу Cell*/
      removeProps.forEach(item => {
        objectPath.del(newPrevCell, item);
      });
      return shallowequal(newPrevCell, nextCell);
    } catch (error) {
      console.error('Error comparePrevAndNext: ', error);
    }
  };


  initSubscribe = () => {
    const {node} = this.props;
    try {
      if ((!node.childcell && node.isHead) || (node.childcell && !node.childcell.isHead)) {
        this.subscribeInstanceToCellItem = this.subscribeToCellItem(node.id).subscribe(
          ({data}) => {
            if(!this.equalPrevCellAndNextCell(node, data.cellItem)){
              // console.log('subscribeInstanceToCellItem', data);
              // console.log('subscribeInstanceToCellItem => updateNode');
              this.props.updateNode(node.id, data.cellItem);
              if (data.cellItem.verify === CELL_STATUS_CHANGED) {
                this.props.cellCheckStatusChange(node && node.id, data.cellItem.verify);
              }
            }
          },
        );
      }
    } catch (error) {
      console.error('Error initSubscribe: ', error);
    }
  };

  unsubscribeToCellItem = () => {
    if (this.subscribeInstanceToCellItem) {
      this.subscribeInstanceToCellItem.unsubscribe();
      this.subscribeInstanceToCellItem = null;
    }
  };

  /**
   * @param {string} id - id ячейки
   * @desc создает подписку на обновление ячейки
   * */
  subscribeToCellItem = id => {
    try {
      // this.changeStatus(id, CELL_STATUS_CHANGED);
      return this.props.client.watchQuery({
        query: CellItemQuery,
        variables: {id: id},
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  render() {
    const {node, client} = this.props;
    return (
      <Query query={CheckForCellChangesQuery} variables={{id: node && node.id}}>
        {({loading, error, data}) => {
          return (
            <ButtonBase
              title={'Статус проверки блока'}
              variant={'empty'}
              disabled={node.childcell && node.childcell.isHead}
              onClick={event => {
                event.stopPropagation();
                return this.changeStatus(node.id, CELL_STATUS_CHECKED);
              }}>
              <SvgStatus
                fill={GetStatusColor(
                  data && data.checkForCellChanges && data.checkForCellChanges.answer
                    ? CELL_STATUS_CHANGED
                    : node.verify,
                )}
                bgfill={node.childcell && node.childcell.isHead ? '#e5e5e5' : '#fff'}
              />
            </ButtonBase>
          );
        }}
      </Query>
    );
  }
}

SidebarApprovalStatus = withApollo(SidebarApprovalStatus);

export default SidebarApprovalStatus;

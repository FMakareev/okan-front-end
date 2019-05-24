import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query, withApollo} from 'react-apollo';
import objectPath from 'object-path';
import styled from 'styled-components';

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
import {captureException} from "../../../../hocs/withSentry/withSentry";

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


const CircleIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 0.5px solid #848484;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  
  ${({fill})=>`background-color: ${fill};`}
`;

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
          } catch (error) {
            console.error('Error in SidebarApprovalStatus change status: ', error);
            captureException(error);
          }

          try {
            cell = store.readQuery(options);
            cell.celllist.map(item => (item.verify = changestatus.cell.verify));
          } catch (error) {
            console.error('Error in readQuery change status: ', error);
            captureException(error);
          }
          try {
            store.writeQuery({
              ...options,
              data: {
                ...cell,
              },
            });
          } catch (error) {
            console.error('Error in writeQuery change status: ', error);
            captureException(error);
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
            captureException(error);
          }

          try {
            store.writeQuery({
              ...dataCheckForCellChanges,
              data: {checkForCellChanges: {...checkChanges.checkForCellChanges}},
            });
          } catch (error) {
            console.error('Error changeStatus: ', error);
            captureException(error);
          }
        },
      })
      .then(async response => {
        await this.props.cellCheckStatusChange(id, status);
      })
      .catch(error => {
        console.error(error);
        captureException(error);
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
      captureException(error);
    }
  };


  initSubscribe = () => {
    const {node} = this.props;
    try {
      if ((!node.childcell && node.isHead) || (node.childcell && !node.childcell.isHead)) {
        this.subscribeInstanceToCellItem = this.subscribeToCellItem(node.id).subscribe(
          ({data}) => {
            if(!this.equalPrevCellAndNextCell(node, data.cellItem)){

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
      captureException(error);
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
      captureException(error);
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
              variant={'outlineGray'}
              p={'10px'}
              disabled={node.childcell && node.childcell.isHead}
              styled={{
                backgroundColor: node.childcell && node.childcell.isHead ? '#e5e5e5' : '#fff',
              }}
              onClick={event => {
                event.stopPropagation();
                return this.changeStatus(node.id, CELL_STATUS_CHECKED);
              }}>
              <CircleIcon
                fill={GetStatusColor(
                  data && data.checkForCellChanges && data.checkForCellChanges.answer
                    ? CELL_STATUS_CHANGED
                    : node.verify,
                )}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import queryString from 'query-string';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgStatus } from '../../../../components/Icons/SvgStatus';

/**Graphql schema */
import ChangeStatusMutation from './ChangeStatusMutation.graphql';
import CheckForCellChangesQuery from './CheckForCellChangesQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';

/** Constants */
import {
  CELL_STATUS_CHANGED,
  CELL_STATUS_CHECKED,
  CELL_STATUS_NOT_CHECKED,
} from '@lib/shared/approvalStatus';

/** Utils */
import { UpdateCellInCache } from '../../utils/UpdateCellInCache';

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
  static propTypes = { updateNode: PropTypes.func };

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
        update: (store, { data: { changestatus } }) => {
          let cell = { celllist: {} };
          const options = {
            query: CellListQuery,
            variables: {
              parent: id,
            },
          };

          try {
            UpdateCellInCache(store, { ...changestatus.cell });
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

          let checkChanges = { checkForCellChanges: {} };
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
              data: { checkForCellChanges: { ...checkChanges.checkForCellChanges } },
            });
          } catch (e) {
            console.log(e);
          }
        },
      })
      .then(async response => {
        // console.log(10, id, status);
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

  initSubscribe = () => {
    const { node } = this.props;
    try {
      if ((!node.childcell && node.isHead) || (node.childcell && !node.childcell.isHead)) {
        this.subscribeInstanceToCellItem = this.subscribeToCellItem(node.id).subscribe(
          ({ data }) => {
            this.props.updateNode(node.id, data.cellitem);
            this.props.cellCheckStatusChange(node.parent && node.parent.id, data.cellitem.verify);
          },
        );
      }
    } catch (error) {
      console.log('Error initSubscribe: ', error);
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
        variables: { id: id },
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  render() {
    const { node, client } = this.props;
    return (
      <Query skip={false} query={CheckForCellChangesQuery} variables={{ id: node && node.id }}>
        {({ loading, error, data }) => {
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

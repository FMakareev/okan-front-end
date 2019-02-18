import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import queryString from 'query-string';

/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgStatus } from '../../../../components/Icons/SvgStatus';

/**Graphql schema */
import UpdateCellMutation from './UpdateCellMutation.graphql';
import CellMarkerQuery from './CellMarkerQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

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
  static propTypes = {
    updateNode: PropTypes.func,
  };

  static defaultProps = {};

  state = { clickStatus: false };

  /**
   * @param {string} id - id изменяемой ячейки
   * @param {string} verify - статус на который нужно изменить
   * @desc изменение статуса у ячейки
   * */
  changeStatus = (id, verify) => {
    this.props.client
      .mutate({
        mutation: UpdateCellMutation,
        variables: {
          id,
          verify,
        },
        update: (store, { data: { updatecell } }) => {
          UpdateCellInCache(store, {
            ...updatecell.cell,
          });
        },
      })
      .then(async response => {
        // console.log('response: ', response);
        await this.props.cellCheckStatusChange(id, verify);
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
            // console.log('initSubscribe: ', data.cellitem,node);
            this.props.updateNode(node.id, data.cellitem);
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
      return this.props.client.watchQuery({
        query: CellItemQuery,
        variables: { id: id },
      });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  render() {
    const { node } = this.props;

    return (
      <Query skip={true} query={CellMarkerQuery} variables={{ id: node && node.id }}>
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
                fill={GetStatusColor(node.verify)}
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

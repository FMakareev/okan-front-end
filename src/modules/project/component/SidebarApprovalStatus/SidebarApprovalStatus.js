import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';

import CellMarkerQuery from './CellMarkerQuery.graphql';
/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import { SvgStatus } from '../../../../components/Icons/SvgStatus';

import UpdateCellMutation from './UpdateCellMutation.graphql';

/** Constants */
import {
  CELL_STATUS_CHANGED,
  CELL_STATUS_CHECKED,
  CELL_STATUS_NOT_CHECKED,
} from '@lib/shared/approvalStatus';

/** */
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

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
  static propTypes = {};

  static defaultProps = {};

  state = { clickStatus: false };

  submit = (id, verify) => {
    this.props.client
      .mutate({
        mutation: UpdateCellMutation,
        variables: {
          id,
          verify,
        },
        update: (store, { data: { updatecell } }) => {
          const options = {
            query: CellItemQuery,
            variables: {
              id: id,
            },
          };
          const data = store.readQuery(options);
          data.cell = updatecell.cell;
          store.writeQuery({
            ...options,
            data,
          });
        },
      })
      .then(async response => {
        console.log('response: ', response);
        await this.props.cellCheckStatusChange(id, verify);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { node } = this.props;

    return (
      <Query
        skip={true}
        query={CellMarkerQuery}
        variables={{ id: node && node.id }}>
        {({ loading, error, data }) => {
          return (
            <ButtonBase
              title={'Статус проверки блока'}
              variant={'empty'}
              disabled={node.childcell && node.childcell.isHead}
              onClick={event => {
                event.stopPropagation();
                return this.submit(node.id, CELL_STATUS_CHECKED);
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

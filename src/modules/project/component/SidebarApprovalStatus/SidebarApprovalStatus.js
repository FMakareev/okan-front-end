import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

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
    console.log(11, id, verify);

    this.setState(({ clickStatus }) => ({ clickStatus: true }));

    this.props.client
      .mutate({ mutation: UpdateCellMutation, variables: { id, verify } })
      .then(response => {
        console.log('response: ', response);
      });
  };

  render() {
    const {
      data: { answer, id },
    } = this.props;

    const { clickStatus } = this.state;

    const statusRender = answer ? CELL_STATUS_CHANGED : CELL_STATUS_NOT_CHECKED;
    const status = clickStatus ? CELL_STATUS_CHECKED : statusRender;

    return (
      <ButtonBase
        title={'Статус проверки блока'}
        variant={'empty'}
        onClick={event => {
          event.stopPropagation();
          return this.submit(id, CELL_STATUS_CHECKED);
        }}>
        <SvgStatus fill={GetStatusColor(status)} stroke={'#fff'} />
      </ButtonBase>
    );
  }
}

SidebarApprovalStatus = withApollo(SidebarApprovalStatus);

export default SidebarApprovalStatus;

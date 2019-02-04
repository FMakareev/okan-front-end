import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query, withApollo} from 'react-apollo';

import CellMarkerQuery from './CellMarkerQuery.graphql';
/** View */
import ButtonBase from '../../../../components/ButtonBase/ButtonBase';

/**Image */
import {SvgStatus} from '../../../../components/Icons/SvgStatus';

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

  state = {clickStatus: false};

  submit = (id, verify) => {
    console.log(11, id, verify);


    this.props.client
      .mutate({mutation: UpdateCellMutation, variables: {id, verify}})
      .then(response => {
        console.log('response: ', response);
        this.setState(({clickStatus}) => ({clickStatus: true}));
      })
      .catch(error => {
        console.error(error);
      })
  };

  render() {
    const {
      node
    } = this.props;

    const {clickStatus} = this.state;


    return (
      <Query query={CellMarkerQuery} variables={{id: node && node.id}}>
        {({loading, error, data}) => {

          const {cellMarker} = data;

          const statusRender = cellMarker && cellMarker.answer ? CELL_STATUS_CHANGED : CELL_STATUS_NOT_CHECKED;
          const status = clickStatus ? CELL_STATUS_CHECKED : statusRender;

          return (<ButtonBase
            title={'Статус проверки блока'}
            variant={'empty'}
            onClick={event => {
              event.stopPropagation();
              return this.submit(node.id, CELL_STATUS_CHECKED);
            }}>
            <SvgStatus fill={GetStatusColor(status)} stroke={'#fff'}/>
          </ButtonBase>)
        }}
      </Query>
    );
  }
}

SidebarApprovalStatus = withApollo(SidebarApprovalStatus);

export default SidebarApprovalStatus;

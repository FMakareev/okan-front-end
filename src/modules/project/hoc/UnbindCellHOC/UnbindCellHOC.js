import React, {Component} from "react";
import {connect} from "react-redux";
import {error, success} from "react-notification-system-redux";
import { graphql } from 'react-apollo';
import UnbindingCellMutation from './UnbindingCellMutation.graphql';

const UnbindCellOptions = () => ({
  success: {
    title: 'Блок отвязан',
    message: 'Вы отвязали блок от всех разделов',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Ошибка',
    message: 'Не удалось отвязать блок',
    position: 'tr',
    autoDismiss: 2,
  },
});


export const UnbindCellHOC = ()=> WrappedComponent => {
  class UnbindCell extends Component {
    constructor(props) {
      super(props);
      this.unbindCellSubmit = this.unbindCellSubmit.bind(this);
    }
    /**
     * @param {string} id ячейки
     * @param {boolean} isNotification - включить ли уведомления
     * @desc метод выполняет запрос на отвязывание блока
     * */
    unbindCellSubmit(id, isNotification = true) {
      return this.props
        .mutate({
          variables: {
            cell: id,
          },
        })
        .then((response) => {
          if(isNotification){
            this.props.setNotificationSuccess(UnbindCellOptions().success);
          }
          return response;
        })
        .catch(error => {
          console.log('there was an error sending the query', error);
          if(isNotification){
            this.props.setNotificationError(UnbindCellOptions().error);
          }
          return error;
        });
    }

    render() {
      return (<WrappedComponent
        {...this.props}
        unbindCellSubmit={this.unbindCellSubmit}
      />)
    }
  }

  const UnbindCellWithApollo = graphql(UnbindingCellMutation)(UnbindCell);

  return connect(
    null,
    dispatch => ({
      setNotificationSuccess: message => dispatch(success(message)),
      setNotificationError: message => dispatch(error(message)),
    }),
  )(UnbindCellWithApollo);
};

export default UnbindCellHOC
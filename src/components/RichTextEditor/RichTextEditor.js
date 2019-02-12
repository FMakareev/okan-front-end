import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import { connect } from 'react-redux';
import { saveBlock } from '../../store/reducers/blocksBinding/actions';
import Notifications, { success, error } from 'react-notification-system-redux';

/**View */
import Message from '../Message/Message';

import { FroalaReduxForm } from '@lib/ui/FroalaReduxForm/FroalaReduxForm';

/** Graphql */
import { graphql } from 'react-apollo';
import UnbindingCellMutation from './UnbindingCellMutation.graphql';

const Wrapper = styled.div`
  ${space};
  width: 100%;
`;

const notificationOpts = () => ({
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

/**
 * Компонент Rich Text Editor
 * @example ./RichTextEditor.example.md
 */

export class RichTextEditor extends Component {
  static propTypes = {
    /** class */
    className: PropTypes.string,
    /** CSS: margin-bottom */
    mb: PropTypes.number,
    /** input */
    input: PropTypes.object,
    /** input */
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** input */
    type: PropTypes.string,
    /** input */
    meta: PropTypes.object,
    /** input validation */
    required: PropTypes.string,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.meta.active !== this.props.meta.active ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.input.value !== this.props.input.value ||
      nextProps.label !== this.props.label
    ) {
      return true;
    }
    return false;
  }

  getButtonClick = (action) => {
    switch(action){
      case 'bind':
        this.storeBlock();
        break;
      case 'unbind':
        this.unbindBlock();
        break;
      case 'copy':
        break;
    }
  }

  /**
   * @desc Записываем в store Redux данные ячейки, которые хотим привязать:
   * id, contentType
   * */
  storeBlock = () => {
    this.props.saveBlock(this.props.data.id);
  }

  /**
   * @desc Удаляем связи с текущей ячейкой
   * */
  unbindBlock = () => {
    this.props.mutate({
      variables: {
        cell: this.props.data.id
      }
    })
      .then(({ data }) => {
        console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts().success);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts().error);
      });
  }

  render() {
    const { className, meta, id } = this.props;

    return (
      <Wrapper className={className}>
        <FroalaReduxForm
          {...this.props}

          handleButtonClick={(action) => {this.getButtonClick(action)}}
        />
        <Message meta={meta} />
      </Wrapper>
    );
  }
}

RichTextEditor = graphql(UnbindingCellMutation)(RichTextEditor);

export default connect(
  null,
  dispatch => ({
    saveBlock: (id) => dispatch(saveBlock(id)),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  })
)(RichTextEditor)

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import { connect } from 'react-redux';
import { copyCell, removeBlock } from '../../store/reducers/blocksBinding/actions';
import Notifications, { success, error } from 'react-notification-system-redux';
import ReactDOM from 'react-dom';

/**View */
import Message from '../Message/Message';

import { FroalaReduxForm } from '@lib/ui/FroalaReduxForm/FroalaReduxForm';
import { FroalaReduxFormName } from '@lib/ui/FroalaReduxForm/FroalaReduxFormName';

/** Graphql */
import { graphql } from 'react-apollo';
import UnbindingCellMutation from './UnbindingCellMutation.graphql';

// Require block types
import { BLOCK_TABLE, BLOCK_IMAGE, BLOCK_TEXT, BLOCK_NAME } from '../../shared/blockType';

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
      nextProps.label !== this.props.label ||
      nextProps.froalaLoaded !== this.props.froalaLoaded
    ) {
      return true;
    }
    return false;
  }

  /**
   * @desc Ждем инициализации Фроалы
   * */
  componentDidUpdate(prevProps) {
    if(prevProps.froalaLoaded !== this.props.froalaLoaded && this.props.froalaLoaded) {
      console.log('updated')
      this.initButtonsCallbacks();
    }
  };

  /**
   * @desc Получаем dom-узлы кнопок и передаем методу createDragEvent
   * */
  initButtonsCallbacks = () => {
    if (this.props.contenttype != BLOCK_NAME) {
      const node = ReactDOM.findDOMNode(this);
      const buttons = node.getElementsByTagName('button');
      let bindingButton = buttons[1];
      let copyButton = buttons[0];
      
      if (bindingButton) {
        this.createDragEvent(bindingButton, node, true);
      }
      if (copyButton) {
        this.createDragEvent(copyButton, node, false);
      }
    }
  };

  /**
   * @desc метод для создания кастомного dragstart/drag события
   * @argument button - кнопка для связывания блоков из апи froala;
   * @argument node - dom-узел компонента RichTextEditor
   * @argument bind - bool, параметр, определяющий, будет ли ячейка связана с копией
   * */
  createDragEvent = (button, node, bind) => {
    {/** Инициализируем копию компонента */}
    let nodePreview = node.cloneNode(true);
    {/** Получаем ячейку, содержащую узел */}
    let wholeCell = node.parentNode.parentNode.parentNode;

    {/** Предотвращаем стандартную реакцию браузера на событие dragstart */}
    node.ondragstart = (e) => {
      e.preventDefault();
    };
    button.onmousedown = (e) => {
      wholeCell.style.opacity = 0.5;
      {/** Стилизуем копию узла и позиционируем абсолютно */}
      nodePreview.style.position = 'absolute';
      nodePreview.style.zIndex = 1000;
      nodePreview.style.width = node.offsetWidth + 'px';
      
      this.copyCell(bind);

      this.movePreviewAt(nodePreview, e);
      document.body.appendChild(nodePreview);

      document.onmousemove = (e) => {
        this.movePreviewAt(nodePreview, e);
      }
      {/** Вешаем mouseup на document, т.к. курсор нне наведен на кнопку или копию узла */}
      document.onmouseup = (e) => {
        console.log('mouseup')
        this.releaseButton(nodePreview, wholeCell, e, button);
      }
      {/** Вешаем mouseup на кнопку, т.к. предыдущий обработчик не срабатывает на кнопке */}
      button.onmouseup = (e) => {
        console.log('mouseup on button')
        this.releaseButton(nodePreview, wholeCell, e, button);
      }
    }
  }
  
  /**
   * @desc Перемещаем копию узла к курсору
   * */
  movePreviewAt = (node, e) => {
    node.style.left = e.pageX + 8 + 'px';
    node.style.top = e.pageY + 8 + 'px';

    {/** Кроссбраузерное нахождение высоты всей страницы */}
    var scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    
    {/** Сравниваем с высотой клиента */}
    if (scrollHeight > document.documentElement.clientHeight) {
      {/** Наведение на верх страницы (50 пикселей сверху) */}
      if (e.clientY < 50) {
        window.scrollBy(0,-10);
      }
      {/** Наведение на низ страницы (50 пикселей снизу) */}
      if (e.clientY > document.documentElement.clientHeight - 50) {
        window.scrollBy(0,10);
      }
    }
  }
  
  releaseButton = (node, cell, e, button) => {
    {/** удаляем копию узла */}
    document.body.removeChild(node);
    {/** обнуляем обработчики */}
    document.onmousemove = null;
    document.onmouseup = null;
    button.onmouseup = null;

    cell.style.opacity = 1;
  }


  getButtonClick = action => {
    switch (action) {
      case 'bind':
        this.copyCell(true);
        break;
      case 'unbind':
        this.unbindBlock();
        break;
      case 'copy':
        this.copyCell(false);
        break;
    }
  };

  /**
   * @desc Удаляем связи с текущей ячейкой
   * */
  unbindBlock = () => {
    this.props
      .mutate({
        variables: {
          cell: this.props.data.id,
        },
      })
      .then(({ data }) => {
        console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts().success);
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts().error);
      });
  };

  copyCell = bind => {
    this.props.removeBlock();
    let data = this.props.data;
    data.content.content = this.props.input.value;
    this.props.instantSave();
    this.props.copyCell(this.props.data, bind);
  };

  render() {
    const { className, meta, id } = this.props;

    return (
      <Wrapper className={className}>
        {this.props.contenttype === BLOCK_NAME ? (
          <FroalaReduxFormName {...this.props} />
        ) : (
          <FroalaReduxForm
            {...this.props}
            handleButtonClick={action => {
              this.getButtonClick(action);
            }}
          />
        )}
        <Message meta={meta} />
      </Wrapper>
    );
  }
}

RichTextEditor = graphql(UnbindingCellMutation)(RichTextEditor);

const mapStateToProps = state => {
  return state.blocksBinding;
};

export default connect(
  mapStateToProps,
  dispatch => ({
    copyCell: (cell, bind) => dispatch(copyCell(cell, bind)),
    removeBlock: () => dispatch(removeBlock()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(RichTextEditor);

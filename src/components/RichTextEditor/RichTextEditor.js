import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

/** Notification */
import { success, error } from 'react-notification-system-redux';

/** Store */
import { copyCell, removeBlock } from '../../store/reducers/blocksBinding/actions';

/**View */
import Message from '../Message/Message';
import { FroalaReduxForm } from '@lib/ui/FroalaReduxForm/FroalaReduxForm';
import { FroalaReduxFormName } from '@lib/ui/FroalaReduxForm/FroalaReduxFormName';

/** Graphql */
import UnbindingCellMutation from '../../modules/project/hoc/UnbindCellHOC/UnbindingCellMutation.graphql';

// Constants
import { BLOCK_NAME } from '../../shared/blockType';

/** Notification */
import { messageNotificationUnbindCell } from '../../modules/project/hoc/UnbindCellHOC/messageNotificationUnbindCell';

const Wrapper = styled.div`
  ${space};
  width: 100%;
`;

export const FROALA_BTN_TITLE_COPY = 'copy';
export const FROALA_BTN_TITLE_BIND = 'bind';
export const FROALA_BTN_TITLE_UNBIND = 'unbind';

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
    if (prevProps.froalaLoaded !== this.props.froalaLoaded && this.props.froalaLoaded) {
      this.initButtonsCallbacks();
    }
  }

  /**
   * @desc Получаем dom-узлы кнопок и передаем методу createDragEvent
   * */
  initButtonsCallbacks = () => {
    if (this.props.contenttype !== BLOCK_NAME) {
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
    {
      /** Инициализируем копию компонента */
    }
    let nodePreview = node.cloneNode(true);
    {
      /** Получаем ячейку, содержащую узел */
    }
    let wholeCell = node.parentNode.parentNode.parentNode;
    {
      /** Получаем узел сайдбара для скролла по нему */
    }
    let sidebarWrapper = document.getElementById('SideBarWrapper');

    {
      /** Предотвращаем стандартную реакцию браузера на событие dragstart */
    }
    node.ondragstart = e => {
      e.preventDefault();
    };
    button.onmousedown = e => {
      wholeCell.style.opacity = 0.5;
      {
        /** Стилизуем копию узла и позиционируем абсолютно */
      }
      nodePreview.style.position = 'absolute';
      nodePreview.style.zIndex = 1000;
      nodePreview.style.width = node.offsetWidth + 'px';

      this.copyCell(bind);

      this.movePreviewAt(nodePreview, e);
      document.body.appendChild(nodePreview);

      document.onmousemove = e => {
        this.movePreviewAt(nodePreview, e);
      };
      sidebarWrapper.onmousemove = e => {
        this.scrollSidebar(e, sidebarWrapper);
      };
      {
        /** Вешаем mouseup на document, т.к. курсор нне наведен на кнопку или копию узла */
      }
      document.onmouseup = e => {
        this.releaseButton(nodePreview, wholeCell, e, button);
      };
      {
        /** Вешаем mouseup на кнопку, т.к. предыдущий обработчик не срабатывает на кнопке */
      }
      button.onmouseup = e => {
        this.releaseButton(nodePreview, wholeCell, e, button);
      };
    };
  };

  /**
   * @desc Перемещаем копию узла к курсору
   * */
  movePreviewAt = (node, e) => {
    node.style.left = e.pageX + 8 + 'px';
    node.style.top = e.pageY + 8 + 'px';
  };

  scrollSidebar = (e, sidebarWrapper) => {
    /** Наведение на верх страницы (100 пикселей сверху) */
    if (e.clientY < 100) {
      sidebarWrapper.scrollBy(0, -10);
    }
    /**
     * Наведение на низ страницы (100 пикселей снизу) &&
     * Предотвращение лишнего скролла вниз
     */
    if (
      e.clientY > document.documentElement.clientHeight - 100 &&
      e.offsetY < document.documentElement.offsetHeight
    ) {
      sidebarWrapper.scrollBy(0, 10);
    }
  };

  releaseButton = (node, cell, e, button) => {
    {
      /** удаляем копию узла */
    }
    document.body.removeChild(node);
    {
      /** обнуляем обработчики */
    }
    document.onmousemove = null;
    document.onmouseup = null;
    button.onmouseup = null;

    if (!event.target.closest('.SidebarCellNode')) {
      this.props.removeBlock();
    }

    cell.style.opacity = 1;
  };

  getButtonClick = action => {
    switch (action) {
      case FROALA_BTN_TITLE_BIND:
        this.copyCell(true);
        break;
      case FROALA_BTN_TITLE_UNBIND:
        this.unbindBlock();
        break;
      case FROALA_BTN_TITLE_COPY:
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
        this.props.setNotificationSuccess(messageNotificationUnbindCell().success);
      })
      .catch(error => {
        console.error('Error unbindBlock:', error);
        this.props.setNotificationError(messageNotificationUnbindCell().error);
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
              return this.getButtonClick(action);
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

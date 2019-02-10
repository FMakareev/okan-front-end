import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { success, error } from 'react-notification-system-redux';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';

/** Components */
import SidebarCreateCell from '../SidebarCreateCell/SidebarCreateCell';
import SidebarApprovalStatus from '../SidebarApprovalStatus/SidebarApprovalStatus';
import SidebarChangeCell from '../SidebarChangeCell/SidebarChangeCell';
import NodeToggle from '../NodeToggle/NodeToggle';
import { SidebarCellNodeEditable } from '../SidebarCellNodeEditable/SidebarCellNodeEditable';
import { getPosition } from '../ProjectContext/ProjectContextSelectors';

/** Graphql schema */
import BindingCellMutation from './BindingCellMutation.graphql';

/** Redux action to remove BlockId from store */
import { removeBlockId } from '../../../../store/reducers/blocksBinding/actions';

const has = Object.prototype.hasOwnProperty;

const Wrapper = styled(Flex)`
  cursor: pointer;
  ${({ active }) => (active ? 'background-color: #bdbdbd52;' : '')}
  /* ${props => console.log(props)} */

  &:hover {
    background-color: #bdbdbd52;
  }
`;

const TextStyled = styled(Text)`
  max-width: 150px;
  width: 100%;
  word-wrap: break-word;
`;

const notificationOpts = cellText => ({
  success: {
    title: 'Блок привязан',
    message: 'Вы привязали блок к разделу ' + cellText,
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Ошибка',
    message: 'Не удалось привязать блок',
    position: 'tr',
    autoDismiss: 2,
  },
});

// TODO: добавить авто сохранение каждые 30 секунд если поле с именем в фокусе
// TODO: добавить вывод актуального статуса

export class SidebarCellNode extends Component {
  static propTypes = {
    addNodeInTree: PropTypes.func.isRequired,
    cellCheckStatusChange: PropTypes.func.isRequired,
    removeNodeInTree: PropTypes.func.isRequired,
    position: PropTypes.shape({
      cellid: PropTypes.string,
      sectionid: PropTypes.string,
      documentid: PropTypes.string,
      projectid: PropTypes.string,
    }),
    changeNodeFocus: PropTypes.func.isRequired,
    decorators: PropTypes.shape({
      Container: PropTypes.any,
      Header: PropTypes.any,
      Loading: PropTypes.any,
      Toggle: PropTypes.any,
      TreeBeardWrapper: PropTypes.any,
      TreeNodeContainer: PropTypes.any,
      TreeNodeList: PropTypes.any,
    }),
    onClick: PropTypes.func.isRequired,
    terminal: PropTypes.bool.isRequired,
    document: PropTypes.object.isRequired,
    children: PropTypes.any,
    node: PropTypes.shape({
      children: PropTypes.array,
      name: PropTypes.string,
      number: PropTypes.string,
      toggled: PropTypes.bool,
      focused: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      loading: PropTypes.bool,
    }),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.contentEditable = React.createRef();
  }

  get initialState() {
    // console.log(this.props.node);
    try {
      return {
        name: this.props.node.name,
        focused: this.props.node.focused,
        hover: false,
      };
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };

  /**
   * @desc метод для активации режима редактирования раздела
   * */
  onToggleEditable = () => {
    const { changeNodeFocus, node } = this.props;
    if (node.focused) {
      this.contentEditable.current.focus();
    }
    changeNodeFocus(node.id, !node.focused);
    this.setState(() => ({ focused: !node.focused }));
  };

  /**
   * @param {object} node - Объект узла
   * @desc метод возвращает значение нумерации по сути это селектор как в redux
   * */
  getNumberFromContent = node =>
    has.call(node, 'content') && has.call(node.content, 'number') && node.content.number;

  /**
   * @param {object} cell - объект ячейки
   * @desc метод проверяет является ли дочерняя ячейка категорией
   * */
  static childcellIsCategory = cell => {
    try {
      if (has.call(cell, 'childcell') && cell.childcell) {
        return cell.childcell.isHead;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error cellIsHead: ', cell, error);
      return false;
    }
  };

  /**
   * @param {object} document
   * @param {object} node
   * @param {object} history
   * @desc метод для перехода к опредленной категории в роутере
   * */
  static gotToCategory = (document, node, history) => {
    try {
      if (!history) {
        console.error(`Error: goToCategory history is undefined: `, history);
        return null;
      }
      if (!document) {
        console.error(`Error: goToCategory document is undefined: `, document);
        return null;
      }
      if (!node) {
        console.error(`Error: goToCategory node is undefined: `, node);
        return null;
      }
      history.push(
        `/app/project/${document.project}/${document.id}/${node.id}?sectionNumber=${node.number}`,
      );
    } catch (error) {
      console.error('Error in gotToCategory: ', error);
    }
  };

  handleClick = () => {
    try {
      const { onClick, node, history, document, bindingBlockId } = this.props;

      const isHead = SidebarCellNode.childcellIsCategory(node);

      if (isHead) {
        onClick();
      } else {
        if (bindingBlockId) {
          this.bindBlock(node.id, bindingBlockId);
        } else {
          SidebarCellNode.gotToCategory(document, node, history);
          this.props.changeActiveNode(
            node ? node.id : null,
            getPosition(this.props.project, 'sectionid'),
          );
        }
      }
    } catch (error) {
      console.log(`Error node=${node && node.id}: `, error);
    }
  };

  onHover = hover => {
    this.setState(state => ({
      ...state,
      hover: hover,
    }));
  };

  bindBlock = (parent, target) => {
    let targetArr = [];
    targetArr.push(target);
    console.log(targetArr);
    this.props
      .mutate({
        variables: {
          target: targetArr,
          parent: parent,
        },
      })
      .then(({ data }) => {
        // console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts(this.props.node.name).success);
        this.props.removeBlockId();
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts(null).error);
      });
  };

  render() {
    const { node, onClick } = this.props;
    const { hover, name } = this.state;
    const isHead = SidebarCellNode.childcellIsCategory(node);

    return (
      <Wrapper
        active={node.active}
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}
        py={'5px'}
        ml={'-5px'}
        onClick={this.handleClick}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}>
        <Flex width={'calc(100% - 72px)'} ml={'10px'}>
          {isHead && <NodeToggle toggled={node.toggled} />}
          <Flex
            fontWeight={isHead ? 500 : 300}
            ml={isHead ? '' : '20px'}
            color={'color11'}
            width={'calc(100% - 28px)'}>
            <Text fontWeight={'inherit'} color={'color11'}>
              {node.number}
            </Text>
            <TextStyled fontWeight={'inherit'} color={'color11'} mr={1}>
              <SidebarCellNodeEditable
                id={node.id}
                onToggle={this.onToggleEditable}
                ref={this.contentEditable}
                html={name}
                focused={node.focused}
                onChange={this.handleChange}
              />
            </TextStyled>
          </Flex>
        </Flex>
        <Flex mr={'10px'}>
          <Box opacity={hover ? '1' : '0'} px={1}>
            <SidebarChangeCell onClick={this.onToggleEditable} />
          </Box>
          <Box opacity={hover ? '1' : '0'} px={1}>
            <SidebarCreateCell
              node={node}
              addNodeInTree={this.props.addNodeInTree}
              changeNodeFocus={this.props.changeNodeFocus}
              removeNodeInTree={this.props.removeNodeInTree}
            />
          </Box>
          <Box px={1}>
            <SidebarApprovalStatus
              cellCheckStatusChange={this.props.cellCheckStatusChange}
              node={node}
            />
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

SidebarCellNode = withRouter(SidebarCellNode);

const mapStateToProps = state => {
  return state.blocksBinding;
};

SidebarCellNode = graphql(BindingCellMutation)(SidebarCellNode);

export default connect(
  mapStateToProps,
  dispatch => ({
    removeBlockId: () => dispatch(removeBlockId()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCellNode);

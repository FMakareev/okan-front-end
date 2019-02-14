import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
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
import {SidebarCellNodeEditable} from '../SidebarCellNodeEditable/SidebarCellNodeEditable';
import {getPosition, getProject} from '../ProjectContext/ProjectContextSelectors';

/** Graphql schema */
import BindingCellMutation from './BindingCellMutation.graphql';
import CreateCellMutation from '../SidebarCreateCell/CreateCellMutation.graphql';
import CellListQuery from '../ProjectEditor/CellListQuery.graphql';
import CellItemQuery from '../DocumentTree/CellItemQuery.graphql';

/** Redux action to remove BlockId from store */
import { removeBlock } from '../../../../store/reducers/blocksBinding/actions';

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

const notificationCopy = cellText => ({
  success: {
    title: 'Блок скопирован',
    message: 'Блок скопирован в раздел ' + cellText,
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Ошибка',
    message: 'Не удалось скопировать блок',
    position: 'tr',
    autoDismiss: 2,
  },
});

// TODO: добавить авто сохранение каждые 30 секунд если поле с именем в фокусе
// TODO: добавить вывод актуального статуса

export class SidebarCellNode extends Component {
  static propTypes = {
    updateNode: PropTypes.func.isRequired,
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
        prevName: this.props.node.name,
        focused: this.props.node.focused,
        hover: false,
      };
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = evt => {
    this.setState({name: evt.target.value});
  };

  /**
   * @desc метод для активации режима редактирования раздела
   * */
  onToggleEditable = () => {
    const {changeNodeFocus, node} = this.props;
    if (node.focused) {
      this.contentEditable.current.focus();
    }
    changeNodeFocus(node.id, !node.focused);
    this.setState(() => ({focused: !node.focused, prevName: node.name}));
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
   * @param {string} projectid
   * @param {string} documentid
   * @param {object} node
   * @param {object} history
   * @desc метод для перехода к опредленной категории в роутере
   * */
  static gotToCategory = (projectid, documentid, node, history) => {
    try {
      if (!history) {
        console.error(`Error: goToCategory history is undefined: `, history);
        return null;
      }
      if (!projectid) {
        console.error(`Error: goToCategory projectid is undefined: `, projectid);
        return null;
      }
      if (!documentid) {
        console.error(`Error: goToCategory documentid is undefined: `, documentid);
        return null;
      }
      if (!node) {
        console.error(`Error: goToCategory node is undefined: `, node);
        return null;
      }
      history.push(
        `/app/project/${projectid}/${documentid}/${node.id}?sectionNumber=${node.number}`,
      );
    } catch (error) {
      console.error('Error in gotToCategory: ', error);
    }
  };

  handleClick = () => {
    try {
      const { onClick, node, history, document, cellToCopy, bindAfterCopy } = this.props;

      const isHead = SidebarCellNode.childcellIsCategory(node);

      if (isHead) {
        onClick();
      } else {
        if (cellToCopy) {
          this.createBindingBlockCopy(node.id, node.lastChildren, bindAfterCopy);
        } else {

          SidebarCellNode.gotToCategory(document.project, document.id, node, history);
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

  createBindingBlockCopy = (parentCellId, lastChildren, bindAfterCopy) => {
 
    var newNode = this.props.client.readQuery({
      query: CellItemQuery,
      variables: {
        id: this.props.node.id
      }
    });
    lastChildren = newNode.cellitem.lastChildren;
    console.log(lastChildren)
    this.props
      .createCopy({
        variables: {
          contentname: this.props.cellToCopy.content.name,
          content: this.props.cellToCopy.content.content,
          contenttype: this.props.cellToCopy.content.contenttype,
          prevcell: lastChildren ? lastChildren.id : parentCellId,
          parent: parentCellId,
          isHead: false,
        },
        update: (store, {data: {createcell}}) => {
          const data = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.node.id
            }
          });
          if(data.celllist.length > 0){
            data.celllist[data.celllist.length - 1].nextcell = createcell.cell;
          }

          data.celllist.push(createcell.cell);

          store.writeQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.node.id
            },
            data
          });
        }
      })
      .then(({data}) => {
        if (bindAfterCopy)
          this.bindBlock(data.createcell.cell, this.props.cellToCopy.id);
        else {
          this.props.setNotificationSuccess(notificationCopy(this.props.node.name).success);
          /** Удаляет id блока из кэша */
          this.props.removeBlock();
        }
      })
      .catch((error) => {
        this.props.setNotificationError(notificationCopy(null).error);
        console.log('there was an error sending the query', error);
      });
  };

  bindBlock = (target, parent) => {
    let targetArr = [];
    targetArr.push(target.id);
    this.props
      .bindBlock({
        variables: {
          target: targetArr,
          parent: parent,
        },
        update: (store, {data: {bindingcell}}) => {
          const dataParentList = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: bindingcell.cell.parent.id
            }
          });

          let dataParentWrite = {};
          for (let i = 0; i < dataParentList.celllist.length; i++) {
            if(dataParentList.celllist[i].id === bindingcell.cell.id) {
              dataParentWrite = dataParentList.celllist[i];
              dataParentWrite.pull = bindingcell.cell.pull;
            }
          }

          store.writeQuery({
            query: CellListQuery,
            variables: {
              id: bindingcell.cell.parent.id
            },
            data: dataParentWrite
          })

          const nodeCell = store.readQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.node.id
            }
          });

          nodeCell.cellitem.lastChildren = target;
          this.props.node.lastChildren = target;

          store.writeQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.node.id
            },
            data: nodeCell
          });
        }
      })
      .then(({ data }) => {
        // console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts(this.props.node.name).success);
        /** Удаляет id блока из кэша */
        this.props.removeBlock();
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts(null).error);
      });
  };

  render() {
    const {
      node, onClick, setNotificationSuccess,
      setNotificationError
    } = this.props;
    const {hover, name, prevName} = this.state;
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
          {isHead && <NodeToggle toggled={node.toggled}/>}
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
                setNotificationSuccess={setNotificationSuccess}
                setNotificationError={setNotificationError}
                onError={() => {
                  console.log('onError:');
                  this.setState(() => this.initialState)
                }}
                ref={this.contentEditable}
                html={name}
                prevHtml={prevName}
                focused={node.focused}
                onChange={this.handleChange}
              />
            </TextStyled>
          </Flex>
        </Flex>
        <Flex mr={'10px'}>
          <Box opacity={hover ? '1' : '0'} px={1}>
            <SidebarChangeCell onClick={this.onToggleEditable}/>
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
              updateNode={this.props.updateNode}
              node={node}
            />
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

SidebarCellNode = withRouter(SidebarCellNode);

SidebarCellNode = withApollo(SidebarCellNode)

const mapStateToProps = state => {
  return state.blocksBinding;
};

SidebarCellNode = compose(
  graphql(BindingCellMutation, {name: 'bindBlock'}),
  graphql(CreateCellMutation, {name: 'createCopy'})
)(SidebarCellNode);

export default connect(
  mapStateToProps,
  dispatch => ({
    removeBlock: () => dispatch(removeBlock()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCellNode);

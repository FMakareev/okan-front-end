import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {graphql, compose, withApollo} from 'react-apollo';
import {success, error} from 'react-notification-system-redux';
import ReactDOM from 'react-dom';

/** View */
import Flex from '../../../../components/Flex/Flex';
import Box from '../../../../components/Box/Box';
import Text from '../../../../components/Text/Text';
import {Absolute} from '@lib/ui/Absolute/Absolute';

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
import ChangeStatusMutation from '../SidebarApprovalStatus/ChangeStatusMutation.graphql';
import UpdateCellMutation from './UpdateCellMutation.graphql';


/** Redux action to remove BlockId from store */
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';
import {UpdateCellInCache} from '../../utils/UpdateCellInCache';
import {PROJECT_MODE_RW} from '../ProjectContext/ProjectContext';
import {childcellIsCategory} from '../../utils/childcellIsCategory';
import ProjectModeState from '../ProjectContext/ProjectModeState';

/** Utils */
import {sortingCells} from '../../utils/sortingCells';

/** Constants */
import {CELL_STATUS_CHANGED} from '@lib/shared/approvalStatus';

const has = Object.prototype.hasOwnProperty;

const Wrapper = styled(Flex)`
  cursor: pointer;
  ${({active}) => (active ? 'background-color: #bdbdbd52;' : '')}
  /* ${props => console.log(props)} */

  &:hover {
    background-color: #bdbdbd52;
  }
`;

const TextStyled = styled(Text)`
  width: 100%;
  word-wrap: break-word;
  margin-right: 38px;
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

const notificationUpdateCell = () => ({
  success: {
    title: 'Раздел обновлен',
    position: 'tr',
    autoDismiss: 2,
  },
  error: {
    title: 'Раздел не обновлен',
    position: 'tr',
    autoDismiss: 2,
  },
});

// TODO: добавить авто сохранение каждые 30 секунд если поле с именем в фокусе
// TODO: добавить вывод актуального статуса

export class SidebarCellNode extends Component {
  static propTypes = {
    /** @desc обновление инфомации ячейки в дереве навигации */
    updateNode: PropTypes.func.isRequired,
    /** @desc добавление ячейки в дерево навигации */
    addNodeInTree: PropTypes.func.isRequired,
    /** @desc метод для изменения статуса ячейки*/
    cellCheckStatusChange: PropTypes.func.isRequired,
    /** @desc удаление ячейки из дерева навигации */
    removeNodeInTree: PropTypes.func.isRequired,
    /** @desc создание копии ячейки */
    createCopy: PropTypes.func.isRequired,
    /** @desc изменил статус фокуса у ячейки */
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
    try {
      return {
        name: this.props.node.name || '',
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
    this.setState(() => ({
      focused: !node.focused,
      prevName: node.name
    }));

  };
  /**
   * @param {object} node - Объект узла
   * @desc метод возвращает значение нумерации по сути это селектор как в redux
   * */
  getNumberFromContent = node =>
    has.call(node, 'content') && has.call(node.content, 'number') && node.content.number;

  handleClick = () => {
    try {
      const {onClick, node, history, document, cellToCopy, bindAfterCopy} = this.props;

      const isHead = childcellIsCategory(node);

      if (isHead) {
        onClick();
      } else {
        this.props.changeActiveNode(
          node ? node.id : null,
          getPosition(this.props.project, 'sectionid'),
        );
      }
    } catch (error) {
      console.error(`Error node=${node && node.id}: `, error);
    }
  };

  onHover = hover => {
    this.setState(state => ({
      ...state,
      hover: hover,
    }));
  };

  onMouseUp = () => {
    const {node, bindAfterCopy, cellToCopy} = this.props;
    if (cellToCopy) {
      this.createBindingBlockCopy(node.id, node.lastChildren, bindAfterCopy, cellToCopy);
    }
  };

  createBindingBlockCopy = (parentCellId, lastChildren, bindAfterCopy, cellToCopy) => {
    let newNode = this.props.client.readQuery({
      query: CellItemQuery,
      variables: {
        id: this.props.node.id,
      },
    });
    lastChildren = newNode.cellitem.lastChildren;
    this.props
      .createCopy({
        variables: {
          contentname: cellToCopy.content.name,
          content: cellToCopy.content.content,
          contenttype: cellToCopy.content.contenttype,
          prevcell: lastChildren ? lastChildren.id : parentCellId,
          parent: parentCellId,
          isHead: false,
        },
        update: (store, {data: {createcell}}) => {
          let data = store.readQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.node.id,
            },
          });
          if (data.celllist.length > 0) {
            data.celllist[data.celllist.length - 1].nextcell = createcell.cell;
          }
          data.celllist = sortingCells(data.celllist);
          data.celllist.push(createcell.cell);

          store.writeQuery({
            query: CellListQuery,
            variables: {
              parent: this.props.node.id,
            },
            data,
          });

          data = null;

          data = store.readQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.node.id,
            },
          });
          data.cellitem.lastChildren = {};
          data.cellitem.lastChildren.id = createcell.cell.id;
          data.cellitem.lastChildren.name = createcell.cell.name;
          data.cellitem.lastChildren.__typename = 'Cell';
          store.writeQuery({
            query: CellItemQuery,
            variables: {
              id: this.props.node.id,
            },
            data: data,
          });
        },
      })
      .then(({data}) => {
        if (bindAfterCopy) this.bindBlock(data.createcell.cell, cellToCopy.id);
        else {
          this.props.setNotificationSuccess(notificationCopy(this.props.node.name).success);
          /** Удаляет id блока из кэша */
          this.props.removeBlock();
        }
      })
      .catch(error => {
        this.props.setNotificationError(notificationCopy(null).error);
        console.error('there was an error sending the query', error);
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
              parent: bindingcell.cell.parent.id,
            },
          });

          let dataParentWrite = {};
          for (let i = 0; i < dataParentList.celllist.length; i++) {
            if (dataParentList.celllist[i].id === bindingcell.cell.id) {
              dataParentWrite = dataParentList.celllist[i];
              dataParentWrite.pull = bindingcell.cell.pull;
            }
          }

          store.writeQuery({
            query: CellListQuery,
            variables: {
              id: bindingcell.cell.parent.id,
            },
            data: dataParentWrite,
          });

          try {
            UpdateCellInCache(store, {
              id: this.props.node.id,
              lastChildren: target,
            });

            this.props.updateNode(this.props.node.id, {lastChildren: target});
          } catch (error) {
            console.error('Error bindBlock: ', error);
          }
        },
      })
      .then(({data}) => {
        // console.log('got data', data);
        this.props.setNotificationSuccess(notificationOpts(this.props.node.name).success);
        /** Удаляет id блока из кэша */
        this.props.removeBlock();
      })
      .catch(error => {
        console.error('there was an error sending the query', error);
        this.props.setNotificationError(notificationOpts(null).error);
      });
  };


  /**
   * @param {string} id ячейки
   * @param {string} name новое имя ячейки
   * @desc метод выполняет обновление ячейки на беке, кеше аполо и дереве сайдбара и обновляет статус ячейки в ереве.
   * */
  updateCellMutation = (id, name) => {
    const {
      setNotificationError,
      setNotificationSuccess,
      client,
      node,
      updateNode,
      cellCheckStatusChange
    } = this.props;
    if (node.name === name) {
      return false;
    }
    return client.mutate({
      mutation: UpdateCellMutation,
      variables: {
        id,
        name,
        status: CELL_STATUS_CHANGED,
      },
      update: (store, {data: {updateCell}}) => {
        try {
          let options = {
            query: CellItemQuery,
            variables: {
              id: updateCell.cell.id,
            },
          };
          store.writeQuery({
            ...options,
            data: {
              cellitem: updateCell.cell,
            },
          });
        } catch (error) {
          console.error('Error UpdateCache: ', error);
        }
      }
    }).then(({data}) => {

      setNotificationSuccess(notificationUpdateCell().success); /** вызываем уведомление об успешном изменении ячейки */

      updateNode(data.updateCell.cell.id, data.updateCell.cell); /** обновляем яейку в дереве */

      cellCheckStatusChange(node.id, CELL_STATUS_CHANGED);  /** обновляем статус яейки в дереве */

    }).catch(error => {
      console.log(error);
      setNotificationError(notificationUpdateCell().error);
    })
  };

  render() {
    const {node, project} = this.props;
    const {hover, name} = this.state;
    const isHead = childcellIsCategory(node);

    return (
      <Wrapper
        active={node.active}
        onMouseEnter={() => this.onHover(true)}
        onMouseLeave={() => this.onHover(false)}
        onMouseUp={() => this.onMouseUp()}
        py={'5px'}
        ml={'-5px'}
        onClick={this.handleClick}
        justifyContent={'flex-start'}
        className={'SidebarCellNode'}
        alignItems={'flex-start'}
        position={'relative'}>

        <Flex width={'100%'} ml={'10px'}>
          {isHead && <NodeToggle toggled={node.toggled}/>}
          <Flex
            fontWeight={isHead ? 500 : 300}
            ml={isHead ? '' : '20px'}
            color={'color11'}
            width={'100%'}
          >
            {!node.isAttachment && (
              <Text fontWeight={'inherit'} color={'color11'}>
                {node.number}&nbsp;
              </Text>
            )}
            <TextStyled fontWeight={'inherit'} color={'color11'}>
              {node.isAttachment && ' ' + `Приложение ${node.letterNumber} `}
              {/*node.isAttachment && ' ' + `Приложение ${node.letterNumber} ${nameSectionLetter}` - тут выволдится с прьюселл именем ячекйи*/}
              <SidebarCellNodeEditable
                id={node.id}
                onToggle={this.onToggleEditable}
                ref={this.contentEditable}
                html={name}
                focused={node.focused}
                updateCellMutation={this.updateCellMutation}
                onChange={this.handleChange}
              />
            </TextStyled>
          </Flex>
        </Flex>

        <ProjectModeState is={PROJECT_MODE_RW}>
          <Absolute right={'0'} top={'0'}>
            <Flex mr={'10px'}>
              <Box opacity={hover ? '1' : '0'} px={1}>
                <SidebarChangeCell onClick={this.onToggleEditable}/>
              </Box>
              <Box opacity={hover ? '1' : '0'} px={1}>
                <SidebarCreateCell
                  cellCheckStatusChange={this.props.cellCheckStatusChange}
                  node={node}
                  changeActiveNode={id =>
                    this.props.changeActiveNode(id, getPosition(this.props.project, 'sectionid'))
                  }
                  addNodeInTree={this.props.addNodeInTree}
                  changeNodeFocus={this.props.changeNodeFocus}
                  removeNodeInTree={this.props.removeNodeInTree}
                  project={project}
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
          </Absolute>
        </ProjectModeState>
      </Wrapper>
    );
  }
}

SidebarCellNode = withRouter(SidebarCellNode);

SidebarCellNode = withApollo(SidebarCellNode);

const mapStateToProps = state => {
  return state.blocksBinding;
};

SidebarCellNode = compose(
  graphql(BindingCellMutation, {name: 'bindBlock'}),
  graphql(CreateCellMutation, {name: 'createCopy'}),
)(SidebarCellNode);

export default connect(
  mapStateToProps,
  dispatch => ({
    removeBlock: () => dispatch(removeBlock()),
    setNotificationSuccess: message => dispatch(success(message)),
    setNotificationError: message => dispatch(error(message)),
  }),
)(SidebarCellNode);

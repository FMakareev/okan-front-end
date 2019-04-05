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
import {getPosition} from '../ProjectContext/ProjectContextSelectors';

/** Graphql schema */
import BindingCellMutation from '../../graphql/BindingCellMutation.graphql';
import CreateCellMutation from '../../graphql/CreateCellMutation.graphql';
import CellListQuery from '../../graphql/CellListAndParentCellQuery.graphql';
import CellItemQuery from '../../graphql/CellItemQuery.graphql';
import UpdateCellMutation from '../../graphql/UpdateCellMutation.graphql';


/** Redux action to remove BlockId from store */
import {removeBlock} from '../../../../store/reducers/blocksBinding/actions';
import {UpdateCellInCache} from '../../utils/UpdateCellInCache';
import {PROJECT_MODE_RW} from '../ProjectContext/ProjectContext';
import {childcellIsCategory} from '../../utils/childcellIsCategory';
import ProjectModeState from '../ProjectContext/ProjectModeState';


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
  targetTypeError: {
    title: 'Ошибка',
    message: 'Невозможно привязать текстовый/таблицу/каринку блок к разделу с разделами',
    position: 'tr',
    autoDismiss: 5,
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
      const {onClick, node} = this.props;

      const isHead = childcellIsCategory(node);

      if (isHead) {
        onClick();
      } else {
        this.props.changeActiveNode(
          node ? node.id : null,
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
    const {node} = this.props;
    console.log('createBindingBlockCopy: ', this.props);
    console.table({parentCellId, lastChildren, bindAfterCopy, cellToCopy});

    if (node.childcell && node.childcell.isHead) {
      /** Удаляет id блока из кэша */
      this.props.removeBlock();
      this.props.setNotificationError(notificationCopy(null).targetTypeError);
      return false;
    }

    let newNode = this.props.client.readQuery({
      query: CellItemQuery,
      variables: {
        id: this.props.node.id,
      },
    });
    lastChildren = newNode.cellItem.lastChildren;
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

          const cellListOptions = {
            query: CellListQuery,
            variables: {
              parent: parentCellId,
            },
          };
          let cellListData = {celllist:[]};

          /** чтение и запись в отдельных try/catch потому что если celllist нет в кеше то аполо выдаст ошибку эту
           * ошибку надо отловить чтобу далее создать запись в кеше
           */
          try {
            cellListData = store.readQuery(cellListOptions);
          } catch (error) {
            console.error('Error readQuery celllist in createCopy:', error);
          }

          try {
            if (cellListData.celllist.length > 0) {
              cellListData.celllist[cellListData.celllist.length - 1].nextcell = createcell.cell;
            }
            cellListData.celllist.push(createcell.cell);

            store.writeQuery({
              ...cellListOptions,
              data: cellListData,
            });
          } catch (error) {
            console.error('Error writeQuery celllist in createCopy:', error);
          }

          /** Обновляем указатели на новую ячейку у родителя*/
          try {
            const parentCellOptions = {
              query: CellItemQuery,
              variables: {
                id: parentCellId,
              },
            };

            let parentCellData = store.readQuery(parentCellOptions);
            console.log('parentCellData: ',parentCellData);
            /** если у родителя нет детей то созданная при копировании/связывании ячейка становится его потомком */
            if(!parentCellData.cellItem.childcell){
              parentCellData.cellItem.childcell = createcell.cell;
            }

            parentCellData.cellItem.lastChildren = createcell.cell;

            console.log('parentCellData: ',parentCellData);
            store.writeQuery({
              ...parentCellOptions,
              data: parentCellData,
            });
          } catch (error) {
            console.error('Error update parent cell list in createCopy:', error);
          }

        },
      })
      .then(({data}) => {
        if (bindAfterCopy) {
          this.bindBlock(data.createcell.cell, cellToCopy.id);
        } else {
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
        verify: CELL_STATUS_CHANGED,
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
              cellItem: updateCell.cell,
            },
          });
        } catch (error) {
          console.error('Error UpdateCache: ', error);
        }
      }
    }).then(({data}) => {

      setNotificationSuccess(notificationUpdateCell().success);
      /** вызываем уведомление об успешном изменении ячейки */

      updateNode(data.updateCell.cell.id, data.updateCell.cell);
      /** обновляем яейку в дереве */

      cellCheckStatusChange(node.id, CELL_STATUS_CHANGED);
      /** обновляем статус яейки в дереве */

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
                {node.number.join('.')}.&nbsp;
              </Text>
            )}
            <TextStyled fontWeight={'inherit'} color={'color11'}>
              {node.isAttachment && ' ' + `Приложение ${node.letterNumber.toUpperCase()} `}
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
                    this.props.changeActiveNode(id)
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

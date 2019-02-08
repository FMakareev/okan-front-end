import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';
import objectPath from 'object-path';

/** View */
import {Treebeard, decorators} from '../../../../components/ReactTreeBeard/index';
import {Box} from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';

/** Component */
import SidebarCellRoot from '../SidebarCellRoot/SidebarCellRoot';
import SidebarCellNode from '../SidebarCellNode/SidebarCellNode';
import {withProject} from '../ProjectContext/ProjectContext';
import {getPosition} from '../ProjectContext/ProjectContextSelectors';
import FormCreateFirstCell from '../FormCreateFirstCell/FormCreateFirstCell';

/** Graphql schema */
import CellItemQuery from './CellItemQuery.graphql';
import UpdateCellMutation from './UpdateCellMutation.graphql';

/** PropTypes  */
import {ProjectPropTypes} from '../../../../propTypes/ProjectPropTypes';
import {CELL_STATUS_CHANGED, CELL_STATUS_NOT_CHECKED} from '@lib/shared/approvalStatus';

decorators.TreeBeardWrapper = props => <Box {...props} />;
decorators.TreeNodeList = props => <Box ml={'5px'} {...props} />;

decorators.Loading = () => (
  <Flex mb={'10px'} px={'20px'} justifyContent={'flex-start'} alignItems={'center'}>
    Загрузка...
  </Flex>
);

const has = Object.prototype.hasOwnProperty;

const SidebarCellNodeWithProject = withProject(props => <SidebarCellNode {...props} />);

export class DocumentTree extends Component {
  static propTypes = {
    /** @desc объект с информацией о дкументе */
    data: PropTypes.shape({
      approvalstatus: PropTypes.string,
      childcell: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        childcell: PropTypes.object,
        approvalstatus: PropTypes.string,
      }),
      id: PropTypes.string,
      name: PropTypes.string,
      __typename: PropTypes.string,
    }),
    /** @desc объект с параметрами адресной строки */
    position: PropTypes.shape({
      cellid: PropTypes.string,
      sectionid: PropTypes.string,
      documentid: PropTypes.string,
      projectid: PropTypes.string,
    }),
    project: ProjectPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onToggle = this.onToggle.bind(this);

    decorators.Container = props => (
      <SidebarCellNodeWithProject
        document={this.props.data}
        changeNodeFocus={this.changeNodeFocus}
        cellCheckStatusChange={this.cellCheckStatusChange}
        addNodeInTree={this.addNodeInTree}
        removeNodeInTree={this.removeNodeInTree}
        {...props}
      />
    );
    // console.log(this.props);
    // console.log(getPosition(this.props.project, 'documentid'));
    if (this.props.data.id === getPosition(this.props.project, 'documentid')) {
      this.initTree(getPosition(this.props.project, 'sectionid'));
    }
  }

  get initialState() {
    const {data, project} = this.props;
    const children =
      data && has.call(data, 'childcell') && data.childcell !== null
        ? []
        : [
          {
            toggled: false,
            loading: false,
            active: false,
            focused: false,
            decorators: {
              ...decorators,
              Container: props => (
                <FormCreateFirstCell document={data} project={project} {...props} />
              ),
            },
          },
        ];

    return {
      cursor: null,
      tree: {
        number: '',
        toggled: false,
        loading: false,
        active: false,
        focused: false,
        id: 'ROOT',
        ...data,
        decorators: {
          ...decorators,
          Container: props => (
            <SidebarCellRoot
              document={this.props.data}
              projectid={getPosition(project, 'projectid')}
              {...props}
            />
          ),
        },
        children: children,
      },
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const {data} = nextProps;

    if (data.childcell !== null && this.state.tree.childcell === null) {
      const newState = {
        ...this.state,
        tree: {
          ...this.state.tree,
          ...data,
          number: '',
          toggled: false,
          loading: false,
          active: false,
          focused: false,
          id: 'ROOT',
          children: [],
        },
      };
      this.setState(newState, state => {
        // console.log('New state after create first cell');
        this.onToggle(newState.tree, true);
      });
    }
  }

  /**
   * @param {string} id искомой ноды
   * @param {array} nodes пул всех доступных нод (формируется в initTree)
   * @param {array} newNodes пустой массив для формирования списка
   * @desc метод для формирования массива ветки дерева
   * */
  createBranch = (id, nodes, newNodes) => {
    try {
      return nodes.forEach((item, index) => {
        if (item.id === id) {
          newNodes.push({
            ...this.createCellNode(item),
            active: false,
            toggled: false,
          });
          if (item.nextcell && has.call(item.nextcell, 'id')) {
            return this.createBranch(item.nextcell.id, nodes, newNodes);
          }
        }
        return newNodes;
      });
    } catch (error) {
      console.error(`Error createBranch id=${id}`, error);
    }
  };

  /**
   * @param {array} newNodes массив новых нод
   * @param {array} nodes пул всех доступных нод, формируется в initTree
   * @desc метод для построения дерева каталога, используется при инициализации
   * */
  createTree = (newNodes, nodes) => {
    try {
      newNodes.forEach(item => {
        if (item.childcell && item.childcell.id) {
          if (nodes.findIndex(childitem => childitem.id === item.childcell.id) >= 0) {
            let childNodesList = [];
            this.createBranch(item.childcell.id, nodes, childNodesList);

            childNodesList = this.cellNumbering(childNodesList, item.number);

            this.createTree(childNodesList, nodes);
            item.children = childNodesList;
          }
        }
      });
    } catch (error) {
      console.error(`Error: `, error);
    }
  };

  /**
   * @params {string} cellid ячейки от которой будет строится дерево к корню
   * @desc метод для инициализации дерева разделов если был передан id ячейки от которой оно будет строится
   * мы формируем массив объектов ячеек в который входят ячейки всех выше стоящих узлов до корня
   * */
  initTree = cellid => {
    if (!cellid) return;
    let nodes = [];
    this.branchDownload(cellid, nodes, '')
      .then(response => {
        if (nodes.length) {
          let newNodes = [];
          // console.log(this.state.tree);
          this.createBranch(this.state.tree.childcell.id, nodes, newNodes);
          newNodes = this.cellNumbering(newNodes, '');
          this.createTree(newNodes, nodes);
          newNodes = this.activeBranch(cellid, newNodes);
          this.updateTree({
            tree: {
              ...this.state.tree,
              active: true,
              toggled: true,
              children: newNodes,
            },
          });
        }
        return response;
      })
      .catch(error => {
        console.error(`Error initTree cellid=${cellid}:`, error);
      });
  };

  /**
   * @params {string} cellid ячейки которую надо удалить
   * @desc метод для удаления ячейки из дерева
   * */
  removeNodeInTree = (cellid) => {
    console.log('removeNodeInTree:', cellid);
    if (!cellid) {
      console.error(`Error removeNodeInTree: cellid is ${cellid}`);
      return cellid;
    }
    try {
      let tree = Object.assign({}, this.state.tree);
      let pathToCurrentNode = this.getPathToNode(tree, cellid);
      let currentNode = objectPath.get([tree], pathToCurrentNode);

      /** предыдущая ячейка */
      let pathToPrevNodeCurrentNode = currentNode.prevcell ? this.getPathToNode(tree, currentNode.prevcell.id) : null;
      let prevNodeCurrentNode = pathToPrevNodeCurrentNode ? objectPath.get([tree], pathToPrevNodeCurrentNode) : null;

      /** следующая ячейка */
      let pathToNextNodeCurrentNode = currentNode.nextcell ? this.getPathToNode(tree, currentNode.nextcell.id) : null;
      let nextNodeCurrentNode = pathToNextNodeCurrentNode ? objectPath.get([tree], pathToNextNodeCurrentNode) : null;


      if (prevNodeCurrentNode && nextNodeCurrentNode) {
        /** удаление ячейки со ссылкой на предыдущую ячейку при этом предыдущая родитель удоляемой ячейки и на следующую */
        if (currentNode.parent && (prevNodeCurrentNode.id === currentNode.parent.id)) {
          prevNodeCurrentNode.childcell = nextNodeCurrentNode;
          nextNodeCurrentNode.prevcell = prevNodeCurrentNode;
          nextNodeCurrentNode.parent = prevNodeCurrentNode;
        } else {
          /** удаление ячейки со ссылкой на следующую и предыдущую при этом предыдущая не родитель удоляемой ячейки */
          prevNodeCurrentNode.nextcell = nextNodeCurrentNode;
          nextNodeCurrentNode.prevcell = prevNodeCurrentNode;
        }
        objectPath.set([tree], pathToPrevNodeCurrentNode, prevNodeCurrentNode);
        objectPath.set([tree], pathToNextNodeCurrentNode, nextNodeCurrentNode);
        // TODO: добавить обновление ячеек по запросу на бек
        // TODO: добавить перерасчет нумерации ячеек
      } else if (!prevNodeCurrentNode && nextNodeCurrentNode) {
        /** удаление ячейки без ссылки на предыдущую ячейку */
        nextNodeCurrentNode.prevcell = null;
        tree.childcell = nextNodeCurrentNode;
        objectPath.set([tree], pathToNextNodeCurrentNode, nextNodeCurrentNode);
        // TODO: добавить обновление ячеек по запросу на бек
        // TODO: добавить перерасчет нумерации ячеек
      } else if (prevNodeCurrentNode && !nextNodeCurrentNode) {
        /** удаление ячейки со ссылкой только на предыдущую ячейку при этом предыдущая родитель удоляемой ячейки */
        if (currentNode.parent && (prevNodeCurrentNode.id === currentNode.parent.id)) {
          prevNodeCurrentNode.childcell = null;
        } else {
          /** удаление ячейки со ссылкой только на предыдущую ячейку при этом предыдущая не родитель удоляемой ячейки */
          prevNodeCurrentNode.nextcell = null;
        }
        objectPath.set([tree], pathToPrevNodeCurrentNode, prevNodeCurrentNode);
        // TODO: добавить обновление ячеек по запросу на бек
        // TODO: добавить перерасчет нумерации ячеек
      }


      objectPath.del([tree], pathToCurrentNode);
      this.updateTree({tree});
    } catch (error) {
      console.error('Error removeNodeInTree: ', error);
    }

  };

  /**
   * @params {string} currentNodeId
   * @params {array} nodelist
   * @desc
   * */
  activeBranch = (currentNodeId, nodes) => {
    try {
      let pathToCurrentNode = this.getPathToNode(nodes, currentNodeId);
      // console.log('activeBranch: ', pathToCurrentNode);
      let currentNode = objectPath.get(nodes, pathToCurrentNode);
      // console.log('activeBranch: ', currentNode);

      objectPath.set(nodes, pathToCurrentNode + '.active', true);

      if (currentNode.parent) {
        let pathToParentNode;
        let parentNode;
        pathToParentNode = this.getPathToNode(nodes, currentNode.parent.id);
        parentNode = objectPath.get(nodes, pathToParentNode);

        while (parentNode !== null) {
          objectPath.set(nodes, pathToParentNode + '.toggled', true);
          objectPath.set(nodes, pathToParentNode + '.active', true);

          if (parentNode.parent && parentNode.parent.id) {
            pathToParentNode = this.getPathToNode(nodes, parentNode.parent.id);
            parentNode = objectPath.get(nodes, pathToParentNode);
          } else {
            pathToParentNode = null;
            parentNode = null;
            break;
          }
        }
      }

      return nodes;
    } catch (error) {
      console.error('Error activeBranch: ', error);
      return nodes;
    }
  };

  /**
   * @param {object} props принимает объект который будет писатя в стейт и перезаписывать его свойства
   * @desc метод для обновления стейта
   * */
  updateTree = props => {
    this.setState(state => ({
      ...state,
      ...props,
    }));
  };

  /**
   * @param {object} node объект ноды дерева
   * @param {boolean} toggled - статус открытия ноду
   * @desc метод для включения/выключения ноды дерева
   * */
  onToggle = (node, toggled) => {
    console.log('onToggle: ', node, toggled);
    node.active = toggled;
    if (node.loading) {
      return;
    }
    node.toggled = toggled;

    if (node.childcell && !node.loading && toggled) {
      node.loading = true;
      let childList = [];
      // Запрашиваем данные для открывшейся ветки
      this.branchDownload(node.childcell.id, childList)
        .then(response => {
          if (childList.length) {
            this.addNodeListInBranch(childList, node.number);
          }
          this.changeStatusLoadingsNode(node.id, false);
        })
        .catch(error => {
          console.error(`Error onToggle/branchDownload, node=${node.name}: `, error);
          return null;
        });
    } else {
      node.loading = false;
    }
    this.updateTree({cursor: node});
  };

  /**
   * @param {string} id ячейки
   * @param {array} nodes - массив ячеек, передается в каждый вызов рекурсивно и по завершению этот массив пишется в state.tree.*
   * @param {string} prevcell  [somebody]  - id предыдущей ячейки, нужен в том случае когда обходим дерево в обе стороны
   * @desc метод выполняет загрузку ячеек по id
   * */
  branchDownload = (id, nodes, prevcell) => {
    if (!id) return;
    return this.getNode(id)
      .then(async response => {
        const {data} = response;
        if (data && data.cellitem) {
          nodes.push(data.cellitem);

          // Это перегрузка метода
          if (typeof prevcell !== 'undefined') {
            if (
              data.cellitem.prevcell &&
              has.call(data.cellitem.prevcell, 'id') &&
              data.cellitem.prevcell.id !== prevcell
            ) {
              await this.branchDownload(data.cellitem.prevcell.id, nodes, data.cellitem.id);
            }
            if (
              data.cellitem.nextcell &&
              has.call(data.cellitem.nextcell, 'id') &&
              data.cellitem.nextcell.id !== prevcell
            ) {
              return await this.branchDownload(data.cellitem.nextcell.id, nodes, data.cellitem.id);
            }
          } else {
            if (data.cellitem.nextcell && has.call(data.cellitem.nextcell, 'id')) {
              return this.branchDownload(data.cellitem.nextcell.id, nodes, data.cellitem.id);
            }
            return response;
          }
        } else {
          return null;
        }
      })
      .catch(error => {
        console.log(prevcell);
        console.log(id);
        console.error(`Error branchDownload, id=${id},prevcell=${prevcell}: `, error);
        return null;
      });
  };

  /**
   * @params {string} name - название искомой ноды
   * @params {boolean} status - значение статуса на которое следует поменять
   * @desc метод ищет по имени ноду в дереве и меняет статус загрузки
   * */
  changeStatusLoadingsNode = (id, status = false) => {
    try {
      const {tree, cursor} = this.state;
      // нашли путь к  ноде
      let pathToNode = this.getPathToNode(tree, id) + '.loading';

      // по пути обновили значение статуса
      objectPath.set([tree], pathToNode, status);

      this.updateTree({
        tree,
        cursor:
          cursor.id === id
            ? {
              ...cursor,
              loading: status,
            }
            : cursor,
      });
    } catch (error) {
      console.log(`Error changeStatusLoadingsNode name=${name}:`, error);
    }
  };

  /**
   * @param {string} id ноды
   * @param {boolean} focused состояние фокуса
   * @desc метод изменяет состояния фокуса заданой ноде
   * */
  changeNodeFocus = (id, focused = false) => {
    try {
      const {tree, cursor} = this.state;
      // нашли путь к  ноде
      let pathToNode = this.getPathToNode(tree, id) + '.focused';

      // по пути обновили значение статуса
      objectPath.set([tree], pathToNode, focused);
      this.updateTree({
        tree,
        cursor:
          cursor && cursor.id === id
            ? {
              ...cursor,
              focused: focused,
            }
            : cursor,
      });
    } catch (error) {
      console.error(`Error changeNodeFocus, id=${id}: `, error);
    }
  };

  /**
   * @param {string} cellid - id ячейки для которой меняется статус
   * @param {string} status - статус который требуется установить
   * @desc метод для изменения статуса проверки ячейки, он меняет статус у выбранной ячейки и проверяет
   * если у всех соседей статус такой же  то меняет на него парента и так до корня
   * */
  cellCheckStatusChange = async (cellid, status) => {
    // console.log('cellCheckStatusChange', cellid, status);
    try {
      let tree = Object.assign({}, this.state.tree);
      let pathToCurrentNode = this.getPathToNode(tree, cellid);
      let currentNode = objectPath.get([tree], pathToCurrentNode);

      objectPath.set([tree], pathToCurrentNode, {
        ...currentNode,
        verify: status,
      });

      if (currentNode.parent) {
        tree = await this.changeParentVerifyStatus(currentNode.parent, tree, status);
      }
      // TODO: добавить уведомление об обновлении статуса
      this.updateTree({tree});
    } catch (error) {
      console.error('Error cellCheckStatusChange: ', error);
    }
  };

  /**
   * @param {object} parent - объект родителя
   * @param {object} tree - все дерево
   * @param {string} status - статус на который будет изменен родитель
   * @desc метод для изменения статуса проверки ячеек
   * */
  changeParentVerifyStatus = (parent, tree, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        let pathToParentNode = this.getPathToNode(tree, parent.id);
        let parentNode = objectPath.get([tree], pathToParentNode);

        if (parentNode && Array.isArray(parentNode.children)) {
          let result = parentNode.children.findIndex(
            item => item.verify === CELL_STATUS_CHANGED || item.verify === CELL_STATUS_NOT_CHECKED,
          );

          if (result === -1) {
            parentNode = {
              ...parentNode,
              verify: status,
            };
            objectPath.set([tree], pathToParentNode, parentNode);
            await this.updateCell({
              id: parentNode.id,
              verify: status,
            });

            if (parentNode.parent) {
              await this.changeParentVerifyStatus(parentNode.parent, tree, status);
            }
          }
        }
        resolve(tree);
      } catch (error) {
        console.error('Error changeParentVerifyStatus: ', error);
        resolve(tree);
      }
    });
  };

  /**
   * @param {object} tree - дерево по которому будет идти поимк
   * @param {string} target - значение по которому будет идти поиск
   * @param {string} path - путь до искомого объекта
   * @param {string} prop - имя свойства по которому будет идти поимк
   * @desc метод ищет в дереве ноду по имени и возвращает строковый путь до неё */
  findNodeByProp = (tree, target, path, prop = 'name') => {
    let data = tree;
    if (!Array.isArray(tree)) {
      data = [tree];
    }
    if (!data) {
      return path;
    }
    return data
      .map((item, index) => {
        if (item[prop] === target) {
          if (path) {
            return `${path}.${index}`;
          } else {
            return `${index}`;
          }
        } else if (item.children) {
          let result = this.findNodeByProp(
            item.children,
            target,
            path ? `${path}.${index}.children` : `${index}.children`,
            prop,
          );
          return Array.isArray(result) ? result[0] : path;
        } else {
          return false;
        }
      })
      .filter(item => typeof item === 'string');
  };

  /**
   * @params {array} cellList - данные ноды/ячейки
   * @params {string} numberParent - порядковый номер родителя
   * @desc метод для добавления ноды в дерево
   * */
  addNodeListInBranch = (cellList, numberParent) => {
    try {
      const tree = Object.assign({}, this.state.tree);
      let pathToParent =
        this.getPathToNode(tree, cellList[0].parent && cellList[0].parent.id) + '.children';

      let newChildren = cellList.map(cell => this.createCellNode(cell));

      newChildren = this.cellNumbering(newChildren, numberParent);

      objectPath.set([tree], pathToParent, newChildren);

      this.updateTree({tree});
    } catch (error) {
      console.log(`Error addNodeListInBranch, numberParent=${numberParent}`, error);
    }
  };

  /**
   * @param {object} cell объект ячейки
   * @desc метод добавления одной ячейки в дерево
   * */
  addNodeInTree = async cell => {
    console.log('addNodeInTree: ', cell);
    const tree = Object.assign({}, this.state.tree);

    let pathToParent = this.getPathToNode(tree, cell.parent !== null ? cell.parent.id : null);

    // путь до парента в дереве
    let pathToParentChildren = pathToParent + '.children';

    // объект парента
    let parent = objectPath.get([tree], pathToParent);
    // дочерние узлы парента
    let parentChildren = objectPath.get([tree], pathToParentChildren) || [];

    // порядковый номер парента
    let numberParent = objectPath.get([tree], pathToParent + '.number');

    // проверяем что если у нас у ноды парента еще нет childcell и ячейка
    // которую мы добавляем в дерево является его дочерней ячейкой
    // то мы ее сразу добавляем в объект ячейки
    if (parent.id === (cell.parent && cell.parent.id) && parent.childcell === null) {
      parent.childcell = cell;
    }

    // узнаем что ы добавляем не раздел, а под раздел и открываем сразу раздел в который добавляется подраздел
    if (parent.id === (cell.parent && cell.parent.id) && parent.childcell !== null && cell.isHead) {
      parent.toggled = true;
    }

    if (parent.__typename === 'Cell') {
      let value = {
        id: parent.id,
        verify: CELL_STATUS_CHANGED,
      };
      // Если предыдущая ячейка это парент то мы добавляем ее
      if (cell.prevcell.id === parent.id) {
        // value.children = cell.id;
      }
      parent.verify = CELL_STATUS_CHANGED;
      await this.updateCell(value);
    }

    let indexPrevCell = this.getIndexPrevCell(parentChildren, cell.prevcell.id);

    // Добавить в массив новую ячейку после предыдущей
    parentChildren.splice(indexPrevCell + 1, 0, this.createCellNode({...cell, focused: true}));

    // перерасчет номеров
    parentChildren = this.cellNumbering(parentChildren, numberParent);
    parent.children = parentChildren;
    objectPath.set([tree], pathToParent, parent);

    this.updateTree({tree});
  };

  /**
   * @param {array} cellList массив ячеек
   * @param {string} targetId яд предыдущей ячейки
   * @desc возвращает индекс предыдущей ячейки
   * */
  getIndexPrevCell = (cellList, targetId) => {
    try {
      return cellList.findIndex(item => item.id === targetId);
    } catch (error) {
      console.error(`Error getIndexPrevCell`, error);
      return cellList.length - 1;
    }
  };

  /**
   * @param {object} tree объект дерева
   * @param {string} parentId - id родителя
   * @desc метод возвращает путь в дереве к родителю
   * */
  getPathToNode = (tree, parentId) => {
    try {
      let pathToParent = this.findNodeByProp(tree, parentId, '', 'id');
      if (Array.isArray(pathToParent) && pathToParent.length) {
        return pathToParent[0];
      } else {
        return '0';
      }
    } catch (error) {
      console.log(`Error getPathToNode, parentId=${parentId}:`, error);
      return '0';
    }
  };

  /**
   * @param {object} cell объект ячейки
   * @desc метод добавляет параметры необходимые для дерева в данные ячейки полученные от сервера
   * */
  createCellNode = cell => {
    try {
      return {
        active: false,
        focused: false,
        ...(SidebarCellNode.childcellIsCategory(cell)
          ? {
            children: [],
            toggled: false,
            loading: false,
          }
          : null),
        ...cell,
      };
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  /**
   * @param {array} cellList массив ячеек
   * @param {string} parentNumber объект ячейки
   * @desc метод для нумерации ячеек
   * */
  cellNumbering = (cellList, parentNumber) => {
    try {
      if (cellList && Array.isArray(cellList)) {
        return cellList.map((item, index) => ({
          ...item,
          number: `${parentNumber}${index + 1}.`,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Error cellNumbering, parentNumber=${parentNumber}: `, error);
      return [];
    }
  };

  /**
   * @params {string} id ясейки
   * @desc запрос для получения данных ячейки */
  getNode = id => {
    const {client} = this.props;

    return client
      .query({
        query: CellItemQuery,
        fetchPolicy: 'network-only',
        variables: {
          id,
        },
      })
      .catch(error => {
        console.error(`Error getNode, id=${id}: `, error);
        return error;
      });
  };

  /**
   * @params {object} value - объект с данныеми для обновления
   * @desc запрос для обновления ячейки */
  updateCell = value => {
    console.log('updateCell:', value);
    const {client} = this.props;

    return client
      .mutate({
        mutation: UpdateCellMutation,
        variables: value,
        update: (store, {data: {updatecell}}) => {
          const options = {
            query: CellItemQuery,
            variables: {
              id: updatecell.cell.id,
            },
          };
          const data = store.readQuery(options);
          data.cell = updatecell.cell;
          store.writeQuery({
            ...options,
            data,
          });
        },
      })
      .catch(error => {
        console.error(`Error updateCell, id=${value.id}: `, error);
        return error;
      });
  };

  render() {
    console.log('DocumentTree:', this.state.tree);
    return (
      <Box
        style={{
          borderBottom: '1px solid #848484',
          marginBottom: '4px',
        }}>
        <Treebeard decorators={decorators} data={this.state.tree} onToggle={this.onToggle}/>
      </Box>
    );
  }
}

DocumentTree = withApollo(DocumentTree);

export default DocumentTree;

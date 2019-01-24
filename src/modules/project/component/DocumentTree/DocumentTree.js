import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from '../../../../components/ReactTreeBeard/index';
import {Box} from "@lib/ui/Box/Box";
import SidebarCellRoot from "../SidebarCellRoot/SidebarCellRoot";
import SidebarCellNode from "../SidebarCellNode/SidebarCellNode";
import CellItemQuery from './CellItemQuery.graphql';
import objectPath from "object-path";
import Flex from "@lib/ui/Flex/Flex";


decorators.TreeBeardWrapper = (props) => <Box {...props}/>;
decorators.TreeNodeList = (props) => <Box pl={'10px'} {...props}/>;


decorators.Loading = () => (<Flex mb={'10px'} px={'20px'} justifyContent={'flex-start'} alignItems={'center'}>
  Загрузка...
</Flex>);

const has = Object.prototype.hasOwnProperty;


export class DocumentTree extends Component {

  static propTypes = {
    /** @desc объект с информацией о дкументе */
    data: PropTypes.shape({
      approvalstatus: PropTypes.string,
      childcell: PropTypes.string,
      id: PropTypes.string,
      name:  PropTypes.string,
      __typename: PropTypes.string,
    }),
    /** @desc объект с параметрами адресной строки */
    params: PropTypes.shape({
      cellid: PropTypes.string,
      documentid: PropTypes.string,
      projectid: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onToggle = this.onToggle.bind(this);
    decorators.Container = (props) => (
      <SidebarCellNode document={this.props.data} params={this.props.params} changeNodeFocus={this.changeNodeFocus}
                       addNodeInTree={this.addNodeInTree} {...props}/>);

    this.initTree(this.props.params.cellid);
  }

  get initialState() {
    console.log(this.props);
    const {data,params} = this.props;

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
          Container: (props) => <SidebarCellRoot document={this.props.data}   projectid={params.projectid} {...props}/>,
        },
        children: [],
      }
    }
  }

  /**
   * @param {string} id искомой ноды
   * @param {array} nodes пул всех доступных нод (формируется в initTree)
   * @param {array} newNodes пустой массив для формирования списка
   * @desc метод для формирования массива ветки дерева
   * */
  createBranch = (id, nodes, newNodes) => {
    return nodes.forEach((item, index) => {
      if (item.id === id) {
        newNodes.push({
          ...this.createCellNode(item),
          active: true,
          toggled: true,
        });
        return this.createBranch(item.nextcell, nodes, newNodes);
      }
    });
  };

  /**
   * @param {array} newNodes массив новых нод
   * @param {array} nodes пул всех доступных нод, формируется в initTree
   * @desc метод для построения дерева каталога, используется при инициализации
   * */
  createTree = (newNodes, nodes) => {
    try {
      newNodes.forEach((item) => {
        if (item.childcell) {
          if (nodes.findIndex(childitem => childitem.id === item.childcell) >= 0) {
            let childNodesList = [];
            this.createBranch(item.childcell, nodes, childNodesList);

            childNodesList  = this.cellNumbering(childNodesList, item.number);

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
  initTree = (cellid) => {
    if (!cellid) return;
    let nodes = [];
    this.branchDownload(cellid, nodes, '')
      .then(response => {

        if (nodes.length) {
          let newNodes = [];

          this.createBranch(this.state.tree.childcell, nodes, newNodes);
          newNodes = this.cellNumbering(newNodes, '');
          this.createTree(newNodes, nodes);

          this.updateTree({
            tree: {
              ...this.state.tree,
              active: true,
              toggled: true,
              children: newNodes,
            }
          })
        }
        return response;
      })
      .catch(error => {
        console.error(`Error initTree cellid=${cellid}:`, error);
      })
  };


  /**
   * @param {object} props принимает объект который будет писатя в стейт и перезаписывать его свойства
   * @desc метод для обновления стейта
   * */
  updateTree = (props) => {
    this.setState((state) => ({
      ...state,
      ...props,
    }))
  };

  /**
   * @param {object} node объект ноды дерева
   * @param {string} toggled - статус открытия ноду
   * @desc метод для включения/выключения ноды дерева
   * */
  onToggle = (node, toggled) => {
    console.log(node, toggled);
    node.active = toggled;
    if (node.loading) {
      return
    }
    node.toggled = toggled;

    if (node.childcell && !node.loading) {
      node.loading = true;
      let childList = [];
      // Запрашиваем данные для открывшейся ветки
      this.branchDownload(node.childcell, childList)
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
    return this.getNode(id)
      .then(async response => {
        const {data} = response;
        if (data.cellitem) {
          nodes.push(data.cellitem);

          // Это перегрузка метода
          if (typeof prevcell !== 'undefined') {
            if (data.cellitem.prevcell && data.cellitem.prevcell !== prevcell) {
              await this.branchDownload(data.cellitem.prevcell, nodes, data.cellitem.id);
            }
            if (data.cellitem.nextcell && data.cellitem.nextcell !== prevcell) {
              return await this.branchDownload(data.cellitem.nextcell, nodes, data.cellitem.id);
            }
          } else {

            if (data.cellitem.nextcell) {
              return this.branchDownload(data.cellitem.nextcell, nodes, data.cellitem.id);
            }
            return response;
          }

        } else {
          return null;
        }

      }).catch(error => {
        console.error(`Error branchDownload, id=${id},parent=${parent}: `, error);
        return null;
      })
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
        tree, cursor: cursor.id === id ? {
          ...cursor,
          loading: status,
        } : cursor,
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
        cursor: cursor && cursor.id === id ? {
          ...cursor,
          focused: focused,
        } : cursor,
      });
    } catch (error) {
      console.error(`Error changeNodeFocus, id=${id}: `, error);
    }
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
    return data.map((item, index) => {
      if (item[prop] === target) {
        if (path) {
          return `${path}.${index}`;
        } else {
          return `${index}`;
        }
      } else if (item.children) {
        let result = this.findNodeByProp(item.children, target, path ? `${path}.${index}.children` : `${index}.children`, prop);
        return Array.isArray(result) ? result[0] : path;
      } else {
        return false;
      }
    }).filter((item) => typeof item === 'string')
  };

  /**
   * @params {array} cellList - данные ноды/ячейки
   * @params {string} numberParent - порядковый номер родителя
   * @desc метод для добавления ноды в дерево
   * */
  addNodeListInBranch = (cellList, numberParent) => {
    try {
      const tree = Object.assign({}, this.state.tree);
      let pathToParent = this.getPathToNode(tree, cellList[0].parent) + '.children';

      let newChildren = cellList.map((cell) => (this.createCellNode(cell)));

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
  addNodeInTree = (cell) => {
    const tree = Object.assign({}, this.state.tree);

    let pathToParent = this.getPathToNode(tree, cell.parent);
    // путь до парента в дереве
    let pathToParentChildren = pathToParent + '.children';
    let pathToNumberParent = pathToParent + '.number';

    let parentChildren = objectPath.get([tree], pathToParentChildren);
    let numberParent = objectPath.get([tree], pathToNumberParent);

    let indexPrevCell = this.getIndexPrevCell(parentChildren, cell.prevcell);

    // Добавить в массив новую ячейку после предыдущей
    parentChildren.splice(indexPrevCell + 1, 0, this.createCellNode({...cell, focused: true}));

    // перерасчет номеров
    parentChildren = this.cellNumbering(parentChildren, numberParent);

    objectPath.set([tree], pathToParentChildren, parentChildren);

    this.updateTree({tree});

  };

  /**
   * @param {array} cellList массив ячеек
   * @param {string} targetId яд предыдущей ячейки
   * @desc возвращает индекс предыдущей ячейки
   * */
  getIndexPrevCell = (cellList, targetId) => {
    try {
      return cellList.findIndex(item => item.id === targetId)
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
        return ['0'];
      }
    } catch (error) {
      console.log(`Error getPathToNode, parentId=${parentId}:`, error);
      return ['0'];
    }
  };

  /**
   * @param {object} cell объект ячейки
   * @desc метод добавляет параметры необходимые для дерева в данные ячейки полученные от сервера
   * */
  createCellNode = (cell) => {
    try {
      return {
        active: false,
        focused: false,
        ...(cell.childcell && cell.is_head ? {
          children: [],
          toggled: false,
          loading: false,
        } : null),

        ...cell,
      }
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
  getNode = (id) => {
    const {client} = this.props;

    return client.query({
      query: CellItemQuery,
      variables: {
        id,
      }
    }).catch(error => {
      console.error(`Error getNode, id=${id}: `, error);
      return error;
    })
  };

  render() {
    console.log(this.state);

    return (<Box style={{
      borderBottom: '1px solid #848484',
      marginBottom: '4px'
    }}>
      <Treebeard
        decorators={decorators}
        data={this.state.tree}
        onToggle={this.onToggle}
      />
    </Box>)
  }
}

DocumentTree = withApollo(DocumentTree);

export default DocumentTree;

import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Treebeard, decorators} from '../../../../components/ReactTreeBeard/index';
import {Box} from "@lib/ui/Box/Box";
import SidebarCellRoot from "../ProjectEditor/SidebarCellRoot";
import SidebarCellNode from "../SidebarCellNode/SidebarCellNode";
import CellItemQuery from './CellItemQuery.graphql';
import objectPath from "object-path";
import Flex from "@lib/ui/Flex/Flex";

decorators.TreeBeardWrapper = (props) => <Box {...props}/>;
decorators.TreeNodeList = (props) => <Box pl={'10px'} {...props}/>;


decorators.Loading = () => (<Flex mb={'10px'} px={'20px'} justifyContent={'flex-start'} alignItems={'center'}>
  Загрузка...
</Flex>);

export class ProjectEditorSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onToggle = this.onToggle.bind(this);
    decorators.Container = (props) => <SidebarCellNode addNodeInTree={this.addNodeInTree} {...props}/>;
  }

  get initialState() {
    return {
      cursor: null,
      tree: {
        number: '',
        name: 'I. ТЗ - RK-186-344',
        toggled: false,
        loading: false,
        active: false,
        focused: false,
        id: 'ROOT',
        childcell: "37cea22b074140c6ac32a660",
        decorators: {
          ...decorators,
          Container: (props) => <SidebarCellRoot {...props}/>,
        },
        children: [],
      }
    }
  }

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
          this.addNodeListInBranch(childList, node.number);
          this.changeStatusLoadingsNode(node.name, false);
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
   * @param {array} childList - массив ячеек, передается в каждый вызов рекурсивно и по завершению этот массив пишется в state.tree.*
   * @desc метод выполняет загрузку ячеек по id
   * */
  branchDownload = (id, childList) => {
    return this.getNode(id)
      .then(response => {
        const {data} = response;
        childList.push(data.cellitem);

        if (data.cellitem.nextcell) {
          return this.branchDownload(data.cellitem.nextcell, childList);
        } else {
          return data.cellitem;
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
  changeStatusLoadingsNode = (name, status = false) => {
    try {
      const {tree, cursor} = this.state;
      // нашли путь к  ноде
      let pathToNode = this.findNodeByProp(tree, name, '', 'name');

      // проверили что у нас массив
      if (Array.isArray(pathToNode)) {
        // сгенерировали строку с полным путем
        pathToNode = pathToNode[0] + '.loading';

        // по пути обновили значение статуса
        objectPath.set([tree], pathToNode, status);

        this.updateTree({
          tree, cursor: cursor.name === name ? {
            ...cursor,
            loading: status,
          } : cursor,
        });
      } else {
        console.log(`Error changeStatusLoadingsNode name=${name}: pathToNode is undefined `);
      }
    } catch (error) {
      console.log(`Error changeStatusLoadingsNode name=${name}:`, error);
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
      let pathToParent = this.getPathToParent(tree, cellList[0].parent) + '.children';

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

    let pathToParent = this.getPathToParent(tree, cell.parent);
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
  getPathToParent = (tree, parentId) => {
    try {
      let pathToParent = this.findNodeByProp(tree, parentId, '', 'id');
      if (Array.isArray(pathToParent) && pathToParent.length) {
        return pathToParent[0];
      } else {
        return ['0'];
      }
    } catch (error) {
      console.log(`Error getPathToParent, parentId=${parentId}:`, error);
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

    return <div>
      <Treebeard
        decorators={decorators}
        data={this.state.tree}
        onToggle={this.onToggle}
      />
    </div>
  }
}

ProjectEditorSideBar = withApollo(ProjectEditorSideBar);

export default ProjectEditorSideBar;

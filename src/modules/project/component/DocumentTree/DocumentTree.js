import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import {withRouter} from 'react-router-dom';
import shallowequal from 'shallowequal'; // ES6

/** View */
import {Treebeard, decorators} from '@lib/ui/ReactTreeBeard/index';
import {Box} from '@lib/ui/Box/Box';
import Flex from '@lib/ui/Flex/Flex';

/** Component */
import SidebarCellRoot from '../SidebarCellRoot/SidebarCellRoot';
import SidebarCellNode from '../SidebarCellNode/SidebarCellNode';
import {
  PROJECT_MODE_RC,
  PROJECT_MODE_READ,
  PROJECT_MODE_REVISION,
  PROJECT_MODE_RW,
  withProject,
} from '../ProjectContext/ProjectContext';
import {getPosition} from '../ProjectContext/ProjectContextSelectors';
import FormCreateFirstCell from '../FormCreateFirstCell/FormCreateFirstCell';

/** Graphql schema */
import CellItemQuery from '../../graphql/CellItemQuery.graphql';
import UpdateCellMutation from '../../graphql/UpdateCellMutation.graphql';
import UpdateDocumentMutation from '../../graphql/UpdateDocumentMutation.graphql';
import ProjectItemQuery from '../../graphql/ProjectItemQuery.graphql';

/** PropTypes  */
import {ProjectPropTypes} from '../../../../propTypes/ProjectPropTypes';

/** Constatns */
import {CELL_STATUS_CHANGED, CELL_STATUS_NOT_CHECKED} from '@lib/shared/approvalStatus';
import {UpdateCellInCache} from '../../utils/UpdateCellInCache';
import {childcellIsCategory} from '../../utils/childcellIsCategory';
import ProjectModeState from '../ProjectContext/ProjectModeState';
import {joinQueryString} from '@lib/utils/joinQueryString';

const has = Object.prototype.hasOwnProperty;

const SidebarCellNodeWithProject = withProject(props => <SidebarCellNode {...props} />);
const SidebarCellRootWithProject = withProject(props => <SidebarCellRoot {...props} />);

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
        __typename: PropTypes.string,
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
    this.decorators = Object.assign({}, decorators);
    this.decorators.TreeBeardWrapper = props => <Box {...props} />;
    this.decorators.TreeNodeList = props => <Box ml={'5px'} {...props} />;

    this.decorators.Loading = () => (
      <Flex mb={'10px'} px={'20px'} justifyContent={'flex-start'} alignItems={'center'}>
        Загрузка...
      </Flex>
    );
    this.decorators.Container = props => (
      <SidebarCellNodeWithProject
        document={this.props.data}
        changeNodeFocus={this.changeNodeFocus}
        updateNode={this.updateNode}
        changeActiveNode={(id, prevCursor) =>
          this.changeActiveNode(id, prevCursor, this.state.tree.children)
        }
        cellCheckStatusChange={this.cellCheckStatusChange}
        addNodeInTree={this.addNodeInTree}
        removeNodeInTree={this.removeNodeInTree}
        {...props}
      />
    );

    /** id активного документа у нас под разным названием в зависимости от контекста */
    if (
      this.props.data.id === getPosition(this.props.project, 'documentid') ||
      this.props.data.id === getPosition(this.props.project, 'revisionid')
    ) {
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
              ...this.decorators,
              Container: props => (
                <ProjectModeState is={PROJECT_MODE_RW}>
                  <FormCreateFirstCell
                    form={'FormCreateFirstCell-' + data.id}
                    document={data}
                    project={project}
                    {...props}
                  />
                </ProjectModeState>
              ),
            },
          },
        ];

    return {
      cursor: null,
      tree: {
        number: '',
        letterNumber: '',
        toggled: false,
        loading: false,
        active: false,
        focused: false,
        ...data,
        decorators: {
          ...this.decorators,
          Container: props => <SidebarCellRootWithProject document={this.props.data} {...props} />,
        },
        children: children,
      },
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const {data} = nextProps;

    if (data.childcell !== null && this.state.tree.childcell === null) {
      const newState = this.initialState;
      this.setState(
        state => ({
          ...newState,
          tree: {
            ...newState.tree,
            toggled: true,
            active: true,
          },
        }),
        state => {
          this.onToggle(newState.tree, true);
        },
      );
    }

    if (
      (!nextState.tree.childcell ||
        !this.state.tree.childcell ||
        this.state.tree.childcell.id !== nextState.tree.childcell.id) &&
      !this.state.tree.children.length
    ) {
      this.setState(state => this.initialState);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {project: nextProject} = nextProps;
    if (nextProject.searchResult.length) {
      /** если есть результаты поиска */
      if (!shallowequal(nextProject.searchCursor, this.props.project.searchCursor)) {
        /** если предыдущее состояние курсора поиска не такое же как новое */

        if (
          nextProject.searchCursor.document &&
          nextProject.searchCursor.cell &&
          nextProject.searchCursor.cell.parent &&
          nextProject.searchCursor.document.id === this.props.data.id
        ) {
          if (nextProject.searchCursor.cell.parent.id !== nextProject.position.sectionid) {
            if (this.isThereCellInTheDocumentTree(nextProject.searchCursor.cell.parent.id)) {
              /** если курсор поиска в текущем документа */
              this.initTree(nextProject.searchCursor.cell.parent.id, null, this.state.tree);
            } else {
              /** если курсор поиска в текущем документа */
              this.initTree(nextProject.searchCursor.cell.parent.id);
            }
          }
        }
      }
    }
  }

  /**
   * @param {string} cellid id ячейки которую надо проверить
   * @return {bool}
   * @desc метод проверяет есть ли ячейка в дереве и возвраает true/false
   * */
  isThereCellInTheDocumentTree = (cellid) => {
    try {
      let tree = Object.assign({}, this.state.tree);
      return this.getPathToNode(tree, cellid);
    } catch (error) {
      console.error(`Error isThereCellInTheDocumentTree, cellid='${cellid}': `, error);
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
          this.createBranch(this.state.tree.childcell.id, nodes, newNodes);
          this.createTree(newNodes, nodes);
          this.changeActiveNode(cellid, null, newNodes);
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
  removeNodeInTree = async cellid => {
    if (!cellid) {
      console.error(`Error removeNodeInTree: cellid is ${cellid}`);
      return cellid;
    }
    try {
      const {client, history} = this.props;
      let tree = Object.assign({}, this.state.tree);
      let pathToCurrentNode = this.getPathToNode(tree, cellid) || '0';
      let currentNode = objectPath.get([tree], pathToCurrentNode);

      /** предыдущая ячейка */
      let pathToPrevNodeCurrentNode = currentNode.prevcell
        ? this.getPathToNode([tree], currentNode.prevcell.id) || '0'
        : null;
      let prevNodeCurrentNode = pathToPrevNodeCurrentNode
        ? objectPath.get([tree], pathToPrevNodeCurrentNode)
        : null;

      /** следующая ячейка */
      let pathToNextNodeCurrentNode = currentNode.nextcell
        ? this.getPathToNode([tree], currentNode.nextcell.id) || '0'
        : null;
      let nextNodeCurrentNode = pathToNextNodeCurrentNode
        ? objectPath.get([tree], pathToNextNodeCurrentNode)
        : null;

      if (prevNodeCurrentNode && nextNodeCurrentNode) {
        /** удаление ячейки со ссылкой на предыдущую ячейку при этом предыдущая родитель удоляемой ячейки и на следующую */
        if (currentNode.parent && prevNodeCurrentNode.id === currentNode.parent.id) {
          prevNodeCurrentNode.childcell = nextNodeCurrentNode;
          nextNodeCurrentNode.prevcell = prevNodeCurrentNode;
          nextNodeCurrentNode.parent = prevNodeCurrentNode;
        } else {
          /** удаление ячейки со ссылкой на следующую и предыдущую при этом предыдущая не родитель удоляемой ячейки */
          prevNodeCurrentNode.nextcell = nextNodeCurrentNode;
          nextNodeCurrentNode.prevcell = prevNodeCurrentNode;
        }
        /** @desc обновляем в кеше apollo prevcell */
        UpdateCellInCache(client, {
          id: prevNodeCurrentNode.id,
          childcell: prevNodeCurrentNode.childcell,
          prevcell: prevNodeCurrentNode.prevcell,
          nextcell: prevNodeCurrentNode.nextcell,
          parent: prevNodeCurrentNode.parent,
        });

        /** @desc обновляем в кеше apollo nextcell */
        UpdateCellInCache(client, {
          id: nextNodeCurrentNode.id,
          prevcell: nextNodeCurrentNode.prevcell,
          parent: nextNodeCurrentNode.parent,
        });

        objectPath.set([tree], pathToPrevNodeCurrentNode, prevNodeCurrentNode);
        objectPath.set([tree], pathToNextNodeCurrentNode, nextNodeCurrentNode);
      } else if (!prevNodeCurrentNode && nextNodeCurrentNode) {
        /** удаление ячейки без ссылки на предыдущую ячейку */
        nextNodeCurrentNode.prevcell = null;
        tree.childcell = nextNodeCurrentNode;
        // TODO: чекнуть как обновляется в кеше
        /** @desc обновляем в кеше apollo nextcell */
        UpdateCellInCache(client, {
          id: nextNodeCurrentNode.id,
          prevcell: null,
        });
        this.updateDocumentInCache({
          id: tree.id,
          project: tree.project,
          childcell: tree.childcell,
        });
        objectPath.set([tree], pathToNextNodeCurrentNode, nextNodeCurrentNode);
      } else if (prevNodeCurrentNode && !nextNodeCurrentNode) {
        /** удаление ячейки со ссылкой только на предыдущую ячейку при этом предыдущая родитель удоляемой ячейки */
        if (currentNode.parent && prevNodeCurrentNode.id === currentNode.parent.id) {
          prevNodeCurrentNode.childcell = null;
          prevNodeCurrentNode.lastChildren = null;
        } else {
          /** удаление ячейки со ссылкой только на предыдущую ячейку при этом предыдущая не родитель удоляемой ячейки */
          prevNodeCurrentNode.nextcell = null;
        }
        /** @desc обновляем в кеше apollo prevcell */
        UpdateCellInCache(client, {
          id: prevNodeCurrentNode.id,
          nextcell: prevNodeCurrentNode.nextcell,
          childcell: prevNodeCurrentNode.childcell,
          lastChildren: prevNodeCurrentNode.lastChildren,
        });

        objectPath.set([tree], pathToPrevNodeCurrentNode, prevNodeCurrentNode);
      }

      objectPath.del([tree], pathToCurrentNode);

      if (tree.children.length === 0) {
        tree.childcell = null;
        await this.updateDocument({id: tree.id, children: null});
      }

      this.updateTree({tree});

      const activesection = getPosition(this.props.project, 'sectionid');

      if (activesection) {
        if (activesection === currentNode.id) {
          this.changeRoute({
            history,
            projectid: getPosition(this.props.project, 'projectid'),
          });
        } else if (currentNode.children && currentNode.children.length) {
          let pathToActiveSection = this.getPathToNode(currentNode.children, activesection);
          if (pathToActiveSection) {
            this.changeRoute({
              history,
              projectid: getPosition(this.props.project, 'projectid'),
            });
          }
        }
      }
    } catch (error) {
      console.error('Error removeNodeInTree: ', error);
    }
  };

  /**
   * @param {object} value
   * @desc метод для обновления ячейки в кеше */
  updateDocumentInCache = value => {
    const {client} = this.props;
    const data = client.readQuery({
      query: ProjectItemQuery,
      variables: {
        id: value.project,
      },
    });
    let documentIndex = data.projectitem.documents.findIndex(item => item.id === value.id);
    data.projectitem.documents[documentIndex] = {
      ...data.projectitem.documents[documentIndex],
      ...value,
    };

    client.writeQuery({
      query: ProjectItemQuery,
      variables: {
        id: value.project,
      },
      data,
    });
  };

  /**
   * @params {string} cellid - id выбранного раздела
   * @params {string} cursorid - id предыдущего раздела
   * @params {array} nodes - дерево навигации
   * @desc метод активирует переданный раздел и по цепочке всех его предков, и отключает всех
   * */
  changeActiveNode = (cellid, cursorid, nodes) => {
    try {
      const {data, history} = this.props;
      let pathToCurrentNode = this.getPathToNode(nodes, cellid) || '0';
      let currentNode = objectPath.get(nodes, pathToCurrentNode);

      let pathToPrevCursorNode = cursorid ? this.getPathToNode(nodes, cursorid) || '0' : null;
      let prevCursorNode = pathToPrevCursorNode
        ? objectPath.get(nodes, pathToPrevCursorNode)
        : null;

      if (
        (currentNode &&
          prevCursorNode &&
          (currentNode.parent && prevCursorNode.parent) &&
          currentNode.parent.id !== prevCursorNode.parent.id) ||
        (prevCursorNode && prevCursorNode.parent)
      ) {
        /** @desc изменяем статус у текущей активной ноды и всех ее предков */
        nodes = this.changeActiveBranch(prevCursorNode, pathToPrevCursorNode, nodes, false);
      } else if (pathToPrevCursorNode) {
        objectPath.set(nodes, pathToPrevCursorNode + '.active', false);
      }

      /** @desc изменяем статус у выбранной ноды и все ее предков */
      nodes = this.changeActiveBranch(currentNode, pathToCurrentNode, nodes, true);

      this.updateTree({
        cursor: currentNode,
        tree: {
          ...this.state.tree,
          active: true,
          toggled: true,
          children: nodes,
        },
      });

      if (
        !childcellIsCategory(currentNode) &&
        currentNode.id !== getPosition(this.props.project, 'sectionid')
      ) {
        this.changeRoute({
          history,
          projectid: getPosition(this.props.project, 'projectid'),
          revisionid: getPosition(this.props.project, 'revisionid'),
          documentid: data.id,
          sectionid: currentNode.id,
          cellNumber: currentNode.number,
          cellLetterNumber: currentNode.letterNumber,
        });
      }
    } catch (error) {
      console.error('Error changeActiveNode: ', error);
      return nodes;
    }
  };

  /**
   * @param {object} props
   * @param {string} props.projectid - id текущего проекта
   * @param {string} props.revisionid - id документа доступен в случае когда документ просматривается как ревизия
   * @param {string} props.documentid - id Документа доступен в режиме редактирования и комментирования
   * @param {string} props.sectionid - id активной ячейки в документе
   * @desc метод для изменения маршрута в проекте
   * */
  changeRoute = ({
                   projectid,
                   revisionid,
                   documentid,
                   sectionid
                 }) => {
    try {
      const { project, history, location } = this.props;
      // TODO: сократить
      if (project.mode === PROJECT_MODE_READ || project.mode === PROJECT_MODE_RW) {
        if (projectid && documentid && sectionid) {
          history.push({
            pathname: `/app/project/${projectid}/${documentid}/${sectionid}`,
            search: location.search,
          });
        } else if (projectid) {
          history.push({
            pathname: `/app/project/${projectid}`,
            search: location.search,
          });
        }
      } else if (project.mode === PROJECT_MODE_RC) {
        if (documentid && sectionid) {
          history.push({
            pathname: `/app/document-commenting/${projectid}/${documentid}/${sectionid}`,
            search: location.search,
          });
        } else {
          history.push({
            pathname: `/app/document-commenting/${projectid}/${documentid}`,
            search: location.search,
          });
        }
      } else if (project.mode === PROJECT_MODE_REVISION) {
        if (revisionid && sectionid) {
          history.push({
            pathname: `/app/revision-item/${projectid}/${revisionid}/${sectionid}`,
            search: location.search,
          });
        } else {
          history.push({
            pathname: `/app/revision-item/${projectid}/${revisionid}`,
            search: location.search,
          });
        }
      } else {
        console.warn(
          `There is no suitable route for the current mode of operation - ${project.mode}`,
        );
      }
    } catch (error) {
      console.error('Error changeRoute: ', error);
    }
  };

  /**
   * @param {object} currentNode - объект узла от которого будет идти поиск
   * @param {string} pathToCurrentNode - путь в дереве до узла
   * @param {array} nodes - дереко разделов
   * @param {boolean} active - статус который будет установлен
   * @desc метод устанавливает свойство active и toggled в указанное положение у переданного узла и всех его предков
   * */
  changeActiveBranch = (currentNode, pathToCurrentNode, nodes, active) => {
    try {
      if (!currentNode || !pathToCurrentNode) return nodes;
      objectPath.set(nodes, pathToCurrentNode + '.active', active);

      if (currentNode.parent) {
        let pathToParentNode;
        let parentNode;
        pathToParentNode = this.getPathToNode(nodes, currentNode.parent.id) || '0';
        parentNode = objectPath.get(nodes, pathToParentNode);

        while (parentNode !== null) {
          parentNode.toggled = active;
          parentNode.active = false;
          objectPath.set(nodes, pathToParentNode, parentNode);

          if (parentNode.parent && parentNode.parent.id) {
            pathToParentNode = this.getPathToNode(nodes, parentNode.parent.id) || '0';
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
      console.error('Error: changeActiveBranch', error);
      return nodes;
    }
  };

  /**
   * @param {object} props принимает объект который будет писатя в стейт и перезаписывать его свойства
   * @desc метод для обновления стейта
   * */
  updateTree = props => {
    console.log('updateTree: ', props);
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
    try {

      if (node.loading) {
        return;
      }
      node.toggled = toggled;

      if (node.childcell && !node.loading && toggled) {
        node.loading = true;
        let childList = [];

        /**  Проверяем есть ли ячейка в дереве, нужно чтобы не пересобирать ветки если они и так уже есть */
        if (!this.isThereCellInTheDocumentTree(node.childcell.id)) {

          /**  Запрашиваем данные для открывшейся ветки */
          this.branchDownload(node.childcell.id, childList)
            .then(() => {
              if (childList.length) {
                this.addNodeListInBranch(childList);
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
      } else {
        node.loading = false;
      }
      this.updateTree({cursor: node});
    } catch (error) {
      console.error('Error onToggle:', error);
    }
  };

  /**
   * @param {string} id ячейки
   * @param {array} nodes - массив ячеек, передается в каждый вызов рекурсивно и по завершению этот массив пишется в state.tree.*
   * @param {string} [prevcell] - id предыдущей ячейки, нужен в том случае когда обходим дерево в обе стороны
   * @desc метод выполняет загрузку ячеек по id
   * */
  branchDownload = (id, nodes, prevcell) => {
    if (!id) return;
    return this.getNode(id)
      .then(async response => {
        const {data} = response;
        if (data && data.cellItem) {
          nodes.push(data.cellItem);

          // Это перегрузка метода
          if (typeof prevcell !== 'undefined') {
            if (
              data.cellItem.prevcell &&
              has.call(data.cellItem.prevcell, 'id') &&
              data.cellItem.prevcell.id !== prevcell
            ) {
              await this.branchDownload(data.cellItem.prevcell.id, nodes, data.cellItem.id);
            }
            if (
              data.cellItem.nextcell &&
              has.call(data.cellItem.nextcell, 'id') &&
              data.cellItem.nextcell.id !== prevcell
            ) {
              return await this.branchDownload(data.cellItem.nextcell.id, nodes, data.cellItem.id);
            }
          } else {
            if (data.cellItem.nextcell && has.call(data.cellItem.nextcell, 'id')) {
              return this.branchDownload(data.cellItem.nextcell.id, nodes, data.cellItem.id);
            }
            return response;
          }
        } else {
          return null;
        }
      })
      .catch(error => {
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
      let pathToNode = (this.getPathToNode(tree, id) || '0') + '.loading';

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
      console.error(`Error changeStatusLoadingsNode name=${name}:`, error);
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
    try {
      let tree = Object.assign({}, this.state.tree);
      let pathToCurrentNode = this.getPathToNode(tree, cellid) || '0';
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
    return new Promise(async (resolve) => {
      try {
        let pathToParentNode = this.getPathToNode(tree, parent.id) || '0';
        let parentNode = objectPath.get([tree], pathToParentNode);


        if (parentNode && Array.isArray(parentNode.children)) {
          let result = parentNode.children.findIndex(
            item => item.verify === CELL_STATUS_CHANGED || item.verify === CELL_STATUS_NOT_CHECKED,
          );
          if (result >= 0) {
            objectPath.set([tree], pathToParentNode, parentNode);
            await this.updateCell({id: parentNode.id, verify: status});
            parentNode.verify = CELL_STATUS_CHANGED;
          }

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
   * @desc метод для добавления ноды в дерево
   * */
  addNodeListInBranch = cellList => {
    try {
      const tree = Object.assign({}, this.state.tree);
      let pathToParent =
        (this.getPathToNode(tree, cellList[0].parent && cellList[0].parent.id) || '0') +
        '.children';

      let newChildren = cellList.map(cell => this.createCellNode(cell));

      objectPath.set([tree], pathToParent, newChildren);
      this.updateTree({tree});
    } catch (error) {
      console.error(`Error addNodeListInBranch`, error);
    }
  };

  /**
   * @param {object} cell объект ячейки
   * @desc метод добавления одной ячейки в дерево
   * */
  addNodeInTree = cell => {
    const tree = Object.assign({}, this.state.tree);
    const {client} = this.props;
    // const focusedCell = cell.isAttachment ? false : true
    let newCell = this.createCellNode({...cell, focused: true});

    let pathToParentCell =
      this.getPathToNode(tree, cell.parent !== null ? cell.parent.id : null) || '0';
    let parentCell = objectPath.get([tree], pathToParentCell);

    let pathToPrevCell =
      cell.prevcell !== null ? this.getPathToNode(tree, cell.prevcell.id) || '0' : null;
    let prevCell = pathToPrevCell ? objectPath.get([tree], pathToPrevCell) : null;

    let pathToNextCell =
      cell.nextcell !== null ? this.getPathToNode(tree, cell.nextcell.id) || '0' : null;
    let nextCell = pathToNextCell ? objectPath.get([tree], pathToNextCell) : null;

    /**
     * 1. есть предыдущая ячейка и следующая
     * 2. есть только предыдущая
     * 3. есть только следующая
     * 4. предыддущая ячейка это родитель без детей
     * 5. предыддущая ячейка это родитель и у него есть дочернияя ячейка и она не раздел isHead==false
     * 6. предыддущая ячейка это родитель с детьми и все они разделы
     * */

    if (prevCell && parentCell && prevCell.id === parentCell.id) {
      if (parentCell.children && parentCell.children.length) {
        if (parentCell.children[0].isHead) {
          parentCell.children[parentCell.children.length - 1].nextcell = newCell;
          newCell.prevcell = parentCell.children[parentCell.children.length - 1];
          parentCell.children.push(newCell);
        } else {
          newCell.childcell = parentCell.children[0];
          newCell.children = parentCell.children.map(item => {
            item.parent = newCell;
            return item;
          });
          newCell.children[0].parent = newCell;
          newCell.children[0].prevcell = newCell;

          parentCell.children = [newCell];
          parentCell.childcell = newCell;

          newCell.parent = parentCell;
          newCell.prevcell = parentCell;
        }
      } else if (newCell.isHead) {
        /** новая ячейка раздел */
        parentCell.childcell = newCell;
        parentCell.children = [newCell];
      } else if (!newCell.isHead) {
        /** новая ячейка не раздел */
        parentCell.childcell = newCell;
      }

      if (parent.__typename === 'Cell') {
        parentCell.verify = CELL_STATUS_CHANGED;
      }

      parentCell.toggled = true;
      parentCell.active = true;
      objectPath.set([tree], pathToParentCell, parentCell);
      UpdateCellInCache(client, {
        id: parentCell.id,
        verify: parentCell.verify,
        prevcell: parentCell.prevcell,
        childcell: parentCell.childcell,
        nextcell: parentCell.nextcell,
        parent: parentCell.parent,
        lastChildren: newCell,
      });
    } else {
      if (prevCell && nextCell) {
        prevCell.nextcell = newCell;
        nextCell.prevcell = newCell;

        objectPath.set([tree], pathToPrevCell, prevCell);
        UpdateCellInCache(client, {
          id: prevCell.id,
          nextcell: prevCell.nextcell,
        });

        objectPath.set([tree], pathToNextCell, nextCell);
        UpdateCellInCache(client, {
          id: nextCell.id,
          prevcell: nextCell.prevcell,
        });
      } else if (prevCell && !nextCell) {
        prevCell.nextcell = newCell;
        objectPath.set([tree], pathToPrevCell, prevCell);
        UpdateCellInCache(client, {
          id: prevCell.id,
          nextcell: prevCell.nextcell,
        });
      } else if (!prevCell && nextCell) {
        nextCell.prevcell = newCell;
        objectPath.set([tree], pathToNextCell, nextCell);
        UpdateCellInCache(client, {
          id: nextCell.id,
          prevcell: nextCell.prevcell,
        });
      }
      let indexPrevCell = 0;
      if (parentCell.children && Array.isArray(parentCell.children)) {
        indexPrevCell = this.getIndexPrevCell(parentCell.children, newCell.prevcell.id);
      }

      if (Array.isArray(parentCell.children)) {
        parentCell.children.splice(
          indexPrevCell + 1,
          0,
          this.createCellNode({...cell, focused: true}),
        );
      }

      objectPath.set([tree], pathToParentCell, parentCell);
    }

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
   * @param {string} cellid
   * @param {object} newData
   * @desc метод получает на вход id ячейки и новые данные, эта ячейка находится в дереве и сливается с новыми данными причем новые данные перезаписывают старые
   * */
  updateNode = (cellid, newData) => {
    try {
      const {tree} = Object.assign({}, this.state);
      const pathToCurrentNode = this.getPathToNode(tree, cellid);
      const currentNode = objectPath.get([tree], pathToCurrentNode);

      objectPath.set([tree], pathToCurrentNode, {...currentNode, ...newData});
      this.updateTree({tree});
    } catch (error) {
      console.error('Error updateNode: ', error);
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
        return null;
      }
    } catch (error) {
      console.error(`Error getPathToNode, parentId=${parentId}:`, error);
      return null;
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
        /** совпадает ли ячейка с ячейков в поиске */
        matchFound: false,
        /** установлен ли в данный момент курсор на этой ячейке при просмотре поиска */
        searchCursor: false,
        ...(childcellIsCategory(cell)
          ? {
            children: [],
            toggled: false,
            loading: false,
          }
          : null),
        ...cell,
      };
    } catch (error) {
      console.error('Error createCellNode: ', error);
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
        // fetchPolicy: 'network-only',
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
    const {client} = this.props;

    return client
      .mutate({
        mutation: UpdateCellMutation,
        variables: value,
        update: (store, {data: {updateCell}}) => {
          UpdateCellInCache(store, updateCell.cell);
        },
      })
      .catch(error => {
        console.error(`Error updateCell, id=${value.id}: `, error);
        return error;
      });
  };

  updateDocument = value => {
    const {client} = this.props;

    return client
      .mutate({
        mutation: UpdateDocumentMutation,
        variables: value,
        update: (store, {data: {updatedocument}}) => {
          this.updateDocumentInCache(updatedocument.document);
        },
      })
      .catch(error => {
        console.error(`Error updateCell, id=${value.id}: `, error);
        return error;
      });
  };

  render() {
    return (
      <Box
        style={{
          borderBottom: '1px solid #848484',
          marginBottom: '4px',
        }}>
        <Treebeard decorators={this.decorators} data={this.state.tree} onToggle={this.onToggle}/>
      </Box>
    );
  }
}

DocumentTree = withApollo(DocumentTree);
DocumentTree = withRouter(DocumentTree);

export default DocumentTree;

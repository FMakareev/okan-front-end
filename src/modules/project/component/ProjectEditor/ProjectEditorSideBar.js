import React, { Fragment } from 'react';
// import tree from '../../../../../test';

/** View */
import Box from '../../../../components/Box/Box';

/** Components */
import SidebarCellRoot from './SidebarCellRoot';
import EditorCellCommentButton from './EditorCellCommentButton';
import EditorCellController from './EditorCellController';
import EditorCellCommentController from './EditorCellCommentController';
import SidebarCellNode from './SidebarCellNode';

export class ProjectEditorSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // let newTree = {
    //   name: 'ROOT',
    //   children: [],
    // };
    // const rootCell = this.findRootCell(tree)[0];
    // console.table(rootCell);

    // this.createTree(tree, newTree);
  }

  get initialState() {
    // return {
    //   tree: tree,
    // }
  }

  // createTree = (tree, newTree) => {

  //   if (!item.prevCell && !item.parent) {
  //     if (item.childCell)
  //       newTree.children.push({
  //         ...item,
  //         children: tree.find(childItem => childItem.parent === item.id),
  //       });
  //     // item.childCell
  //   }
  //   console.table(newTree);
  // };

  // findRootCell = (tree) => {
  //   return tree.filter(item => {
  //     if (item.prevCell === null && item.parent === null) {
  //       return item
  //     } else {
  //       return false;
  //     }
  //   })
  // };

  render() {
    return (
      <Fragment>
        <Box pl={3} my={4}>
          <SidebarCellRoot nameSection={'I. ТЗ - RK-186-344'} />
        </Box>
        <Box pl={3} my={9}>
          <SidebarCellNode />
        </Box>

        <EditorCellController />

        <EditorCellCommentController />
      </Fragment>
    );
  }
}

export default ProjectEditorSideBar;

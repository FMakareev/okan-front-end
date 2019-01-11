import React from 'react';
import tree from '../../../../../test';


export class ProjectEditorSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let newTree = {
      name: 'ROOT',
      children: [],
    };
    const rootCell = this.findRootCell(tree)[0];
    console.table(rootCell);

    this.createTree(tree, newTree);
  }

  get initialState() {
    return {
      tree: tree,
    }
  }

  createTree = (tree, newTree) => {

    if (!item.prevCell && !item.parent) {
      if (item.childCell)
        newTree.children.push({
          ...item,
          children: tree.find(childItem => childItem.parent === item.id),
        });
      // item.childCell
    }
    console.table(newTree);
  };

  findRootCell = (tree) => {
    return tree.filter(item => {
      if (item.prevCell === null && item.parent === null) {
        return item
      } else {
        return false;
      }
    })
  };

  render() {
    return null
  }
}

export default ProjectEditorSideBar;

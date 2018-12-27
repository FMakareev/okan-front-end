import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Treebeard as Tree } from 'react-treebeard';

import dynamic from 'next/dynamic';

const Treebeard = dynamic(import('react-treebeard'), {
  ssr: false,
});

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [{ name: 'child1' }, { name: 'child2' }],
    },
    {
      name: 'loading parent',
      loading: true,
      children: [],
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [{ name: 'nested child 1' }, { name: 'nested child 2' }],
        },
      ],
    },
  ],
};

// const styles = {};

class ProjectEditorSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  }

  render() {
    return <Treebeard data={data} onToggle={this.onToggle} />;
    // return <div>1</div>;
  }
}

export default ProjectEditorSideBar;
